"use client";
import React, { useState, useEffect } from 'react'
import {
    ClipboardCheck, ChevronRight, ChevronLeft, CheckCircle2,
    Phone, Globe, Building2, Camera, FileText, Landmark, Scale,
    Wifi, Key, Smartphone, HardDrive, Ban, Mail, ArrowLeft,
    Send, Shield, Snowflake, BookOpen, ClipboardList, Clock,
    Check, AlertCircle, DollarSign, ShieldAlert, Lock, Baby,
    Monitor, CreditCard, TrendingUp, Theater, Search, Loader2,
    Copy, FileDown, Eye, ExternalLink
} from 'lucide-react'
import { templates } from '../data/reportTemplates'

// ── API base URL — points to PHP backend ─────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_PHP_BACKEND_URL ? `${process.env.NEXT_PUBLIC_PHP_BACKEND_URL}/api` : "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server/api";

// ── All 18 fraud types (populated from API, fallback to static JSON) ──────
import fraudDataStatic from '../data/fraudTypes.json'
import bankDataStatic from '../data/bankHelplines.json'

const staticFraudTypes = fraudDataStatic.fraud_types

// ── Local bank logo map (assets-bank-logo/logos/<code>/logo.png) ─────────────
const BANK_LOGO_BASE = '/images/cyberhelp/assets-bank-logo/logos'
const bankLogoMap = {
    'State Bank of India': `${BANK_LOGO_BASE}/sbin/logo.png`,
    'Punjab National Bank': `${BANK_LOGO_BASE}/punb/logo.png`,
    'Bank of Baroda': `${BANK_LOGO_BASE}/barb/logo.png`,
    'Canara Bank': `${BANK_LOGO_BASE}/cnrb/logo.png`,
    'Union Bank of India': `${BANK_LOGO_BASE}/ubin/logo.png`,
    'Bank of India': `${BANK_LOGO_BASE}/bkid/logo.png`,
    'Central Bank of India': `${BANK_LOGO_BASE}/cbin/logo.png`,
    'Indian Bank': `${BANK_LOGO_BASE}/idib/logo.png`,
    'UCO Bank': `${BANK_LOGO_BASE}/ucba/logo.png`,
    'HDFC Bank': `${BANK_LOGO_BASE}/hdfc/logo.png`,
    'ICICI Bank': `${BANK_LOGO_BASE}/icic/logo.png`,
    'Axis Bank': `${BANK_LOGO_BASE}/utib/logo.png`,
    'Kotak Mahindra Bank': `${BANK_LOGO_BASE}/kkbk/logo.png`,
    'IndusInd Bank': `${BANK_LOGO_BASE}/indb/logo.png`,
    'YES Bank': `${BANK_LOGO_BASE}/yesb/logo.png`,
    'IDFC First Bank': `${BANK_LOGO_BASE}/idfb/logo.png`,
    'RBL Bank': `${BANK_LOGO_BASE}/ratn/logo.png`,
    'Federal Bank': `${BANK_LOGO_BASE}/fdrl/logo.png`,
    'AU Small Finance Bank': `${BANK_LOGO_BASE}/aubl/logo.png`,
    'Ujjivan SFB': `${BANK_LOGO_BASE}/ujvn/logo.png`,
    'Paytm Payments Bank': `${BANK_LOGO_BASE}/pytm/logo.png`,
    'Airtel Payments Bank': `${BANK_LOGO_BASE}/airp/logo.png`,
    'Equitas SFB': `${BANK_LOGO_BASE}/eqitas/logo.svg`,
    'Unity SFB': `${BANK_LOGO_BASE}/unity/logo.jpeg`,
    'Fino Payments Bank': `${BANK_LOGO_BASE}/fino/logo.svg`,
    'India Post Payments Bank': `${BANK_LOGO_BASE}/ippb/logo.jpeg`,
}

// ── Map each fraud type to a TriageBot crime category ───────────────────────
const fraudToCategory = {
    'UPI Fraud': 'financial',
    'Debit / Credit Card / SIM Swap Fraud': 'financial',
    'Internet Banking Related Fraud': 'financial',
    'E-Wallet Related Fraud': 'financial',
    'Fraud Call / Vishing': 'financial',
    'Cyber Bullying / Stalking / Sexting': 'harassment',
    'Fake / Impersonating Profile': 'harassment',
    'Cheating by Impersonation': 'harassment',
    'Profile Hacking / Identity Theft': 'profile_theft',
    'Online Job Fraud': 'financial',
    'Demat / Depository Fraud / Other Cyber': 'investment',
    'Online Gambling': 'financial',
    'Provocative Speech for Unlawful Acts': 'harassment',
    'Cryptocurrency Fraud': 'investment',
    'Email Phishing': 'hacking',
    'Cyber Terrorism': 'hacking',
    'Online Matrimonial Fraud': 'harassment',
    'Other Cyber Crimes': 'harassment',
}

// ── Time options (for financial crimes) ─────────────────────────────────────
const timeOptions = [
    { id: 'under2h', label: 'Less than 2 hours ago', urgent: true },
    { id: '2to24h', label: '2–24 hours ago', urgent: true },
    { id: '1to7d', label: '1–7 days ago', urgent: false },
    { id: 'over7d', label: 'More than 7 days ago', urgent: false },
]

