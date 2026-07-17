# Innvikta "Start Free" Webhook (Push) Integration Document

This document outlines how the website automatically sends (POSTs) signup details to your platform's API endpoint whenever a user completes the **"Start Free"** form. You can use this payload to create the tenant in your database and trigger the password reset flow.

### 1. Webhook Specifications
*   **Request Method:** `POST`
*   **Target URL:** Configurable in the website server's `.env` file via `PLATFORM_SIGNUP_API_URL`.
*   **Authentication:** Requires verifying an API key in the headers.

### 2. Request Headers Sent by Website
Your platform API must expect and verify the following headers:
*   `Content-Type: application/json`
*   `x-api-key: <PLATFORM_API_KEY>` (Default: `inv_sf_prod_8g2A0jU5h`)

### 3. Request Body Payload (JSON Sent by Website)
The webhook sends the user details in this format:
```json
{
  "name": "Start Free User",
  "email": "test.user@innvikta.com",
  "phone": "+123456789",
  "company": "Innvikta Test Corp",
  "designation": "Manager",
  "team_size": "11-25"
}
```

---

### 4. Configuration Settings (On the Website Server)
If you need to update the platform destination URL or update the authorization key, modify these variables inside the website server's `.env` file located at `/home/platform/public_html/Innvikta-Website/.env`:

```env
# The URL on your platform where we send (POST) the signup data:
PLATFORM_SIGNUP_API_URL=https://insat.innvikta.com/api/signup

# The secret API key used to authorize requests:
PLATFORM_API_KEY=inv_sf_prod_8g2A0jU5h
```

---

### 5. Expected Response from your Platform
To ensure the website logs the integration successfully, your endpoint should return a JSON response.

#### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Tenant created successfully. Password reset link sent."
}
```

#### Error Response (e.g. 400 Bad Request or 500 Server Error)
```json
{
  "success": false,
  "error": "Descriptive reason for failure (e.g. User already exists)"
}
```

---

### 6. Example Server Endpoint Code (Node.js / Express)
If your developer is building the endpoint in Node.js/Express, here is a simple implementation skeleton:

```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/signup', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  const configuredKey = 'inv_sf_prod_8g2A0jU5h'; // Should be kept in platform's env configs

  if (!apiKey || apiKey !== configuredKey) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { name, email, phone, company, designation, team_size } = req.body;

  try {
    // 1. Save user details to platform database
    // 2. Trigger password reset email from platform
    
    return res.status(200).json({ 
      success: true, 
      message: 'Tenant created successfully. Password reset link sent.' 
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
```
