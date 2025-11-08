export const loginOTP = (name: string, otp: string | number) => {
  return `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login OTP - Hirenixs</title>
	<style>
		body { margin: 0; padding: 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; background-color: #ffffff; color: #444a5b; }
		a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
		p { line-height: 1.5; }
		@media (max-width:520px) {
			.row-content { width: 100% !important; }
			.stack .column { width: 100%; display: block; }
		}
	</style>
</head>

<body style="background-color:#FFFFFF; margin:0; padding:0;">
	<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#FFFFFF;">
		<tr>
			<td align="center">
				<table width="500" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;">
					<tr>
						<td style="padding:20px;">

							<!-- Greeting -->
							<p>Hi ${name},</p>

							<!-- Intro -->
							<p>We received a request to log in to your <strong>Hirenixs</strong> account.</p>

							<!-- Purpose -->
							<p>To complete your login, please use the One-Time Password (OTP) below:</p>

							<!-- OTP Box -->
							<div style="text-align:center; margin:20px 0;">
								<span style="background-color:#7747ff; color:#fff; padding:10px 25px; border-radius:6px; font-size:18px; letter-spacing:2px; display:inline-block;">
									${otp}
								</span>
							</div>

							<!-- Info -->
							<p>This code is valid for the next <strong>5 minutes</strong>. Please enter it on the login page to verify your identity.</p>

							<!-- Security -->
							<p><strong>Security Tip:</strong> Do not share this code with anyone. Hirenixs will never ask for your OTP or password.</p>

							<!-- If not you -->
							<p>If you did not request this login, please ignore this email or reset your password for security reasons.</p>

							<!-- Footer -->
							<p>Best regards,<br><strong>The Hirenixs Team</strong></p>

						</td>
					</tr>
				</table>

				<!-- Footer credit -->
				<table width="500" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto; text-align:center; color:#999; font-size:13px;">
					<tr>
						<td style="padding:10px 0;">
							<p>© ${new Date().getFullYear()} Hirenixs. All rights reserved.</p>
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