// ── TriageBot response engine ────────────────────────────────────────────────
function getResponse(crimeCategory, timeframe, bank) {
    const responses = {
        financial: {
            under2h: {
                priority: 'CRITICAL', color: '#DC2626',
                steps: [
                    { text: 'Call 1930 IMMEDIATELY', desc: 'The "Golden Hour" is active. Calling now gives the best chance to freeze funds in transit.', action: 'tel:1930' },
                    { text: bank ? `Contact ${bank.name} Fraud Line` : "Contact your bank's fraud helpline", desc: 'Ask them to freeze your account and the specific transaction ID (UTR) immediately.', action: bank?.fraud_helpline ? `tel:${bank.fraud_helpline}` : null },
                    { text: 'Gather Transaction Details', desc: 'Note down the Transaction ID (UTR), exact amount, date, and beneficiary bank name.', action: 'evidence' },
                    { text: 'File on Cybercrime Portal', desc: 'Official reporting on cybercrime.gov.in is required for legal investigation.', action: 'https://cybercrime.gov.in' },
                ],
                legal: 'Section 66D of IT Act (Cheating by personation) and Section 318 BNS (Cheating).',
            },
            '2to24h': {
                priority: 'HIGH', color: '#D97706',
                steps: [
                    { text: 'Call 1930 Helpline', desc: 'Recovery is still possible. Reporting within 24 hours is critical for inter-bank coordination.', action: 'tel:1930' },
                    { text: 'File on Cybercrime Portal', desc: 'Upload your bank statement and transaction screenshots to cybercrime.gov.in.', action: 'https://cybercrime.gov.in' },
                    { text: bank ? `Contact ${bank.name}: ${bank.fraud_helpline}` : "Contact your bank's fraud helpline", desc: 'Submit a formal dispute or "Token" for the fraudulent transaction.', action: bank?.fraud_helpline ? `tel:${bank.fraud_helpline}` : null },
                    { text: 'Save Evidence', desc: 'Use our Vault to store screenshots of UPI receipts, SMS alerts, and call logs.', action: 'evidence' },
                ],
                legal: 'Section 66D IT Act and Section 318/319 BNS. File within 3 days for best outcome.',
            },
            '1to7d': {
                priority: 'MODERATE', color: '#4682B4',
                steps: [
                    { text: 'File on Cybercrime Portal', desc: 'Official reporting is mandatory. Include all evidence and the specific UTR IDs.', action: 'https://cybercrime.gov.in' },
                    { text: bank ? `Contact ${bank.name} Support` : 'Contact bank fraud department', desc: 'Submit a written complaint and get a "Shadow Reversal" if applicable under RBI rules.', action: bank?.fraud_helpline ? `tel:${bank.fraud_helpline}` : null },
                    { text: 'Grievance Redressal', desc: 'If the bank doesn\'t respond in 3 days, escalate to the Bank\'s Nodal Officer.', action: null },
                    { text: 'Visit Police Station', desc: 'Visit your nearest Cyber Police Station with a printed copy of your online complaint.', action: null },
                    { text: 'Save Evidence', desc: 'Ensure all screenshots are preserved in our Evidence Vault for legal proof.', action: 'evidence' },
                ],
                legal: 'Section 43A IT Act allows civil compensation if bank failed to secure your data.',
            },
            over7d: {
                priority: 'STANDARD', color: '#7C3AED',
                steps: [
                    { text: 'File on Cybercrime Portal', desc: 'Reporting is still important to help block fraudulent accounts and prevent future victims.', action: 'https://cybercrime.gov.in' },
                    { text: 'Cyber Police Visit', desc: 'File a formal FIR at your local Cyber Crime Cell for a criminal investigation.', action: null },
                    { text: 'Identity Audit', desc: 'Check for any other suspicious logins or data breaches that may have occurred.', action: null },
                    { text: 'Legal Counsel', desc: 'Consider civil recovery options under Section 43A of the IT Act if negligence is found.', action: null },
                    { text: 'Vault Backup', desc: 'Maintain a copy of all incident records in the Evidence Vault.', action: 'evidence' },
                ],
                legal: 'No time limitation for filing FIR but delays reduce recovery chances. Section 43A for civil damages.',
            },
        },
        harassment: {
            default: {
                priority: 'HIGH', color: '#D97706',
                steps: [
                    { text: 'Preserve All Evidence', desc: 'Use the Evidence Vault to store screenshots of threats with timestamps.', action: 'evidence' },
                    { text: 'Report on Cybercrime Portal', desc: 'File under "Women/Child related" or "Other Cyber Crimes" on cybercrime.gov.in.', action: 'https://cybercrime.gov.in' },
                    { text: 'Privacy Lockdown', desc: 'Set your social media profiles to "Private" and block the harasser immediately.', action: null },
                    { text: 'Police FIR', desc: 'Visit your local police station to file an FIR for stalking or identity harassment.', action: null },
                    { text: 'Women Helpline: 181', desc: 'Call 181 for immediate legal and emotional support.', action: 'tel:181' },
                ],
                legal: 'Section 354D IPC (Stalking), Section 67 IT Act (Obscene Content), and Section 66E (Privacy Violation).',
            },
        },
        profile_theft: {
            default: {
                priority: 'HIGH', color: '#D97706',
                steps: [
                    { text: 'Report to Social Media Platform', desc: 'Use the official "Hacked Account" tool for Instagram, Facebook, or WhatsApp to regain access and lock the hacker out.', action: null },
                    { text: 'Alert Your Contacts', desc: 'Post on other platforms or ask friends to notify everyone that your account is hacked to prevent them from being scammed.', action: null },
                    { text: 'Secure Associated Email', desc: 'Change your email password and check for unauthorized "Forwarding Rules" that hackers use to steal your OTPs.', action: null },
                    { text: 'Lock Aadhaar Biometrics', desc: 'Visit myaadhaar.uidai.gov.in to lock your biometrics. This prevents the hacker from misusing your identity for financial fraud.', action: 'https://myaadhaar.uidai.gov.in' },
                    { text: 'Check SIM Registration', desc: 'Visit sancharsaathi.gov.in (TAFCOP) to ensure no unknown mobile numbers have been registered in your name.', action: 'https://sancharsaathi.gov.in' },
                    { text: 'File on Cybercrime Portal', desc: 'Reporting on cybercrime.gov.in creates a timestamped official record that protects you from liability for the hacker\'s actions.', action: 'https://cybercrime.gov.in' },
                ],
                legal: 'Section 66C IT Act (Identity Theft) and Section 66 (Hacking). You are NOT liable for crimes committed from your hacked account once reported.',
            },
        },
        identity: {
            default: {
                priority: 'HIGH', color: '#D97706',
                steps: [
                    { text: 'Secure Your Accounts', desc: 'Change passwords and enable 2FA on email/social media if you suspect a hack.', action: null },
                    { text: 'Check SIM Registration', desc: 'Visit sancharsaathi.gov.in to see if any unknown SIMs are registered in your name.', action: 'https://sancharsaathi.gov.in' },
                    { text: 'Lock Aadhaar Biometrics', desc: 'Lock your biometrics via UIDAI to prevent unauthorized bank/KYC misuse of your identity.', action: 'https://myaadhaar.uidai.gov.in' },
                    { text: 'File Official Complaint', desc: 'Report on cybercrime.gov.in to ensure you are not held liable for misuse of your ID.', action: 'https://cybercrime.gov.in' },
                    { text: 'Check CIBIL Report', desc: 'Ensure no fraudulent loans or credit cards have been taken out using your ID.', action: null },
                ],
                legal: 'Section 66C IT Act (Identity Theft), Section 66D (Cheating by Personation).',
            },
        },
        investment: {
            default: {
                priority: 'MODERATE', color: '#4682B4',
                steps: [
                    { text: 'Report to SEBI SCORES', desc: 'Official portal for filing complaints against investment entities: scores.sebi.gov.in.', action: 'https://scores.sebi.gov.in' },
                    { text: 'RBI Sachet Portal', desc: 'Report illegal deposit schemes to sachet.rbi.org.in.', action: 'https://sachet.rbi.org.in' },
                    { text: 'SEBI Helpline', desc: 'Call 1800 266 7575 for immediate guidance on investment fraud.', action: 'tel:18002667575' },
                    { text: 'File Criminal Complaint', desc: 'File on cybercrime.gov.in for investigation into the criminal aspects of the fraud.', action: 'https://cybercrime.gov.in' },
                ],
                legal: 'SEBI Act, Section 420 IPC (Fraud). Collective complaints strengthen the case for investigation.',
            },
        },
        hacking: {
            default: {
                priority: 'HIGH', color: '#D97706',
                steps: [
                    { text: 'Immediate Disconnect', desc: 'Disconnect the affected phone or computer from the internet (WiFi/Data) immediately.', action: null },
                    { text: 'Global Password Reset', desc: 'Change passwords for all critical accounts (Email, Bank, Social Media) from a safe device.', action: null },
                    { text: 'Report to CERT-In', desc: 'Official incident reporting to Indian Computer Emergency Response Team: incident@cert-in.org.in.', action: 'mailto:incident@cert-in.org.in' },
                    { text: 'Forensic Preservation', desc: 'Do NOT factory reset yet. Forensic evidence on the device is critical for investigation.', action: null },
                ],
                legal: 'Section 66 IT Act (Hacking), Section 43 IT Act (Damage to Computer Systems). Penalties up to 1 crore.',
            },
        },
    }
    const crimeData = responses[crimeCategory]
    if (!crimeData) return null
    if (crimeData[timeframe]) return crimeData[timeframe]
    if (crimeData.default) return crimeData.default
    return crimeData.over7d || null
}

