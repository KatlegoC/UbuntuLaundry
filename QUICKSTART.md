# Quick Start Guide

## Prerequisites Check
- Node.js installed? Run: `node --version` (should be v18+)
- npm installed? Run: `npm --version`

## Installation (One-time setup)

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

## Configure Twilio (Required for WhatsApp)

1. Copy the example environment file:
```bash
cd server
cp .env.example .env
```

2. Edit `server/.env` and add your Twilio credentials:
   - Get Account SID and Auth Token from https://console.twilio.com/
   - For testing, use Twilio WhatsApp sandbox: `whatsapp:+14155238886`
   - Add your WhatsApp number in E.164 format

## Running the Application

### Terminal 1 - Backend Server
```bash
cd server
npm start
```
Backend runs on: http://localhost:3000

### Terminal 2 - Frontend
```bash
npm start
```
Frontend runs on: http://localhost:4200

## First Steps

1. Open http://localhost:4200 in your browser
2. Click "Book Now" to test the booking form
3. Go to http://localhost:4200/admin
4. Login with password: `admin123`
5. View your test booking

## Troubleshooting

**Backend won't start?**
- Check if port 3000 is available
- Verify `server/node_modules` exists (run `cd server && npm install`)

**WhatsApp not working?**
- Check `server/.env` file exists and has correct credentials
- Verify phone numbers are in E.164 format (+1234567890)
- Check Twilio console for errors

**Frontend errors?**
- Run `npm install` again
- Clear browser cache
- Check browser console for errors

## Need Help?

See the full README.md for detailed documentation.

