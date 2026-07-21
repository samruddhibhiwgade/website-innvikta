"use client";
import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DisclaimerPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="disclaimer-overlay fade-in">
            <div className="disclaimer-modal slide-up">
                <button className="disclaimer-close" onClick={handleClose}>
                    <X size={20} />
                </button>
                <div className="disclaimer-header">
                    <div className="disclaimer-icon-box">
                        <AlertTriangle size={24} className="disclaimer-icon" />
                    </div>
                    <h2 className="disclaimer-title">Important Disclaimer</h2>
                </div>
                <div className="disclaimer-body">
                    <p>
                        <strong>Innvikta provides guidance only.</strong> Please verify official numbers and links before taking action.
                    </p>
                    <p className="disclaimer-subtext">
                        Cyber fraud techniques evolve rapidly. Always rely on official government portals like cybercrime.gov.in for the most current reporting procedures.
                    </p>
                </div>
                <div className="disclaimer-footer">
                    <button className="btn disclaimer-btn" onClick={handleClose}>
                        I UNDERSTAND
                    </button>
                </div>
            </div>
        </div>
    );
}
