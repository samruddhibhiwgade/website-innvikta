"use client";
import React, { useState } from 'react'
import { Search, DollarSign, ShieldAlert, Lock, Baby, Monitor, CreditCard, TrendingUp, Theater, Phone, Globe, Building2, Camera, FileText, Landmark, Scale, Wifi, Key, Smartphone, HardDrive, Ban, Mail, ArrowLeft, Check, Clock } from 'lucide-react'
import bankData from '../data/bankHelplines.json'

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

const crimeTypes = [
    { id: 'financial', icon: DollarSign, label: 'Financial / UPI Fraud', description: 'Money lost via UPI, bank transfer, debit card, or loan app' },
    { id: 'harassment', icon: ShieldAlert, label: 'Cyberstalking / Harassment', description: 'Persistent online harassment, threats, or defamation' },
    { id: 'sextortion', icon: Lock, label: 'Sextortion / NCII', description: 'Intimate image threats, revenge porn, or blackmail' },
    { id: 'child', icon: Baby, label: 'Child Exploitation', description: 'Grooming, CSAM, or any crime targeting minors' },
    { id: 'hacking', icon: Monitor, label: 'Hacking / Ransomware', description: 'Unauthorized access, data theft, or ransomware attack' },
    { id: 'identity', icon: CreditCard, label: 'Identity Theft / KYC', description: 'Aadhaar misuse, SIM cloning, or fake KYC' },
    { id: 'investment', icon: TrendingUp, label: 'Investment / Ponzi Scam', description: 'Fake stock tips, Ponzi schemes, or crypto fraud' },
    { id: 'digital_arrest', icon: Theater, label: 'Digital Arrest Scam', description: 'Video call impersonation by fake police or CBI' },
]

const timeOptions = [
    { id: 'under2h', label: 'Less than 2 hours ago', urgent: true },
    { id: '2to24h', label: '2 - 24 hours ago', urgent: true },
    { id: '1to7d', label: '1 - 7 days ago', urgent: false },
    { id: 'over7d', label: 'More than 7 days ago', urgent: false },
]

const stepIcons = {
    'call': Phone,
    'web': Globe,
    'bank': Building2,
    'evidence': Camera,
    'file': FileText,
    'station': Landmark,
    'legal': Scale,
    'lock': Lock,
    'wifi': Wifi,
    'key': Key,
    'phone': Smartphone,
    'drive': HardDrive,
    'stop': Ban,
    'mail': Mail,
}

function getIconForStep(text) {
    const lower = text.toLowerCase()
    if (lower.includes('call') || lower.includes('1930') || lower.includes('helpline') || lower.includes('1098')) return Phone
    if (lower.includes('cybercrime.gov') || lower.includes('file') || lower.includes('report on')) return Globe
    if (lower.includes('bank') || lower.includes('contact') && lower.includes('bank')) return Building2
    if (lower.includes('screenshot') || lower.includes('evidence') || lower.includes('collect')) return Camera
    if (lower.includes('note') || lower.includes('prepare') || lower.includes('gather') || lower.includes('check credit')) return FileText
    if (lower.includes('police') || lower.includes('cyber ps') || lower.includes('visit')) return Landmark
    if (lower.includes('legal') || lower.includes('counsel') || lower.includes('consider')) return Scale
    if (lower.includes('deactivat') || lower.includes('private') || lower.includes('lock') || lower.includes('aadhaar')) return Lock
    if (lower.includes('disconnect')) return Wifi
    if (lower.includes('password') || lower.includes('change')) return Key
    if (lower.includes('sim') || lower.includes('sanchar') || lower.includes('tafcop')) return Smartphone
    if (lower.includes('wipe') || lower.includes('forensic')) return HardDrive
    if (lower.includes('do not') || lower.includes('hang up') || lower.includes('stop')) return Ban
    if (lower.includes('email') || lower.includes('cert-in') || lower.includes('incident@')) return Mail
    if (lower.includes('scores') || lower.includes('sachet') || lower.includes('sebi')) return Globe
    return FileText
}

