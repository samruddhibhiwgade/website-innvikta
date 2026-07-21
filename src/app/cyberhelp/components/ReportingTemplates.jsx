"use client";
import React, { useState } from 'react'
import { FileText, Building2, ClipboardList, Smartphone, ArrowLeft, FileDown, Copy, Eye, ChevronRight } from 'lucide-react'

import { templates, fieldLabels } from '../data/reportTemplates.js'

export default function ReportingTemplates() {
    const [activeTemplate, setActiveTemplate] = useState(null)
    const [formData, setFormData] = useState({})

    const handleSelect = (template) => {
        setActiveTemplate(template)
        setFormData({})
    }

    const updateField = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const copyToClipboard = () => {
        const text = activeTemplate.generate(formData)
        navigator.clipboard.writeText(text).then(() => {
            alert('Template copied to clipboard! Paste it into an email or document.')
        })
    }

    const downloadTemplate = () => {
        const text = activeTemplate.generate(formData)
        const blob = new Blob([text], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${activeTemplate.id}-${new Date().toISOString().split('T')[0]}.txt`
        a.click()
        URL.revokeObjectURL(url)
    }

    const fieldLabels = {
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

    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={22} color="#4682B4" /> Reporting Templates
            </h2>
            <p className="section-subtitle">
                Pre-drafted formal complaint letters. Fill in your details, copy or download,
                and send to the appropriate authority. Saves critical time during a crisis.
            </p>

            {!activeTemplate ? (
                <div className="grid-3">
                    {templates.map(t => {
                        const Icon = t.icon
                        return (
                            <button key={t.id} onClick={() => handleSelect(t)} className="card" style={styles.templateCard}>
                                <Icon size={24} color="#4682B4" />
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                                    {t.title}
                                </h3>
                                <span className="chip chip-teal" style={{ marginBottom: '0.5rem' }}>{t.category}</span>
                                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                    {t.description}
                                </p>
                                <span style={styles.useBtn}>Use Template <ChevronRight size={14} style={{ display: 'inline' }} /></span>
                            </button>
                        )
                    })}
                </div>
            ) : (
                <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
                    <button onClick={() => setActiveTemplate(null)} className="btn btn-ghost" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <ArrowLeft size={14} /> Back to Templates
                    </button>

                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                            {activeTemplate.title}
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            Fill in the fields below. Leave blank to use placeholder text.
                        </p>

                        <div style={styles.formGrid}>
                            {activeTemplate.fields.map(field => (
                                <div key={field} style={styles.formGroup}>
                                    <label style={styles.label}>{fieldLabels[field] || field}</label>
                                    {field === 'description' ? (
                                        <textarea
                                            value={formData[field] || ''}
                                            onChange={(e) => updateField(field, e.target.value)}
                                            placeholder={`Enter ${(fieldLabels[field] || field).toLowerCase()}...`}
                                            style={{ ...styles.input, minHeight: '100px', resize: 'vertical' }}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={formData[field] || ''}
                                            onChange={(e) => updateField(field, e.target.value)}
                                            placeholder={`Enter ${(fieldLabels[field] || field).toLowerCase()}...`}
                                            style={styles.input}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Preview */}
                        <div style={styles.previewSection}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Eye size={14} /> Preview
                            </h4>
                            <pre style={styles.preview}>{activeTemplate.generate(formData)}</pre>
                        </div>

                        <div style={styles.actions}>
                            <button onClick={copyToClipboard} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <Copy size={14} /> Copy to Clipboard
                            </button>
                            <button onClick={downloadTemplate} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <FileDown size={14} /> Download as .txt
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const styles = {
    templateCard: {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-primary)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-card)',
    },
    useBtn: {
        marginTop: 'auto',
        paddingTop: '0.75rem',
        fontSize: '0.82rem',
        fontWeight: 600,
        color: '#F97316',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    label: {
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
    },
    input: {
        padding: '0.6rem 0.75rem',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text-primary)',
        fontSize: '0.85rem',
        fontFamily: 'var(--font-primary)',
        outline: 'none',
        transition: 'border-color 200ms',
    },
    previewSection: {
        marginBottom: '1.25rem',
    },
    preview: {
        padding: '1.25rem',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.78rem',
        lineHeight: 1.7,
        color: 'var(--color-text-secondary)',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        fontFamily: 'var(--font-mono)',
        maxHeight: '400px',
        overflowY: 'auto',
    },
    actions: {
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
    },
}
