import { generateVerificationToken } from "../utils/generateEmailVerificationToken.js";
import { config } from "../config/config.js";
import { sendEmail } from "./email.Service.js";
import { sendVerificationTokenTemplate } from "../templates/email/sendVerificationToken.Template.js";
import { sendVerificationConfirmationTemplate } from "../templates/email/sendVerificationConfirmation.Template.js";

export async function sendVerificationTokenEmail(user) {
    user.verifyToken = generateVerificationToken();
    user.verifyTokenExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const verificationLink = `${config.FRONTEND_URL}/api/auth/verify-email/${user.verifyToken}`;
    await sendEmail({
        to: user.email,
        subject: "VERIFY ACCOUNT  - SNITCH",
        html: sendVerificationTokenTemplate(user.fullname, verificationLink),
    })
}

export async function sendVerificationConfirmationEmail(user) {
    await sendEmail({
        to: user.email,
        subject: "ACCOUNT VERIFICATION SUCCESS - SNITCH",
        html: sendVerificationConfirmationTemplate(user.fullname),
    })
}