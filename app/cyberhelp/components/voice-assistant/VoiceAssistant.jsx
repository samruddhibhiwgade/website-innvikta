"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Send, Volume2, VolumeX, AlertTriangle, ShieldCheck, CheckCircle2, Bot, ArrowRight } from 'lucide-react';
import { SUPPORTED_LANGUAGES, INCIDENT_CATEGORIES, MULTILINGUAL_PLAYBOOKS, classifyIntentFromText } from './voiceAssistantKnowledge.js';
import './VoiceAssistant.css';

// Import databases for training/data resolution
import bankData from '../../data/bankHelplines.json';
import socialMediaData from '../../data/socialMediaGrievance.json';
import stateNodalOfficers from '../../data/stateNodalOfficers.json';
import { threatGlossary } from '../../data/threatGlossary.js';

// Replica of the Innviktus logo from screenshot
const SecurityAssistantLogo = ({ size = 28, color = "white", bg = "transparent" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {bg !== "transparent" && <circle cx="50" cy="50" r="48" fill={bg} />}
    {/* Outer circle border of shield */}
    <path d="M50 20 C62 20, 70 26, 70 42 C70 60, 50 75, 50 75 C50 75, 30 60, 30 42 C30 26, 38 20, 50 20 Z" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Headset/Head */}
    <circle cx="50" cy="42" r="10" stroke={color} strokeWidth="5" fill="none" />
    <path d="M36 43 A14 14 0 0 1 64 43" stroke={color} strokeWidth="5" strokeLinecap="round" />
    {/* Headset mic */}
    <path d="M58 50 L63 53" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Tick mark at the bottom */}
    <path d="M46 63 L50 67 L56 61" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function VoiceAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('en-US');
    const [detectedLang, setDetectedLang] = useState('en-US');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
    const [feedbackError, setFeedbackError] = useState('');
    const [hasChatted, setHasChatted] = useState(false);
    
    const [sessionId] = useState(() => 'va_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6));
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [step, setStep] = useState('greeting'); // 'greeting', 'clarify', 'action', 'ended'
    const [incidentCategory, setIncidentCategory] = useState('general');
    const [summary, setSummary] = useState('');
    const [resolutionStatus, setResolutionStatus] = useState('in_progress');

    const [transcript, setTranscript] = useState([
        { sender: 'bot', text: MULTILINGUAL_PLAYBOOKS['en-US'].greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    const recognitionRef = useRef(null);
    const transcriptEndRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    // Auto-scroll transcript
    useEffect(() => {
        if (transcriptEndRef.current) {
            transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [transcript, isOpen]);

    // Session Timer
    useEffect(() => {
        let interval;
        if (isOpen && timerActive && step !== 'ended') {
            interval = setInterval(() => {
                setSecondsElapsed(prev => {
                    if (prev >= 240 && step !== 'ended') { // 4 minutes limit reached
                        handleBotTurn("Session duration limit reached. Summarizing and closing session.", 'general', 'ended', 'resolved');
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen, timerActive, step]);

    // Sync session to backend cleanly when transcript updates
    useEffect(() => {
        if (transcript.length > 0) {
            saveSessionToBackend(transcript, incidentCategory, resolutionStatus);
        }
    }, [transcript, incidentCategory, resolutionStatus, selectedLang]);

    // Sync speech synthesis on language change or bot turns
    const speakText = (text, langCode) => {
        if (isMuted || !synthRef.current) return;
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCode || selectedLang;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    };

    const handleBotTurn = (text, category = incidentCategory, nextStep = step, resStatus = resolutionStatus) => {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newTurn = { sender: 'bot', text, time: timeStr };
        
        setTranscript(prev => [...prev, newTurn]);

        if (category) setIncidentCategory(category);
        if (nextStep) setStep(nextStep);
        if (resStatus) setResolutionStatus(resStatus);

        speakText(text, selectedLang);
    };

    // Smart response lookups from database
    const findEnrichedData = (text) => {
        const lower = text.toLowerCase();
        let info = [];
        let speakText = "";

        // 1. Bank Data Lookup
        const allBanks = [
            ...(bankData.public_sector || []),
            ...(bankData.private_sector || []),
            ...(bankData.specialized_banks || [])
        ];
        const matchedBank = allBanks.find(b => {
            const nameMatch = b.name.toLowerCase();
            const kwMatch = b.keywords ? b.keywords.toLowerCase() : "";
            return lower.includes(nameMatch) || (kwMatch && lower.split(/\s+/).includes(kwMatch));
        });
        if (matchedBank) {
            info.push({
                type: 'bank',
                title: matchedBank.name,
                details: `Fraud helpline: ${matchedBank.fraud_helpline} | Email: ${matchedBank.fraud_email}`
            });
            speakText += `I have located the emergency contact for ${matchedBank.name}. You can reach their fraud support at ${matchedBank.fraud_helpline}. `;
        }

        // 2. Social Media platforms lookup
        const matchedPlatform = socialMediaData.find(p => {
            const platformName = p.platform.toLowerCase();
            return lower.includes(platformName) || (platformName.includes('twitter') && lower.includes('x'));
        });
        if (matchedPlatform) {
            info.push({
                type: 'social',
                title: `${matchedPlatform.platform} Support`,
                details: `Grievance Officer: ${matchedPlatform.grievance_officer} | Email: ${matchedPlatform.email}`
            });
            speakText += `For ${matchedPlatform.platform}, Grievance Officer is ${matchedPlatform.grievance_officer}. Support email is ${matchedPlatform.email}. `;
        }

        // 3. State Nodal Officers lookup
        const matchedState = stateNodalOfficers.find(s => {
            return lower.includes(s.state.toLowerCase());
        });
        if (matchedState) {
            info.push({
                type: 'state',
                title: `${matchedState.state} Nodal Cyber Officer`,
                details: `Officer: ${matchedState.nodal.name} | Email: ${matchedState.nodal.email}`
            });
            speakText += `For your state of ${matchedState.state}, the Nodal Cyber Officer is ${matchedState.nodal.name}. Email: ${matchedState.nodal.email}. `;
        }

        // 4. Threat Glossary descriptions lookup
        const matchedThreat = threatGlossary.find(t => {
            return lower.includes(t.title.toLowerCase());
        });
        if (matchedThreat) {
            info.push({
                type: 'definition',
                title: matchedThreat.title,
                details: matchedThreat.description
            });
            speakText += `${matchedThreat.title} is: ${matchedThreat.description} `;
        }

        return { info, speakText };
    };

    const handleUserTurn = (text) => {
        if (!text.trim()) return;
        setHasChatted(true);
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newTurn = { sender: 'user', text, time: timeStr };

        setTranscript(prev => [...prev, newTurn]);

        if (!timerActive) setTimerActive(true);
        setFeedbackError('');

        // Custom training answers for welcome pills
        if (text === "Show organization security maturity") {
            setTimeout(() => {
                handleBotTurn(
                    "Our platform measures security maturity across 5 key indices: Simulation participation, average reporting speed, compliance completion rate, department risk parity, and credential hygiene. To see your full breakdown, navigate to the Maturity Benchmarks dashboard or run a Risk Assessment.",
                    "general", "ended", "resolved"
                );
            }, 600);
            return;
        }
        if (text === "What can you do?") {
            setTimeout(() => {
                handleBotTurn(
                    "I can assist you with: \n1. Freezing compromised cards or bank accounts\n2. Contact details for Bank Fraud lines and Grievance Officers\n3. Answering questions about cyber threats (Phishing, Vishing, Hacking)\n4. Step-by-step incident reporting plans",
                    "general", "ended", "resolved"
                );
            }, 600);
            return;
        }
        if (text === "How do I create a phishing simulation?") {
            setTimeout(() => {
                handleBotTurn(
                    "To launch a phishing simulation campaign:\n1. Go to Phishing Simulator from the navigation.\n2. Choose a template or click 'Generate with AI'.\n3. Select your target departments or upload an employee CSV.\n4. Set the delivery schedule and launch the campaign.",
                    "general", "ended", "resolved"
                );
            }, 600);
            return;
        }

        // Standard intent classification and state machine
        const playbook = MULTILINGUAL_PLAYBOOKS[selectedLang] || MULTILINGUAL_PLAYBOOKS['en-US'];
        const classifiedCat = classifyIntentFromText(text);
        const enrichment = findEnrichedData(text);

        if (step === 'greeting') {
            setIncidentCategory(classifiedCat);
            setSummary(text);
            setStep('clarify');
            let botReply = playbook.clarify;
            if (enrichment.speakText) {
                botReply = `${enrichment.speakText}\n\n${botReply}`;
            }
            handleBotTurn(botReply, classifiedCat, 'clarify', 'in_progress');
        } else if (step === 'clarify') {
            const isEmergency = text.toLowerCase().includes('yes') || text.toLowerCase().includes('lost') || text.toLowerCase().includes('compromised') || text.toLowerCase().includes('हां') || text.toLowerCase().includes('होയ');
            const currentCat = incidentCategory === 'general' ? classifiedCat : incidentCategory;
            const catData = playbook.categories[currentCat] || playbook.categories['general'];

            let responseText = "";
            if (isEmergency) {
                responseText += playbook.emergencyWarning + "\n\n";
                responseText += playbook.evidenceNote + "\n\n";
            }

            // Inject enriched database actions
            let actionsList = [...catData.actions];
            if (enrichment.info.length > 0) {
                enrichment.info.forEach(item => {
                    actionsList.unshift(`[${item.title}] ${item.details}`);
                });
            }

            responseText += `${catData.title}:\n` + actionsList.map((act, i) => `${i + 1}. ${act}`).join("\n") + `\n\n${playbook.ending}`;

            handleBotTurn(responseText, currentCat, 'ended', 'resolved');
        } else {
            let botReply = playbook.ending;
            if (enrichment.speakText) {
                botReply = `${enrichment.speakText}\n\n${botReply}`;
            }
            handleBotTurn(botReply, incidentCategory, 'ended', 'resolved');
        }
    };

    // Speech Recognition Setup
    const toggleListening = () => {
        setFeedbackError('');
        if (isListening) {
            stopListening();
            return;
        }

        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
            setFeedbackError('Voice input is not supported in this browser. Please type your message below.');
            return;
        }

        try {
            recognitionRef.current = new SpeechRec();
            recognitionRef.current.lang = selectedLang;
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onstart = () => setIsListening(true);
            recognitionRef.current.onend = () => setIsListening(false);

            recognitionRef.current.onresult = (e) => {
                const speechToText = e.results[0][0].transcript;
                handleUserTurn(speechToText);
            };

            recognitionRef.current.onerror = (e) => {
                setIsListening(false);
                if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
                    setFeedbackError('Microphone permission denied. Please use the text input.');
                } else {
                    setFeedbackError('Voice recognition error. Please try again or type.');
                }
            };

            recognitionRef.current.start();
        } catch (err) {
            setIsListening(false);
            setFeedbackError('Failed to access microphone. Please type your message.');
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    };

    const handleLanguageChange = (e) => {
        const code = e.target.value;
        setSelectedLang(code);
        setDetectedLang(code);
        
        const playbook = MULTILINGUAL_PLAYBOOKS[code] || MULTILINGUAL_PLAYBOOKS['en-US'];
        setTranscript([{ sender: 'bot', text: playbook.greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setStep('greeting');
        setSecondsElapsed(0);

        speakText(playbook.greeting, code);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!typedText.trim()) return;
        const txt = typedText;
        setTypedText('');
        handleUserTurn(txt);
    };

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Save session to backend
    const saveSessionToBackend = async (currentTranscript, cat, res) => {
        setSaveStatus('saving');
        try {
            const payload = {
                session_id: sessionId,
                selected_language: selectedLang,
                detected_language: detectedLang,
                incident_category: cat,
                summary: summary || 'Guided Session',
                resolution_status: res,
                transcript: currentTranscript
            };

            const resObj = await fetch('server/api/save_voice_session.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (resObj.ok) {
                setSaveStatus('saved');
            } else {
                setSaveStatus('error');
            }
        } catch (err) {
            setSaveStatus('error');
        }
    };

    return (
        <div className="voice-assistant-container">
            {/* Launcher Button (Screenshot Double-Ring design) */}
            {!isOpen && (
                <button 
                    className="va-launcher-ring-wrapper"
                    onClick={() => { setIsOpen(true); setTimerActive(true); }}
                    title="Open Innviktus Assistant"
                >
                    <div className="va-launcher-inner-circle">
                        <SecurityAssistantLogo size={32} color="white" />
                    </div>
                </button>
            )}

            {/* Assistant Panel */}
            {isOpen && (
                <div className="va-panel">
                    {/* Header (Matching welcome block in screenshot) */}
                    <div className="va-header">
                        <div className="va-header-left">
                            <div className="va-avatar-circle">
                                <SecurityAssistantLogo size={32} color="#f15a24" />
                            </div>
                            <div className="va-header-text-block">
                                <h4 className="va-header-brand-title">Innviktus</h4>
                                <span className="va-header-brand-subtitle">Security assistant</span>
                            </div>
                        </div>
                        <button 
                            className="va-close-btn" 
                            onClick={() => { setIsOpen(false); stopListening(); }}
                            title="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Language row (Optional toggle) */}
                    <div className="va-config-row">
                        <select className="va-lang-select" value={selectedLang} onChange={handleLanguageChange}>
                            {SUPPORTED_LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.label} ({lang.native})
                                </option>
                            ))}
                        </select>
                        <span className={`va-status-badge va-status-${saveStatus}`}>
                            {saveStatus === 'saved' && 'Online'}
                        </span>
                    </div>

                    {/* Welcoming Screen vs Active Chat Transcript */}
                    {!hasChatted ? (
                        <div className="va-welcome-screen-body">
                            <p className="va-welcome-prompt">
                                I can help on this dashboard page with setup, answers, drafts, and next steps.
                            </p>
                            <div className="va-suggestions-list">
                                <button onClick={() => handleUserTurn("Show organization security maturity")} className="va-suggestion-pill">
                                    Show organization security maturity
                                </button>
                                <button onClick={() => handleUserTurn("What can you do?")} className="va-suggestion-pill">
                                    What can you do?
                                </button>
                                <button onClick={() => handleUserTurn("How do I create a phishing simulation?")} className="va-suggestion-pill">
                                    How do I create a phishing simulation?
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Transcript Area */
                        <div className="va-transcript-area">
                            {transcript.map((item, index) => (
                                <div key={index} className={`va-turn va-turn-${item.sender}`}>
                                    <div style={{ whiteSpace: 'pre-line' }}>{item.text}</div>
                                    <span className="va-turn-time">{item.time}</span>
                                </div>
                            ))}
                            {step === 'ended' && (
                                <div className="va-evidence-alert">
                                    <CheckCircle2 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                                    Session completed. Follow the steps above.
                                </div>
                            )}
                            <div ref={transcriptEndRef} />
                        </div>
                    )}

                    {/* Feedback / Error Message */}
                    {feedbackError && (
                        <div className="va-feedback-msg">{feedbackError}</div>
                    )}

                    {/* Controls Footer */}
                    <div className="va-controls-footer">
                        {hasChatted && (
                            <div className="va-mic-row">
                                <button 
                                    className={`va-mic-btn ${isListening ? 'va-mic-listening' : 'va-mic-idle'}`}
                                    onClick={toggleListening}
                                    title={isListening ? "Stop listening" : "Start speaking"}
                                >
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </button>
                                <div className="va-state-label">
                                    {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Voice input"}
                                </div>
                                <button 
                                    className="va-mic-btn"
                                    style={{ background: isMuted ? '#64748b' : '#3b82f6', width: '36px', height: '36px' }}
                                    onClick={() => {
                                        setIsMuted(!isMuted);
                                        if (synthRef.current) synthRef.current.cancel();
                                    }}
                                    title={isMuted ? "Unmute Bot" : "Mute Bot"}
                                >
                                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                </button>
                            </div>
                        )}

                        {/* Search input styled exactly like the screenshot */}
                        <form className="va-search-input-wrapper" onSubmit={handleFormSubmit}>
                            <input 
                                type="text"
                                className="va-search-input"
                                placeholder="Ask a question"
                                value={typedText}
                                onChange={(e) => setTypedText(e.target.value)}
                            />
                            <button type="submit" className="va-search-arrow-btn" title="Send">
                                <ArrowRight size={18} color="#f15a24" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
