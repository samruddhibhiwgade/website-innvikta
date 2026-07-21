"use client";
import React from 'react'
import { Scale, Landmark, ScrollText, Handshake, Globe, Phone, UserRound, Baby, ShieldAlert, Siren } from 'lucide-react'

export default function LegalAid() {
    return (
        <div className="container">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Scale size={22} color="#4682B4" /> Legal Aid & Recovery
            </h2>
            <p className="section-subtitle">
                Long-term recovery resources including victim compensation, civil litigation, and NGO support.
            </p>

            <div className="grid-3">
                {/* Victim Compensation */}
                <div className="card" style={styles.aidCard}>
                    <div style={styles.icon}><Landmark size={28} color="#4682B4" /></div>
                    <h3 style={styles.cardTitle}>Victim Compensation Scheme</h3>
                    <p style={styles.cardDesc}>
                        Under MSLSA guidance, victims of cybercrimes involving sexual violence or severe
                        financial loss from marginalized groups may receive compensation.
                    </p>
                    <div style={styles.detailBox}>
                        <div style={styles.row}>
                            <span style={styles.label}>Authority</span>
                            <span style={styles.value}>DLSA Pune, Shivaji Nagar District Court</span>
                        </div>
                        <div style={styles.row}>
                            <span style={styles.label}>Applies To</span>
                            <span style={styles.value}>Sexual violence victims, severe financial loss (marginalized groups)</span>
                        </div>
                    </div>
                    <a href="https://nalsa.gov.in/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Globe size={14} /> NALSA Portal
                    </a>
                </div>

                {/* Civil Recovery */}
                <div className="card" style={styles.aidCard}>
                    <div style={styles.icon}><ScrollText size={28} color="#4682B4" /></div>
                    <h3 style={styles.cardTitle}>Civil Recovery - Section 43A IT Act</h3>
                    <p style={styles.cardDesc}>
                        If your personal data was compromised due to a failure in &quot;reasonable security practices&quot;
                        by a body corporate, you can seek civil compensation.
                    </p>
                    <div style={styles.detailBox}>
                        <div style={styles.row}>
                            <span style={styles.label}>Legal Basis</span>
                            <span style={styles.value}>Section 43A, IT Act 2000</span>
                        </div>
                        <div style={styles.row}>
                            <span style={styles.label}>Specialist</span>
                            <span style={styles.value}>Adv. Rajas Pingle, Netlawgic, Pune</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                        This civil remedy can recover losses that the criminal process may not address.
                    </p>
                </div>

                {/* NGO Support */}
                <div className="card" style={styles.aidCard}>
                    <div style={styles.icon}><Handshake size={28} color="#4682B4" /></div>
                    <h3 style={styles.cardTitle}>Specialized NGO Support</h3>
                    <p style={styles.cardDesc}>
                        Responsible Netism (Ahaan Foundation) provides multi-layered support including
                        psychological counseling and legal guidance.
                    </p>
                    <div style={styles.detailBox}>
                        <div style={styles.row}>
                            <span style={styles.label}>Helpline</span>
                            <a href="tel:7353107353" style={{ ...styles.value, color: '#F97316' }}>7353107353</a>
                        </div>
                        <div style={styles.row}>
                            <span style={styles.label}>Counseling</span>
                            <span style={styles.value}>Dr. Harish Shetty</span>
                        </div>
                        <div style={styles.row}>
                            <span style={styles.label}>Legal</span>
                            <span style={styles.value}>Adv. Vaishali Bhagwat</span>
                        </div>
                        <div style={styles.row}>
                            <span style={styles.label}>Services</span>
                            <span style={styles.value}>Cyber Wellness Centres, Pune office available</span>
                        </div>
                    </div>
                    <a href="tel:7353107353" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={14} /> Call Responsible Netism
                    </a>
                </div>
            </div>

            {/* Additional Helplines */}
            <div style={styles.helplinesGrid}>
                {[
                    { name: 'National Women Helpline', number: '181', icon: UserRound },
                    { name: 'Childline India', number: '1098', icon: Baby },
                    { name: 'Police Emergency', number: '112', icon: Siren },
                    { name: 'Senior Citizens', number: '14567', icon: ShieldAlert },
                ].map((h, i) => {
                    const HIcon = h.icon
                    return (
                        <a key={i} href={`tel:${h.number}`} className="card" style={styles.helplineCard}>
                            <HIcon size={24} color="#4682B4" />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#F97316', fontFamily: 'var(--font-mono)' }}>{h.number}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>{h.name}</span>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

const styles = {
    aidCard: { padding: '1.5rem', display: 'flex', flexDirection: 'column' },
    icon: { marginBottom: '0.75rem' },
    cardTitle: { fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' },
    cardDesc: { fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' },
    detailBox: { padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    row: { display: 'flex', gap: '0.75rem', alignItems: 'flex-start' },
    label: { fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)', minWidth: '70px', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.04em' },
    value: { fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-primary)' },
    helplinesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem' },
    helplineCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', padding: '1.25rem', textDecoration: 'none', cursor: 'pointer' },
}
