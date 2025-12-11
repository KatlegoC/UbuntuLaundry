# Vercel Deployment Guide for Ubuntu Laundry Lounge

## Prerequisites
- GitHub account with the repository pushed
- Vercel account (sign up at https://vercel.com)
- Custom domain (optional)

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com and sign in
   - Click "Add New Project"

2. **Import Your Repository**
   - Connect your GitHub account if not already connected
   - Select the repository: `KatlegoC/UbuntuLaundry`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Angular
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build` or `npm run vercel-build`
   - **Output Directory**: `dist/ubuntu-laundry-lounge`
   - **Install Command**: `npm install`

4. **Environment Variables** (if using Twilio)
   - Add these in the Environment Variables section:
     - `TWILIO_ACCOUNT_SID` (your Twilio Account SID)
     - `TWILIO_AUTH_TOKEN` (your Twilio Auth Token)
     - `TWILIO_WHATSAPP_FROM` (your Twilio WhatsApp number)
     - `TWILIO_WHATSAPP_TO` (recipient WhatsApp number)

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at: `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? ubuntu-laundry-lounge (or your choice)
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

## Step 2: Connect Custom Domain

### In Vercel Dashboard:

1. **Go to Your Project**
   - Click on your deployed project
   - Go to "Settings" → "Domains"

2. **Add Your Domain**
   - Enter your domain (e.g., `ubuntulaundrylounge.com` or `www.ubuntulaundrylounge.com`)
   - Click "Add"

3. **Configure DNS Records**
   Vercel will show you DNS records to add. You have two options:

   **Option A: Use Vercel Nameservers (Easiest)**
   - Go to your domain registrar (where you bought the domain)
   - Change nameservers to:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```
   - Wait for DNS propagation (can take up to 48 hours, usually faster)

   **Option B: Add DNS Records (More Control)**
   - Keep your current nameservers
   - Add these DNS records at your domain registrar:
   
   **For Root Domain (ubuntulaundrylounge.com):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel's IP)
   
   **For WWW Subdomain (www.ubuntulaundrylounge.com):**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com.`
   
   **Or use Vercel's provided values** (they'll show you the exact records)

4. **SSL Certificate**
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - Wait for DNS verification (usually 5-10 minutes)
   - Your site will be available at `https://yourdomain.com`

## Step 3: Update API Endpoint (Important!)

After deployment, update the API URL in your Angular app:

1. **Update `src/app/services/booking.service.ts`**:
   ```typescript
   // For production, use your Vercel URL or custom domain
   private apiUrl = 'https://your-domain.com/api/bookings';
   // Or use environment variables (recommended)
   ```

2. **Create environment files**:
   - `src/environments/environment.ts` (development)
   - `src/environments/environment.prod.ts` (production)

## Step 4: Environment Variables Setup

### For Development:
Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### For Production:
Create `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-domain.com/api' // or your Vercel URL
};
```

Then update `booking.service.ts` to use:
```typescript
import { environment } from '../environments/environment';
private apiUrl = `${environment.apiUrl}/bookings`;
```

## Important Notes:

1. **Database**: SQLite on Vercel serverless functions uses `/tmp` directory which is ephemeral. For production, consider:
   - Using a cloud database (PostgreSQL, MongoDB, etc.)
   - Or use Vercel's serverless functions with external database

2. **Backend API**: The backend is configured as serverless functions in `vercel.json`

3. **Assets**: Make sure all images in `src/assets/` are committed to git

4. **Build Output**: The build output goes to `dist/ubuntu-laundry-lounge`

## Troubleshooting:

- **Build fails**: Check build logs in Vercel dashboard
- **API not working**: Verify the API routes in `vercel.json`
- **Domain not connecting**: Check DNS records and wait for propagation
- **SSL issues**: Vercel handles SSL automatically, wait a few minutes

## Next Steps After Deployment:

1. Test all functionality (booking form, admin dashboard)
2. Set up environment variables in Vercel dashboard
3. Configure custom domain DNS
4. Test on mobile devices
5. Set up monitoring/analytics if needed

