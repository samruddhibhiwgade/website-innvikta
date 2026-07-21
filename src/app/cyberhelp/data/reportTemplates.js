import { Building2, ClipboardList, Smartphone } from 'lucide-react'

export const templates = [
    {
        id: 'bank_dispute',
        title: 'Bank Fraud Dispute Letter',
        icon: Building2,
        category: 'Financial',
        description: 'Formal complaint to your bank\'s nodal officer for unauthorized transactions.',
        fields: ['bankName', 'accountNumber', 'transactionDate', 'amount', 'utrId', 'description'],
        generate: (data) => `To,
The Nodal Officer / Grievance Redressal Cell
${data.bankName || '[Bank Name]'}

Subject: Complaint Regarding Unauthorized/Fraudulent Transaction - Immediate Action Requested

Respected Sir/Madam,

I, the undersigned account holder, hereby report an unauthorized/fraudulent transaction on my account and request immediate investigation and reversal of funds.

Account Details:
- Account Number: ${data.accountNumber || '[Your Account Number]'}
- Transaction Date: ${data.transactionDate || '[DD/MM/YYYY]'}
- Fraudulent Amount: ₹${data.amount || '[Amount]'}
- UTR / Transaction ID: ${data.utrId || '[12-digit UTR Number]'}

Incident Description:
${data.description || '[Describe how the fraud occurred - include timeline of events, any communication with the fraudster, and when you discovered the unauthorized activity]'}

I have already:
1. Called the 1930 National Cyber Financial Fraud Helpline
2. Filed a complaint on cybercrime.gov.in (Complaint No: __________)
3. Filed an FIR at my local police station (FIR No: __________)

Under RBI's Circular on "Limiting Liability of Customers in Unauthorised Electronic Banking Transactions" (RBI/2017-18/15), I request:
1. Immediate credit of the disputed amount as a shadow reversal
2. Freezing of the beneficiary account to prevent further laundering
3. A written acknowledgment of this complaint within 3 working days

I reserve the right to escalate this matter to the Banking Ombudsman and the Reserve Bank of India if the issue is not resolved within the stipulated timeframe.

Yours faithfully,
${data.userName || '[Your Full Name]'}
${data.userPhone || '[Your Phone Number]'}
${data.userEmail || '[Your Email]'}
Date: ${new Date().toLocaleDateString('en-IN')}`,
    },
    {
        id: 'fir_complaint',
        title: 'Cybercrime FIR Application',
        icon: ClipboardList,
        category: 'Legal',
        description: 'Application to the SHO for registering an FIR for cybercrime.',
        fields: ['policeStation', 'crimeType', 'dateOfIncident', 'amount', 'description'],
        generate: (data) => `To,
The Station House Officer (SHO)
${data.policeStation || '[Police Station Name]'}
Cyber Crime Cell

Subject: Application for Registration of FIR - Cybercrime Under IT Act, 2000

Respected Sir/Madam,

I hereby submit this application for the registration of an FIR regarding a cybercrime committed against me. The details are as follows:

Nature of Crime: ${data.crimeType || data.fraudType || '[e.g., UPI Fraud / Online Harassment / Identity Theft]'}
Date of Incident: ${data.dateOfIncident || '[DD/MM/YYYY]'}
${data.amount ? `Financial Loss: ₹${data.amount}` : ''}

Incident Details:
${data.description || '[Provide a detailed account of the incident including: the fraudster\'s communication method, any phone numbers or URLs used, the sequence of events, and evidence available]'}

Evidence Enclosed:
1. Screenshots of fraudulent communication (with timestamps)
2. Bank statement showing unauthorized debit
3. UTR / Transaction reference numbers
4. Call records / WhatsApp chat exports
5. Copy of Aadhaar / PAN for identity verification

This offense falls under:
- Section 66/66C/66D of the Information Technology Act, 2000
- Relevant sections of the Bharatiya Nyaya Sanhita

I have also filed a complaint on cybercrime.gov.in (Reference No: __________).

I request your good office to register an FIR at the earliest and investigate this matter with urgency, as delayed action reduces the chance of fund recovery.

Yours faithfully,
${data.userName || '[Your Full Name]'}
${data.userAddress || '[Your Address]'}
${data.userPhone || '[Your Phone Number]'}
Date: ${new Date().toLocaleDateString('en-IN')}`,
    },
    {
        id: 'social_media',
        title: 'Social Media Takedown Request',
        icon: Smartphone,
        category: 'Personal Safety',
        description: 'Formal request to a platform\'s grievance officer for content removal.',
        fields: ['platform', 'grievanceOfficer', 'contentUrl', 'description'],
        generate: (data) => `To,
The Grievance Officer
${data.platform || '[Platform Name]'}
${data.grievanceOfficer || '[Grievance Officer Name]'}

Subject: Request for Immediate Content Removal Under IT (Intermediary Guidelines) Rules, 2021

Dear Grievance Officer,

I am writing to formally report content on your platform that violates my rights and Indian law, and to request its immediate removal under Rule 3(1)(d) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.

Content Details:
- URL(s): ${data.contentUrl || '[Direct link to the offending content]'}

Nature of Violation:
${data.description || '[Describe the content and how it violates your rights - e.g., non-consensual intimate images, defamation, impersonation, cyberstalking, hate speech]'}

Legal Basis:
- Information Technology Act, 2000: Section 67 (Publishing obscene material) / Section 66E (Privacy violation)
- IT Intermediary Guidelines Rules, 2021: Rule 3(2)(b) - Obligation to remove content within 24 hours for complaints related to NCII
- Bharatiya Nyaya Sanhita: Section 356 (Defamation)

Under Rule 3(2) of the IT Rules, you are required to:
1. Acknowledge this complaint within 24 hours
2. Resolve the complaint within 15 days
3. Communicate the action taken to me

Failure to act will compel me to escalate this matter to the Cyber Crime Cell and seek relief under Section 79(3)(b) of the IT Act, which removes intermediary immunity for non-compliance.

I have retained screenshots and metadata of the content as evidence.

Yours sincerely,
${data.userName || '[Your Full Name]'}
${data.userEmail || '[Your Email Address]'}
${data.userPhone || '[Your Phone Number]'}
Date: ${new Date().toLocaleDateString('en-IN')}`,
    },
]

export const fieldLabels = {
    bankName: 'Bank Name',
    accountNumber: 'Your Account Number',
    transactionDate: 'Transaction Date',
    amount: 'Fraudulent Amount (₹)',
    utrId: 'UTR / Transaction ID',
    description: 'Incident Description',
    policeStation: 'Police Station Name',
    crimeType: 'Type of Crime',
    dateOfIncident: 'Date of Incident',
    platform: 'Platform Name',
    grievanceOfficer: 'Grievance Officer Name',
    contentUrl: 'Content URL(s)',
}
