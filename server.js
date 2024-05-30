const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve your static HTML file (optional)
app.use(express.static('public'));

app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validation (basic example)
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Set up Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ahsanburki2126@gmail.com', // Your email address
            pass: '21261311819114'   // Your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'recipient-email@example.com', // Your recipient email address
        subject: `New contact from ${name}: ${subject}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
        }
        res.status(200).json({ success: 'Your message has been sent. Thank you!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
