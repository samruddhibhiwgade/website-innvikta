"use client";
import React, { useState } from 'react'
import { 
    Gamepad2, DollarSign, QrCode, PhoneCall, Theater, Mail, ShieldCheck, ShieldX, 
    AlertTriangle, Trophy, ThumbsUp, BookOpen, RotateCcw, ChevronRight, Info,
    Target, Crown, MessageSquare, Phone, ShieldQuestion, Gift, ArrowLeftRight, 
    Footprints, Briefcase, UserRound, Users, Droplets, ScanFace 
} from 'lucide-react'
import { threatGlossary } from '../data/threatGlossary'

// Icon Mapping for Glossary
const IconMap = {
    Mail, Target, Crown, MessageSquare, Phone, ShieldQuestion, Gift, 
    ArrowLeftRight, Footprints, Briefcase, UserRound, Users, Droplets, 
    AlertTriangle, ScanFace
}

const simulations = [
    {
        id: 'upi', title: 'UPI Payment Request Scam', icon: DollarSign, description: 'Can you tell if this money request is real or a scam?',
        scenario: {
            from: 'PayTM Support', message: 'Dear Customer, your cashback of ₹2,500 is pending. To receive it instantly, accept the payment request below. Offer expires in 10 minutes!', amount: '₹2,500', type: 'COLLECT REQUEST',
            redFlags: ['Payment apps never ask you to "accept" to RECEIVE money', '"Collect Request" means money will be DEBITED, not credited', 'Urgency tactics: "expires in 10 minutes"', 'Official PayTM will never contact through in-app collect requests'], correct: 'scam'
        }
    },
    {
        id: 'qr', title: 'QR Code Scam', icon: QrCode, description: 'Someone asks you to scan a QR code to receive payment. Safe or scam?',
        scenario: {
            from: 'Buyer on OLX', message: "Hi, I want to buy your item for ₹15,000. I'll send you the money via QR code. Just scan this code and enter your UPI PIN to receive the payment.", amount: '₹15,000', type: 'QR CODE',
            redFlags: ['Scanning a QR code SENDS money - it never receives money', 'You should NEVER enter your UPI PIN to receive payments', 'Legitimate buyers transfer money directly to your UPI ID', 'OLX itself warns against QR code transactions'], correct: 'scam'
        }
    },
    {
        id: 'kyc', title: 'KYC Verification Call', icon: PhoneCall, description: 'A "bank official" calls about your KYC verification expiring.',
        scenario: {
            from: 'Unknown Number (+91 98765XXXXX)', message: 'This is calling from SBI Head Office. Your KYC has expired and your account will be blocked in 24 hours. Please share your Aadhaar number and the OTP we just sent to verify your identity.', type: 'PHONE CALL',
            redFlags: ['Banks NEVER call to collect Aadhaar, PAN, or OTP over the phone', 'No bank will "block your account" without written notice', "They said \"OTP we just sent\" - this means they're already trying to hack you", 'Always hang up and call the official bank number yourself'], correct: 'scam'
        }
    },
    {
        id: 'digital_arrest', title: 'Digital Arrest', icon: Theater, description: "A \"CBI Officer\" calls you on video, claiming you're under investigation.",
        scenario: {
            from: 'Video Call - "Inspector Sharma, CBI"', message: 'We have found that your Aadhaar is linked to a money laundering case. You are under digital arrest. Do not disconnect this call or we will issue warrant. Transfer ₹5,00,000 to our secure RBI account to clear your name.', amount: '₹5,00,000', type: 'VIDEO CALL',
            redFlags: ['"Digital arrest" is NOT a real legal concept - it does not exist in Indian law', 'CBI/Police never conduct investigation or arrest via video call', 'No government body will ask for money transfer to "clear your name"', 'The RBI does not have "secure accounts" for civilians', 'This is 100% a scam. Hang up immediately.'], correct: 'scam'
        }
    },
    {
        id: 'phishing_email', title: 'Income Tax Refund Email', icon: Mail, description: 'You received an email about an income tax refund. Real or fake?',
        scenario: {
            from: 'incometax-refund@govt-india.co.in', message: 'Dear Taxpayer, you are eligible for an income tax refund of ₹24,350. Click the link below to verify your bank details and receive the refund within 24 hours. Link: http://it-refund-verify.co.in/claim', amount: '₹24,350', type: 'EMAIL',
            redFlags: ['Official IT domain is incometax.gov.in, NOT govt-india.co.in', 'The link domain (it-refund-verify.co.in) is not an official government site', 'IT department processes refunds automatically - no link clicking required', 'Forward suspicious emails to webmanager@incometax.gov.in'], correct: 'scam'
        }
    },
]

