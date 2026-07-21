"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqData = [
    {
        question: "What is the cyber crime helpline number in India?",
        answer: "The official cyber crime helpline number in India is 1930, which assists victims of online financial fraud such as UPI scams, phishing attacks, and unauthorized bank transactions. If you suspect cyber fraud, call the helpline immediately and report the incident through the National Cyber Crime Reporting Portal. You can also follow the Incident Guide on the Cyber Helpline page to understand the next steps after reporting fraud."
    },
    {
        question: "What should I do after calling the 1930 helpline number?",
        answer: "After calling 1930, you should secure your bank accounts, collect evidence of the fraud, and submit a cybercrime complaint online. The Cyber Helpline page provides a structured response guide, including tools for reporting fraud, freezing accounts, and organizing evidence."
    },
    {
        question: "How can I report cyber fraud online in India?",
        answer: "Cyber fraud incidents can be reported online through the National Cyber Crime Reporting Portal. The Filing Guide on the Cyber Helpline page explains the step-by-step process for submitting a cybercrime complaint and preparing the necessary evidence."
    },
    {
        question: "What is the fraud helpline number for online scams in India?",
        answer: "The national fraud helpline number for reporting cyber fraud and online scams in India is 1930. Victims should contact the helpline immediately if they notice unauthorized transactions or suspicious activity. The Cyber Helpline platform also provides bank helpline numbers and emergency resources to help victims respond quickly."
    },
    {
        question: "How can I freeze my bank or UPI account after cyber fraud?",
        answer: "If you notice fraudulent transactions, contact your bank immediately and request them to block or freeze the affected account. The Freeze Accounts tool on the Cyber Helpline page provides quick access to bank and UPI emergency support to help victims secure their accounts."
    },
    {
        question: "How do I report UPI fraud in India?",
        answer: "UPI fraud can be reported by contacting your bank, calling the 1930 cybercrime helpline, and submitting a complaint on the National Cyber Crime Reporting Portal. The Cyber Helpline page also explains the steps victims should follow after reporting UPI fraud."
    },
    {
        question: "What evidence should I collect before filing a cybercrime complaint?",
        answer: "Victims should collect evidence such as screenshots of scam messages, transaction IDs, bank details used in the fraud, suspicious links, and communication with the fraudster. The Evidence Vault on the Cyber Helpline page helps users securely organize and store this information."
    },
    {
        question: "How can I contact cybercrime authorities in my state?",
        answer: "Cybercrime authorities can be contacted through national and state-level cybercrime units. The Contacts section on the Cyber Helpline page provides a searchable directory of cybercrime authorities and support resources."
    },
    {
        question: "How can I learn to identify online scams?",
        answer: "Understanding how cybercriminals operate can help prevent fraud. The Scam Simulator on the Cyber Helpline page allows users to test their scam detection skills and learn how to identify common online scams."
    },
    {
        question: "Where can I find updates about new cyber fraud threats?",
        answer: "Cyber threats constantly evolve, making awareness essential. The Cyber Alerts section on the Cyber Helpline page provides updates about new scams, fraud warnings, and cybersecurity safety tips."
    }
];

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <HelpCircle size={24} className="title-icon" /> Frequently Asked Questions
                    </h2>
                    <p className="section-subtitle">
                        Quick answers to help you understand cyber safety and how to use CyberHelp effectively.
                    </p>
                </div>

                <div className="faq-grid">
                    {faqData.map((item, index) => (
                        <div 
                            key={index} 
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className="faq-question">
                                <h3>{item.question}</h3>
                                {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
