# Ubuntu Laundry Lounge - Full Stack Application

A complete Angular web application with Node.js backend for managing a laundromat business, including booking system and WhatsApp notifications.

## Features

- **Home Page**: Hero banner, services showcase, and pricing information
- **Booking System**: Customer booking form with validation
- **Contact Page**: Business information and contact details
- **Admin Dashboard**: View and manage bookings, mark as completed
- **WhatsApp Notifications**: Automatic notifications via Twilio when bookings are created
- **Responsive Design**: Mobile-friendly UI with Angular Material

## Tech Stack

### Frontend
- Angular 17
- Angular Material
- TypeScript
- SCSS

### Backend
- Node.js
- Express.js
- SQLite (database)
- Twilio (WhatsApp API)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Twilio account (for WhatsApp notifications)

## Installation

### 1. Clone or navigate to the project directory

```bash
cd "Ubuntu Laundry"
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure Twilio WhatsApp

1. Sign up for a Twilio account at https://www.twilio.com/
2. Get your Account SID and Auth Token from the Twilio Console
3. For testing, you can use Twilio's WhatsApp sandbox:
   - Go to https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
   - Follow instructions to join the sandbox
   - Use the sandbox number: `whatsapp:+14155238886`

4. Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

5. Edit `server/.env` and add your Twilio credentials:

```env
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+your_phone_number
PORT=3000
```

**Note**: Replace `your_phone_number` with your WhatsApp-enabled phone number in E.164 format (e.g., `+1234567890`).

## Running the Application

### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

The backend will run on `http://localhost:3000`

**Terminal 2 - Start Frontend:**
```bash
npm start
```

The frontend will run on `http://localhost:4200`

### Option 2: Run Both Together (if concurrently is installed)

```bash
npm run dev
```

This will start both the Angular dev server and the Node.js backend simultaneously.

## Usage

### For Customers

1. Visit `http://localhost:4200`
2. Click "Book Now" or navigate to the Booking page
3. Fill out the booking form:
   - Full Name (required)
   - Phone Number (required)
   - Service Type (required)
   - Date (required)
   - Time (required)
   - Additional Notes (optional)
4. Submit the booking
5. A WhatsApp notification will be sent to the configured number

### For Administrators

1. Navigate to `http://localhost:4200/admin`
2. Login with password: `admin123` (demo password)
3. View all bookings
4. Mark bookings as completed
5. Refresh to see updated status

## API Endpoints

### POST /api/bookings
Create a new booking.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "serviceType": "Wash & Fold",
  "date": "2024-01-15",
  "time": "10:00",
  "additionalNotes": "Please handle with care"
}
```

**Response:**
```json
{
  "id": 1,
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "serviceType": "Wash & Fold",
  "date": "2024-01-15",
  "time": "10:00",
  "additionalNotes": "Please handle with care",
  "completed": false,
  "createdAt": "2024-01-10T10:00:00.000Z"
}
```

### GET /api/bookings
Get all bookings.

**Response:**
```json
[
  {
    "id": 1,
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "serviceType": "Wash & Fold",
    "date": "2024-01-15",
    "time": "10:00",
    "additionalNotes": "Please handle with care",
    "completed": false,
    "createdAt": "2024-01-10T10:00:00.000Z"
  }
]
```

### PUT /api/bookings/:id/complete
Mark a booking as completed.

**Response:**
```json
{
  "id": 1,
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "serviceType": "Wash & Fold",
  "date": "2024-01-15",
  "time": "10:00",
  "additionalNotes": "Please handle with care",
  "completed": true,
  "createdAt": "2024-01-10T10:00:00.000Z"
}
```

## Project Structure

```
Ubuntu Laundry/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   ├── booking/
│   │   │   ├── contact/
│   │   │   └── admin-dashboard/
│   │   ├── services/
│   │   │   └── booking.service.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── bookings.db (created automatically)
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Twilio WhatsApp Setup

### Using Twilio Sandbox (Testing)

1. Go to https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Join the sandbox by sending the join code to `+1 415 523 8886`
3. Use `whatsapp:+14155238886` as `TWILIO_WHATSAPP_FROM` in your `.env`
4. Add your WhatsApp number to `TWILIO_WHATSAPP_TO`

### Production Setup

1. Apply for a Twilio WhatsApp Business Account
2. Get your approved WhatsApp number from Twilio
3. Update `TWILIO_WHATSAPP_FROM` with your approved number
4. Update `TWILIO_WHATSAPP_TO` with your business WhatsApp number

## Troubleshooting

### Backend not starting
- Check if port 3000 is available
- Verify all dependencies are installed: `cd server && npm install`
- Check database permissions

### WhatsApp notifications not working
- Verify Twilio credentials in `server/.env`
- Check Twilio console for error logs
- Ensure your phone number is added to Twilio sandbox (for testing)
- Verify phone numbers are in E.164 format (e.g., `+1234567890`)

### Frontend not connecting to backend
- Ensure backend is running on port 3000
- Check CORS settings in `server/server.js`
- Verify API URL in `src/app/services/booking.service.ts`

### Database issues
- Delete `server/bookings.db` and restart the server (it will recreate)
- Check file permissions in the server directory

## Development

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Running Backend in Development Mode

```bash
cd server
npm run dev
```

This uses nodemon to auto-restart on file changes.

## Security Notes

- The admin password (`admin123`) is for demo purposes only
- In production, implement proper authentication (JWT, OAuth, etc.)
- Store sensitive credentials in environment variables (never commit `.env`)
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Add input validation and sanitization

## License

This project is for demonstration purposes.

## Support

For issues or questions, please check:
- Twilio Documentation: https://www.twilio.com/docs/whatsapp
- Angular Documentation: https://angular.io/docs
- Express.js Documentation: https://expressjs.com/

---

**Ubuntu Laundry Lounge** - Clean. Fresh. Professional.

