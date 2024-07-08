const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const serviceSid = 'YOUR_TWILIO_SERVICE_SID';  // Create a verification service in Twilio

const client = twilio(accountSid, authToken);

app.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;

    client.verify.services(serviceSid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' })
        .then(verification => {
            res.status(200).json({ success: true, message: 'OTP sent successfully' });
        })
        .catch(error => {
            res.status(500).json({ success: false, message: 'Failed to send OTP', error });
        });
});

app.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;

    client.verify.services(serviceSid)
        .verificationChecks
        .create({ to: phoneNumber, code: otp })
        .then(verification_check => {
            if (verification_check.status === 'approved') {
                res.status(200).json({ success: true, message: 'OTP verified successfully' });
            } else {
                res.status(400).json({ success: false, message: 'Invalid OTP' });
            }
        })
        .catch(error => {
            res.status(500).json({ success: false, message: 'Failed to verify OTP', error });
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
