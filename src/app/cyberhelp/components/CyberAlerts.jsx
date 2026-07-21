"use client";
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
    Search, Filter, Bell, ShieldAlert, Lock, 
    Smartphone, QrCode, Briefcase, TrendingUp, 
    Mail, Headphones, UserX, Package, Monitor, 
    Info, ChevronRight, X, Phone, Globe
} from 'lucide-react';

const ALERT_DATA = [
    {
        id: 1,
        title: "UPI Payment Request Scam Alert",
        category: "Fraud Alert",
        date: "March 08, 2024",
        icon: Smartphone,
        summary: "Fraudsters send fake payment requests claiming you will receive money. Approving transfers money FROM you.",
        content: {
            description: "Digital payment platforms such as UPI have made financial transactions faster and more convenient. However, fraudsters increasingly exploit this system by sending fake payment requests.",
            mechanics: [
                "Victims receive a message or call claiming they will receive money.",
                "Fraudsters send a payment request through a UPI app.",
                "The victim approves the request believing they will receive funds.",
                "Money is deducted from the victim’s account."
            ],
            safetyTips: [
                "Never approve unknown payment requests.",
                "Remember that UPI approval sends money, not receives it.",
                "Verify requests before confirming any payment."
            ]
        }
    },
    {
        id: 2,
        title: "QR Code Scam Warning",
        category: "Scam Warning",
        date: "March 07, 2024",
        icon: QrCode,
        summary: "Scammers use QR codes for 'refunds' or 'rewards'. Scanning and authorizing transfers money to the fraudster.",
        content: {
            description: "QR codes are widely used for digital payments, but scammers have found ways to misuse them. Fraudsters may send QR codes claiming they are required to receive refunds, rewards, or payments.",
            scenarios: [
                "Refund scams",
                "Online marketplace transactions",
                "Fake customer support assistance"
            ],
            safetyTips: [
                "QR codes are used to send money, not receive it.",
                "Avoid scanning QR codes sent by unknown individuals.",
                "Confirm the authenticity of the payment request."
            ]
        }
    },
    {
        id: 3,
        title: "Fake Job Offer Scams",
        category: "Scam Warning",
        date: "March 06, 2024",
        icon: Briefcase,
        summary: "Targeting job seekers with fake remote roles asking for upfront registration or training fees.",
        content: {
            description: "Fraudsters often target job seekers by offering fake employment opportunities, particularly remote or work-from-home positions. Victims are asked to pay registration fees, training charges, or security deposits.",
            signs: [
                "Job offers without interviews",
                "Requests for registration or training fees",
                "Communication through unofficial messaging platforms"
            ],
            safetyTips: [
                "Legitimate employers do not ask for upfront payments.",
                "Verify company credentials before accepting offers."
            ]
        }
    },
    {
        id: 4,
        title: "Online Investment Scam Alert",
        category: "Fraud Alert",
        date: "March 05, 2024",
        icon: TrendingUp,
        summary: "Promises of high guaranteed returns through fake trading apps or cryptocurrency schemes.",
        content: {
            description: "Investment scams are increasingly promoted through social media groups and messaging platforms. Fraudsters promise high and guaranteed returns through fake trading apps.",
            signs: [
                "Guaranteed profit claims",
                "Pressure to invest quickly",
                "Unregulated trading platforms"
            ],
            safetyTips: [
                "Always verify investment platforms with regulatory authorities.",
                "Avoid schemes promising unrealistic returns."
            ]
        }
    },
    {
        id: 5,
        title: "Phishing Email and SMS Scam",
        category: "Scam Warning",
        date: "March 04, 2024",
        icon: Mail,
        summary: "Pretending to be banks or government agencies with urgent links leading to fake websites.",
        content: {
            description: "Phishing attacks attempt to steal sensitive information such as passwords, banking details, and login credentials via fake websites that mimic legitimate services.",
            signs: [
                "Urgent requests for account verification",
                "Suspicious links",
                "Unusual sender email addresses"
            ],
            safetyTips: [
                "Avoid clicking unknown links.",
                "Verify communications through official websites."
            ]
        }
    },
    {
        id: 6,
        title: "Fake Customer Support Calls",
        category: "Scam Warning",
        date: "March 03, 2024",
        icon: Headphones,
        summary: "Impersonators asking for OTPs or remote access to 'resolve' fake issues with your account.",
        content: {
            description: "Fraudsters impersonate customer support representatives from banks, payment apps, or telecom companies to steal confidential information.",
            safetyTips: [
                "Never share OTP or PIN with anyone.",
                "Banks do not ask for confidential information over phone calls."
            ]
        }
    },
    {
        id: 7,
        title: "Social Media Account Compromise",
        category: "Awareness",
        date: "March 02, 2024",
        icon: UserX,
        summary: "Hacked accounts used to request money from friends. Protect yourself with 2FA.",
        content: {
            description: "Cybercriminals may gain access to social media accounts through phishing links or password theft to exploit your network.",
            safetyTips: [
                "Enable two-factor authentication.",
                "Use strong and unique passwords."
            ]
        }
    },
    {
        id: 8,
        title: "Fake Delivery Payment Scam",
        category: "Scam Warning",
        date: "March 01, 2024",
        icon: Package,
        summary: "Messages claiming a parcel is pending and requires a 'small' payment via fraudulent links.",
        content: {
            description: "Victims receive messages claiming that a parcel delivery is pending and a small payment is required to release it.",
            safetyTips: [
                "Verify delivery notifications through official courier websites.",
                "Avoid clicking payment links in unsolicited messages."
            ]
        }
    },
    {
        id: 9,
        title: "Screen Sharing Fraud",
        category: "Fraud Alert",
        date: "Feb 28, 2024",
        icon: Monitor,
        summary: "Fraudsters ask you to install remote access apps to 'assist' you, then steal banking details.",
        content: {
            description: "Fraudsters may ask victims to install screen-sharing applications claiming they will assist with refunds or customer support.",
            safetyTips: [
                "Never install apps suggested by unknown callers.",
                "Avoid granting remote access to strangers."
            ]
        }
    },
    {
        id: 10,
        title: "Report Cyber Fraud Quickly",
        category: "Safety Tips",
        date: "Feb 27, 2024",
        icon: Info,
        summary: "Immediate steps to take if you experience financial cyber fraud. Act within the golden hour.",
        content: {
            description: "If you experience financial cyber fraud, act immediately to increase the chances of recovery.",
            steps: [
                "Call the National Cybercrime Helpline – 1930",
                "Inform your bank or payment provider",
                "Report the incident at cybercrime.gov.in",
                "Preserve evidence such as screenshots and transaction IDs"
            ]
        }
    }
];