function getResponse(crimeType, timeframe, bank) {
    const responses = {
        financial: {
            under2h: {
                priority: 'CRITICAL',
                color: '#DC2626',
                steps: [
                    { text: 'Call 1930 IMMEDIATELY - Golden Hour is active', action: 'tel:1930' },
                    { text: bank ? `Contact ${bank.name} Fraud Line: ${bank.fraud_helpline}` : 'Contact your bank\'s fraud helpline to freeze the account', action: bank?.fraud_helpline ? `tel:${bank.fraud_helpline}` : null },
                    { text: 'Note your Transaction ID (UTR), amount, and time', action: null },
                    { text: 'File FIR on cybercrime.gov.in within 24 hours', action: 'https://cybercrime.gov.in' },
                ],
                legal: 'Section 66D of IT Act (Cheating by personation using computer) and Section 318 BNS (Cheating)',
            },
            '2to24h': {
                priority: 'HIGH',
                color: '#D97706',
                steps: [
                    { text: 'Call 1930 - fund recovery still possible', action: 'tel:1930' },
                    { text: 'File complaint on cybercrime.gov.in with UTR details', action: 'https://cybercrime.gov.in' },
                    { text: bank ? `Contact ${bank.name}: ${bank.fraud_helpline}` : 'Contact your bank\'s fraud helpline immediately', action: bank?.fraud_helpline ? `tel:${bank.fraud_helpline}` : null },
                    { text: 'Screenshot all messages, UPI receipts, and call logs', action: null },
                ],
                legal: 'Section 66D IT Act and Section 318/319 BNS. File within 3 days for best outcome.',
            },
            '1to7d': {
                priority: 'MODERATE',
                color: '#4682B4',
                steps: [
                    { text: 'File detailed complaint on cybercrime.gov.in', action: 'https://cybercrime.gov.in' },
                    { text: bank ? `Contact ${bank.name} Support: ${bank.fraud_helpline}` : 'Contact bank fraud department with formal complaint letter', action: bank?.fraud_helpline ? `tel:${bank.fraud_helpline}` : null },
                    { text: 'Collect all evidence: UTR, screenshots, call recordings', action: null },
                    { text: 'Visit nearest cyber police station for FIR', action: null },
                ],
                legal: 'Preserve all digital evidence. Section 43A IT Act allows civil compensation if bank failed to secure your data.',
            },
            over7d: {
                priority: 'STANDARD',
                color: '#7C3AED',
                steps: [
                    { text: 'File on cybercrime.gov.in - include all evidence', action: 'https://cybercrime.gov.in' },
                    { text: 'Visit Pune City Cyber PS (020-29710097) or your local station', action: 'tel:020-29710097' },
                    { text: 'Prepare: Transaction ID, bank statements, screenshots, ID proof', action: null },
                    { text: 'Consider legal counsel for civil recovery under Section 43A IT Act', action: null },
                ],
                legal: 'No time limitation for filing FIR but delays reduce recovery chances. Section 43A for civil damages.',
            },
        },
        harassment: {
            default: {
                priority: 'HIGH',
                color: '#D97706',
                steps: [
                    { text: 'Screenshot all threats with timestamps (do NOT delete)', action: null },
                    { text: 'Report on cybercrime.gov.in under "Other Cyber Crimes"', action: 'https://cybercrime.gov.in' },
                    { text: 'Set all social media profiles to Private immediately', action: null },
                    { text: 'File FIR at nearest police station - IT Act Section 66A/67', action: null },
                    { text: 'National Women Helpline: 181', action: 'tel:181' },
                ],
                legal: 'Section 354D IPC (Stalking), Section 67 IT Act (Publishing Obscene Content), and Section 66E (Privacy Violation)',
            },
        },
        sextortion: {
            default: {
                priority: 'CRITICAL',
                color: '#DC2626',
                steps: [
                    { text: 'DO NOT PAY - Payment always leads to more demands', action: null },
                    { text: 'Screenshot all threats (chats, emails, payment demands)', action: null },
                    { text: 'Report on cybercrime.gov.in - "Women/Child Related" track', action: 'https://cybercrime.gov.in' },
                    { text: 'Deactivate (not delete) social media profiles', action: null },
                    { text: 'Call Cyber Wellness Helpline: 7353107353 (Responsible Netism)', action: 'tel:7353107353' },
                    { text: 'National Women Helpline: 181', action: 'tel:181' },
                ],
                legal: 'Section 67/67A IT Act (Obscene Content), Section 384 IPC (Extortion). Your safety is the priority - you are the victim.',
            },
        },
        child: {
            default: {
                priority: 'CRITICAL',
                color: '#DC2626',
                steps: [
                    { text: 'Report IMMEDIATELY on cybercrime.gov.in - "Women/Child" track', action: 'https://cybercrime.gov.in' },
                    { text: 'Call Childline: 1098', action: 'tel:1098' },
                    { text: 'Preserve evidence but do NOT share CSAM further', action: null },
                    { text: 'File FIR - POCSO Act ensures special fast-track courts', action: null },
                    { text: 'Seek counseling: Dr. Harish Shetty via Responsible Netism', action: 'tel:7353107353' },
                ],
                legal: 'Section 67B IT Act + POCSO Act. These offenses are non-bailable. Anonymous reporting is supported.',
            },
        },
        hacking: {
            default: {
                priority: 'HIGH',
                color: '#D97706',
                steps: [
                    { text: 'Disconnect affected device from internet immediately', action: null },
                    { text: 'Change passwords on ALL accounts from a safe device', action: null },
                    { text: 'Report on cybercrime.gov.in', action: 'https://cybercrime.gov.in' },
                    { text: 'Report to CERT-In: incident@cert-in.org.in', action: 'mailto:incident@cert-in.org.in' },
                    { text: 'Do NOT wipe affected systems - forensic evidence is critical', action: null },
                ],
                legal: 'Section 66 IT Act (Computer Hacking), Section 43 IT Act (Damage to Computer Systems). Penalties up to 1 crore.',
            },
        },
        identity: {
            default: {
                priority: 'HIGH',
                color: '#D97706',
                steps: [
                    { text: 'Check SIM registration: sancharsaathi.gov.in (TAFCOP)', action: 'https://sancharsaathi.gov.in' },
                    { text: 'Lock your Aadhaar biometrics at myaadhaar.uidai.gov.in', action: 'https://myaadhaar.uidai.gov.in' },
                    { text: 'File on cybercrime.gov.in', action: 'https://cybercrime.gov.in' },
                    { text: 'Alert your bank about potential unauthorized access', action: null },
                    { text: 'Check credit report on CIBIL for unauthorized loans', action: null },
                ],
                legal: 'Section 66C IT Act (Identity Theft), Section 66D (Cheating by Personation).',
            },
        },
        investment: {
            default: {
                priority: 'MODERATE',
                color: '#4682B4',
                steps: [
                    { text: 'File on SEBI SCORES portal: scores.sebi.gov.in', action: 'https://scores.sebi.gov.in' },
                    { text: 'Report on RBI Sachet: sachet.rbi.org.in', action: 'https://sachet.rbi.org.in' },
                    { text: 'SEBI Helpline: 1800 266 7575', action: 'tel:18002667575' },
                    { text: 'Also file on cybercrime.gov.in for criminal investigation', action: 'https://cybercrime.gov.in' },
                    { text: 'Gather: Investment receipts, communication records, bank statements', action: null },
                ],
                legal: 'SEBI Act, Section 420 IPC (Fraud). Collective complaints strengthen the case for SEBI investigation.',
            },
        },
        digital_arrest: {
            default: {
                priority: 'CRITICAL',
                color: '#DC2626',
                steps: [
                    { text: 'HANG UP - No real police/CBI ever calls via video for arrests', action: null },
                    { text: 'DO NOT transfer any money - "Digital arrest" is 100% a scam', action: null },
                    { text: 'Call 1930 if money was transferred', action: 'tel:1930' },
                    { text: 'Report on cybercrime.gov.in', action: 'https://cybercrime.gov.in' },
                    { text: 'Screenshot the video call details, phone number, and conversation', action: null },
                ],
                legal: 'Section 66D IT Act (Impersonation), Section 170 IPC (Impersonating Public Servant). "Digital Arrest" is not a real legal process.',
            },
        },
    }

    const crimeData = responses[crimeType]
    if (!crimeData) return null

    if (crimeData[timeframe]) return crimeData[timeframe]
    if (crimeData.default) return crimeData.default
    return crimeData.over7d || null
}

