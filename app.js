const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require('cors'); // Import the cors module

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Email sending endpoint
app.post("/api/send-email", (req, res) => {
    console.log(req.body)
    const { user_name, user_email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: "pranjalshukla245@gmail.com",
            pass: "vrph ordc jxjn mifd"

        }
    });

    // Email content
    const mailOptions = {
        from: "pranjalshukla245@gmail.com",
        to: "pranjalshukla245@gmail.com",
        subject: "New Contact Form Submission",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; text-align: center;">New Contact Form Submission</h2>
            <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
                <p><strong>Name:</strong> ${user_name}</p>
                <p><strong>Email:</strong> ${user_email}</p>
                <p><strong>Message:</strong> ${message}</p>
            </div>
        </div>
    `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent:", info.response);
            res.status(200).send("Email sent successfully");
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
