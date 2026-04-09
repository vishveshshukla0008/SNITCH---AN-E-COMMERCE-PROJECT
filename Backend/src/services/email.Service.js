import { createTransport } from "nodemailer";
import { config } from "../config/config.js"
import { AppError } from "../utils/AppError.js";

export const emailTransporter = createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: config.GOOGLE_USER,
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        refreshToken: config.GOOGLE_REFRESH_TOKEN
    }
});

emailTransporter.verify().then(() => { console.log("Email Transporter is ready!") }).catch((err) => {
    console.log("Error in Email Transporter", err)
})

export async function sendEmail({ to, subject, html, text }) {
    try {
        if (!to) throw new AppError(400, "Provider senders email !");

        const mailOptions = {
            from: "SNITCH - YOUR CHOICE",
            text,
            html,
            subject,
            to
        }


        const details = await emailTransporter.sendMail(mailOptions);
        console.log("Email sent successfully", details);
    } catch (error) {
        console.log("Error in sending email", error);
    }
}