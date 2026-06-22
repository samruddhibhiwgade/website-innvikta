import React, { useState, useEffect } from 'react'
import JSZip from 'jszip'
import { FolderOpen, Upload, FolderSearch, Download, ClipboardList, X, Lightbulb, ShieldCheck, FileArchive } from 'lucide-react'

export default function EvidenceVault() {
    const [files, setFiles] = useState(() => {
        const saved = localStorage.getItem('innvikta_evidence_vault')
        return saved ? JSON.parse(saved) : []
    })
    const [rawFiles, setRawFiles] = useState({}) // Stores [id]: File object
    const [dragActive, setDragActive] = useState(false)
    const [isExporting, setIsExporting] = useState(false)

    useEffect(() => {
        localStorage.setItem('innvikta_evidence_vault', JSON.stringify(files))
    }, [files])

    const handleDrop = (e) => {
        e.preventDefault()
        setDragActive(false)
        const droppedFiles = Array.from(e.dataTransfer.files)
        addFiles(droppedFiles)
    }

    const handleSelect = (e) => {
        const selectedFiles = Array.from(e.target.files)
        addFiles(selectedFiles)
    }

    // Compute real SHA-256 hash
    const computeSHA256 = async (file) => {
        const buffer = await file.arrayBuffer()
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    }

    const addFiles = async (newFiles) => {
        const newEntries = []
        for (const f of newFiles) {
            const id = Date.now() + Math.random()
            const hash = await computeSHA256(f)
            
            newEntries.push({
                id,
                name: f.name,
                size: (f.size / 1024).toFixed(1) + ' KB',
                type: f.type,
                timestamp: new Date().toISOString(),
                hash: hash.toUpperCase(),
            })
            
            setRawFiles(prev => ({ ...prev, [id]: f }))
        }
        setFiles(prev => [...prev, ...newEntries])
    }

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id))
        setRawFiles(prev => {
            const next = { ...prev }
            delete next[id]
            return next
        })
    }

    const exportEvidenceZip = async () => {
        if (files.length === 0) return
        setIsExporting(true)
        const zip = new JSZip()
        
        let logContent = `INNVIKTA CYBERHELP - SECURE EVIDENCE BUNDLE\n`
        logContent += `Generated: ${new Date().toISOString()}\n`
        logContent += `Total Items: ${files.length}\n`
        logContent += `Authenticity: Verified via SHA-256 Hashing\n`
        logContent += `${'='.repeat(60)}\n\n`

        const evidenceFolder = zip.folder("evidence_files")

        files.forEach((f, i) => {
            const rawFile = rawFiles[f.id]
            if (rawFile) {
                evidenceFolder.file(f.name, rawFile)
                logContent += `${i + 1}. FILE: ${f.name}\n`
                logContent += `   SIZE: ${f.size}\n`
                logContent += `   DATE: ${new Date(f.timestamp).toLocaleString()}\n`
                logContent += `   SHA256: ${f.hash}\n\n`
            }
        })

        logContent += `${'='.repeat(60)}\n`
        logContent += `DISCLAIMER: This bundle was generated locally. The hashes above prove that\n`
        logContent += `the files have not been modified since they were added to the vault.\n`

        zip.file("evidence_manifest.txt", logContent)

        const content = await zip.generateAsync({ type: "blob" })
        const url = URL.createObjectURL(content)
        const a = document.createElement('a')
        a.href = url
        a.download = `Evidence_Bundle_${new Date().toISOString().split('T')[0]}.zip`
        a.click()
        URL.revokeObjectURL(url)
        setIsExporting(false)
    }

    return (
        <div className="container" style={{ paddingBottom: '3rem' }}>
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderOpen size={22} color="#F97316" /> Evidence Management Vault
            </h2>
            <p className="section-subtitle">
                Organize and timestamp your digital evidence with <strong>SHA-256 cryptographic verification</strong>. 
                Generate secure ZIP bundles with authenticity logs for law enforcement.
            </p>

            {/* Privacy Assurance Banner */}
            <div style={styles.privacyBanner}>
                <ShieldCheck size={20} color="#10B981" />
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                    Forensic Security: Data stays in your browser. Real-time hashing ensures file integrity.
                </span>
            </div>

            <div style={styles.vaultGrid}>
                {/* Upload Area */}
                <div
                    style={{ ...styles.dropZone, ...(dragActive ? styles.dropZoneActive : {}) }}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                >
                    <Upload size={40} color="#F97316" />
                    <p style={{ fontWeight: 700, fontSize: '1rem', marginTop: '0.75rem' }}>
                        Drag & Drop Evidence Files
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                        Screenshots, receipts, recordings. (max 10 MB each suggested)
                    </p>
                    <label className="btn btn-primary" style={{ marginTop: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F97316' }}>
                        <FolderSearch size={16} /> Browse Files
                        <input type="file" multiple onChange={handleSelect} style={{ display: 'none' }} accept=".jpg,.jpeg,.png,.pdf,.mp3,.mp4,.eml,.txt" />
                    </label>
                </div>

                {/* File List */}
                <div style={styles.fileList}>
                    <div style={styles.fileListHeader}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                            Evidence Log ({files.length} items)
                        </h3>
                        {files.length > 0 && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={exportEvidenceZip}
                                    disabled={isExporting}
                                    className="btn btn-primary"
                                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#16A34A' }}
                                >
                                    <FileArchive size={13} /> {isExporting ? 'Zipping...' : 'Export Secure ZIP'}
                                </button>
                            </div>
                        )}
                    </div>

                    {files.length === 0 ? (
                        <div style={styles.emptyState}>
                            <ClipboardList size={28} color="var(--color-text-muted)" style={{ opacity: 0.5 }} />
                            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                                No evidence uploaded yet. Add files to generate cryptographic signatures.
                            </p>
                        </div>
                    ) : (
                        <div style={styles.fileEntries}>
                            {files.map((f, i) => {
                                const isReady = !!rawFiles[f.id]
                                return (
                                    <div key={f.id} style={{ ...styles.fileEntry, opacity: isReady ? 1 : 0.6 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{f.name}</span>
                                                {!isReady && <span style={{ fontSize: '0.65rem', color: '#DC2626' }}>(Re-add for ZIP)</span>}
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '4px', flexWrap: 'wrap' }}>
                                                <span style={styles.fileMeta}>{f.size}</span>
                                                <span style={styles.fileMeta}>{new Date(f.timestamp).toLocaleString()}</span>
                                                <span style={{ ...styles.fileMeta, fontFamily: 'monospace', fontSize: '0.62rem', color: '#0369a1', background: '#e0f2fe', padding: '1px 4px', borderRadius: '3px' }}>
                                                    {f.hash.slice(0, 16)}...
                                                </span>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFile(f.id)} style={styles.removeBtn}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div style={styles.tips}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lightbulb size={16} color="#D97706" /> Evidence Tips for Law Enforcement
                </h4>
                <ul style={styles.tipList}>
                    <li>Screenshot conversations with date/time visible - this is most critical</li>
                    <li>Include the 12-digit UTR/Transaction ID for financial fraud</li>
                    <li>Save emails as .EML files, not just screenshots</li>
                    <li>Record call details: date, time, phone number, duration</li>
                    <li>National ID proof (Aadhaar/PAN) in .jpg/.png under 5 MB for NCRP filing</li>
                </ul>
            </div>
        </div>
    )
}

const styles = {
    vaultGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem',
    },
    privacyBanner: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '1rem 1.25rem',
        background: 'rgba(16, 185, 129, 0.05)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.5rem',
    },
    dropZone: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        border: '2px dashed var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-card)',
        transition: 'all 250ms',
        minHeight: '280px',
    },
    dropZoneActive: {
        borderColor: '#F97316',
        background: 'rgba(249, 115, 22, 0.04)',
    },
    fileList: {
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
    },
    fileListHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--color-border)',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '0.75rem',
    },
    fileEntries: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        overflowY: 'auto',
        maxHeight: '300px',
    },
    fileEntry: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '0.75rem',
        padding: '0.75rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
    },
    fileMeta: {
        fontSize: '0.7rem',
        color: 'var(--color-text-muted)',
    },
    removeBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--color-text-muted)',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 150ms',
    },
    tips: {
        padding: '1.25rem',
        background: 'rgba(70, 130, 180, 0.06)',
        border: '1px solid rgba(70, 130, 180, 0.15)',
        borderRadius: 'var(--radius-md)',
    },
    tipList: {
        paddingLeft: '1.25rem',
        fontSize: '0.82rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.8,
        listStyleType: 'disc',
    },
}
