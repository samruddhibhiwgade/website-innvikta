import React from 'react'
import { Timer, Phone, AlertTriangle } from 'lucide-react'

export default function EmergencyBanner() {
    return (
        <div className="emergency-banner">
            <div className="container emergency-inner">
                <div className="emergency-badge">
                    <AlertTriangle size={14} />
                    CRITICAL
                </div>
                <div className="emergency-main">
                    <div className="emergency-icon-pulse">
                        <Timer size={26} color="#FFFFFF" />
                    </div>
                    <div className="emergency-content">
                        <h2 className="emergency-title">
                            The "Golden Hour" - Act Within 2 Hours
                        </h2>
                        <p className="emergency-desc">
                            If you've lost money in the last <strong>2 hours</strong>,
                            call <a href="tel:1930" className="emergency-link">1930</a> immediately.
                            Operators will freeze the scammer's account before funds are laundered.
                        </p>
                    </div>
                </div>
                <a href="tel:1930" className="emergency-cta">
                    <Phone size={18} /> Call 1930 Now
                </a>
            </div>
        </div>
    )
}
