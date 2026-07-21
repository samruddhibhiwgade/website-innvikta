"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
const logoLight = '/images/cyberhelp/assets/Logodark.png'
const logoDark = '/images/cyberhelp/assets/logo.png'

const navLinks = [
    { id: 'about', label: 'About Us' },
    { id: 'freeze', label: 'Freeze Accounts' },
    { id: 'directory', label: 'Contacts' },
    { id: 'banks', label: 'Bank Helpline' },
    { id: 'evidence', label: 'Evidence Vault' },
    { id: 'simulate', label: 'Learn' },
    { id: 'alerts', label: 'Cyberfraud Alert' },
    { id: 'faq', label: 'FAQ' },
]

export default function Navbar({ theme, onToggleTheme }) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="nav-inner">
                <Link href="/" onClick={() => setMobileOpen(false)} className="nav-brand">
                    <div className="nav-logo-wrapper">
                        <img
                            src={theme === 'dark' ? logoDark : logoLight}
                            alt="Innvikta CyberHelp"
                            className="nav-logo"
                        />
                    </div>
                </Link>

                <div className={`nav-links ${mobileOpen ? 'nav-links-open' : ''}`}>
                    <div className="nav-links-container">
                        {navLinks.map(link => (
                            <Link
                                key={link.id}
                                href={`/${link.id}`}
                                onClick={() => setMobileOpen(false)}
                                className="nav-link-btn nav-mobile-item"
                                style={{ textDecoration: 'none' }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mobile-cta-wrapper">
                            <a href="tel:1930" className="btn btn-emergency mobile-emergency-btn">
                                <Phone size={16} /> Call 1930
                            </a>
                        </div>
                    </div>
                </div>

                <div className="nav-actions">
                    <a href="tel:1930" className="nav-call-btn" aria-label="Call 1930 Cybercrime Helpline">
                        <Phone size={14} /> 1930
                    </a>
                    <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                    <button
                        className="hamburger-btn"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>
        </nav>
    )
}