const CATEGORIES = ["All Alerts", "Fraud Alert", "Scam Warning", "Safety Tips", "Awareness"];

export default function CyberAlerts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All Alerts');
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [realTimeAlerts, setRealTimeAlerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const alertsPerPage = 9;

    const fetchNews = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // First attempt: fetch from local PHP API using absolute URL
            const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";
            const response = await fetch(`${backendUrl}/api/get_news.php`);
            if (response.ok) {
                const data = await response.json();
                const mappedAlerts = data.map(item => ({
                    ...item,
                    icon: Bell
                }));
                setRealTimeAlerts(mappedAlerts);
                return;
            }
            throw new Error('Local server API unreachable');
        } catch (err) {
            console.warn('Local API failed, checking for localhost fallback...', err);
            
            // Second attempt: If on localhost, try direct GNews fetch
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                try {
                    const apiKey = process.env.VITE_GNEWS_API_KEY;
                    if (apiKey) {
                        const query = encodeURIComponent('"cyber fraud" OR "cybercrime alert" OR "online scam"');
                        const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=9&sortby=publishedAt&apikey=${apiKey}`;
                        const directRes = await fetch(url);
                        const directData = await directRes.json();
                        
                        if (directRes.ok && directData.articles) {
                            const mappedDirect = directData.articles.map((article, index) => ({
                                id: `news-fallback-${index}`,
                                title: article.title,
                                category: "Latest News (Direct)",
                                date: new Date(article.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long', day: 'numeric', year: 'numeric'
                                }),
                                icon: Bell,
                                summary: article.description,
                                content: {
                                    description: article.content,
                                    source: article.source.name,
                                    url: article.url,
                                    image: article.image
                                }
                            }));
                            setRealTimeAlerts(mappedDirect);
                            return;
                        }
                    }
                } catch (directErr) {
                    console.error('Direct fallback also failed:', directErr);
                }
            }

            // Final attempt: Fallback to static data
            setError(err.message);
            setRealTimeAlerts(ALERT_DATA.slice(0, 9).map(alert => ({
                ...alert,
                category: "Alert (Offline)"
            })));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    // Reset to page 1 when search or tab changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeTab]);

    const filteredAlerts = useMemo(() => {
        // Combine real-time news (if any) with static curated alerts
        const combined = [...realTimeAlerts, ...ALERT_DATA];
        
        return combined.filter(alert => {
            // Show item if it matches the current tab, or if it's 'Latest News' and we are on 'Fraud Alert' tab
            const matchesTab = activeTab === 'All Alerts' || 
                               alert.category === activeTab || 
                               (activeTab === 'Fraud Alert' && (
                                   alert.category === 'Latest News' || 
                                   alert.category === 'Latest News (Direct)' ||
                                   alert.category === 'Alert (Offline)'
                               ));
                               
            const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 alert.summary.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [searchTerm, activeTab, realTimeAlerts]);

    // Paginate the filtered alerts
    const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);
    const paginatedAlerts = useMemo(() => {
        const startIndex = (currentPage - 1) * alertsPerPage;
        return filteredAlerts.slice(startIndex, startIndex + alertsPerPage);
    }, [filteredAlerts, currentPage, alertsPerPage]);

    return (
        <div className="cyber-alerts-page">
            <div className="container">
                <div className="alerts-header animate-fade-in">
                    <div className="alerts-title-group">
                        <h1 className="alerts-main-title">Latest Cyber Alerts</h1>
                        <p className="alerts-subtitle">
                            Stay informed about emerging cyber fraud tactics and learn how to protect yourself online.
                        </p>
                    </div>

                    <div className="alerts-controls">
                        <div className="search-box-wrapper">
                            <Search className="search-icon" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search alerts..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="alerts-search-input"
                            />
                        </div>
                    </div>

                    <div className="alerts-filter-tabs">
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`filter-tab ${activeTab === cat ? 'active' : ''}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="alerts-grid animate-fade-in">
                    {isLoading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Fetching latest cyber alerts...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state no-alerts-state">
                            <ShieldAlert size={48} className="no-alerts-icon" />
                            <h3>Failed to load latest news</h3>
                            <p>{error}</p>
                            <button onClick={() => fetchNews()} className="btn-retry">Retry Connection</button>
                        </div>
                    ) : paginatedAlerts.length > 0 ? (
                        paginatedAlerts.map(alert => (
                            <div key={alert.id} className="alert-card card">
                                <div className="alert-card-header">
                                    <div className="alert-icon-bg">
                                        <alert.icon size={20} className="alert-icon" />
                                    </div>
                                    <span className={`alert-category-tag ${alert.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                                        {alert.category}
                                    </span>
                                </div>
                                <h3 className="alert-card-title">{alert.title}</h3>
                                <p className="alert-card-summary">{alert.summary}</p>
                                <div className="alert-card-footer">
                                    <span className="alert-date">{alert.date}</span>
                                    <button 
                                        className="btn-read-more"
                                        onClick={() => setSelectedAlert(alert)}
                                    >
                                        Read More <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-alerts-state">
                            <ShieldAlert size={48} className="no-alerts-icon" />
                            <h3>No alerts found matching your criteria.</h3>
                            <p>Try adjusting your search or category filter.</p>
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="pagination-controls animate-fade-in">
                        <button 
                            className="btn-pagination" 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Previous
                        </button>
                        <span className="page-indicator">Page {currentPage} of {totalPages}</span>
                        <button 
                            className={`btn-pagination ${currentPage === totalPages ? 'disabled' : ''}`}
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}

                <div className="alerts-bottom-cta animate-fade-in">
                    <p>
                        If you experience cyber fraud, contact the <strong>National Cybercrime Helpline (1930)</strong> or report the incident at <strong>cybercrime.gov.in</strong>.
                    </p>
                </div>
            </div>

            {/* Modal */}
            {selectedAlert && (
                <div className="alert-modal-overlay" onClick={() => setSelectedAlert(null)}>
                    <div className="alert-modal-content card" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedAlert(null)}>
                            <X size={24} />
                        </button>
                        
                        <div className="modal-header">
                            <div className="modal-icon-group">
                                <div className="alert-icon-bg large">
                                    <selectedAlert.icon size={32} className="alert-icon" />
                                </div>
                                <div>
                                    <span className="modal-category">{selectedAlert.category}</span>
                                    <h2 className="modal-title">{selectedAlert.title}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="modal-body">
                            {selectedAlert.content.image && (
                                <div className="modal-image-container">
                                    <img src={selectedAlert.content.image} alt={selectedAlert.title} className="modal-article-image" />
                                </div>
                            )}
                            
                            <div className="modal-section">
                                <p className="modal-description">{selectedAlert.content.description}</p>
                            </div>

                            {selectedAlert.content.source && (
                                <div className="modal-section source-info">
                                    <p>Source: <strong>{selectedAlert.content.source}</strong></p>
                                    <a href={selectedAlert.content.url} target="_blank" rel="noopener noreferrer" className="article-link">
                                        Read full article <Globe size={14} />
                                    </a>
                                </div>
                            )}

                            {selectedAlert.content.mechanics && (
                                <div className="modal-section">
                                    <h4>How the Scam Works</h4>
                                    <ul className="modal-list">
                                        {selectedAlert.content.mechanics.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedAlert.content.scenarios && (
                                <div className="modal-section">
                                    <h4>Common Scenarios</h4>
                                    <ul className="modal-list">
                                        {selectedAlert.content.scenarios.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedAlert.content.signs && (
                                <div className="modal-section">
                                    <h4>Common Warning Signs</h4>
                                    <ul className="modal-list">
                                        {selectedAlert.content.signs.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedAlert.content.steps && (
                                <div className="modal-section">
                                    <h4>Immediate Steps</h4>
                                    <ul className="modal-list highlighted">
                                        {selectedAlert.content.steps.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedAlert.content.safetyTips && (
                                <div className="modal-section safety-tips-box">
                                    <h4><Lock size={18} /> Safety Tips</h4>
                                    <ul className="modal-list">
                                        {selectedAlert.content.safetyTips.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <div className="modal-emergency-cta">
                                <div className="cta-icon-box">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <strong>REPORT IMMEDIATELY</strong>
                                    <span>Dial 1930 for Cybercrime Helpline</span>
                                </div>
                                <a href="tel:1930" className="btn-modal-call">Call 1930</a>
                            </div>
                            <div className="modal-emergency-cta secondary">
                                <div className="cta-icon-box">
                                    <Globe size={18} />
                                </div>
                                <div>
                                    <strong>FILE ONLINE</strong>
                                    <span>cybercrime.gov.in</span>
                                </div>
                                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="btn-modal-web">Visit Portal</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .cyber-alerts-page {
                    padding-bottom: 5rem;
                }
                .alerts-header {
                    margin-bottom: 3rem;
                    text-align: center;
                }
                .alerts-main-title {
                    font-size: 2.5rem;
                    font-weight: 900;
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                }
                .alerts-subtitle {
                    color: var(--color-text-secondary);
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto 2rem;
                }
                .alerts-controls {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2rem;
                }
                .search-box-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                }
                .search-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--color-text-muted);
                }
                .alerts-search-input {
                    width: 100%;
                    padding: 0.9rem 1rem 0.9rem 3rem;
                    border: 1px solid var(--color-border);
                    border-radius: 999px;
                    background: var(--color-bg-card);
                    font-size: 1rem;
                    transition: all 0.2s ease;
                }
                .alerts-search-input:focus {
                    outline: none;
                    border-color: var(--color-accent-orange);
                    box-shadow: 0 0 0 3px var(--color-accent-orange-glow);
                }
                .alerts-filter-tabs {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                }
                .filter-tab {
                    padding: 0.5rem 1.25rem;
                    border-radius: 999px;
                    border: 1px solid var(--color-border);
                    background: var(--color-bg-card);
                    color: var(--color-text-secondary);
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .filter-tab:hover {
                    border-color: var(--color-accent-orange);
                    color: var(--color-accent-orange);
                }
                .filter-tab.active {
                    background: var(--color-accent-orange);
                    border-color: var(--color-accent-orange);
                    color: white;
                }
                .alerts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 4rem;
                }
                .alert-card {
                    display: flex;
                    flex-direction: column;
                    padding: 1.75rem;
                }
                .alert-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.25rem;
                }
                .alert-icon-bg {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: var(--color-accent-orange-glow);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .alert-icon {
                    color: var(--color-accent-orange);
                }
                .alert-category-tag {
                    font-size: 0.7rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    padding: 0.25rem 0.75rem;
                    border-radius: 4px;
                    letter-spacing: 0.05em;
                }
                .alert-category-tag.fraud-alert { background: #FEE2E2; color: #DC2626; }
                .alert-category-tag.scam-warning { background: #FEF3C7; color: #D97706; }
                .alert-category-tag.awareness { background: #E0E7FF; color: #4338CA; }
                .alert-category-tag.safety-tips { background: #DCFCE7; color: #15803D; }
                .alert-category-tag.latest-news { background: #E0F2FE; color: #0369A1; }
                .alert-category-tag.latest-news-direct { background: #F0F9FF; color: #0284C7; }
                .alert-category-tag.alert-offline { background: #F3F4F6; color: #4B5563; }
                
                .btn-retry {
                    margin-top: 1rem;
                    padding: 0.5rem 1.5rem;
                    background: var(--color-accent-orange);
                    color: white;
                    border: none;
                    border-radius: 999px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .pagination-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                    margin: 3rem 0;
                }
                .btn-pagination {
                    padding: 0.75rem 2rem;
                    background: var(--color-bg-card);
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    font-weight: 700;
                    color: var(--color-text-primary);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .btn-pagination:hover:not(:disabled) {
                    border-color: var(--color-accent-orange);
                    color: var(--color-accent-orange);
                    transform: translateY(-2px);
                }
                .btn-pagination:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .page-indicator {
                    font-weight: 800;
                    color: var(--color-text-secondary);
                    font-size: 0.95rem;
                }

                .alert-card-title {
                    font-size: 1.15rem;
                    font-weight: 800;
                    margin-bottom: 0.75rem;
                    line-height: 1.3;
                    color: var(--color-text-primary);
                }
                .alert-card-summary {
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    flex: 1;
                }
                .alert-card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1.25rem;
                    border-top: 1px solid var(--color-border);
                }
                .alert-date {
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                    font-weight: 600;
                }
                .btn-read-more {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    color: var(--color-accent-orange);
                    font-weight: 800;
                    font-size: 0.85rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: gap 0.2s ease;
                }
                .btn-read-more:hover {
                    gap: 8px;
                }
                .no-alerts-state {
                    grid-column: 1 / -1;
                    padding: 4rem 2rem;
                    text-align: center;
                }
                .no-alerts-icon {
                    color: var(--color-text-muted);
                    margin-bottom: 1rem;
                    opacity: 0.5;
                }
                .alerts-bottom-cta {
                    background: #FFF7ED;
                    border: 1px solid #FFEDD5;
                    border-radius: 12px;
                    padding: 1.5rem;
                    text-align: center;
                    color: #9A3412;
                    font-size: 0.95rem;
                }

                /* Modal Styles */
                .alert-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                }
                .alert-modal-content {
                    width: 95%;
                    max-width: 1200px;
                    max-height: 95vh;
                    background: var(--color-bg-primary);
                    position: relative;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    animation: modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                @keyframes modalScale {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .modal-close-btn {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.2s ease;
                }
                .modal-close-btn:hover {
                    background: var(--color-accent-orange);
                    color: white;
                    border-color: var(--color-accent-orange);
                }
                .modal-header {
                    padding: 1.5rem 2.5rem 1.25rem;
                    border-bottom: 1px solid var(--color-border);
                    background: var(--color-bg-secondary);
                }
                .modal-icon-group {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                }
                .alert-icon-bg.large {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                }
                .modal-category {
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: var(--color-accent-orange);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.25rem;
                    display: block;
                }
                .modal-title {
                    font-size: 1.65rem;
                    font-weight: 800;
                    margin-bottom: 0.25rem;
                    line-height: 1.3;
                    letter-spacing: -0.01em;
                    color: var(--color-text-primary);
                }
                .modal-body {
                    padding: 2rem 2.5rem;
                    overflow-y: auto;
                    flex: 1;
                }
                .modal-section {
                    margin-bottom: 2rem;
                }
                .modal-section h4 {
                    font-size: 1.1rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--color-text-primary);
                }
                .modal-list {
                    list-style: none;
                }
                .modal-list li {
                    position: relative;
                    padding-left: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: var(--color-text-secondary);
                    font-size: 1rem;
                    line-height: 1.5;
                }
                .modal-list li::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 10px;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--color-accent-orange);
                }
                .modal-list.highlighted li::before {
                    background: #DC2626;
                }
                .safety-tips-box {
                    background: #F0FDF4;
                    padding: 1.5rem;
                    border-radius: 12px;
                    border: 1px solid #DCFCE7;
                }
                .safety-tips-box h4 {
                    color: #15803D;
                    margin-bottom: 0.75rem;
                }
                .modal-description {
                    font-size: 1.25rem;
                    line-height: 1.7;
                    color: var(--color-text-secondary);
                }
                .modal-footer {
                    padding: 1.5rem 2.5rem;
                    border-top: 1px solid var(--color-border);
                    background: var(--color-bg-secondary);
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                .modal-emergency-cta {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }
                .modal-emergency-cta strong {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 900;
                }
                .modal-emergency-cta span {
                    font-size: 0.9rem;
                    color: var(--color-text-muted);
                }
                .cta-icon-box {
                    width: 40px;
                    height: 40px;
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-accent-orange);
                }
                .btn-modal-call {
                    margin-left: auto;
                    background: var(--color-accent-orange);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 800;
                    font-size: 0.95rem;
                }
                .btn-modal-web {
                    margin-left: auto;
                    background: white;
                    color: var(--color-text-primary);
                    border: 1px solid var(--color-border);
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 800;
                    font-size: 0.95rem;
                }
                
                .loading-state {
                    grid-column: 1 / -1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem 2rem;
                    gap: 1.5rem;
                }
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid var(--color-accent-orange-glow);
                    border-top-color: var(--color-accent-orange);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .modal-image-container {
                    margin-bottom: 1.5rem;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    border: 1px solid var(--color-border);
                }
                .modal-article-image {
                    width: 100%;
                    height: auto;
                    display: block;
                    max-height: 300px;
                    object-fit: cover;
                }
                .source-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: var(--color-bg-secondary);
                    border-radius: 8px;
                    margin-bottom: 2rem;
                }
                .source-info p { margin: 0; font-size: 0.9rem; }
                .article-link {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: var(--color-accent-orange);
                    font-weight: 800;
                    font-size: 0.9rem;
                    text-decoration: none;
                }
                .article-link:hover { text-decoration: underline; }
                
                @media (max-width: 768px) {
                    .modal-footer { grid-template-columns: 1fr; }
                    .modal-header, .modal-body, .modal-footer { padding: 1.5rem; }
                    .modal-title { font-size: 1.4rem; }
                    .alert-modal-content { max-height: 95vh; }
                }

                @media (max-width: 600px) {
                    .alerts-main-title { font-size: 1.8rem; }
                    .alerts-subtitle { font-size: 1rem; }
                    .alerts-grid { grid-template-columns: 1fr; }
                    .source-info { flex-direction: column; gap: 1rem; align-items: flex-start; }
                }
            `}</style>
        </div>
    );
}
