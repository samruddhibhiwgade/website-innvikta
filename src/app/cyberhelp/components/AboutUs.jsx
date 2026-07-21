"use client";
import React from 'react'
import Link from 'next/link'
import { 
    Shield, Activity, Users, FileText, Globe, Phone, 
    Building2, Camera, Lock, Info, ExternalLink, 
    ShieldCheck, Heart, Zap, CheckCircle2, AlertTriangle, ArrowRight,
    Target
} from 'lucide-react'

// Asset imports
const aboutHero = '/images/cyberhelp/assets/about-hero.png'
const aboutWhy = '/images/cyberhelp/assets/about-why.png'
const aboutCsr = '/images/cyberhelp/assets/about-csr.png'

export default function AboutUs() {
    return (
        <div className="about-page animate-fade-in" style={styles.page}>
            {/* ── 1. Hero Section ─────────────────────────────────────────── */}
            <section style={styles.hero}>
                <div className="container" style={styles.heroInner}>
                    <div style={styles.heroContent}>
                        <div style={styles.badge}>Our Commitment to Cyber Safety</div>
                        <h1 style={styles.heroTitle}>About CyberHelp</h1>
                        <p style={styles.heroSubtitle}>
                            A public cyber safety initiative by <strong style={{ color: 'var(--color-accent-orange)' }}>Innvikta</strong> to guide individuals through the digital world.
                        </p>
                        <div style={styles.heroDesc}>
                            <p style={{ marginBottom: '1rem' }}>
                                CyberHelp is a public guidance initiative created by <strong>Innvikta</strong> as part of our commitment to promoting digital safety and cybersecurity awareness.
                            </p>
                            <p>
                                With the rapid growth of digital payments, online services, and social media platforms, cyber fraud has become one of the most common risks faced by individuals and businesses.
                            </p>
                        </div>
                    </div>
                    <div style={styles.heroImageContainer}>
                        <img src={aboutHero} alt="Cyber Security Protection" style={styles.heroImage} />
                    </div>
                </div>
            </section>

            {/* ── 2. Why CyberHelp Was Created ──────────────────────────────── */}
            <section style={styles.sectionWhite}>
                <div className="container" style={styles.splitGrid}>
                    <div style={styles.splitContent}>
                        <h2 style={styles.sectionTitle}>Why We Built CyberHelp</h2>
                        <p style={styles.paragraph}>
                            Many victims of cyber fraud experience confusion and panic immediately after an incident. They often do not know whom to contact, how to report the fraud, or what steps should be taken first.
                        </p>
                        <p style={styles.paragraph}>
                            CyberHelp was created to address this challenge by providing clear, reliable, and easy-to-follow guidance on what to do when a cyber fraud occurs. Although official resources exist, they are sometimes difficult to locate during stressful situations.
                        </p>
                    </div>
                    <div style={styles.splitImageContainer}>
                        <img src={aboutWhy} alt="Guidance and Clarity" style={styles.splitImage} />
                    </div>
                </div>
            </section>

            {/* ── 3. CSR Initiative Section ─────────────────────────────────── */}
            <section style={styles.sectionLight}>
                <div className="container">
                    <div style={styles.csrBox}>
                        <div style={styles.csrContent}>
                            <h2 style={styles.sectionTitle}>A Corporate Social Responsibility (CSR) Initiative</h2>
                            <p style={styles.paragraph}>
                                CyberHelp is developed and maintained by <strong>Innvikta as part of our Corporate Social Responsibility (CSR) efforts</strong> to contribute to a safer digital ecosystem.
                            </p>
                            <p style={styles.paragraph}>
                                As a cybersecurity awareness company, we believe that improving digital safety requires not only training organizations but also empowering individuals with knowledge and guidance.
                            </p>
                            <div style={styles.csrFeatureGrid}>
                                <div style={styles.csrFeature}>
                                    <div style={styles.csrDot} /> Responsible Digital Practices
                                </div>
                                <div style={styles.csrFeature}>
                                    <div style={styles.csrDot} /> Cyber Awareness
                                </div>
                                <div style={styles.csrFeature}>
                                    <div style={styles.csrDot} /> Community Safety
                                </div>
                            </div>
                        </div>
                        <div style={styles.csrBadgeContainer}>
                            <img src={aboutCsr} alt="CSR Badge" style={styles.csrBadge} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. What CyberHelp Provides ────────────────────────────────── */}
            <section style={styles.sectionWhite}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={styles.sectionTitle}>What CyberHelp Provides</h2>
                        <p style={styles.sectionSub}>Helping individuals understand the immediate actions they should take in the event of cyber fraud.</p>
                    </div>
                    
                    <div style={styles.featureGrid}>
                        <div style={styles.featureCard}>
                            <div style={{ ...styles.featureIconBox, background: '#F9731615' }}>
                                <Zap size={24} color="#F97316" />
                            </div>
                            <h3 style={styles.featureTitle}>Immediate Steps</h3>
                            <p style={styles.featureDesc}>Incident-specific guidance to ensure you quickly access the right information.</p>
                        </div>

                        <div style={styles.featureCard}>
                            <div style={{ ...styles.featureIconBox, background: '#0EA5E915' }}>
                                <Globe size={24} color="#0EA5E9" />
                            </div>
                            <h3 style={styles.featureTitle}>Reporting Portal</h3>
                            <p style={styles.featureDesc}>Direct links to the official cybercrime reporting portal (cybercrime.gov.in).</p>
                        </div>

                        <div style={styles.featureCard}>
                            <div style={{ ...styles.featureIconBox, background: '#10B98115' }}>
                                <Phone size={24} color="#10B981" />
                            </div>
                            <h3 style={styles.featureTitle}>National Helpline</h3>
                            <p style={styles.featureDesc}>Instant information on the National Cybercrime Helpline (1930).</p>
                        </div>

                        <div style={styles.featureCard}>
                            <div style={{ ...styles.featureIconBox, background: '#6366F115' }}>
                                <Building2 size={24} color="#6366F1" />
                            </div>
                            <h3 style={styles.featureTitle}>Bank & Account Support</h3>
                            <p style={styles.featureDesc}>Clear guidance on contacting banks and freezing accounts immediately.</p>
                        </div>

                        <div style={styles.featureCard}>
                            <div style={{ ...styles.featureIconBox, background: '#D9770615' }}>
                                <Camera size={24} color="#D97706" />
                            </div>
                            <h3 style={styles.featureTitle}>Evidence Preservation</h3>
                            <p style={styles.featureDesc}>Steps to preserve evidence such as transaction IDs and screenshots.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. About Innvikta ─────────────────────────────────────────── */}
            <section style={styles.sectionLight}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={styles.innviktaBox}>
                        <h2 style={styles.sectionTitle}>About Innvikta</h2>
                        <p style={{ ...styles.paragraph, maxWidth: '750px', margin: '1rem auto' }}>
                            <strong>Innvikta</strong> is a cybersecurity awareness and human risk management platform that helps organizations strengthen their security posture by addressing the human element of cybersecurity.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
                            <div style={styles.innviktaCheck}><CheckCircle2 size={18} color="#F97316" /> Security Awareness Training</div>
                            <div style={styles.innviktaCheck}><CheckCircle2 size={18} color="#F97316" /> Phishing Simulations</div>
                            <div style={styles.innviktaCheck}><CheckCircle2 size={18} color="#F97316" /> Behavioral Training</div>
                            <div style={styles.innviktaCheck}><CheckCircle2 size={18} color="#F97316" /> Security Culture</div>
                        </div>
                        <a href="https://innvikta.com/" target="_blank" rel="noopener noreferrer" style={styles.link}>
                            Visit our website <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 6. Data Transparency ──────────────────────────────────────── */}
            <section style={styles.sectionWhite}>
                <div className="container">
                    <h2 style={styles.sectionTitle}>Data We Collect</h2>
                    <p style={styles.paragraph}>
                        CyberHelp collects minimal, non-sensitive data to help us understand general cyber fraud patterns and improve awareness resources.
                    </p>
                    
                    <div style={styles.dataGrid}>
                        <div style={styles.dataItem}><Info size={18} color="var(--color-text-muted)" /> Type of fraud experienced</div>
                        <div style={styles.dataItem}><Info size={18} color="var(--color-text-muted)" /> Channel used (SMS, Call, Email, Social)</div>
                        <div style={styles.dataItem}><Info size={18} color="var(--color-text-muted)" /> Financial loss occurrence</div>
                        <div style={styles.dataItem}><Info size={18} color="var(--color-text-muted)" /> Approximate loss range (optional)</div>
                        <div style={styles.dataItem}><Info size={18} color="var(--color-text-muted)" /> General location (optional)</div>
                    </div>

                    <div style={styles.privacyHighlight}>
                        <Lock size={20} color="var(--color-accent-orange)" style={{ flexShrink: 0 }} />
                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                            We intentionally collect <strong>minimal, non-sensitive information</strong>. CyberHelp does not request or store confidential financial data such as bank account numbers, card details, passwords, OTPs, or Aadhaar numbers. The information is used only for <strong>awareness and research</strong>.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 7. Our Vision ─────────────────────────────────────────────── */}
            <section style={styles.sectionLight}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={styles.badge}><Target size={14} /> Our Vision</div>
                    <h2 style={styles.sectionTitle}>A Safer Digital Society</h2>
                    <p style={{ ...styles.paragraph, maxWidth: '800px', margin: '0 auto' }}>
                        Through CyberHelp, Innvikta aims to contribute to a more informed and cyber-aware society where individuals know how to respond quickly and responsibly to digital threats. We believe that <strong>awareness and timely action are critical</strong> in reducing the impact of cybercrime.
                    </p>
                </div>
            </section>

            {/* ── 8. Disclaimer ─────────────────────────────────────────────── */}
            <section style={styles.sectionWhite}>
                <div className="container">
                    <div style={styles.disclaimerBox}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                            <AlertTriangle size={20} color="var(--color-accent-amber)" />
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Important Disclaimer</h3>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                            CyberHelp provides <strong>general cybersecurity awareness and guidance only</strong>. It is not an official complaint registration system and does not replace government or law enforcement reporting mechanisms. If you experience fraud:
                        </p>
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            <div style={{ display: 'flex', gap: '10px' }}>• Call the National Cybercrime Helpline – 1930</div>
                            <div style={{ display: 'flex', gap: '10px' }}>• Inform your Bank or Payment Provider</div>
                            <div style={{ display: 'flex', gap: '10px' }}>• Report on <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-orange)' }}>cybercrime.gov.in</a></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Final Call To Action ─────────────────────────────────────────── */}
            <section style={styles.footerCta}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={styles.footerCtaTitle}>Stay Informed. Stay Protected.</h2>
                    <div style={styles.ctaActions}>
                        <a href="tel:1930" style={styles.ctaBtnPrimary} className="btn footer-cta-btn-primary">
                            <Phone size={18} /> Call Cyber Helpline 1930
                        </a>
                        <Link href="/cyberhelp/register" style={styles.ctaBtnSecondary} className="btn footer-cta-btn-secondary">
                            Explore Incident Guide <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

