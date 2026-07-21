"use client";
import React from 'react'
import Link from 'next/link'
import {
    FileText, Snowflake, Phone,
    Building2, MapPin, Landmark, Users,
    FolderOpen, ClipboardList, Gamepad2, Scale, ChevronRight, ClipboardCheck,
    Bell
} from 'lucide-react'

const sections = [
    { id: 'register', title: 'Incident Guide', icon: ClipboardCheck, desc: 'Step-by-step guidance for victim reporting.', color: '#16A34A' },

    { id: 'filing-guide', title: 'Filing Guide', icon: FileText, desc: 'Step-by-step NCRP complaint filing walkthrough.', color: '#F97316' },
    { id: 'freeze', title: 'Freeze Accounts', icon: Snowflake, desc: 'Emergency dashboard to freeze bank & UPI accounts.', color: '#0EA5E9' },
    { id: 'directory', title: 'Contacts', icon: MapPin, desc: 'National, state, and local cyber help directory searchable by PIN.', color: '#F97316' },
    { id: 'banks', title: 'Bank Helpline', icon: Building2, desc: '24/7 fraud reporting & credit card helplines.', color: '#4682B4' },
    { id: 'social', title: 'Social Media', icon: Users, desc: 'Platform grievance officers under IT Rules 2021.', color: '#6366F1' },
    { id: 'evidence', title: 'Evidence Vault', icon: FolderOpen, desc: 'Organize, store, and export your evidence.', color: '#D97706' },
    { id: 'templates', title: 'Report Templates', icon: ClipboardList, desc: 'Pre-built complaint letters ready to submit.', color: '#0D9488' },
    { id: 'simulate', title: 'Scam Simulator', icon: Gamepad2, desc: 'Test your scam detection skills interactively.', color: '#E11D48' },
    { id: 'legal', title: 'Legal Aid', icon: Scale, desc: 'Recovery resources, compensation, and NGO support.', color: '#7C3AED' },
    { id: 'alerts', title: 'Cyber Alerts', icon: Bell, desc: 'Latest fraud alerts, scam warnings, and safety tips.', color: '#F97316' },
];

export default function SectionCards() {
    return (
        <div className="section-cards-wrapper">
            <div className="container">
                <h2 className="section-cards-heading">WHAT DO YOU NEED?</h2>
                <p className="section-cards-sub">Select a tool to get started. Everything you need is one click away.</p>
                <div className="section-cards-grid">
                    {sections.map(s => {
                        const Icon = s.icon
                        return (
                            <Link
                                key={s.id}
                                href={`/cyberhelp/${s.id}`}
                                className="card section-card"
                                aria-label={`Open ${s.title}`}
                                style={{ textDecoration: 'none', textAlign: 'left', display: 'block' }}
                            >
                                <div className="section-card-icon" style={{ background: `${s.color}15`, borderColor: `${s.color}30` }}>
                                    <Icon size={24} color={s.color} />
                                </div>
                                <h3 className="section-card-title">{s.title}</h3>
                                <p className="section-card-desc">{s.desc}</p>
                                <span className="section-card-explore">
                                    Explore <ChevronRight size={14} />
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
