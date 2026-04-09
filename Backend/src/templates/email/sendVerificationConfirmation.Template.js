export const sendVerificationConfirmationTemplate = (name = "User") => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verified</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background:#2C4A6B; padding:20px; text-align:center; color:#ffffff; font-size:20px; font-weight:bold;">
                Account Verified
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333333;">

                <h2 style="margin-top:0;">Hello ${name},</h2>

                <p style="font-size:15px; line-height:1.6;">
                  Your email address has been successfully verified.
                </p>

                <p style="font-size:15px; line-height:1.6;">
                  You can now access all features of your account without any restrictions.
                </p>

                <div style="margin:30px 0; text-align:center;">
                  <a href="#" 
                     style="background:#2C4A6B; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-size:14px;">
                    Go to Dashboard
                  </a>
                </div>

                <p style="font-size:14px; color:#666;">
                  If you did not perform this action, please contact our support team immediately.
                </p>

                <p style="font-size:14px; margin-top:30px;">
                  Team Snitch
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Snitch. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};