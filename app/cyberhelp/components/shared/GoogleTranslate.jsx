"use client";
import React, { useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const GoogleTranslate = () => {
    useEffect(() => {
        const initTranslate = () => {
            const container = document.getElementById('google_translate_element');
            if (container) {
                container.innerHTML = '';
            }
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,hi,mr'
                    },
                    'google_translate_element'
                );
            }
        };

        window.googleTranslateElementInit = initTranslate;

        if (window.google && window.google.translate) {
            initTranslate();
        } else if (!document.querySelector('#google-translate-script')) {
            const addScript = document.createElement('script');
            addScript.id = 'google-translate-script';
            addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
            document.body.appendChild(addScript);
        }
    }, []);

    return (
        <div className="google-translate-container">
            <span className="translate-icon translate-icon-left">
                <Globe size={15} />
            </span>
            <div id="google_translate_element"></div>
            <span className="translate-icon translate-icon-right">
                <ChevronDown size={14} />
            </span>
        </div>
    );
};

export default GoogleTranslate;
