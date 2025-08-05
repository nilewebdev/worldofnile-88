import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string
  token: string
  type: 'signup' | 'recovery' | 'invite' | 'email_change'
  site_url: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { to, token, type, site_url }: EmailRequest = await req.json()
    
    let subject = ''
    let actionUrl = ''
    let actionText = ''
    let greeting = ''
    
    switch (type) {
      case 'signup':
        subject = 'Welcome to WON Productions - Confirm Your Email'
        actionUrl = `${site_url}/auth/confirm?token=${token}&type=signup`
        actionText = 'Confirm Your Email'
        greeting = 'Welcome to WON Productions!'
        break
      case 'recovery':
        subject = 'Reset Your WON Productions Password'
        actionUrl = `${site_url}/auth/confirm?token=${token}&type=recovery`
        actionText = 'Reset Password'
        greeting = 'Password Reset Request'
        break
      case 'invite':
        subject = 'You\'re Invited to Join WON Productions'
        actionUrl = `${site_url}/auth/confirm?token=${token}&type=invite`
        actionText = 'Accept Invitation'
        greeting = 'You\'ve been invited!'
        break
      case 'email_change':
        subject = 'Confirm Your New Email Address'
        actionUrl = `${site_url}/auth/confirm?token=${token}&type=email_change`
        actionText = 'Confirm New Email'
        greeting = 'Email Change Confirmation'
        break
      default:
        throw new Error('Invalid email type')
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #374151;
              background-color: #f9fafb;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #6366f1, #8b5cf6);
              padding: 40px 30px;
              text-align: center;
            }
            .logo {
              color: #ffffff;
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 8px;
            }
            .tagline {
              color: #e0e7ff;
              font-size: 14px;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 16px;
            }
            .message {
              font-size: 16px;
              margin-bottom: 32px;
              color: #6b7280;
            }
            .action-button {
              display: inline-block;
              background: linear-gradient(135deg, #6366f1, #8b5cf6);
              color: #ffffff;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 8px;
              font-weight: 600;
              margin-bottom: 32px;
              transition: transform 0.2s;
            }
            .action-button:hover {
              transform: translateY(-1px);
            }
            .alternative-link {
              background-color: #f3f4f6;
              padding: 16px;
              border-radius: 6px;
              font-size: 14px;
              color: #6b7280;
              word-break: break-all;
            }
            .footer {
              background-color: #f9fafb;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            .footer-text {
              font-size: 14px;
              color: #9ca3af;
              margin-bottom: 8px;
            }
            .company-info {
              font-size: 12px;
              color: #d1d5db;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">WON Productions</div>
              <div class="tagline">Professional Video & Content Creation</div>
            </div>
            
            <div class="content">
              <h1 class="greeting">${greeting}</h1>
              
              <p class="message">
                ${type === 'signup' 
                  ? 'Thank you for joining WON Productions! We\'re excited to help you bring your creative vision to life. To get started, please confirm your email address by clicking the button below.'
                  : type === 'recovery'
                  ? 'We received a request to reset your password for your WON Productions account. If you didn\'t make this request, you can safely ignore this email.'
                  : type === 'invite'
                  ? 'You\'ve been invited to join WON Productions! Click the button below to accept your invitation and create your account.'
                  : 'We need to confirm your new email address. Please click the button below to verify this change to your account.'
                }
              </p>
              
              <a href="${actionUrl}" class="action-button">${actionText}</a>
              
              <p style="font-size: 14px; color: #6b7280; margin-bottom: 16px;">
                If the button doesn't work, you can copy and paste this link into your browser:
              </p>
              
              <div class="alternative-link">
                ${actionUrl}
              </div>
              
              <p style="font-size: 14px; color: #9ca3af; margin-top: 32px;">
                This link will expire in 24 hours for security purposes.
              </p>
            </div>
            
            <div class="footer">
              <p class="footer-text">
                Thank you for choosing WON Productions
              </p>
              <p class="company-info">
                WON Productions | Professional Video & Content Creation<br>
                This email was sent regarding your account security.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'WON Productions <noreply@wonproductions.com>',
        to: [to],
        subject: subject,
        html: emailHtml,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(`Failed to send email: ${error}`)
    }

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})