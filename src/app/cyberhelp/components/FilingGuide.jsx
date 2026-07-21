"use client";
import React, { useState } from 'react'
import { Globe, UserPlus, ListChecks, FileText, Eye, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'

const steps = [
    {
        id: 1,
        title: 'Preparation & Navigation',
        icon: Globe,
        content: [
            {
                type: 'action',
                label: 'Visit the Portal',
                text: 'Go to cybercrime.gov.in and select your language (English or Hindi).',
                link: 'https://cybercrime.gov.in/',
            },
            {
                type: 'action',
                label: 'Choose Category',
                text: 'Select "Report Other Cyber Crime" for most complaints, or "Report Women/Child Related Crime" for specific offences.',
            },
            {
                type: 'tip',
                text: 'Keep your Aadhaar, phone number, and bank statements ready before starting.',
            },
        ],
    },
    {
        id: 2,
        title: 'Account & OTP Verification',
        icon: UserPlus,
        content: [
            {
                type: 'action',
                label: 'Enter Your Mobile Number',
                text: 'Use the same number linked to your bank/UPI. You\'ll receive an OTP.',
            },
            {
                type: 'action',
                label: 'Verify OTP',
                text: 'Enter the OTP within 3 minutes. If it expires, click "Resend OTP".',
            },
            {
                type: 'tip',
                text: 'If you don\'t receive an OTP, check if your mobile number is registered with DND services.',
            },
        ],
    },
    {
        id: 3,
        title: 'Incident Details',
        icon: ListChecks,
        content: [
            {
                type: 'action',
                label: 'Category & Sub-Category',
                text: 'Select the appropriate cybercrime type: Online Banking Fraud, UPI Fraud, Credit/Debit Card, etc.',
            },
            {
                type: 'action',
                label: 'Date, Time & Location',
                text: 'Enter the exact date/time of the incident and your location (State → District → Police Station).',
            },
            {
                type: 'action',
                label: 'Describe the Incident',
                text: 'Write a concise description (100–5000 characters). Include key details like amounts, transaction IDs, and how the fraud occurred.',
            },
            {
                type: 'tip',
                text: 'Be factual and specific. Avoid emotional language. Include UTR numbers, wallet IDs, or reference numbers.',
            },
        ],
    },
    {
        id: 4,
        title: 'Suspect & Evidence',
        icon: FileText,
        content: [
            {
                type: 'action',
                label: 'Suspect Information',
                text: 'Add any details about the suspect: mobile numbers, email addresses, social media profiles, bank account numbers, or UPI IDs.',
            },
            {
                type: 'action',
                label: 'Upload Evidence',
                text: 'Attach screenshots, bank statements, chat logs, or call recordings. Max 10MB per file (JPG, PNG, PDF accepted).',
            },
            {
                type: 'tip',
                text: 'The more evidence you provide, the faster the investigation. Use our Evidence Vault to organize beforehand.',
            },
        ],
    },
    {
        id: 5,
        title: 'Review & Submit',
        icon: Eye,
        content: [
            {
                type: 'action',
                label: 'Preview Your Complaint',
                text: 'Review all details carefully. You cannot edit after submission.',
            },
            {
                type: 'action',
                label: 'Accept Terms & Submit',
                text: 'Check the declaration box and click "Submit". You\'ll receive an Acknowledgement Number.',
            },
            {
                type: 'action',
                label: 'Save Your Acknowledgement',
                text: 'Screenshot or download the acknowledgement. Use this number to track your complaint status.',
            },
            {
                type: 'tip',
                text: 'Bookmark the tracking page. You can check status anytime at cybercrime.gov.in → "Track Your Complaint".',
            },
        ],
    },
]

export default function FilingGuide() {
    const [activeStep, setActiveStep] = useState(0)
    const step = steps[activeStep]
    const StepIcon = step.icon

    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={22} color="#F97316" /> NCRP Filing Guide
            </h2>
            <p className="section-subtitle">
                Step-by-step guide to filing a cybercrime complaint on the National Cyber Crime
                Reporting Portal (NCRP) at cybercrime.gov.in.
            </p>

            {/* Step Navigation */}
            <div style={stl.stepNav}>
                {steps.map((s, i) => {
                    const Icon = s.icon
                    const isActive = i === activeStep
                    const isDone = i < activeStep
                    return (
                        <button
                            key={s.id}
                            onClick={() => setActiveStep(i)}
                            style={{
                                ...stl.stepBtn,
                                background: isActive ? '#F97316' : isDone ? 'var(--color-accent-orange-glow)' : 'var(--color-bg-secondary)',
                                color: isActive ? '#FFFFFF' : isDone ? '#F97316' : 'var(--color-text-muted)',
                                border: isActive ? '2px solid #F97316' : isDone ? '2px solid #FDBA74' : '2px solid var(--color-border)',
                                fontWeight: isActive ? 800 : 600,
                            }}
                        >
                            {isDone ? <CheckCircle size={16} /> : <Icon size={16} />}
                            <span style={stl.stepBtnLabel}>Step {s.id}</span>
                        </button>
                    )
                })}
            </div>

            {/* Active Step Content */}
            <div className="card animate-fade-in" style={stl.stepCard} key={activeStep}>
                <div style={stl.stepHeader}>
                    <div style={stl.stepNum}>{step.id}</div>
                    <div>
                        <h3 style={stl.stepTitle}>{step.title}</h3>
                        <span style={stl.stepMeta}>Step {step.id} of {steps.length}</span>
                    </div>
                </div>

                <div style={stl.contentList}>
                    {step.content.map((item, idx) => (
                        <div key={idx} style={{
                            ...stl.contentItem,
                            borderLeft: item.type === 'tip' ? '3px solid #F97316' : '3px solid var(--color-border)',
                            background: item.type === 'tip' ? 'var(--color-accent-orange-glow)' : 'var(--color-bg-card-hover)',
                        }}>
                            {item.type === 'action' && (
                                <>
                                    <strong style={stl.actionLabel}>{item.label}</strong>
                                    <p style={stl.actionText}>{item.text}</p>
                                    {item.link && (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem', marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                            <Globe size={13} /> Open Portal
                                        </a>
                                    )}
                                </>
                            )}
                            {item.type === 'tip' && (
                                <p style={{ ...stl.actionText, color: '#D97706', fontStyle: 'italic' }}>
                                    <strong>Tip:</strong> {item.text}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <div style={stl.navRow}>
                    <button
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                        disabled={activeStep === 0}
                        className="btn btn-outline"
                        style={{ ...stl.navBtn, opacity: activeStep === 0 ? 0.4 : 1 }}
                    >
                        <ChevronLeft size={16} /> Previous
                    </button>
                    <button
                        onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                        disabled={activeStep === steps.length - 1}
                        className="btn btn-primary"
                        style={{ ...stl.navBtn, opacity: activeStep === steps.length - 1 ? 0.4 : 1 }}
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

const stl = {
    stepNav: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
    },
    stepBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0.55rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-primary)',
        transition: 'all 200ms ease',
    },
    stepBtnLabel: {
        display: 'inline',
    },
    stepCard: {
        padding: '2rem',
    },
    stepHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--color-border)',
    },
    stepNum: {
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#F97316',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: '1.1rem',
        flexShrink: 0,
    },
    stepTitle: {
        fontSize: '1.1rem',
        fontWeight: 800,
        color: 'var(--color-text-primary)',
    },
    stepMeta: {
        fontSize: '0.72rem',
        color: 'var(--color-text-muted)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
    },
    contentList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1.5rem',
    },
    contentItem: {
        padding: '1rem 1.25rem',
        borderRadius: '6px',
    },
    actionLabel: {
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        marginBottom: '4px',
    },
    actionText: {
        fontSize: '0.85rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
        margin: 0,
    },
    navRow: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '1rem',
        borderTop: '1px solid var(--color-border)',
    },
    navBtn: {
        fontSize: '0.82rem',
        padding: '0.5rem 1.25rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
    },
}