const styles = {
    page: {
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
    },
    hero: {
        padding: '2rem 0 1.5rem',
        background: 'var(--color-bg-hero)',
        borderBottom: '1px solid var(--color-border)',
    },
    heroInner: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
    },
    heroContent: {
        flex: 1,
        minWidth: '320px',
    },
    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0.4rem 1rem',
        background: 'var(--color-accent-orange-glow)',
        color: 'var(--color-accent-orange)',
        borderRadius: '100px',
        fontSize: '0.78rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '1.5rem',
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 900,
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        margin: '0 0 1.5rem',
        color: 'var(--color-text-primary)',
    },
    heroSubtitle: {
        fontSize: '1.25rem',
        lineHeight: 1.5,
        color: 'var(--color-text-secondary)',
        fontWeight: 500,
        margin: '0 0 1.5rem',
    },
    heroDesc: {
        fontSize: '1.05rem',
        lineHeight: 1.6,
        color: 'var(--color-text-muted)',
    },
    heroImageContainer: {
        flex: 1,
        minWidth: '320px',
        display: 'flex',
        justifyContent: 'center',
    },
    heroImage: {
        maxWidth: '100%',
        height: 'auto',
        background: 'var(--color-image-bg)',
        padding: '1rem',
        borderRadius: '24px',
    },
    sectionWhite: {
        padding: '2.5rem 0',
        background: 'var(--color-bg-primary)',
    },
    sectionLight: {
        padding: '2.5rem 0',
        background: 'var(--color-bg-secondary)',
    },
    sectionTitle: {
        fontSize: '1.75rem',
        fontWeight: 900,
        letterSpacing: '-0.02em',
        margin: '0 0 1rem',
        color: 'var(--color-text-primary)',
    },
    sectionSub: {
        fontSize: '1.1rem',
        color: 'var(--color-text-muted)',
        maxWidth: '700px',
        margin: '0 auto',
    },
    splitGrid: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap-reverse',
    },
    splitContent: {
        flex: 1,
        minWidth: '320px',
    },
    splitImageContainer: {
        flex: 1,
        minWidth: '320px',
    },
    splitImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '24px',
        background: 'var(--color-image-bg)',
        padding: '1rem',
    },
    paragraph: {
        fontSize: '1.05rem',
        lineHeight: 1.7,
        color: 'var(--color-text-secondary)',
        marginBottom: '1.5rem',
    },
    csrBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        background: 'var(--color-bg-card)',
        padding: '2rem',
        borderRadius: '24px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        flexWrap: 'wrap',
    },
    csrContent: {
        flex: 2,
    },
    csrFeatureGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginTop: '1.5rem',
    },
    csrFeature: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.92rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        whiteSpace: 'nowrap',
    },
    csrDot: {
        width: '8px',
        height: '8px',
        background: 'var(--color-accent-orange)',
        borderRadius: '50%',
    },
    csrBadgeContainer: {
        flex: 1,
        textAlign: 'center',
    },
    csrBadge: {
        maxWidth: '220px',
        height: 'auto',
        background: 'var(--color-image-bg)',
        padding: '1rem',
        borderRadius: '20px',
    },
    featureGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
    },
    featureCard: {
        padding: '2rem',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '24px',
        transition: 'all 0.3s ease',
    },
    featureIconBox: {
        width: '52px',
        height: '52px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem',
    },
    featureTitle: {
        fontSize: '1.15rem',
        fontWeight: 800,
        margin: '0 0 0.75rem',
    },
    featureDesc: {
        fontSize: '0.92rem',
        lineHeight: 1.6,
        color: 'var(--color-text-muted)',
        margin: 0,
    },
    innviktaBox: {
        maxWidth: '850px',
        margin: '0 auto',
    },
    innviktaCheck: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.92rem',
        fontWeight: 700,
        color: 'var(--color-text-secondary)'
    },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.95rem',
        fontWeight: 800,
        color: 'var(--color-accent-orange)',
        textDecoration: 'none',
        marginTop: '1rem',
    },
    dataGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        margin: '2rem 0',
    },
    dataItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
    },
    privacyHighlight: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        background: 'var(--color-accent-orange-glow)',
        border: '1px solid var(--color-border)',
        padding: '1.5rem 2rem',
        borderRadius: '16px',
        color: 'var(--color-text-secondary)',
    },
    disclaimerBox: {
        padding: '2rem',
        background: 'rgba(217, 119, 6, 0.05)',
        border: '1px solid rgba(217, 119, 6, 0.2)',
        borderRadius: '20px',
    },
    footerCta: {
        padding: '2rem 0',
        background: 'var(--color-accent-orange)',
        color: '#fff',
    },
    footerCtaTitle: {
        fontSize: '1.6rem',
        fontWeight: 900,
        marginBottom: '1rem',
        letterSpacing: '-0.02em',
        color: '#fff',
    },
    ctaActions: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1.25rem',
        flexWrap: 'wrap',
    },
    ctaBtnPrimary: {
        background: '#fff',
        color: 'var(--color-accent-orange)',
        padding: '0.85rem 2rem',
        borderRadius: '10px',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: 'none',
        fontSize: '0.95rem',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
    },
    ctaBtnSecondary: {
        background: 'rgba(255,255,255,0.15)',
        color: '#fff',
        padding: '0.85rem 2rem',
        borderRadius: '10px',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid rgba(255,255,255,0.25)',
        fontSize: '0.95rem',
        transition: 'all 0.3s ease',
    }
}