// ── Icon helper for action steps ─────────────────────────────────────────────
function getStepIcon(text) {
    const t = text.toLowerCase()
    if (t.includes('call') || t.includes('1930') || t.includes('helpline') || t.includes('1098')) return Phone
    if (t.includes('cybercrime.gov') || t.includes('file') || t.includes('report on') || t.includes('scores') || t.includes('sachet')) return Globe
    if (t.includes('bank') || t.includes('contact')) return Building2
    if (t.includes('screenshot') || t.includes('evidence') || t.includes('collect')) return Camera
    if (t.includes('note') || t.includes('prepare') || t.includes('gather')) return FileText
    if (t.includes('police') || t.includes('visit')) return Landmark
    if (t.includes('legal') || t.includes('counsel')) return Scale
    if (t.includes('deactivat') || t.includes('private') || t.includes('lock') || t.includes('aadhaar')) return Lock
    if (t.includes('disconnect')) return Wifi
    if (t.includes('password') || t.includes('change')) return Key
    if (t.includes('sim') || t.includes('sanchar') || t.includes('tafcop')) return Smartphone
    if (t.includes('wipe') || t.includes('forensic')) return HardDrive
    if (t.includes('do not') || t.includes('hang up')) return Ban
    if (t.includes('email') || t.includes('cert-in') || t.includes('incident@')) return Mail
    return FileText
}

