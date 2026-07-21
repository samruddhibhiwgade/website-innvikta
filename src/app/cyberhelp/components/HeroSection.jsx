"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, FileText, Clock, Send, ShieldAlert, ChevronRight, RefreshCw } from 'lucide-react'

export default function HeroSection() {
    const [newsItems, setNewsItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";
                const res = await fetch(`${backendUrl}/api/get_news.php?limit=10`)
                if (res.ok) {
                    const data = await res.json()
                    // If response is the raw array (which get_news.php does)
                    if (Array.isArray(data) && data.length > 0) {
                        setNewsItems(data)
                    } 
                    // Fallback for wrapped response
                    else if (data && data.success && Array.isArray(data.news)) {
                        setNewsItems(data.news)
                    }
                }
            } catch (err) {
                console.error("Ticker fetch error:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchNews()
    }, [])

    // Only use dynamic news items as requested
    const allItems = newsItems.length > 0 
        ? newsItems.map(n => `NEWS: ${n.title}`)
        : []

    // Duplicate for seamless loop if we have items
    const displayItems = allItems.length > 0 ? [...allItems, ...allItems] : []

    return (
        <div className="hero-section">
            <div className="container hero-inner">
                <div className="hero-content animate-fade-in">
                    <h1 className="hero-title">
                        Victim of Cyberfraud? <span className="hero-highlight">We’re Here to Help You</span> Fight Back.
                    </h1>
                    <p className="hero-desc">
                        A step-by-step guide to help you report fraud and protect your digital assets.
                    </p>
                    <div className="hero-actions">
                        <a href="tel:1930" className="btn hero-btn-red">
                            <Phone size={18} /> CALL HELPLINE 1930
                        </a>
                        <Link href="/cyberhelp/register" className="hero-btn-black" style={{ textDecoration: 'none' }}>
                            <Send size={18} /> Cyber Incident Guide
                        </Link>
                    </div>
                    <p className="hero-disclaimer">
                        Innvikta provides guidance only. Please verify official numbers and links before taking action.
                    </p>
                </div>
            </div>

            {/* Cyber Alerts Bulletin Ticker */}
            <div className="hero-alerts-ticker">
                <div className="ticker-label">
                    <ShieldAlert size={14} />
                    <span>LATEST ALERTS</span>
                </div>
                <div className="ticker-content-wrapper">
                    <div className="ticker-content">
                        {displayItems.length > 0 ? (
                            displayItems.map((item, idx) => (
                                <span key={idx} className="ticker-item">
                                    {item.startsWith('NEWS:') ? 
                                        <>🚩 <strong>HEADLINE:</strong> {item.replace('NEWS: ', '')}</> : 
                                        <>⚠️ <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</>
                                    }
                                </span>
                            ))
                        ) : (
                            <span className="ticker-item">Loading latest fraud alerts and news...</span>
                        )}
                    </div>
                </div>
                <Link href="/cyberhelp/alerts" className="ticker-more" style={{ textDecoration: 'none' }}>
                    View All <ChevronRight size={14} />
                </Link>
            </div>
        </div>
    )
}