export default function ScamSimulator() {
    const [activeTab, setActiveTab] = useState('simulator')
    const [activeIndex, setActiveIndex] = useState(0)
    const [userAnswer, setUserAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [completed, setCompleted] = useState(0)
    const [hoveredCard, setHoveredCard] = useState(null)
    const sim = simulations[activeIndex]
    const SimIcon = sim.icon

    const headerTitle = activeTab === 'simulator' ? 'Scam Awareness Simulator' : 'Social Engineering Threats'
    const HeaderIcon = activeTab === 'simulator' ? Gamepad2 : BookOpen
    const headerSubtitle = activeTab === 'simulator' 
        ? 'Practice identifying real-world scams in a safe environment. Build your resilience against social engineering attacks.'
        : 'Understanding how attackers manipulate human psychology is your first line of defense.'

    const handleAnswer = (answer) => { setUserAnswer(answer); if (answer === sim.scenario.correct) setScore(p => p + 1); setCompleted(p => p + 1) }
    const nextSim = () => { setUserAnswer(null); if (activeIndex < simulations.length - 1) setActiveIndex(p => p + 1) }
    const reset = () => { setActiveIndex(0); setUserAnswer(null); setScore(0); setCompleted(0) }
    const isFinished = completed === simulations.length
    const getResultIcon = () => { if (score === simulations.length) return <Trophy size={48} color="var(--color-accent-orange)" />; if (score >= 3) return <ThumbsUp size={48} color="var(--color-accent-orange)" />; return <BookOpen size={48} color="var(--color-accent-orange)" /> }

    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HeaderIcon size={22} color="var(--color-accent-orange)" /> {headerTitle}
            </h2>
            <p className="section-subtitle">{headerSubtitle}</p>

            <div style={s.tabContainer}>
                <button
                    onClick={() => setActiveTab('simulator')}
                    style={{ ...s.tab, ...(activeTab === 'simulator' ? s.activeTab : {}) }}
                >
                    <Gamepad2 size={16} /> Simulator
                </button>
                <button
                    onClick={() => setActiveTab('glossary')}
                    style={{ ...s.tab, ...(activeTab === 'glossary' ? s.activeTab : {}) }}
                >
                    <BookOpen size={16} /> Threat Glossary
                </button>
            </div>

            {activeTab === 'simulator' ? (
                <>
                    <div style={s.scoreBar}>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Score: {score}/{completed}</span>
                        <div style={s.progressBar}><div style={{ ...s.progressFill, width: `${(activeIndex / simulations.length) * 100}%` }} /></div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{activeIndex + 1} of {simulations.length}</span>
                    </div>
                    {isFinished ? (
                        <div className="card animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                            {getResultIcon()}
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '1rem 0' }}>{score === simulations.length ? 'Perfect Score!' : score >= 3 ? 'Good Awareness!' : 'Keep Learning!'}</h3>
                            <p style={{ fontSize: '1.1rem', color: '#F97316', fontWeight: 700, marginBottom: '0.5rem' }}>{score} / {simulations.length} correct</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>{score === simulations.length ? 'Excellent! You can identify all common scam patterns.' : 'Review the red flags once more to strengthen your defense.'}</p>
                            <button onClick={reset} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><RotateCcw size={14} /> Try Again</button>
                        </div>
                    ) : (
                        <div className="card animate-fade-in" style={{ padding: '2rem', maxWidth: '750px', margin: '0 auto' }}>
                            <div style={s.simHeader}>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><SimIcon size={20} color="var(--color-accent-orange)" /> {sim.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{sim.description}</p>
                            </div>
                            <div style={s.messageCard}>
                                <div style={s.messageFrom}><span style={{ fontWeight: 600, fontSize: '0.82rem' }}>From: {sim.scenario.from}</span>{sim.scenario.type && <span className="chip chip-amber">{sim.scenario.type}</span>}</div>
                                <p style={s.messageText}>{sim.scenario.message}</p>
                                {sim.scenario.amount && <div style={s.amountBadge}>Amount: {sim.scenario.amount}</div>}
                            </div>
                            {!userAnswer && (
                                <div style={s.answerBtns}>
                                    <button onClick={() => handleAnswer('safe')} className="btn" style={s.safeBtn}><ShieldCheck size={18} /> Looks Legitimate</button>
                                    <button onClick={() => handleAnswer('scam')} className="btn" style={s.scamBtn}><ShieldX size={18} /> This is a Scam</button>
                                </div>
                            )}
                            {userAnswer && (
                                <div className="animate-fade-in">
                                    <div style={{ ...s.resultBanner, background: userAnswer === sim.scenario.correct ? 'rgba(20,184,166,0.1)' : 'rgba(220,38,38,0.1)', borderColor: userAnswer === sim.scenario.correct ? 'rgba(20,184,166,0.3)' : 'rgba(220,38,38,0.3)' }}>
                                        {userAnswer === sim.scenario.correct ? <ShieldCheck size={28} color="#14B8A6" /> : <ShieldX size={28} color="#DC2626" />}
                                        <div><strong style={{ color: userAnswer === sim.scenario.correct ? '#14B8A6' : '#DC2626' }}>{userAnswer === sim.scenario.correct ? 'Correct!' : 'Incorrect!'}</strong><span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}> This is definitely a <strong>scam</strong>.</span></div>
                                    </div>
                                    <div style={s.redFlags}>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={16} /> Red Flags to Remember:</h4>
                                        <ul style={s.flagList}>{sim.scenario.redFlags.map((f, i) => <li key={i}>{f}</li>)}</ul>
                                    </div>
                                    {activeIndex < simulations.length - 1 ? (
                                        <button onClick={nextSim} className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>Next Scenario <ChevronRight size={14} /></button>
                                    ) : (
                                        <button onClick={() => { setCompleted(simulations.length); setUserAnswer(null) }} className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>See Results <ChevronRight size={14} /></button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="animate-fade-in">
                    <div style={s.glossaryGrid}>
                        {threatGlossary.map((item) => {
                            const ThreatIcon = IconMap[item.iconName] || Info;
                            const isHovered = hoveredCard === item.id;
                            return (
                                <div 
                                    key={item.id} 
                                    className="card" 
                                    style={{ ...s.glossaryCard, ...(isHovered ? s.glossaryCardHover : {}) }}
                                    onMouseEnter={() => setHoveredCard(item.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div style={s.glossaryCardHeader}>
                                        <span style={s.glossaryIcon}><ThreatIcon size={16} color="var(--color-accent-orange)" /></span>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.title}</h4>
                                    </div>
                                    <p style={s.glossaryDesc}>{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

const s = {
    scoreBar: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '0.75rem 1rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', maxWidth: '750px' },
    progressBar: { flex: 1, height: '6px', background: 'var(--color-bg-secondary)', borderRadius: '3px', overflow: 'hidden' },
    progressFill: { height: '100%', background: 'linear-gradient(90deg, var(--color-accent-orange), var(--color-accent-amber))', borderRadius: '3px', transition: 'width 400ms ease' },
    simHeader: { marginBottom: '1.25rem' },
    messageCard: { background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.25rem' },
    messageFrom: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap', color: 'var(--color-text-primary)' },
    messageText: { fontSize: '0.9rem', color: 'var(--color-text-primary)', lineHeight: 1.7, fontStyle: 'italic' },
    amountBadge: { display: 'inline-block', marginTop: '0.75rem', padding: '0.4rem 0.75rem', background: 'var(--color-accent-amber-glow)', border: '1px solid rgba(217,119,6,0.2)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent-amber)' },
    answerBtns: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' },
    safeBtn: { background: 'var(--color-accent-teal-glow)', border: '1px solid rgba(13, 148, 136, 0.3)', color: 'var(--color-accent-teal)', flex: 1, justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem', fontFamily: 'var(--font-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px' },
    scamBtn: { background: 'var(--color-accent-emergency-glow)', border: '1px solid rgba(220, 38, 38, 0.3)', color: 'var(--color-accent-emergency)', flex: 1, justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem', fontFamily: 'var(--font-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px' },
    resultBanner: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid', marginBottom: '1rem' },
    redFlags: { padding: '1rem', background: 'var(--color-accent-emergency-glow)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(220, 38, 38, 0.1)' },
    flagList: { paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, listStyleType: 'disc' },
    tabContainer: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        padding: '4px',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-md)',
        width: 'fit-content',
        border: '1px solid var(--color-border)',
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0.6rem 1.25rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.88rem',
        fontWeight: 600,
        color: 'var(--color-text-muted)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 200ms ease',
    },
    activeTab: {
        background: 'var(--color-bg-card)',
        color: 'var(--color-accent-orange)',
        boxShadow: 'var(--shadow-card)',
    },
    glossaryQuote: {
        fontSize: '1rem',
        color: 'var(--color-text-secondary)',
        fontStyle: 'italic',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: 1.6,
    },
    glossaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem',
    },
    glossaryCard: {
        padding: '1.5rem',
        transition: 'all 250ms ease',
        cursor: 'default',
        border: '1px solid var(--color-border)',
    },
    glossaryCardHover: {
        transform: 'translateY(-5px)',
        borderColor: 'var(--color-accent-orange)',
        boxShadow: 'var(--shadow-card-hover)',
        background: 'var(--color-bg-card)',
    },
    glossaryCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '0.75rem',
    },
    glossaryIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'var(--color-accent-orange-glow)',
    },
    glossaryDesc: {
        fontSize: '0.88rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
    },
}
