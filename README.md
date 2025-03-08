# WhatsApp Appointment Booking Bot

This is a WhatsApp chatbot that allows users to book appointments via Twilio's WhatsApp Sandbox. It uses **NeDB** for lightweight database storage and **Twilio's Messaging API** to handle user interactions.

## Features

- 📅 **Book Appointments** via WhatsApp.
- 🔄 **Session-based conversation flow** using an in-memory session store.
- 💾 **Persistent storage** with NeDB for storing appointments.
- ✅ **Error handling** and message logging.

## Tech Stack

- **Node.js** (TypeScript)
- **Express.js** (for handling webhooks)
- **Twilio API** (WhatsApp messaging)
- **NeDB** (lightweight database)
- **Date-fns** (for date parsing and formatting)

## Setup Instructions

### 1️⃣ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Twilio Account](https://www.twilio.com/)
- [Ngrok](https://ngrok.com/) (for local testing)

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/wnxhaja/appointment-chatbot.git
cd appointment-chatbot
```

### 3️⃣ Install Dependencies

```sh
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add your Twilio credentials:

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
PORT=3000
```

### 5️⃣ Start the Server

```sh
npm run dev
```

### 6️⃣ Expose Localhost for Webhooks (Using Ngrok)

```sh
ngrok http 3000
```

Copy the **ngrok HTTPS URL** and update your Twilio webhook in the Twilio Console.

### 7️⃣ Connect Your WhatsApp to the Twilio Sandbox

1. Go to [Twilio Console](https://www.twilio.com/console/sms/whatsapp/sandbox)
2. Copy the "Join Code" (e.g., `join bright-cloud`)
3. Send this code to the Twilio WhatsApp number
4. You should receive a confirmation message

## API Endpoints

| Endpoint   | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| `/webhook` | `POST` | Receives WhatsApp messages from Twilio |

## Usage

- **Start Booking:** Send `Book` to the WhatsApp bot.
- **Follow the steps:** Provide your name, date, and confirm.
- **Cancel:** Send `No` when confirming an appointment.
- **List Appointments:** Send `List` to see all scheduled appointments.

## Troubleshooting

**Common Errors & Fixes:**

- ❌ **Twilio Error 12300 (Invalid TwiML Response):** Ensure your webhook returns a valid TwiML response.
- 📶 **No messages received in WhatsApp:** Make sure the sandbox is joined and the webhook URL is correct.
- 🔄 **Bot not responding properly:** Restart the server and clear the session store.

## License

This project is licensed under the MIT License.

---

🚀 Happy coding! Need help? Feel free to ask!
