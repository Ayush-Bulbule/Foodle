const forgotPassword = (name: string, otp: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP for Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f1f1f1;
        margin: 0;
      }
      
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .email-heading {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 16px;
      }
      
      .email-body {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 24px;
      }
      
      .email-otp {
        font-size: 18px;
        font-weight: bold;
        color: #007BFF;
      }
      
      .email-disclaimer {
        font-size: 14px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-heading">Hi ${name},</div>
      <div class="email-body">
        <p>You have requested to reset your password.</p>
        <p>Your OTP to reset your password: <span class="email-otp">${otp}</span></p>
      </div>
      <div class="email-footer">
        <p>Regards,</p>
        <p>Team Grub</p>
      </div>
      <div class="email-disclaimer">
        <p>If you didn't request to reset your password, please ignore this email.</p>
      </div>
    </div>
  </body>
  </html>
  `
}

export default forgotPassword;