"use client";
import React, { useState, useMemo, useEffect } from 'react'
import { 
    Search, MapPin, Landmark, Globe, Smartphone, Phone, Mail, 
    Building, FileText, Scale, ArrowUp, X, Shield, Info,
    ChevronRight, ExternalLink, AlertCircle
} from 'lucide-react'
import districtData from '../data/districtDirectory.json'
import contactDatabase from '../data/contactDatabase.json'

// Helper to find state data across different JSON structures
const findStateInDistrictData = (name) => {
    return districtData.find(s => 
        s.state.toLowerCase() === name.toLowerCase() || 
        name.toLowerCase().includes(s.state.toLowerCase())
    )
}


export default function UnifiedDirectory() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [pincode, setPincode] = useState('')
    const [pincodeError, setPincodeError] = useState('')
    const [isSearchingPincode, setIsSearchingPincode] = useState(false)
    const [activeTab, setActiveTab] = useState('local') // local, state, national

    // All available states for manual selection
    const allStates = useMemo(() => {
        return districtData.map(s => s.state).sort()
    }, [])

    // Derived data based on selection
    const stateDistrictInfo = useMemo(() => findStateInDistrictData(selectedState), [selectedState])
    
    const districtInfo = useMemo(() => {
        if (!stateDistrictInfo || !selectedDistrict) return null
        return stateDistrictInfo.districts.find(d => d.district === selectedDistrict)
    }, [stateDistrictInfo, selectedDistrict])

    // National portals from contactDatabase
    const nationalPortals = contactDatabase.national_portals

    const handlePincodeSearch = async () => {
        if (!pincode || pincode.length !== 6) {
            setPincodeError('Please enter a valid 6-digit PIN code')
            return
        }

        setPincodeError('')
        setIsSearchingPincode(true)

        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            const data = await res.json()

            if (data && data[0] && data[0].Status === 'Success') {
                const po = data[0].PostOffice[0]
                const fetchedState = po.State
                const fetchedDistrict = po.District

                // 1. Try to match state
                const matchingState = allStates.find(s => 
                    s.toLowerCase() === fetchedState.toLowerCase() ||
                    fetchedState.toLowerCase().includes(s.toLowerCase())
                )

                if (matchingState) {
                    setSelectedState(matchingState)
                    
                    // 2. Try to match district within that state
                    const stateDataForDistrict = findStateInDistrictData(matchingState)
                    if (stateDataForDistrict) {
                        const matchingDistrict = stateDataForDistrict.districts.find(d => 
                            d.district.toLowerCase() === fetchedDistrict.toLowerCase() ||
                            d.district.toLowerCase().includes(fetchedDistrict.toLowerCase()) ||
                            fetchedDistrict.toLowerCase().includes(d.district.toLowerCase().split(' ')[0])
                        )
                        
                        if (matchingDistrict) {
                            setSelectedDistrict(matchingDistrict.district)
                            setActiveTab('local')
                        } else {
                            setSelectedDistrict('')
                            setActiveTab('national') // Default to national if local district not found
                        }
                    } else {
                        setSelectedDistrict('')
                        setActiveTab('national')
                    }
                } else {
                    setPincodeError(`State (${fetchedState}) not currently in our directory. Showing national resources instead.`)
                    setActiveTab('national')
                }
            } else {
                setPincodeError('Invalid PIN code or details not found.')
            }
        } catch (err) {
            setPincodeError('Error fetching PIN code details. Try manual selection.')
        } finally {
            setIsSearchingPincode(false)
        }
    }

    const resetSelection = () => {
        setSelectedState('')
        setSelectedDistrict('')
        setPincode('')
        setPincodeError('')
    }

    return (
        <div className="container">
            <div style={styles.header}>
                <div>
                    <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                        <Shield size={26} color="#4682B4" /> Contacts
                    </h2>
                    <p className="section-subtitle">
                        Instant access to Local, State, and National cybercrime support infrastructure.
                    </p>
                </div>
                {(selectedState || pincode) && (
                    <button onClick={resetSelection} style={styles.resetBtn}>
                        <X size={14} /> Clear Search
                    </button>
                )}
            </div>

            {/* Main Search Bar */}
            <div style={styles.searchSection}>
                <div style={styles.pincodeBox}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                        <MapPin size={18} color="#F97316" />
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>Find Help by PIN Code</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="text" 
                            placeholder="Ex: 411001"
                            maxLength={6}
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                            onKeyDown={(e) => e.key === 'Enter' && handlePincodeSearch()}
                            style={styles.pincodeInput}
                        />
                        <button 
                            onClick={handlePincodeSearch}
                            disabled={isSearchingPincode || pincode.length !== 6}
                            className="btn btn-primary"
                            style={styles.searchBtn}
                        >
                            {isSearchingPincode ? 'Searching...' : 'Locate Now'}
                        </button>
                    </div>
                    {pincodeError && <div style={styles.errorText}><AlertCircle size={12} /> {pincodeError}</div>}
                </div>

                <div style={styles.divider}>
                    <div style={styles.line} />
                    <span style={styles.orText}>OR</span>
                    <div style={styles.line} />
                </div>

                <div style={styles.manualBox}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                        <Building size={18} color="#4682B4" />
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>Manual Selection</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <select 
                            value={selectedState} 
                            onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }}
                            style={styles.select}
                        >
                            <option value="">-- Select State --</option>
                            {allStates.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select 
                            value={selectedDistrict} 
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            style={styles.select}
                            disabled={!selectedState || !stateDistrictInfo}
                        >
                            <option value="">-- Select District --</option>
                            {stateDistrictInfo?.districts.map(d => (
                                <option key={d.district} value={d.district}>{d.district}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {(selectedState || selectedDistrict || activeTab === 'national') ? (
                <div style={styles.resultsContainer} className="animate-fade-in">
                    {/* Navigation Tabs */}
                    <div style={styles.tabs}>
                        <button 
                            onClick={() => setActiveTab('local')}
                            style={{ ...styles.tab, ...(activeTab === 'local' ? styles.tabActive : {}) }}
                            disabled={!selectedDistrict}
                        >
                            <MapPin size={16} /> Local Cyber Cell
                        </button>
                        <button 
                            onClick={() => setActiveTab('national')}
                            style={{ ...styles.tab, ...(activeTab === 'national' ? styles.tabActive : {}) }}
                        >
                            <Globe size={16} /> National Portals
                        </button>
                    </div>

                    <div style={styles.tabContent}>
                        {activeTab === 'local' && districtInfo && (
                            <div className="animate-fade-in">
                                <div style={styles.cardHeader}>
                                    <div>
                                        <h3 style={styles.cardTitle}>{districtInfo.district} Cyber Police Station</h3>
                                        <div style={styles.locationBadge}><MapPin size={12} /> {selectedState}</div>
                                    </div>
                                    <div style={styles.statusBadge}><div style={styles.statusDot} /> Active 24x7</div>
                                </div>
                                
                                <div style={styles.contactGrid}>
                                    <div style={styles.contactCard}>
                                        <div style={styles.iconCircle}><Phone size={20} color="#F97316" /></div>
                                        <div style={styles.contactDetails}>
                                            <span style={styles.contactLabel}>Official Phone</span>
                                            <a href={`tel:${districtInfo.cyber_cell_phone}`} style={styles.contactValue}>{districtInfo.cyber_cell_phone}</a>
                                        </div>
                                        <a href={`tel:${districtInfo.cyber_cell_phone}`} className="btn btn-primary" style={styles.miniBtn}>Call Now</a>
                                    </div>
                                    <div style={styles.contactCard}>
                                        <div style={styles.iconCircle}><Mail size={20} color="#F97316" /></div>
                                        <div style={styles.contactDetails}>
                                            <span style={styles.contactLabel}>Email Address</span>
                                            <a href={`mailto:${districtInfo.cyber_cell_email}`} style={styles.contactValue}>{districtInfo.cyber_cell_email}</a>
                                        </div>
                                        <a href={`mailto:${districtInfo.cyber_cell_email}`} className="btn btn-outline" style={styles.miniBtn}>Compose</a>
                                    </div>
                                    <div style={{ ...styles.contactCard, gridColumn: 'span 2' }}>
                                        <div style={styles.iconCircle}><Building size={20} color="#F97316" /></div>
                                        <div style={styles.contactDetails}>
                                            <span style={styles.contactLabel}>Physical Office Location</span>
                                            <span style={{ ...styles.contactValue, color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{districtInfo.address}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.infoAlert}>
                                    <Info size={18} />
                                    <span>You can also visit any local police station to file a Zero FIR, which will be forwarded to the Cyber Cell.</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 'national' && (
                            <div className="animate-fade-in">
                                <div style={styles.cardHeader}>
                                    <div>
                                        <h3 style={styles.cardTitle}>National Portals & Helplines</h3>
                                        <div style={styles.locationBadge}><Globe size={12} /> Central Infrastructure</div>
                                    </div>
                                </div>

                                <div className="grid-2" style={{ gap: '1rem', marginTop: '1.5rem' }}>
                                    {nationalPortals.map((portal, idx) => (
                                        <div key={idx} className="card" style={styles.portalCard}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                                <span className="chip chip-teal" style={{ fontSize: '0.65rem' }}>{portal.authority}</span>
                                                {portal.helpline && <div style={styles.helplineBadge}><Phone size={12} /> {portal.helpline}</div>}
                                            </div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{portal.name}</h4>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                                                {portal.description}
                                            </p>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {portal.url && (
                                                    <a href={portal.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, fontSize: '0.75rem', padding: '0.5rem' }}>
                                                        Visit Website
                                                    </a>
                                                )}
                                                {portal.email && (
                                                    <a href={`mailto:${portal.email}`} className="btn btn-outline" style={{ flex: 1, fontSize: '0.75rem', padding: '0.5rem' }}>
                                                        Report via Email
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}><Search size={40} /></div>
                    <h3>Start your search above</h3>
                    <p>Enter your 6-digit PIN code to automatically find the nearest Cyber Police Station and State Nodal officers.</p>
                </div>
            )}
        </div>
    )
}

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' },
    resetBtn: { display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(220, 38, 38, 0.05)', color: '#DC2626', border: '1px solid rgba(220, 38, 38, 0.2)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' },
    searchSection: { background: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'stretch', gap: '2rem', marginBottom: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' },
    pincodeBox: { flex: 1, display: 'flex', flexDirection: 'column' },
    pincodeInput: { padding: '1rem', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#F97316', width: '100%', maxWidth: '160px', textAlign: 'center', outline: 'none' },
    searchBtn: { flex: 1, fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase' },
    errorText: { color: '#DC2626', fontSize: '0.75rem', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 500 },
    divider: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' },
    line: { width: '1px', flex: 1, background: 'var(--color-border)' },
    orText: { fontSize: '0.7rem', fontWeight: 900, color: 'var(--color-text-muted)', background: 'var(--color-bg-card)', padding: '5px' },
    manualBox: { flex: 1.5, display: 'flex', flexDirection: 'column' },
    select: { padding: '1rem', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', flex: 1, minWidth: '180px', outline: 'none', cursor: 'pointer' },
    resultsContainer: { background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' },
    tabs: { display: 'flex', background: 'var(--color-bg-secondary)', padding: '0.5rem', gap: '0.5rem' },
    tab: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '1rem', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', borderRadius: 'var(--radius-md)', transition: 'all 0.2s' },
    tabActive: { background: 'white', color: '#F97316', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    tabContent: { padding: '2rem' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' },
    cardTitle: { fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.25rem' },
    locationBadge: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 },
    statusBadge: { display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '0.75rem', fontWeight: 700, padding: '0.4rem 0.8rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-full)' },
    statusDot: { width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' },
    contactGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    contactCard: { background: 'rgba(249, 115, 22, 0.03)', border: '1px solid rgba(249, 115, 22, 0.15)', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1.25rem' },
    iconCircle: { width: '45px', height: '45px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', flexShrink: 0 },
    contactDetails: { flex: 1 },
    contactLabel: { display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginBottom: '2px' },
    contactValue: { fontSize: '1rem', fontWeight: 800, color: '#F97316', wordBreak: 'break-all' },
    miniBtn: { fontSize: '0.7rem', padding: '0.4rem 0.75rem', borderRadius: '4px' },
    infoAlert: { marginTop: '1.5rem', background: 'rgba(70,130,180,0.05)', border: '1px solid rgba(70,130,180,0.15)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 },
    portalCard: { padding: '1.5rem', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' },
    helplineBadge: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#F97316', background: 'rgba(249, 115, 22, 0.1)', padding: '4px 10px', borderRadius: '4px' },
    emptyState: { padding: '5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--color-text-muted)' },
    emptyIcon: { width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', opacity: 0.5 },
}
