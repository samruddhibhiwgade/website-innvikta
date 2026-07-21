export const EMAILS = [
  {
    id: 1,
    senderInitials: "MS",
    senderName: "Microsoft Support",
    senderEmail: "security@micosoft-services.com",
    date: "10:24 AM",
    subject: "Action Required: Your password expires today",
    body: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; font-size: 16px;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" width="100" style="margin-bottom: 20px;" />
        <p>Dear User,</p>
        <p>Your Office 365 password is set to expire in less than 24 hours.</p>
        <p>To retain your current password and maintain uninterrupted access to your emails and files, you must verify your active session.</p>
        <div style="margin: 25px 0;">
          <a href="#" style="background-color: #0078D4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 16px;">Keep Current Password</a>
        </div>
        <p style="font-size: 14px; color: #666;">If you do not verify your account, your access will be suspended automatically.</p>
        <p style="font-size: 14px; color: #666;">Microsoft Corporation, One Microsoft Way, Redmond, WA 98052</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain is 'micosoft-services.com' (missing the 'r' in Microsoft). Legitimate Microsoft emails come from @microsoft.com. It also uses generic 'Dear User' greetings and creates false urgency."
  },
  {
    id: 2,
    senderInitials: "HR",
    senderName: "HR Department",
    senderEmail: "hr@innvikta.com",
    date: "9:15 AM",
    subject: "Updated Employee Handbook - Please Review",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Hi Team,</p>
        <p>Following our recent All-Hands meeting, we have finalized the updates to the Employee Handbook. The primary changes reflect our new flexible working hours and the updated expense reimbursement process.</p>
        <p>Please review the updated document on the company intranet by the end of the week.</p>
        <p><a href="https://intranet.innvikta.com/hr/handbook-2026" style="color: #0066cc;">View Updated Handbook (Intranet)</a></p>
        <p>If you have any questions, feel free to reach out to your HR business partner.</p>
        <p>Best regards,<br/>Sarah Jenkins<br/>HR Director</p>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: The email uses the official internal domain (@innvikta.com), addresses a known internal topic without threatening language, and links to the official intranet subdomain."
  },
  {
    id: 3,
    senderInitials: "PP",
    senderName: "PayPal Service",
    senderEmail: "service@paypaI-security.com",
    date: "Yesterday",
    subject: "Your account has been temporarily restricted",
    body: `
      <div style="font-family: Helvetica, Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Hello Customer,</p>
        <p>We noticed unusual login activity from a new device on your PayPal account. To protect your funds, we have temporarily restricted your account features.</p>
        <p>To restore full access, you must confirm your identity and billing information immediately.</p>
        <div style="margin: 25px 0;">
          <a href="#" style="background-color: #003087; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; font-weight: bold; font-size: 16px;">Secure My Account</a>
        </div>
        <p style="font-size: 12px; color: #888;">Copyright © 1999-2026 PayPal. All rights reserved.</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain is 'paypaI-security.com' (uses a capital 'i' instead of an 'l' in paypaI). Official emails come from @paypal.com. The generic 'Hello Customer' and immediate threat of restricted funds are classic phishing tactics."
  },
  {
    id: 4,
    senderInitials: "GH",
    senderName: "GitHub",
    senderEmail: "noreply@github.com",
    date: "Yesterday",
    subject: "[GitHub] A new public key was added to your account",
    body: `
      <div style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif; color: #24292e; font-size: 16px;">
        <p>Hey there,</p>
        <p>A new SSH key <strong>"dev-machine-rsa"</strong> was added to your GitHub account.</p>
        <p>If you recently added this key, you can safely ignore this email.</p>
        <p>If you did not add this key, your account may have been compromised. Please immediately review your SSH keys and security settings.</p>
        <p><a href="https://github.com/settings/keys" style="color: #0366d6;">Review SSH Keys</a></p>
        <p>Thanks,<br/>The GitHub Team</p>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: Sent from the official '@github.com' domain. It informs you of a security event without forcing you to click an urgent, obscured button. The link goes directly to github.com."
  },
  {
    id: 5,
    senderInitials: "DS",
    senderName: "DocuSign via IT",
    senderEmail: "docusign-alert@securesign-portal.com",
    date: "Oct 10",
    subject: "Please review and sign: Q4 Vendor Agreement",
    body: `
      <div style="background-color: #f4f4f4; padding: 25px; font-family: Helvetica, Arial, sans-serif; font-size: 16px;">
        <div style="background-color: white; padding: 25px; border-top: 5px solid #ffcc22;">
          <h2 style="margin-top: 0; font-size: 22px;">DocuSign</h2>
          <p><strong>IT Admin</strong> sent you a document to review and sign.</p>
          <p><strong>Message:</strong> Please sign the attached Q4 vendor confidentiality agreement before the end of the day. This is required for the upcoming audit.</p>
          <div style="margin: 30px 0;">
            <a href="#" style="background-color: #ffcc22; color: #333; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Review Document</a>
          </div>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The sender domain 'securesign-portal.com' is not owned by DocuSign (official is docusign.net/com). 'IT Admin' is highly vague, and demanding a signature 'before the end of the day' creates false pressure."
  },
  {
    id: 6,
    senderInitials: "SL",
    senderName: "Slack",
    senderEmail: "notifications@slack.com",
    date: "Oct 09",
    subject: "New mention from David in #marketing-team",
    body: `
      <div style="font-family: Lato, sans-serif; color: #1d1c1d; font-size: 16px;">
        <p>Hi there,</p>
        <p><strong>David</strong> mentioned you in <strong>#marketing-team</strong>:</p>
        <div style="border-left: 4px solid #e2e8f0; padding-left: 15px; margin: 15px 0; color: #4a4a4a; font-size: 16px;">
          "Hey @channel, could someone take a look at the latest copy for the Q4 campaign? @user I think you had some thoughts on this."
        </div>
        <div style="margin: 25px 0;">
          <a href="https://slack.com/app" style="background-color: #007a5a; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Reply in Slack</a>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: Sent from the official '@slack.com' domain. Provides context, doesn't ask for sensitive information, and links to the legitimate slack.com application."
  },
  {
    id: 7,
    senderInitials: "AP",
    senderName: "Apple",
    senderEmail: "receipts@appie-id.com",
    date: "Oct 08",
    subject: "Your receipt from Apple",
    body: `
      <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; color: #333; text-align: center; font-size: 16px;">
        <h2 style="font-size: 24px;">Apple</h2>
        <p style="font-size: 20px; color: #888;">Receipt</p>
        <div style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 20px 0; margin: 25px 0; text-align: left;">
          <p style="font-size: 18px;"><strong>App Store</strong></p>
          <p style="font-size: 16px;">Clash of Clans: 14000 Gems - $99.99</p>
        </div>
        <p>If you did not authorize this purchase, you can cancel it within 24 hours.</p>
        <div style="margin: 25px 0;">
          <a href="#" style="color: #0070c9; text-decoration: underline; font-size: 16px;">Cancel this transaction</a>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: Sender domain is 'appie-id.com' (spelled with an 'i' instead of 'l'). Official receipts come from '@email.apple.com'. This scam relies on the shock of a $99.99 charge to trick you into clicking the cancel link to steal your Apple ID."
  },
  {
    id: 8,
    senderInitials: "AW",
    senderName: "Amazon Web Services",
    senderEmail: "no-reply-aws@amazon.com",
    date: "Oct 07",
    subject: "AWS Invoice Available",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Greetings,</p>
        <p>Your Amazon Web Services (AWS) invoice for the previous month is now available.</p>
        <p>You can view your invoice, download a PDF copy, and check your billing details by logging into the AWS Billing Console.</p>
        <p><a href="https://console.aws.amazon.com/billing/home" style="color: #0066cc;">Go to Billing Console</a></p>
        <p>Thank you for using AWS.</p>
        <p>Sincerely,<br/>Amazon Web Services</p>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: Sent from the legitimate '@amazon.com' domain. It correctly directs you to 'console.aws.amazon.com' without forcing a direct payment link or creating a false emergency."
  },
  {
    id: 9,
    senderInitials: "GD",
    senderName: "Google Drive",
    senderEmail: "drive-shares@googIedrive-noreply.com",
    date: "Oct 06",
    subject: "Document shared with you: 'Q4 Salary Adjustments.xlsx'",
    body: `
      <div style="font-family: Roboto, Arial, sans-serif; color: #333; font-size: 16px;">
        <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 25px;">
          <p><strong>Finance Dept</strong> shared a document with you:</p>
          <div style="margin: 20px 0; padding: 20px; border-left: 5px solid #0f9d58; background-color: #f8f9fa;">
            <p style="margin: 0; font-size: 18px;"><strong>Q4 Salary Adjustments.xlsx</strong></p>
          </div>
          <div style="margin: 30px 0;">
            <a href="#" style="background-color: #1a73e8; color: white; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 16px;">Open in Sheets</a>
          </div>
        </div>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain 'googIedrive-noreply.com' uses a capital 'I' instead of an 'L'. Official Google Drive shares come from '@google.com'. The file name 'Q4 Salary Adjustments' is pure bait to exploit human curiosity."
  },
  {
    id: 10,
    senderInitials: "LI",
    senderName: "LinkedIn",
    senderEmail: "messages-noreply@linkedin.com",
    date: "Oct 05",
    subject: "You have a new message from a recruiter",
    body: `
      <div style="font-family: -apple-system, system-ui, sans-serif; color: #333; font-size: 16px;">
        <p>Hi,</p>
        <p>You have a new message waiting for you on LinkedIn.</p>
        <p><strong>Subject:</strong> Career Opportunity at TechGlobal</p>
        <div style="margin: 25px 0;">
          <a href="https://www.linkedin.com/messaging/" style="background-color: #0a66c2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 24px; font-weight: 600; font-size: 16px;">View Message</a>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: From the official '@linkedin.com' domain. It correctly links to 'linkedin.com/messaging' and does not ask for your password directly in the email."
  },
  {
    id: 11,
    senderInitials: "IT",
    senderName: "IT Helpdesk",
    senderEmail: "admin@innvikta-it-support.com",
    date: "Oct 04",
    subject: "URGENT: Mandatory VPN Software Update",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <h3 style="color: #d9534f; font-size: 20px;">CRITICAL SECURITY UPDATE</h3>
        <p>Dear Employee,</p>
        <p>Due to a newly discovered security vulnerability, all remote employees MUST download and install the new VPN client patch immediately.</p>
        <p>Failure to install this patch by 5:00 PM today will result in an automatic network lockout.</p>
        <p><a href="#" style="color: #0066cc; font-weight: bold; font-size: 18px;">Download VPN_Patch_v2.exe</a></p>
        <p>Regards,<br/>IT Services Team</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain 'innvikta-it-support.com' is external (not @innvikta.com). 'Dear Employee' is highly suspicious for an internal email. It relies on intense fear ('network lockout') and pushes a direct executable download."
  },
  {
    id: 12,
    senderInitials: "ZM",
    senderName: "Zoom",
    senderEmail: "no-reply@zoom.us",
    date: "Oct 03",
    subject: "Meeting Invitation: Weekly Sync",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Hi,</p>
        <p><strong>Michael</strong> is inviting you to a scheduled Zoom meeting.</p>
        <p><strong>Topic:</strong> Weekly Team Sync<br/><strong>Time:</strong> Oct 14, 10:00 AM Pacific Time (US and Canada)</p>
        <p>Join Zoom Meeting:<br/><a href="https://zoom.us/j/1234567890" style="color: #0E72ED;">https://zoom.us/j/1234567890</a></p>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: Sent from the official '@zoom.us' domain. The link points directly to the 'zoom.us' domain. It provides standard meeting information without any threatening language."
  },
  {
    id: 13,
    senderInitials: "CJ",
    senderName: "CEO Jenkins",
    senderEmail: "ceo.jenkins.innvikta@gmail.com",
    date: "Oct 02",
    subject: "Are you available? Urgent request.",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <p>Hi,</p>
        <p>I am stuck in a meeting right now and need a quick favor. Can you process a wire transfer to a new vendor today?</p>
        <p>I can't take calls right now, just reply to this email so I know you got it and I will send over the routing details.</p>
        <p>Thanks,<br/>CEO Jenkins</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: This is classic Business Email Compromise (BEC) / CEO Fraud. The email originates from a free '@gmail.com' address, not the corporate domain. It claims the sender is unavailable by phone (to prevent verification) and asks to bypass standard financial protocols."
  },
  {
    id: 14,
    senderInitials: "JR",
    senderName: "Jira",
    senderEmail: "jira@innvikta.atlassian.net",
    date: "Oct 01",
    subject: "[JIRA] (SEC-402) Update Firewall Rules",
    body: `
      <div style="font-family: -apple-system, sans-serif; color: #172b4d; font-size: 16px;">
        <p><strong>Alex</strong> updated an issue</p>
        <p><strong>Status:</strong> In Progress &rarr; Done</p>
        <p><strong>Comment:</strong> "I've applied the new rules to the staging environment. Tests are passing."</p>
        <div style="margin: 20px 0;">
          <a href="https://innvikta.atlassian.net/browse/SEC-402" style="background-color: #0052cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px; font-size: 16px;">View Issue</a>
        </div>
      </div>
    `,
    isPhishing: false,
    explanation: "Safe: From the verified '@innvikta.atlassian.net' domain. Contains standard Jira issue tracking context and links directly to the verified Atlassian environment."
  },
  {
    id: 15,
    senderInitials: "FX",
    senderName: "FedEx Tracking",
    senderEmail: "updates@fedex-delivery-notice.com",
    date: "Sep 30",
    subject: "Delivery Failure Notice - Action Required",
    body: `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
        <h2 style="color: #4D148C; font-size: 24px;">FedEx</h2>
        <p>Dear Customer,</p>
        <p>We attempted to deliver your package today at 11:30 AM, but no one was available to sign for it.</p>
        <p>Your package is currently held at our sorting facility. You must pay a small redelivery fee of $1.99 to schedule a new delivery date.</p>
        <div style="margin: 25px 0;">
          <a href="#" style="background-color: #FF6600; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Schedule Redelivery</a>
        </div>
        <p>If action is not taken within 48 hours, the package will be returned to the sender.</p>
      </div>
    `,
    isPhishing: true,
    explanation: "Phishing: The domain 'fedex-delivery-notice.com' is fake (official is fedex.com). It creates urgency (48 hours), uses a generic greeting, and demands an unexpected payment to resolve a fabricated delivery issue."
  }
];

export const faqData = [
  {
    question: "What is a phishing email?",
    answer: "A phishing email is a fraudulent message designed to trick recipients into revealing sensitive information, downloading malware, or performing unauthorized actions."
  },
  {
    question: "How does the Spot The Phish game work?",
    answer: "Players review realistic emails and determine whether each message is legitimate or a phishing attempt. Detailed explanations are provided after every decision."
  },
  {
    question: "Is the phishing game free?",
    answer: "Yes. Spot The Phish is completely free to play and designed to improve cybersecurity awareness."
  },
  {
    question: "What phishing techniques are covered?",
    answer: "The game includes examples of credential phishing, business email compromise, fake invoices, account verification scams, delivery scams, impersonation attacks, and social engineering tactics."
  },
  {
    question: "Can organizations use phishing simulations for employee training?",
    answer: "Yes. Phishing simulations are widely used to help employees recognize threats, reinforce security awareness, and reduce human cyber risk."
  },
  {
    question: "Why is phishing awareness important?",
    answer: "Human error remains one of the leading causes of cybersecurity incidents. Awareness training helps employees identify and report suspicious communications before damage occurs."
  },
  {
    question: "How can I improve my phishing detection skills?",
    answer: "Regular awareness training, phishing simulations, and practical exercises such as Spot The Phish help users develop stronger threat recognition skills."
  },
  {
    question: "Does Innvikta offer enterprise phishing simulation services?",
    answer: "Yes. Innvikta provides phishing simulation campaigns, awareness training, human risk intelligence, compliance-focused learning, and gamified cybersecurity education for organizations of all sizes."
  }
];
