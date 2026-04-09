export const sendVerificationTokenTemplate = (username, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify your Email - SNITCH</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f4f6f8;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .header {
          background-color: #000000;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 28px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 800;
        }
        .content {
          padding: 40px 30px;
          color: #333333;
          line-height: 1.6;
        }
        .content h2 {
          font-size: 22px;
          margin-top: 0;
          color: #000000;
          font-weight: 700;
        }
        .content p {
          margin: 15px 0;
          font-size: 16px;
        }
        .button-container {
          text-align: center;
          margin: 35px 0;
        }
        .verify-button {
          display: inline-block;
          padding: 15px 35px;
          background-color: #000000;
          color: #ffffff !important;
          text-decoration: none;
          font-weight: bold;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .verify-button:hover {
          background-color: #333333;
        }
        .fallback-link {
          margin-top: 25px;
          padding-top: 25px;
          border-top: 1px solid #eeeeee;
        }
        .footer {
          background-color: #f9fafb;
          padding: 20px 30px;
          text-align: center;
          font-size: 13px;
          color: #888888;
          border-top: 1px solid #eeeeee;
        }
        .footer p {
          margin: 5px 0;
        }
        .link-text {
          word-break: break-all;
          color: #666666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SNITCH</h1>
        </div>
        <div class="content">
          <h2>Hi ${username},</h2>
          <p>Welcome to SNITCH! We're thrilled to see you here.</p>
          <p>To ensure the security of your account and access all our features, please verify your email address by clicking the button below:</p>
          
          <div class="button-container">
            <a href="${verificationLink}" class="verify-button" target="_blank">Verify My Account</a>
          </div>
          
          <div class="fallback-link">
            <p style="font-size: 14px; color: #666;">If the button above doesn't work, you can copy and paste the following link into your browser:</p>
            <p class="link-text"><a href="${verificationLink}" style="color: #000; text-decoration: underline;">${verificationLink}</a></p>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #888;">If you didn't create an account with us, please safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} SNITCH. All rights reserved.</p>
          <p>This is an automated message, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
