const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize SQLite database
const db = new sqlite3.Database('./bookings.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    // Create bookings table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      phoneNumber TEXT NOT NULL,
      serviceType TEXT NOT NULL,
      collectionPoint TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      entranceCode TEXT,
      additionalNotes TEXT,
      completed INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Bookings table ready');
      }
    });
  }
});

// Initialize Twilio client (only if credentials are provided)
let twilioClient = null;
const hasTwilioCredentials = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN;

if (hasTwilioCredentials) {
  try {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    console.log('Twilio client initialized');
  } catch (error) {
    console.warn('Twilio initialization failed:', error.message);
    console.warn('WhatsApp notifications will be disabled');
  }
} else {
  console.warn('Twilio credentials not found. WhatsApp notifications disabled.');
  console.warn('To enable WhatsApp notifications, set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env file');
}

// WhatsApp number (Twilio sandbox or your approved number)
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
const whatsappTo = process.env.TWILIO_WHATSAPP_TO || 'whatsapp:+1234567890';

// Helper function to send WhatsApp notification
async function sendWhatsAppNotification(booking) {
  if (!twilioClient) {
    console.log('Twilio not configured, skipping WhatsApp notification');
    return false;
  }

  try {
    const message = `New booking for Ubuntu Laundry Lounge from ${booking.fullName} – ${booking.serviceType} at ${booking.collectionPoint} on ${booking.date} at ${booking.time}. Phone: ${booking.phoneNumber}.${booking.entranceCode ? ` Entrance Code: ${booking.entranceCode}.` : ''}${booking.additionalNotes ? ` Notes: ${booking.additionalNotes}` : ''}`;

    await twilioClient.messages.create({
      from: whatsappFrom,
      to: whatsappTo,
      body: message
    });

    console.log('WhatsApp notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error.message);
    // Don't fail the booking if WhatsApp fails
    return false;
  }
}

// Routes

// POST /api/bookings - Create a new booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { fullName, phoneNumber, serviceType, collectionPoint, date, time, entranceCode, additionalNotes } = req.body;

    console.log('Received booking request:', { fullName, phoneNumber, serviceType, collectionPoint, date, time });

    // Validate required fields
    if (!fullName || !phoneNumber || !serviceType || !collectionPoint || !date || !time) {
      console.error('Missing required fields:', { fullName: !!fullName, phoneNumber: !!phoneNumber, serviceType: !!serviceType, collectionPoint: !!collectionPoint, date: !!date, time: !!time });
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          fullName: !fullName,
          phoneNumber: !phoneNumber,
          serviceType: !serviceType,
          collectionPoint: !collectionPoint,
          date: !date,
          time: !time
        }
      });
    }

    const sql = `INSERT INTO bookings (fullName, phoneNumber, serviceType, collectionPoint, date, time, entranceCode, additionalNotes)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [fullName, phoneNumber, serviceType, collectionPoint, date, time, entranceCode || '', additionalNotes || ''], function(err) {
      if (err) {
        console.error('Error inserting booking:', err.message);
        return res.status(500).json({ error: 'Failed to create booking', details: err.message });
      }

      const booking = {
        id: this.lastID,
        fullName,
        phoneNumber,
        serviceType,
        collectionPoint,
        date,
        time,
        entranceCode: entranceCode || '',
        additionalNotes: additionalNotes || '',
        completed: false,
        createdAt: new Date().toISOString()
      };

      console.log('Booking created successfully:', booking);

      // Send WhatsApp notification (async, don't wait for it)
      sendWhatsAppNotification(booking).catch(err => {
        console.error('WhatsApp notification error:', err);
      });

      res.status(201).json(booking);
    });
  } catch (error) {
    console.error('Unexpected error in POST /api/bookings:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// GET /api/bookings - Get all bookings
app.get('/api/bookings', (req, res) => {
  const sql = `SELECT * FROM bookings ORDER BY createdAt DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching bookings:', err.message);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }

    const bookings = rows.map(row => ({
      ...row,
      completed: row.completed === 1
    }));

    res.json(bookings);
  });
});

// PUT /api/bookings/:id/complete - Mark booking as completed
app.put('/api/bookings/:id/complete', (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE bookings SET completed = 1 WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Error updating booking:', err.message);
      return res.status(500).json({ error: 'Failed to update booking' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Fetch updated booking
    db.get('SELECT * FROM bookings WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch updated booking' });
      }

      const booking = {
        ...row,
        completed: row.completed === 1
      };

      res.json(booking);
    });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ubuntu Laundry Lounge API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