// ── Existing services shown on confirmation ──────────────────────────────────
const existingServices = [
    { id: 'filing-guide', label: 'NCRP Filing Guide', desc: 'Step-by-step portal walkthrough', icon: BookOpen, color: '#F97316' },
    { id: 'templates', label: 'Report Templates', desc: 'Pre-built formal complaint letters', icon: ClipboardList, color: '#0D9488' },
    { id: 'freeze', label: 'Freeze Accounts', desc: 'Emergency account freeze dashboard', icon: Snowflake, color: '#0EA5E9' },
    { id: 'contacts', label: 'National Contacts', desc: 'Helplines & emergency numbers', icon: Phone, color: '#10B981' },
]

// ── Helper: Validate Email or Phone ─────────────────────────────────────────
const validateContact = (contact) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/
    return emailRegex.test(contact) || phoneRegex.test(contact)
}

// ════════════════════════════════════════════════════════════════════════════
export default function CyberIncidentGuide() {
    // Phase controls the current screen
    const [phase, setPhase] = useState('type')       // type | timeframe | bank | questions | details | done
    const [selectedFraud, setSelectedFraud] = useState(null)
    const [timeframe, setTimeframe] = useState(null)
    const [selectedBank, setSelectedBank] = useState(null)
    const [answers, setAnswers] = useState({})
    const [details, setDetails] = useState('')
    const [userName, setUserName] = useState('')
    const [userContact, setUserContact] = useState('')
    const [privacyAccepted, setPrivacyAccepted] = useState(false)
    const [platformUsed, setPlatformUsed] = useState('')
    const [triageResult, setTriageResult] = useState(null)
    const [userClicks, setUserClicks] = useState([]) // Stores { label, time }
    const [complaintId, setComplaintId] = useState(null) // ID from server after submission

    // API-loaded data
    const [fraudTypes, setFraudTypes] = useState(staticFraudTypes)
    const [allBanks, setAllBanks] = useState([
        ...(bankDataStatic.public_sector || []),
        ...(bankDataStatic.private_sector || []),
        ...(bankDataStatic.specialized_banks || []),
    ])
    const [loadingData, setLoadingData] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')

    // Fetch fraud types + banks from PHP API on mount
    useEffect(() => {
        Promise.all([
            fetch(`${API_BASE}/fraud_types.php`).then(r => r.json()).catch(() => null),
            fetch(`${API_BASE}/banks.php`).then(r => r.json()).catch(() => null),
        ]).then(([ftRes, bankRes]) => {
            if (ftRes?.success && ftRes.fraud_types?.length) {
                setFraudTypes(ftRes.fraud_types)
            }
            if (bankRes?.success && bankRes.banks) {
                const b = bankRes.banks
                setAllBanks([
                    ...(b.public_sector || []),
                    ...(b.private_sector || []),
                    ...(b.specialized_banks || []),
                ])
            }
        }).finally(() => setLoadingData(false))
    }, [])

    const isFinancial = selectedFraud ? fraudToCategory[selectedFraud.fraud_type] === 'financial' : false

    // Progress steps change based on financial vs other
    const progressSteps = isFinancial
        ? ['Fraud Type', 'When?', 'Bank', 'Questions', 'Details', 'Done']
        : ['Fraud Type', 'Questions', 'Details', 'Done']

    const phaseToIndex = isFinancial
        ? { type: 0, timeframe: 1, bank: 2, questions: 3, details: 4, done: 5 }
        : { type: 0, questions: 1, details: 2, done: 3 }

    const currentStep = phaseToIndex[phase] ?? 0

    // ── Handlers ─────────────────────────────────────────────────────────────
    const trackInteraction = async (label) => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        const clickData = { label, time }
        
        // 1. Update local state
        setUserClicks(prev => [...prev, clickData])
        
        // 2. If already submitted, sync this specific click to the DB immediately
        if (complaintId) {
            try {
                await fetch(`${API_BASE}/update_complaint_clicks.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ complaint_id: complaintId, click: clickData })
                })
            } catch (err) {
                console.warn('Failed to sync click:', err)
            }
        }
    }

    const selectFraud = (ft) => {
        trackInteraction(`Selected Fraud: ${ft.fraud_type}`)
        setSelectedFraud(ft)
        setAnswers({})
        setDetails('')
        setTimeframe(null)
        setSelectedBank(null)
        setTriageResult(null)
        const category = fraudToCategory[ft.fraud_type]
        if (category === 'financial') {
            setPhase('timeframe')
        } else {
            // Resolve triage result immediately for non-financial
            const result = getResponse(category, 'default', null)
            setTriageResult(result)
            setPhase('questions')
        }
    }

    const selectTime = (t) => {
        const timeLabel = timeOptions.find(opt => opt.id === t)?.label || t
        trackInteraction(`Selected Timeframe: ${timeLabel}`)
        setTimeframe(t)
        setPhase('bank')
    }

    const selectBank = (bank) => {
        trackInteraction(`Selected Bank: ${bank.name}`)
        setSelectedBank(bank)
        const result = getResponse('financial', timeframe, bank)
        setTriageResult(result)
        setPhase('questions')
    }

    const skipBank = () => {
        trackInteraction(`Skipped Bank Selection`)
        const result = getResponse('financial', timeframe, null)
        setTriageResult(result)
        setPhase('questions')
    }

    const toggleAnswer = (idx) => {
        setAnswers(prev => ({ ...prev, [idx]: !prev[idx] }))
    }

    const handleSubmit = async () => {
        trackInteraction('Submitted Triage Form')
        setSubmitting(true)
        setSubmitError('')

        // Build answers array — only the checked questions
        const checkedAnswers = Object.entries(answers)
            .filter(([, checked]) => checked)
            .map(([idx]) => selectedFraud.additional_questions[parseInt(idx)])
            .filter(Boolean)

        const payload = {
            fraud_type: selectedFraud?.fraud_type ?? '',
            triage_category: fraudToCategory[selectedFraud?.fraud_type] ?? '',
            timeframe: timeframe ?? '',
            bank_name: selectedBank?.name ?? '',
            answers: checkedAnswers,
            details,
            platform_used: platformUsed,
            user_name: userName,
            user_contact: userContact,
            priority: triageResult?.priority ?? '',
            clicks: userClicks,
        }

        try {
            const res = await fetch(`${API_BASE}/submit_complaint.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const rawText = await res.text()
            let data
            try {
                data = JSON.parse(rawText)
            } catch (_) {
                // PHP returned non-JSON — show the actual output for debugging
                setSubmitError('Server error: ' + rawText.replace(/<[^>]*>/g, '').trim().slice(0, 400))
                return
            }
            if (data.success) {
                setComplaintId(data.complaint_id)
                setPhase('done')
            } else {
                setSubmitError(data.error || 'Submission failed. Please try again.')
            }
        } catch (err) {
            setSubmitError('Fetch failed: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    const reset = () => {
        setComplaintId(null)
        setPhase('type')
        setSelectedFraud(null)
        setTimeframe(null)
        setSelectedBank(null)
        setAnswers({})
        setDetails('')
        setUserName('')
        setUserContact('')
        setPrivacyAccepted(false)
        setPlatformUsed('')
        setTriageResult(null)
    }



    // ════════════════════════════════════════════════════════════════════════
    if (loadingData) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <Loader2 size={32} color="#4682B4" style={{ animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>Loading complaint system...</p>
            </div>
        )
    }

    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ClipboardList size={22} color="#4682B4" /> Cyber Incident Guide
            </h2>
            <p className="section-subtitle">
                A step-by-step assistant to help you respond to cyber fraud and recover your losses.
            </p>

            {/* ── Progress bar ──────────────────────────────────────────────── */}
            <div style={s.progress}>
                {progressSteps.map((label, i) => {
                    const active = i <= currentStep
                    const done = i < currentStep
                    return (
                        <div key={i} style={{ ...s.progressStep, opacity: active ? 1 : 0.3 }}>
                            <div style={{ ...s.progressDot, background: done ? '#16A34A' : active ? '#4682B4' : 'var(--color-bg-secondary)', borderColor: done ? '#16A34A' : active ? '#4682B4' : 'var(--color-border)', color: active ? '#fff' : 'var(--color-text-muted)' }}>
                                {done ? <Check size={13} /> : i + 1}
                            </div>
                            <span style={s.progressLabel}>{label}</span>
                        </div>
                    )
                })}
            </div>

            <div style={s.card} className="card animate-fade-in" key={phase}>

                {/* ─── PHASE: type ───────────────────────────────────────── */}
                {phase === 'type' && (
                    <div>
                        <h3 style={s.heading}>Step 1: What type of fraud occurred?</h3>
                        <p style={s.sub}>Choose the category that best describes what happened to get tailored guidance.</p>
                        <div style={s.typeGrid}>
                            {fraudTypes.map(ft => (
                                <button key={ft.id} onClick={() => selectFraud(ft)} className="card" style={s.typeCard}>
                                    <span style={s.typeLabel}>{ft.fraud_type}</span>
                                    <ChevronRight size={15} color="#4682B4" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─── PHASE: timeframe ──────────────────────────────────── */}
                {phase === 'timeframe' && (
                    <div>
                        <div style={s.badge}><AlertCircle size={13} color="#F97316" /><span style={{ color: '#F97316', fontWeight: 700, fontSize: '0.78rem' }}>{selectedFraud?.fraud_type}</span></div>
                        <h3 style={s.heading}>Step 2: When did this happen?</h3>
                        <p style={s.sub}>Timing is critical. This determines if the <strong>Golden Hour</strong> recovery protocol is still active.</p>
                        <div style={s.timeGrid}>
                            {timeOptions.map(t => (
                                <button key={t.id} onClick={() => selectTime(t.id)} className="card" style={{ ...s.timeCard, ...(t.urgent ? { borderColor: 'rgba(220,38,38,0.35)' } : {}) }}>
                                    {/* URGENT badge removed */}
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.label}</span>
                                </button>
                            ))}
                        </div>
                        <div style={s.navRow}>
                            <button onClick={() => setPhase('type')} className="btn btn-outline" style={s.navBtn}><ChevronLeft size={14} /> Back</button>
                        </div>
                    </div>
                )}

                {/* ─── PHASE: bank ───────────────────────────────────────── */}
                {phase === 'bank' && (
                    <div>
                        <div style={s.badge}><AlertCircle size={13} color="#F97316" /><span style={{ color: '#F97316', fontWeight: 700, fontSize: '0.78rem' }}>{selectedFraud?.fraud_type}</span></div>
                        <h3 style={s.heading}>Step 3: Which bank was involved?</h3>
                        <p style={s.sub}>We need this to provide you with the correct bank-specific emergency contacts.</p>
                        <div style={s.bankGrid}>
                            {allBanks.map(b => {
                                const logoSrc = bankLogoMap[b.name] || null
                                return (
                                    <button key={b.name} onClick={() => selectBank(b)} className="card" style={s.bankCard}>
                                        <div style={{ width: '32px', height: '32px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                            {logoSrc ? (
                                                <img
                                                    src={logoSrc}
                                                    alt={b.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                                />
                                            ) : null}
                                            <span style={{ ...s.bankDot, background: b.color || '#4682B4', display: logoSrc ? 'none' : 'block' }} />
                                        </div>
                                        <span style={{ fontWeight: 600, fontSize: '0.82rem', flex: 1, textAlign: 'left' }}>{b.name}</span>
                                    </button>
                                )
                            })}
                        </div>
                        <div style={s.navRow}>
                            <button onClick={() => { trackInteraction('Clicked Back (Bank)'); setPhase('timeframe'); }} className="btn btn-outline" style={s.navBtn}><ChevronLeft size={14} /> Back</button>
                            <button onClick={skipBank} className="btn btn-primary" style={s.navBtn}>My bank is not listed / Skip</button>
                        </div>
                    </div>
                )}

                {/* ─── PHASE: questions ──────────────────────────────────── */}
                {phase === 'questions' && selectedFraud && (
                    <div>
                        <div style={s.badge}><AlertCircle size={13} color="#F97316" /><span style={{ color: '#F97316', fontWeight: 700, fontSize: '0.78rem' }}>{selectedFraud.fraud_type}</span></div>
                        <h3 style={s.heading}>Step 4: Additional Information</h3>
                        <p style={s.sub}>Please check all the conditions that apply to your incident.</p>
                        <div style={s.questionList}>
                            {selectedFraud.additional_questions.map((q, idx) => (
                                <label key={idx} style={s.questionRow}>
                                    <input type="checkbox" checked={!!answers[idx]} onChange={() => toggleAnswer(idx)} style={s.checkbox} />
                                    <span style={s.questionText}>{q}</span>
                                </label>
                            ))}
                        </div>
                        <div style={s.navRow}>
                            <button onClick={() => { trackInteraction('Clicked Back (Questions)'); setPhase(isFinancial ? 'bank' : 'type'); }} className="btn btn-outline" style={s.navBtn}><ChevronLeft size={14} /> Back</button>
                            <button onClick={() => { trackInteraction('Clicked Next (to Details)'); setPhase('details'); }} className="btn btn-primary" style={s.navBtn}>Next <ChevronRight size={14} /></button>
                        </div>
                    </div>
                )}

                {/* ─── PHASE: details ────────────────────────────────────── */}
                {phase === 'details' && selectedFraud && (
                    <div>
                        <div style={s.badge}><FileText size={13} color="#F97316" /><span style={{ color: '#F97316', fontWeight: 700, fontSize: '0.78rem' }}>{selectedFraud.fraud_type}</span></div>
                        <h3 style={s.heading}>Step 5: Incident Details</h3>
                        <p style={s.sub}>Provide incident details for our research and tailored guidance.</p>

                        {/* Name + Contact */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    placeholder="e.g. Rajesh Kumar"
                                    style={{ ...s.textarea, padding: '0.6rem 0.85rem', resize: 'none', height: 'auto', borderRadius: '8px' }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Phone / Email</label>
                                <input
                                    type="text"
                                    value={userContact}
                                    onChange={e => setUserContact(e.target.value)}
                                    placeholder="e.g. 9876543210 or abc@email.com"
                                    style={{ ...s.textarea, padding: '0.6rem 0.85rem', resize: 'none', height: 'auto', borderRadius: '8px' }}
                                />
                            </div>
                        </div>

                        <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Platform Used</label>
                        <select
                            value={platformUsed}
                            onChange={e => setPlatformUsed(e.target.value)}
                            style={{ ...s.textarea, padding: '0.6rem 0.85rem', resize: 'none', height: 'auto', borderRadius: '8px', appearance: 'auto', cursor: 'pointer', marginBottom: '1.1rem' }}
                        >
                            <option value="">-- Select Platform --</option>
                            <option value="Website">Website</option>
                            <option value="Call">Call</option>
                            <option value="SMS">SMS</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Email">Email</option>
                            <option value="Social Media">Social Media</option>
                            <option value="UPI App">UPI App</option>
                            <option value="Other">Other</option>
                        </select>

                        <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Describe what happened</label>
                        <textarea
                            value={details}
                            onChange={e => setDetails(e.target.value)}
                            placeholder="Dates, amounts, transaction IDs, and any other relevant details…"
                            rows={6}
                            style={s.textarea}
                        />
                        <p style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', margin: '0.35rem 0 1.25rem' }}>
                            {details.length} characters — more detail helps faster investigation.
                        </p>

                        {/* Privacy Notice */}
                        <div style={{ background: 'var(--color-bg-secondary, #f8fafc)', border: '1px solid var(--color-border, #e2e8f0)', borderRadius: '10px', padding: '1rem 1.1rem', marginBottom: '1rem' }}>
                            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                Privacy Notice – CyberHelp Form
                            </p>
                            <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', margin: '0 0 0.6rem', lineHeight: 1.6 }}>
                                This form collects limited, non-sensitive information to understand cyber fraud trends and provide immediate safety guidance. We may collect: fraud type, how it occurred, whether financial loss occurred, and optionally your general location.
                            </p>
                            <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', margin: '0 0 0.6rem', lineHeight: 1.6 }}>
                                <strong style={{ color: '#DC2626' }}>We do not collect</strong> bank account numbers, card details, passwords, OTPs, or Aadhaar numbers. Do not submit any confidential credentials.
                            </p>
                            <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
                                Data may be used in anonymized, aggregated form to improve cybersecurity awareness. Submitting this form does <strong>not</strong> constitute an official complaint. For financial fraud, immediately call <strong>1930</strong> or visit{' '}
                                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#4682B4' }}>cybercrime.gov.in</a>.
                            </p>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={privacyAccepted}
                                    onChange={e => setPrivacyAccepted(e.target.checked)}
                                    style={{ marginTop: '2px', accentColor: '#16A34A', width: '15px', height: '15px', flexShrink: 0 }}
                                />
                                <span style={{ fontSize: '0.77rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
                                    I have read and understood the Privacy Notice. I confirm that I will not submit any sensitive financial credentials.
                                </span>
                            </label>
                        </div>
                        <div style={s.navRow}>
                            <button onClick={() => setPhase('questions')} className="btn btn-outline" style={s.navBtn}><ChevronLeft size={14} /> Back</button>
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || !privacyAccepted || (userContact.trim() !== '' && !validateContact(userContact))}
                                className="btn btn-primary"
                                style={{ ...s.navBtn, background: '#16A34A', borderColor: '#16A34A', opacity: (submitting || !privacyAccepted || (userContact.trim() !== '' && !validateContact(userContact))) ? 0.6 : 1 }}
                            >
                                {submitting
                                    ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Submitting...</>
                                    : <><Send size={13} /> Submit & Get Response Guide</>}
                            </button>
                        </div>
                        {submitError && <p style={{ color: '#DC2626', fontSize: '0.82rem', marginTop: '0.75rem', textAlign: 'right' }}>{submitError}</p>}
                    </div>
                )}

                {/* ─── PHASE: done ───────────────────────────────────────── */}
                {phase === 'done' && triageResult && (
                    <div>
                        {/* Success header */}
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={s.successIcon}><CheckCircle2 size={48} color="#16A34A" /></div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.5rem 0 0' }}>Your Response Guide is Ready</h3>
                        </div>

                        {/* Thank you + summary pill */}
                        <div style={s.thankYouBox}>
                            <p style={{ fontWeight: 600, color: '#16A34A', margin: 0 }}>Action needed: Please follow the guide below to secure your assets.</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.4rem 0 0' }}>
                                Based on your incident, we have prepared a personalized action plan and a pre-filled legal template for reporting.
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', margin: '0.9rem 0' }}>
                            <span style={s.pill}>{selectedFraud?.fraud_type}</span>
                            {timeframe && <span style={{ ...s.pill, background: `${triageResult.color}18`, border: `1px solid ${triageResult.color}40`, color: triageResult.color }}>{triageResult.priority} PRIORITY</span>}
                            {selectedBank && <span style={s.pill}>{selectedBank.name}</span>}
                        </div>

                        {/* ── Personalised Action Plan (TriageBot) ───── */}
                        <p style={s.sectionLabel}>1. Immediate Action Plan</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.25rem' }}>
                            {triageResult.steps.map((step, i) => {
                                const Icon = getStepIcon(step.text)
                                return (
                                    <div key={i} style={s.actionRow}>
                                        <div style={{ ...s.actionNum, background: `${triageResult.color}18`, border: `1px solid ${triageResult.color}30` }}>
                                            <Icon size={15} color={triageResult.color} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>{step.text}</p>
                                            {step.desc && <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', margin: '2px 0 0', lineHeight: 1.4 }}>{step.desc}</p>}
                                        </div>
                                        {step.action && (
                                            step.action === 'evidence' ? (
                                                <button 
                                                    onClick={() => {
                                                        trackInteraction(`Clicked Vault Button (${step.text})`)
                                                        window.open(`${window.location.origin}${window.location.pathname}?section=evidence`, '_blank')
                                                    }}
                                                    className="btn btn-primary"
                                                    style={{ fontSize: '0.72rem', padding: '0.35rem 0.85rem', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#F97316' }}
                                                >
                                                    <Camera size={11} /> Vault
                                                </button>
                                            ) : (
                                                <a href={step.action} 
                                                    onClick={() => trackInteraction(`Clicked Action: ${step.text}`)}
                                                    target={step.action.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                                                    className="btn btn-primary"
                                                    style={{ fontSize: '0.72rem', padding: '0.35rem 0.85rem', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    {step.action.startsWith('tel') ? <><Phone size={11} /> Call</> : step.action.startsWith('mailto') ? <><Mail size={11} /> Email</> : <><Globe size={11} /> Open</>}
                                                </a>
                                            )
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* ── Legal Framework ─────────────────────────── */}
                        <div style={s.legalBox}>
                            <span style={{ fontWeight: 700, color: '#D97706', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Scale size={13} /> Legal Framework:</span>
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}> {triageResult.legal}</span>
                        </div>

                        {/* ── Prefilled Template ─────────────────────── */}
                        <p style={{ ...s.sectionLabel, marginTop: '2rem' }}>2. Your Prefilled Reporting Template</p>
                        {(() => {
                            const triageCategory = fraudToCategory[selectedFraud?.fraud_type]
                            let templateId = 'fir_complaint'
                            if (triageCategory === 'financial') templateId = 'bank_dispute'
                            else if ((triageCategory === 'harassment' || triageCategory === 'profile_theft') && (platformUsed.includes('Media') || platformUsed.includes('WhatsApp') || platformUsed.includes('Email'))) templateId = 'social_media'

                            const template = templates.find(t => t.id === templateId)
                            if (!template) return null

                            // Map available data to template fields
                            const templateData = {
                                bankName: selectedBank?.name,
                                transactionDate: timeframe === 'under2h' ? 'Today' : timeframe,
                                amount: details.match(/(\d+)/)?.[0] || '',
                                description: details,
                                userName: userName,
                                userPhone: userContact.match(/^\d+$/) ? userContact : '',
                                userEmail: userContact.includes('@') ? userContact : '',
                                fraudType: selectedFraud?.fraud_type,
                                platform: platformUsed,
                            }

                            const generatedText = template.generate(templateData)

                            const copyTpl = () => {
                                trackInteraction(`Copied Template: ${template.title}`)
                                navigator.clipboard.writeText(generatedText)
                                alert('Template copied!')
                            }

                            const downloadTpl = () => {
                                trackInteraction(`Downloaded Template: ${template.title}`)
                                const blob = new Blob([generatedText], { type: 'text/plain' })
                                const url = URL.createObjectURL(blob)
                                const a = document.createElement('a')
                                a.href = url
                                a.download = `CyberHelp_Report_${templateId}.txt`
                                a.click()
                            }

                            return (
                                <div className="card" style={{ padding: '1rem', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ background: '#4682B420', padding: '6px', borderRadius: '6px' }}><FileText size={16} color="#4682B4" /></div>
                                            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{template.title}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button onClick={copyTpl} className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: '0.7rem' }}><Copy size={12} /> Copy</button>
                                            <button onClick={downloadTpl} className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: '0.7rem' }}><FileDown size={12} /> Download</button>
                                        </div>
                                    </div>
                                    <pre style={{
                                        fontSize: '0.75rem',
                                        background: '#fff',
                                        padding: '1rem',
                                        borderRadius: '6px',
                                        border: '1px solid var(--color-border)',
                                        whiteSpace: 'pre-wrap',
                                        fontFamily: 'monospace',
                                        maxHeight: '250px',
                                        overflowY: 'auto',
                                        color: '#334155'
                                    }}>{generatedText}</pre>
                                </div>
                            )
                        })()}

                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1.25rem',
                            background: 'rgba(249, 115, 22, 0.05)',
                            borderRadius: '12px',
                            border: '1px dashed rgba(249, 115, 22, 0.3)',
                            textAlign: 'center'
                        }}>
                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
                                If your issue is not resolved by the bank or local authorities, you can escalate it to the official Nodal Officers.
                            </p>
                            <a href="https://i4c.mha.gov.in/nodal-officer.aspx"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#F97316',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0.5rem 1rem',
                                    background: 'white',
                                    borderRadius: '6px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}>
                                Find Your Nodal Officer Here <ExternalLink size={16} />
                            </a>
                        </div>

                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <button onClick={reset} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <ArrowLeft size={13} /> Back to Start
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
    progress: { display: 'flex', justifyContent: 'space-between', marginBottom: '1.75rem' },
    progressStep: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flex: 1, transition: 'opacity 300ms' },
    progressDot: { width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '2px solid', fontSize: '0.75rem', fontWeight: 700, transition: 'all 300ms' },
    progressLabel: { fontSize: '0.62rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' },
    card: { padding: '2rem', maxWidth: '860px' },
    heading: { fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.3rem', color: 'var(--color-text-primary)' },
    sub: { fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 },
    badge: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '100px', padding: '3px 10px', marginBottom: '0.7rem' },
    typeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.55rem' },
    typeCard: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', padding: '0.8rem 1rem', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-primary)', border: '1px solid var(--color-border)', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-sm)', transition: 'all 160ms' },
    typeLabel: { fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-text-primary)' },
    timeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.7rem', marginBottom: '1rem' },
    timeCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', textAlign: 'center', fontFamily: 'var(--font-primary)', padding: '1.1rem 1rem', border: '1px solid var(--color-border)', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-sm)' },
    bankGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.65rem', maxHeight: '340px', overflowY: 'auto', paddingRight: '4px' },
    bankCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer', textAlign: 'center', fontFamily: 'var(--font-primary)', padding: '1rem 0.75rem', border: '1px solid var(--color-border)', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-sm)' },
    bankDot: { width: '22px', height: '22px', borderRadius: '5px', flexShrink: 0 },
    questionList: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' },
    questionRow: { display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '0.7rem 1rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', cursor: 'pointer' },
    checkbox: { width: '15px', height: '15px', marginTop: '2px', accentColor: '#16A34A', flexShrink: 0, cursor: 'pointer' },
    questionText: { fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 },
    textarea: { width: '100%', padding: '0.85rem 1rem', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-primary)', fontSize: '0.87rem', fontFamily: 'var(--font-primary)', lineHeight: 1.6, resize: 'vertical', outline: 'none', boxSizing: 'border-box' },
    navRow: { display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' },
    navBtn: { fontSize: '0.82rem', padding: '0.5rem 1.2rem', display: 'inline-flex', alignItems: 'center', gap: '5px' },
    backBtn: { marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem' },
    successIcon: { width: '84px', height: '84px', borderRadius: '50%', background: 'rgba(22,163,74,0.1)', border: '2px solid rgba(22,163,74,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' },
    thankYouBox: { background: 'rgba(22,163,74,0.07)', border: '1px solid rgba(22,163,74,0.25)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem', marginBottom: '0.75rem' },
    pill: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '100px', padding: '3px 12px', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-primary)' },
    sectionLabel: { fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', margin: '0 0 0.65rem' },
    actionRow: { display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.8rem 1rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' },
    actionNum: { width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    legalBox: { padding: '0.85rem 1rem', background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.18)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', lineHeight: 1.6 },
    svcCard: { display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.8rem 1rem', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-primary)', border: '1px solid var(--color-border)', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-sm)', transition: 'all 150ms' },
    svcIcon: { width: '38px', height: '38px', borderRadius: '9px', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
}
