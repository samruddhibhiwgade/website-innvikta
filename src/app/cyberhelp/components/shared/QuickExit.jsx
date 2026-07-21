"use client";
import React from 'react'
import { LogOut } from 'lucide-react'

export default function QuickExit() {
    const handleExit = () => {
        window.open('https://www.google.com', '_blank')
    }

    return (
        <button onClick={handleExit} style={styles.btn} title="Quick Exit - Leave this page immediately">
            <LogOut size={16} />
            <span style={styles.label}>Quick Exit</span>
        </button>
    )
}

const styles = {
    btn: {
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0.65rem 1.25rem',
        background: '#DC2626',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.82rem',
        fontWeight: 700,
        fontFamily: 'var(--font-primary)',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(220, 38, 38, 0.3)',
        transition: 'all 200ms ease',
    },
    label: {
        letterSpacing: '0.02em',
    },
}