export default function TriageBot() {
    const [step, setStep] = useState(0)
    const [crimeType, setCrimeType] = useState(null)
    const [timeframe, setTimeframe] = useState(null)
    const [selectedBank, setSelectedBank] = useState(null)
    const [result, setResult] = useState(null)

    const selectCrime = (id) => {
        setCrimeType(id)
        if (id === 'financial') {
            setStep(1)
        } else {
            const response = getResponse(id, 'default', null)
            setResult(response)
            setStep(3)
        }
    }

    const selectTime = (id) => {
        setTimeframe(id)
        setStep(2)
    }

    const selectBank = (bank) => {
        setSelectedBank(bank)
        const response = getResponse(crimeType, timeframe, bank)
        setResult(response)
        setStep(3)
    }

    const skipBank = () => {
        const response = getResponse(crimeType, timeframe, null)
        setResult(response)
        setStep(3)
    }

    const reset = () => {
        setStep(0)
        setCrimeType(null)
        setTimeframe(null)
        setSelectedBank(null)
        setResult(null)
    }

    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Search size={22} color="#4682B4" /> AI Incident Triage
            </h2>
            <p className="section-subtitle">
                Answer a few simple questions and we&apos;ll create a personalized response plan
                with the exact contacts and steps you need.
            </p>

            <div style={styles.wizard}>
                {/* Progress bar */}
                <div style={styles.progress}>
                    {['Crime Type', 'When', 'Bank', 'Your Plan'].map((label, i) => (
                        <div key={i} style={{ ...styles.progressStep, ...(i <= step ? styles.progressActive : {}) }}>
                            <div style={{ ...styles.progressDot, ...(i <= step ? styles.progressDotActive : {}) }}>
                                {i < step ? <Check size={14} /> : i + 1}
                            </div>
                            <span style={styles.progressLabel}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Step 0: Crime Type */}
                {step === 0 && (
                    <div className="animate-fade-in">
                        <h3 style={styles.stepTitle}>What happened?</h3>
                        <div style={styles.optionsGrid}>
                            {crimeTypes.map(c => {
                                const Icon = c.icon
                                return (
                                    <button key={c.id} onClick={() => selectCrime(c.id)} style={styles.optionCard} className="card">
                                        <Icon size={24} color="#4682B4" />
                                        <span style={styles.optionLabel}>{c.label}</span>
                                        <span style={styles.optionDesc}>{c.description}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Step 1: Time (Financial only) */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h3 style={styles.stepTitle}>When did this happen?</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                            This determines whether the &quot;Golden Hour&quot; fund recovery protocol applies.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            {timeOptions.map(t => (
                                <button key={t.id} onClick={() => selectTime(t.id)} style={{ ...styles.timeCard, ...(t.urgent ? styles.timeCardUrgent : {}) }} className="card">
                                    {/* URGENT badge removed */}
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.label}</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setStep(0)} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <ArrowLeft size={14} /> Back
                        </button>
                    </div>
                )}

                {/* Step 2: Bank (Financial only) */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <h3 style={styles.stepTitle}>Which bank was involved?</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                            We&apos;ll provide the exact nodal officer contact for your bank.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                            {[...bankData.public_sector, ...bankData.private_sector, ...bankData.specialized_banks].map(b => {
                                const logoSrc = bankLogoMap[b.name] || null

                                return (
                                    <button key={b.name} onClick={() => selectBank(b)} className="card" style={styles.bankCard}>
                                        <div style={{ width: '28px', height: '28px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px', overflow: 'hidden' }}>
                                            {logoSrc ? (
                                                <img
                                                    src={logoSrc}
                                                    alt={b.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                                />
                                            ) : null}
                                            <span style={{ ...styles.bankDot, background: b.color || '#4682B4', display: logoSrc ? 'none' : 'block', margin: 0 }} />
                                        </div>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem', flex: 1, textAlign: 'left' }}>{b.name}</span>
                                    </button>
                                )
                            })}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
                            <button onClick={() => setStep(1)} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <ArrowLeft size={14} /> Back
                            </button>
                            <button onClick={skipBank} className="btn btn-ghost">
                                My bank is not listed / Skip
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Result */}
                {step === 3 && result && (
                    <div className="animate-fade-in">
                        <div style={{ ...styles.resultHeader, borderColor: result.color }}>
                            <span className="chip" style={{
                                background: `${result.color}20`,
                                color: result.color,
                                border: `1px solid ${result.color}40`,
                            }}>
                                {result.priority} PRIORITY
                            </span>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.5rem 0' }}>
                                Your Personalized Response Plan
                            </h3>
                        </div>

                        <div style={styles.stepsContainer}>
                            {result.steps.map((s, i) => {
                                const StepIcon = getIconForStep(s.text)
                                return (
                                    <div key={i} style={styles.stepRow}>
                                        <div style={styles.stepIcon}><StepIcon size={18} color="#4682B4" /></div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem' }}>{s.text}</p>
                                        </div>
                                        {s.action && (
                                            <a
                                                href={s.action}
                                                target={s.action.startsWith('http') ? '_blank' : undefined}
                                                rel={s.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="btn btn-primary"
                                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.9rem', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                            >
                                                {s.action.startsWith('tel') ? <><Phone size={12} /> Call</> : s.action.startsWith('mailto') ? <><Mail size={12} /> Email</> : <><Globe size={12} /> Open</>}
                                            </a>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div style={styles.legalNote}>
                            <span style={{ fontWeight: 600, color: '#D97706', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Scale size={14} /> Legal Framework:</span>
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem' }}> {result.legal}</span>
                        </div>

                        <button onClick={reset} className="btn btn-outline" style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <ArrowLeft size={14} /> Start Over
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

const styles = {
    wizard: {
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        maxWidth: '900px',
        boxShadow: 'var(--shadow-card)',
    },
    progress: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        position: 'relative',
    },
    progressStep: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        flex: 1,
        opacity: 0.4,
        transition: 'opacity 300ms',
    },
    progressActive: {
        opacity: 1,
    },
    progressDot: {
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: 'var(--color-bg-secondary)',
        border: '2px solid var(--color-border)',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'var(--color-text-muted)',
        transition: 'all 300ms',
    },
    progressDotActive: {
        background: '#F97316',
        borderColor: '#F97316',
        color: 'white',
    },
    progressLabel: {
        fontSize: '0.68rem',
        fontWeight: 600,
        color: 'var(--color-text-muted)',
    },
    stepTitle: {
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '0.75rem',
    },
    optionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '0.75rem',
    },
    optionCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '6px',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-primary)',
    },
    optionLabel: {
        fontWeight: 700,
        fontSize: '0.85rem',
    },
    optionDesc: {
        fontSize: '0.72rem',
        color: 'var(--color-text-muted)',
        lineHeight: 1.4,
    },
    timeCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        textAlign: 'center',
        fontFamily: 'var(--font-primary)',
        padding: '1.25rem 1rem',
    },
    timeCardUrgent: {
        borderColor: 'rgba(220, 38, 38, 0.2)',
    },
    bankCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        textAlign: 'center',
        fontFamily: 'var(--font-primary)',
        padding: '1.25rem 0.75rem',
    },
    bankDot: {
        width: '24px',
        height: '24px',
        borderRadius: '6px',
    },
    resultHeader: {
        borderLeft: '4px solid',
        paddingLeft: '1rem',
        marginBottom: '1.5rem',
    },
    stepsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    stepRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.85rem 1rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
    },
    stepIcon: {
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
    },
    legalNote: {
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(217, 119, 6, 0.06)',
        border: '1px solid rgba(217, 119, 6, 0.15)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.82rem',
        lineHeight: 1.6,
    },
}
