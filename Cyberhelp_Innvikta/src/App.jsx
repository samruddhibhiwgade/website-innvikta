import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from './components/shared/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import EmergencyBanner from './components/EmergencyBanner.jsx'
import SectionCards from './components/SectionCards.jsx'
import TriageBot from './components/TriageBot.jsx'
import FilingGuide from './components/FilingGuide.jsx'
import FreezeDashboard from './components/FreezeDashboard.jsx'
import ContactDirectory from './components/ContactDirectory.jsx'
import UnifiedDirectory from './components/UnifiedDirectory.jsx'
import BankHelplineDirectory from './components/BankHelplineDirectory.jsx'
import SocialMediaDirectory from './components/SocialMediaDirectory.jsx'
import EvidenceVault from './components/EvidenceVault.jsx'
import ReportingTemplates from './components/ReportingTemplates.jsx'
import ScamSimulator from './components/ScamSimulator.jsx'
import AboutUs from './components/AboutUs.jsx'
import LegalAid from './components/LegalAid.jsx'
import CyberIncidentGuide from './components/CyberIncidentGuide.jsx'
import CyberAlerts from './components/CyberAlerts.jsx'
import AdminPortal from './components/AdminPortal.jsx'
import FaqSection from './components/FaqSection.jsx'
import DisclaimerPopup from './components/shared/DisclaimerPopup.jsx'
import Footer from './components/shared/Footer.jsx'
import './App.css'

const sectionComponents = {
    'register': { component: CyberIncidentGuide, title: 'Cyber Incident Guide' },
    'triage': { component: TriageBot, title: 'Report Crime' },
    'filing-guide': { component: FilingGuide, title: 'NCRP Filing Guide' },
    'freeze': { component: FreezeDashboard, title: 'Freeze Accounts' },
    'contacts': { component: ContactDirectory, title: 'National Contacts' },
    'directory': { component: UnifiedDirectory, title: 'Contacts' },
    'banks': { component: BankHelplineDirectory, title: 'Bank Helplines' },
    'social': { component: SocialMediaDirectory, title: 'Social Media Grievance' },
    'evidence': { component: EvidenceVault, title: 'Evidence Vault' },
    'templates': { component: ReportingTemplates, title: 'Reporting Templates' },
    'simulate': { component: ScamSimulator, title: 'Scam Simulator' },
    'legal': { component: LegalAid, title: 'Legal Aid & Resources' },
    'about': { component: AboutUs, title: 'About CyberHelp' },
    'faq': { component: FaqSection, title: 'Frequently Asked Questions' },
    'alerts': { component: CyberAlerts, title: 'Cyber Alerts' },
    'admin': { component: AdminPortal, title: 'Admin Registry' }
}

function getInitialTheme() {
    const saved = localStorage.getItem('cyberhelp-theme')
    if (saved) return saved
    return 'light'
}

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

function SectionView({ children }) {
    return (
        <div className="section-view">
            <div className="container back-bar">
                <Link to="/" className="btn back-btn">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </div>
            <section className="section">
                {children}
            </section>
        </div>
    )
}

function Home() {
    return (
        <>
            <HeroSection />
            <EmergencyBanner />
            <SectionCards />
            <FaqSection />
        </>
    )
}

export default function App() {
    const [theme, setTheme] = useState(getInitialTheme)
    const location = useLocation()
    const isHome = location.pathname === '/'

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('cyberhelp-theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

    return (
        <div className="app">
            <ScrollToTop />
            <DisclaimerPopup />
            <Navbar theme={theme} onToggleTheme={toggleTheme} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {Object.entries(sectionComponents).map(([id, { component: Component }]) => (
                        <Route 
                            key={id} 
                            path={`/${id}`} 
                            element={
                                <SectionView>
                                    <Component />
                                </SectionView>
                            } 
                        />
                    ))}
                    {/* Backward compatibility for the old /admin-view path if needed */}
                    <Route path="/admin-view" element={<SectionView><AdminPortal /></SectionView>} />
                </Routes>
            </main>
            <Footer showCta={isHome} />
        </div>
    )
}
