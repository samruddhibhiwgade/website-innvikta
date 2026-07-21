export const SUPPORTED_LANGUAGES = [
    { code: 'en-US', label: 'English', native: 'English' },
    { code: 'hi-IN', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr-IN', label: 'Marathi', native: 'मराठी' },
    { code: 'gu-IN', label: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'ta-IN', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te-IN', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn-IN', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'bn-IN', label: 'Bengali', native: 'বাংলা' }
];

export const INCIDENT_CATEGORIES = [
    { id: 'upi_fraud', label: 'UPI / Bank / Financial Fraud' },
    { id: 'hacked_account', label: 'Hacked Social Media / Email' },
    { id: 'identity_theft', label: 'Identity Theft / Fake Profile' },
    { id: 'phishing', label: 'Phishing / Malicious Link' },
    { id: 'job_scam', label: 'Online Job / Investment Scam' },
    { id: 'suspicious_call', label: 'Suspicious Call / SMS / Vishing' },
    { id: 'general', label: 'General Cyber Inquiry' }
];

export const MULTILINGUAL_PLAYBOOKS = {
    'en-US': {
        greeting: "Hello. I am your CyberHelp Voice Guide. Please state briefly what happened so I can assist you immediately.",
        clarify: "Could you specify if any money was lost, or if an account is currently compromised?",
        emergencyWarning: "🚨 EMERGENCY ALERT: Since money was lost or your account is actively compromised, immediate action is critical.",
        evidenceNote: "📌 IMPORTANT: Please take screenshots immediately. Preserve transaction IDs, SMS/email headers, call logs, and suspect URLs/phone numbers before taking further steps.",
        ending: "I have recorded your session transcript and resolution status. Please follow the official steps above immediately to secure your accounts.",
        categories: {
            upi_fraud: {
                title: "UPI & Financial Fraud Guidance",
                actions: [
                    "Call the National Cyber Crime Helpline at 1930 immediately.",
                    "Contact your bank's emergency customer care to freeze your debit card and block net banking.",
                    "File an official complaint on cybercrime.gov.in with all transaction UTR numbers.",
                    "Do not transfer any further funds or install remote screen-sharing apps."
                ]
            },
            hacked_account: {
                title: "Hacked Account Guidance",
                actions: [
                    "Use the official account recovery page of the platform (e.g. Google, Meta, Instagram) immediately.",
                    "Revoke all active sessions and app permissions from the security settings if accessible.",
                    "Notify your personal contacts that your account was compromised so they do not fall for scams.",
                    "Report the compromise to the grievance officer listed in our Social Media Grievance directory."
                ]
            },
            identity_theft: {
                title: "Identity Theft & Fake Profile Guidance",
                actions: [
                    "Report the impersonating profile directly within the social media app as 'Pretending to be someone I know'.",
                    "Collect profile URLs, usernames, and screenshots of fraudulent messages.",
                    "Register a formal cyber crime report under Section 66C of the IT Act at cybercrime.gov.in."
                ]
            },
            phishing: {
                title: "Phishing & Malicious Link Guidance",
                actions: [
                    "Immediately disconnect your device from the internet (Wi-Fi/Mobile Data) to prevent data exfiltration.",
                    "Run a comprehensive antivirus scan on your system or mobile device.",
                    "Change your passwords for banking, email, and primary accounts using a secure, separate device.",
                    "Never enter OTPs, PINs, or credentials on unverified web pages."
                ]
            },
            job_scam: {
                title: "Online Job & Investment Scam Guidance",
                actions: [
                    "Cease all communication with the fraudulent recruiters or investment group administrators.",
                    "Never pay 'registration fees', 'customs charges', or 'tax clearance fees' to receive promised earnings.",
                    "Document all chat logs, crypto wallet addresses, and bank accounts where money was sent.",
                    "Submit a report immediately on the National Cyber Crime portal."
                ]
            },
            suspicious_call: {
                title: "Suspicious Call / SMS / Vishing Guidance",
                actions: [
                    "Do not press any telephone key prompts or install APK files sent via SMS/WhatsApp.",
                    "Report fraudulent telephone numbers and SMS headers on the Chakshu portal via Sanchar Saathi.",
                    "Warn family members and colleagues about the circulating scam script."
                ]
            },
            general: {
                title: "General Cyber Safety Guidance",
                actions: [
                    "Enable Two-Factor Authentication (2FA) across all email and financial accounts.",
                    "Regularly review bank statements and active login sessions.",
                    "When in doubt, consult our Triage Bot or Filing Guide for tailored reporting instructions."
                ]
            }
        }
    },
    'hi-IN': {
        greeting: "नमस्ते। मैं आपका साइबर-हेल्प वॉयस गाइड हूँ। कृपया संक्षेप में बताएं कि क्या हुआ है ताकि मैं तुरंत आपकी सहायता कर सकूँ।",
        clarify: "क्या आप बता सकते हैं कि क्या कोई पैसे का नुकसान हुआ है या आपका खाता हैक हुआ है?",
        emergencyWarning: "🚨 आपातकालीन चेतावनी: चूंकि पैसे का नुकसान हुआ है या खाता हैक है, तुरंत कदम उठाना अत्यंत आवश्यक है।",
        evidenceNote: "📌 महत्वपूर्ण: कृपया तुरंत स्क्रीनशॉट लें। आगे बढ़ने से पहले ट्रांजेक्शन आईडी, संदिग्ध फोन नंबर और लिंक सुरक्षित रखें।",
        ending: "मैंने आपका विवरण दर्ज कर लिया है। कृपया अपने खातों को सुरक्षित करने के लिए ऊपर दिए गए आधिकारिक चरणों का पालन करें।",
        categories: {
            upi_fraud: {
                title: "UPI और वित्तीय धोखाधड़ी मार्गदर्शन",
                actions: [
                    "तुरंत राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर कॉल करें।",
                    "अपने बैंक के ग्राहक सेवा से संपर्क करके डेबिट कार्ड और नेट बैंकिंग तुरंत ब्लॉक करवाएं।",
                    "सभी ट्रांजेक्शन UTR नंबरों के साथ cybercrime.gov.in पर आधिकारिक शिकायत दर्ज करें।",
                    "किसी भी अनजान व्यक्ति के कहने पर स्क्रीन-शेयरिंग ऐप (जैसे Anydesk) इंस्टॉल न करें।"
                ]
            },
            hacked_account: {
                title: "हैक किए गए खाते का मार्गदर्शन",
                actions: [
                    "तुरंत संबंधित प्लेटफॉर्म (Google, Instagram, Facebook) के आधिकारिक रिकवरी पेज का उपयोग करें।",
                    "यदि संभव हो, तो सुरक्षा सेटिंग्स से सभी सक्रिय सत्रों (active sessions) को लॉग आउट करें।",
                    "अपने दोस्तों और परिवार को सूचित करें कि आपका खाता हैक हो गया है ताकि वे ठगी का शिकार न हों।",
                    "साइबर क्राइम पोर्टल पर शिकायत दर्ज करें।"
                ]
            },
            identity_theft: {
                title: "पहचान की चोरी और फर्जी प्रोफाइल",
                actions: [
                    "सोशल मीडिया ऐप के अंदर फर्जी प्रोफाइल को 'किसी और का रूप धारण करना (Impersonation)' के रूप में रिपोर्ट करें।",
                    "फर्जी प्रोफाइल का URL और स्क्रीनशॉट एकत्र करें।",
                    "cybercrime.gov.in पर आईटी एक्ट की धारा 66C के तहत रिपोर्ट दर्ज करें।"
                ]
            },
            phishing: {
                title: "फ़िशिंग और संदिग्ध लिंक",
                actions: [
                    "डेटा चोरी रोकने के लिए तुरंत अपने डिवाइस का इंटरनेट (Wi-Fi/Mobile Data) बंद करें।",
                    "किसी सुरक्षित डिवाइस का उपयोग करके अपने बैंकिंग और ईमेल के पासवर्ड तुरंत बदलें।",
                    "अज्ञात वेबसाइटों पर कभी भी अपना OTP या पिन दर्ज न करें।"
                ]
            },
            job_scam: {
                title: "ऑनलाइन नौकरी और निवेश घोटाला",
                actions: [
                    "फर्जी नियोक्ताओं (recruiters) या टेलीग्राम ग्रुप एडमिन के साथ सभी संचार तुरंत बंद करें।",
                    "'रजिस्ट्रेशन शुल्क' या 'टैक्स' के नाम पर कभी भी पैसे न दें।",
                    "चैट लॉग और बैंक खाता नंबर जहां पैसे भेजे गए थे, उनका रिकॉर्ड रखें और 1930 पर रिपोर्ट करें।"
                ]
            },
            suspicious_call: {
                title: "संदिग्ध कॉल / एसएमएस / विशिंग",
                actions: [
                    "कॉल पर दिए गए निर्देशों का पालन न करें और SMS/WhatsApp के माध्यम से भेजे गए APK फाइलें इंस्टॉल न करें।",
                    "संचार साथी (Sanchar Saathi) के चक्षु (Chakshu) पोर्टल पर संदिग्ध नंबर की रिपोर्ट करें।"
                ]
            },
            general: {
                title: "सामान्य साइबर सुरक्षा",
                actions: [
                    "सभी महत्वपूर्ण खातों पर टू-फैक्टर ऑथेंटिकेशन (2FA) सक्षम करें।",
                    "नियमित रूप से अपने बैंक स्टेटमेंट की जांच करें।",
                    "अधिक जानकारी के लिए हमारे ट्राइएज बॉट या फाइलिंग गाइड से सहायता लें।"
                ]
            }
        }
    },
    'mr-IN': {
        greeting: "नमस्कार. मी तुमचा सायबर-हेल्प व्हॉईस गाईड आहे. कृपया थोडक्यात सांगा काय घडले आहे जेणेकरून मी तुम्हाला त्वरित मदत करू शकेन.",
        clarify: "तुमचे काही पैसे गेले आहेत का किंवा तुमचे खाते हॅक झाले आहे का, हे सांगू शकाल का?",
        emergencyWarning: "🚨 आणीबाणीचा इशारा: तुमचे पैसे गेले असल्याने किंवा खाते धोक्यात असल्याने तातडीने कारवाई करणे आवश्यक आहे.",
        evidenceNote: "📌 महत्त्वाचे: कृपया लगेच स्क्रीनशॉट घ्या. पुढील कारवाईपूर्वी ट्रान्झॅक्शन आयडी, एसएमएस आणि संशयास्पद लिंक्स जतन करून ठेवा.",
        ending: "मी तुमची माहिती नोंदवून घेतली आहे. तुमचे खाते सुरक्षित करण्यासाठी कृपया वरील अधिकृत पायऱ्यांचे त्वरित पालन करा.",
        categories: {
            upi_fraud: {
                title: "UPI आणि आर्थिक फसवणूक मार्गदर्शन",
                actions: [
                    "त्वरित 1930 या राष्ट्रीय सायबर क्राईम हेल्पलाईनवर कॉल करा.",
                    "तुमच्या बँकेशी संपर्क साधून तुमचे डेबिट कार्ड आणि नेट बँकिंग त्वरित ब्लॉक करा.",
                    "सर्व ट्रान्झॅक्शन UTR क्रमांकांसह cybercrime.gov.in वर अधिकृत तक्रार नोंदवा.",
                    "अनोळखी व्यक्तीच्या सांगण्यावरून कोणतेही स्क्रीन-शेअरिंग ॲप डाऊनलोड करू नका."
                ]
            },
            hacked_account: {
                title: "हॅक झालेल्या खात्याबाबत मार्गदर्शन",
                actions: [
                    "संबंधित प्लॅटफॉर्मच्या (Google, Meta, Instagram) अधिकृत रिकव्हरी पेजचा लगेच वापर करा.",
                    "शक्य असल्यास सर्व ॲक्टिव्ह सेशन्समधून लॉगआऊट करा.",
                    "तुमच्या मित्रांना आणि कुटुंबीयांना सावध करा जेणेकरून ते फसवणुकीला बळी पडणार नाहीत."
                ]
            },
            identity_theft: { title: "ओळख चोरी आणि बनावट प्रोफाईल", actions: ["ॲपमध्ये बनावट प्रोफाईलची 'Impersonation' म्हणून तक्रार करा.", "प्रोफाईलची लिंक आणि स्क्रीनशॉट सेव्ह करा आणि सायबर सेलमध्ये तक्रार द्या."] },
            phishing: { title: "फिशिंग आणि घातक लिंक्स", actions: ["डिव्हाईसचा इंटरनेट त्वरित बंद करा.", "दुसऱ्या सुरक्षित डिव्हाईसवरून तुमचे बँकिंग आणि ईमेल पासवर्ड बदला."] },
            job_scam: { title: "ऑनलाइन नोकरी आणि गुंतवणूक फसवणूक", actions: ["फसव्या टेलिग्राम ग्रुप्स किंवा लोकांशी संपर्क थांबवा.", "नोकरीसाठी 'रजिस्ट्रेशन फी' म्हणून पैसे कधीही देऊ नका.", "1930 वर कॉल करून तक्रार नोंदवा."] },
            suspicious_call: { title: "संशयास्पद कॉल / एसएमएस", actions: ["व्हॉट्सॲपवरील अनोळखी APK फाईल्स डाऊनलोड करू नका.", "संचार साथीच्या 'चक्षु' पोर्टलवर नंबरची तक्रार करा."] },
            general: { title: "सामान्य सायबर सुरक्षा", actions: ["सर्व खात्यांवर टू-फॅक्टर ऑथेंटिकेशन (2FA) चालू करा.", "अधिक माहितीसाठी आमच्या ट्राइएज बॉटची मदत घ्या."] }
        }
    },
    'gu-IN': {
        greeting: "નમસ્તે. હું તમારો સાયબર-હેલ્પ વોઇસ ગાઇડ છું. કૃપા કરીને ટૂંકમાં જણાવો કે શું થયું છે જેથી હું તમને મદદ કરી શકું.",
        clarify: "શું તમારા કોઈ પૈસા ગયા છે અથવા તમારું એકાઉન્ટ હેક થયું છે?",
        emergencyWarning: "🚨 ઇમરજન્સી ચેતવણી: પૈસા ગયા હોવાથી અથવા એકાઉન્ટ હેક હોવાથી, તાત્કાલિક પગલાં લેવા ખૂબ જ જરૂરી છે.",
        evidenceNote: "📌 મહત્વપૂર્ણ: કૃપા કરીને તરત જ સ્ક્રીનશોટ લો. ટ્રાન્ઝેક્શન આઈડી, એસએમએસ અને શંકાસ્પદ લિંક્સ સાચવી રાખો.",
        ending: "મેં તમારી માહિતી નોંધી લીધી છે. તમારા એકાઉન્ટને સુરક્ષિત કરવા માટે કૃપા કરીને ઉપરોક્ત સત્તાવાર પગલાંઓનું પાલન કરો.",
        categories: {
            upi_fraud: { title: "UPI અને નાણાકીય છેતરપિંડી", actions: ["તાત્કાલિક 1930 સાયબર ક્રાઇમ હેલ્પલાઇન પર કૉલ કરો.", "બેંકનો સંપર્ક કરીને ડેબિટ કાર્ડ અને નેટ બેંકિંગ બ્લોક કરાવો.", "cybercrime.gov.in પર ફરિયાદ નોંધાવો."] },
            hacked_account: { title: "હેક થયેલ એકાઉન્ટ", actions: ["પ્લેટફોર્મના સત્તાવાર રિકવરી પેજનો ઉપયોગ કરો.", "બધા સક્રિય સેશન્સમાંથી લોગઆઉટ કરો અને મિત્રોને જાણ કરો."] },
            identity_theft: { title: "ઓળખની ચોરી અને નકલી પ્રોફાઇલ", actions: ["એપમાં નકલી પ્રોફાઇલને રિપોર્ટ કરો.", "પ્રોફાઇલ URL અને સ્ક્રીનશોટ સાચવો અને સાયબર સેલમાં રિપોર્ટ કરો."] },
            phishing: { title: "ફિશિંગ અને શંકાસ્પદ લિંક્સ", actions: ["તરત જ ઇન્ટરનેટ કનેક્શન બંધ કરો.", "સુરક્ષિત ઉપકરણથી બેંકિંગ પાસવર્ડ બદલો."] },
            job_scam: { title: "ઓનલાઇન જોબ અને રોકાણ કૌભાંડ", actions: ["છેતરપિંડી કરનારાઓ સાથે વાતચીત બંધ કરો.", "નોકરી માટે ક્યારેય પૈસા ન આપો અને 1930 પર રિપોર્ટ કરો."] },
            suspicious_call: { title: "શંકાસ્પદ કૉલ / SMS", actions: ["કોઈપણ અજાણી APK ફાઇલ ઇન્સ્ટોલ ન કરો.", "સંચાર સાથીના ચક્ષુ પોર્ટલ પર નંબરની જાણ કરો."] },
            general: { title: "સામાન્ય સાયબર સુરક્ષા", actions: ["તમામ એકાઉન્ટ્સ પર ટુ-ફેક્ટર ઓથેન્ટિકેશન (2FA) ચાલુ કરો."] }
        }
    },
    'ta-IN': {
        greeting: "வணக்கம். நான் உங்கள் சைபர்-ஹெல்ப் குரல் வழிகாட்டி. உங்களுக்கு உதவ, என்ன நடந்தது என்பதை சுருக்கமாக கூறவும்.",
        clarify: "பணம் பறிபோனதா அல்லது உங்கள் கணக்கு ஹேக் செய்யப்பட்டதா என்பதை தெரிவிக்க முடியுமா?",
        emergencyWarning: "🚨 அவசர எச்சரிக்கை: பணம் பறிபோனதால், உடனடியாக நடவடிக்கை எடுப்பது மிகவும் அவசியம்.",
        evidenceNote: "📌 முக்கியமானது: ஸ்கிரீன்ஷாட்களை உடனடியாக எடுக்கவும். பரிவர்த்தனை ஐடி, தொலைபேசி எண்களை சேமிக்கவும்.",
        ending: "உங்கள் விவரங்களை பதிவு செய்துள்ளேன். உங்கள் கணக்குகளை பாதுகாக்க மேற்கண்ட படிகளை உடனடியாக பின்பற்றவும்.",
        categories: {
            upi_fraud: { title: "UPI & நிதி மோசடி வழிகாட்டுதல்", actions: ["உடனடியாக 1930 என்ற சைபர் கிரைம் உதவி எண்ணை அழைக்கவும்.", "உங்கள் வங்கியினை தொடர்பு கொண்டு ஏடிஎம் கார்டை முடக்கவும்.", "cybercrime.gov.in இல் புகார் அளிக்கலாம்."] },
            hacked_account: { title: "ஹேக் செய்யப்பட்ட கணக்கு", actions: ["உடனடியாக அதிகாரப்பூர்வ கணக்கு மீட்பு பக்கத்தை பயன்படுத்தவும்.", "உங்கள் நண்பர்களிடம் இது குறித்து தெரிவிக்கவும்."] },
            identity_theft: { title: "போலி சுயவிவரம்", actions: ["போலி கணக்கை ஆப் மூலம் 'Impersonation' என்று புகாரளிக்கவும்.", "ஸ்கிரீன்ஷாட்களை சேகரித்து சைபர் செல்லில் புகாரளிக்கவும்."] },
            phishing: { title: "ஃபிஷிங் & தீங்கிழைக்கும் இணைப்புகள்", actions: ["இணைய இணைப்பை உடனடியாக துண்டிக்கவும்.", "வேறு பாதுகாப்பான சாதனத்தில் கடவுச்சொற்களை மாற்றவும்."] },
            job_scam: { title: "ஆன்லைன் வேலை மோசடி", actions: ["மோசடி நபர்களுடனான தொடர்பை துண்டிக்கவும்.", "பதிவு கட்டணம் செலுத்த வேண்டாம், 1930 இல் புகாரளிக்கவும்."] },
            suspicious_call: { title: "சந்தேகத்திற்குரிய அழைப்பு / SMS", actions: ["அறியப்படாத APK கோப்புகளை பதிவிறக்க வேண்டாம்.", "சஞ்சார் சாதி (Chakshu) போர்ட்டலில் புகாரளிக்கவும்."] },
            general: { title: "பொதுவான சைபர் பாதுகாப்பு", actions: ["அனைத்து கணக்குகளிலும் 2FA ஐ இயக்கவும்."] }
        }
    },
    'te-IN': {
        greeting: "నమస్కారం. నేను మీ సైబర్-హెల్ప్ వాయిస్ గైడ్. మీకు సహాయం చేయడానికి ఏమి జరిగిందో క్లుప్తంగా చెప్పండి.",
        clarify: "మీ డబ్బు పోయిందా లేదా మీ ఖాతా హ్యాక్ చేయబడిందా చెప్పగలరా?",
        emergencyWarning: "🚨 అత్యవసర హెచ్చరిక: డబ్బు పోయినందున లేదా ఖాతా హ్యాక్ అయినందున, తక్షణ చర్య తీసుకోవడం చాలా ముఖ్యం.",
        evidenceNote: "📌 ముఖ్య గమనిక: దయచేసి వెంటనే స్క్రీన్‌షాట్‌లు తీసుకోండి. లావాదేవీల IDలు మరియు ఫోన్ నంబర్‌లను భద్రపరచండి.",
        ending: "నేను మీ వివరాలను నమోదు చేసాను. మీ ఖాతాలను రక్షించుకోవడానికి దయచేసి పైన పేర్కొన్న అధికారిక దశలను వెంటనే పాటించండి.",
        categories: {
            upi_fraud: { title: "UPI & ఆర్థిక మోసాల మార్గదర్శకత్వం", actions: ["వెంటనే 1930 జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్‌కు కాల్ చేయండి.", "మీ బ్యాంకును సంప్రదించి డెబిట్ కార్డ్ మరియు నెట్ బ్యాంకింగ్ బ్లాక్ చేయండి.", "cybercrime.gov.in లో ఫిర్యాదు చేయండి."] },
            hacked_account: { title: "హ్యాక్ చేయబడిన ఖాతా", actions: ["అధికారిక రికవరీ పేజీని ఉపయోగించండి.", "మీ స్నేహితులకు మరియు కుటుంబ సభ్యులకు ఈ విషయం తెలియజేయండి."] },
            identity_theft: { title: "నకిలీ ప్రొఫైల్", actions: ["నకిలీ ఖాతాను యాప్ ద్వారా రిపోర్ట్ చేయండి.", "లింక్ మరియు స్క్రీన్‌షాట్‌లను భద్రపరిచి సైబర్ క్రైమ్‌లో రిపోర్ట్ చేయండి."] },
            phishing: { title: "ఫిషింగ్ & ప్రమాదకరమైన లింక్‌లు", actions: ["వెంటనే ఇంటర్నెట్ కనెక్షన్‌ని నిలిపివేయండి.", "సురక్షిత పరికరం ద్వారా మీ పాస్‌వర్డ్‌లను మార్చుకోండి."] },
            job_scam: { title: "ఆన్‌లైన్ ఉద్యోగ మోసం", actions: ["మోసగాళ్లతో సంభాషణను ఆపండి.", "ఉద్యోగం కోసం డబ్బులు చెల్లించకండి, 1930 కి కాల్ చేసి ఫిర్యాదు చేయండి."] },
            suspicious_call: { title: "అనుమానాస్పద కాల్ / SMS", actions: ["తెలియని APK ఫైల్‌లను ఇన్‌స్టాల్ చేయవద్దు.", "సంచార్ సాథి (Chakshu) పోర్టల్‌లో రిపోర్ట్ చేయండి."] },
            general: { title: "సాధారణ సైబర్ భద్రత", actions: ["అన్ని ఖాతాలలో 2FA ప్రారంభించండి."] }
        }
    },
    'kn-IN': {
        greeting: "ನಮಸ್ಕಾರ. ನಾನು ನಿಮ್ಮ ಸೈಬರ್-ಹೆಲ್ಪ್ ವಾಯ್ಸ್ ಗೈಡ್. ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಏನು ನಡೆದಿದೆ ಎಂದು ಸಂಕ್ಷಿಪ್ತವಾಗಿ ತಿಳಿಸಿ.",
        clarify: "ಹಣ ಕಳೆದುಹೋಗಿದೆಯೇ ಅಥವಾ ನಿಮ್ಮ ಖಾತೆ ಹ್ಯಾಕ್ ಆಗಿದೆಯೇ ಎಂದು ತಿಳಿಸುವಿರಾ?",
        emergencyWarning: "🚨 ತುರ್ತು ಎಚ್ಚರಿಕೆ: ಹಣ ಕಳೆದುಹೋಗಿರುವುದರಿಂದ, ತಕ್ಷಣದ ಕ್ರಮ ಕೈಗೊಳ್ಳುವುದು ಅತ್ಯಗತ್ಯ.",
        evidenceNote: "📌 ಪ್ರಮುಖ: ದಯವಿಟ್ಟು ತಕ್ಷಣ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ. ವಹಿವಾಟು ಐಡಿಗಳು ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆಗಳನ್ನು ಉಳಿಸಿ.",
        ending: "ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಾನು ದಾಖಲಿಸಿದ್ದೇನೆ. ನಿಮ್ಮ ಖಾತೆಗಳನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಲು ದಯವಿಟ್ಟು ಮೇಲಿನ ಅಧಿಕೃತ ಹಂತಗಳನ್ನು ತಕ್ಷಣ ಅನುಸರಿಸಿ.",
        categories: {
            upi_fraud: { title: "UPI ಮತ್ತು ಹಣಕಾಸು ವಂಚನೆ", actions: ["ತಕ್ಷಣ 1930 ಸೈಬರ್ ಕ್ರೈಮ್ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.", "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಿ ಡೆಬಿಟ್ ಕಾರ್ಡ್ ಮತ್ತು ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ನಿರ್ಬಂಧಿಸಿ.", "cybercrime.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ."] },
            hacked_account: { title: "ಹ್ಯಾಕ್ ಆದ ಖಾತೆ", actions: ["ಅಧಿಕೃತ ಖಾತೆ ಮರುಪಡೆಯುವಿಕೆ ಪುಟವನ್ನು ಬಳಸಿ.", "ನಿಮ್ಮ ಸ್ನೇಹಿತರಿಗೆ ಮತ್ತು ಕುಟುಂಬಕ್ಕೆ ಈ ಬಗ್ಗೆ ತಿಳಿಸಿ."] },
            identity_theft: { title: "ನಕಲಿ ಪ್ರೊಫೈಲ್", actions: ["ನಕಲಿ ಖಾತೆಯನ್ನು ಆಪ್ ಮೂಲಕ ರಿಪೋರ್ಟ್ ಮಾಡಿ.", "ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ ಸೈಬರ್ ಸೆಲ್‌ನಲ್ಲಿ ದೂರು ನೀಡಿ."] },
            phishing: { title: "ಫಿಶಿಂಗ್ ಮತ್ತು ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್‌ಗಳು", actions: ["ತಕ್ಷಣ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಕಡಿತಗೊಳಿಸಿ.", "ಸುರಕ್ಷಿತ ಸಾಧನದಿಂದ ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿ."] },
            job_scam: { title: "ಆನ್‌ಲೈನ್ ಉದ್ಯೋಗ ವಂಚನೆ", actions: ["ವಂಚಕರೊಂದಿಗೆ ಸಂವಹನವನ್ನು ನಿಲ್ಲಿಸಿ.", "ಉದ್ಯೋಗಕ್ಕಾಗಿ ಎಂದಿಗೂ ಹಣ ನೀಡಬೇಡಿ ಮತ್ತು 1930 ಗೆ ಕರೆ ಮಾಡಿ."] },
            suspicious_call: { title: "ಅನುಮಾನಾಸ್ಪದ ಕರೆ / SMS", actions: ["ಅಪರಿಚಿತ APK ಫೈಲ್‌ಗಳನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.", "ಸಂಚಾರ್ ಸಾಥಿ (Chakshu) ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ವರದಿ ಮಾಡಿ."] },
            general: { title: "ಸಾಮಾನ್ಯ ಸೈಬರ್ ಭದ್ರತೆ", actions: ["ಎಲ್ಲಾ ಖಾತೆಗಳಲ್ಲಿ 2FA ಸಕ್ರಿಯಗೊಳಿಸಿ."] }
        }
    },
    'bn-IN': {
        greeting: "নমস্কার। আমি আপনার সাইবার-হেল্প ভয়েস গাইড। আপনাকে সাহায্য করার জন্য অনুগ্রহ করে সংক্ষেপে জানান কী ঘটেছে।",
        clarify: "আপনার কি কোনো টাকা খোয়া গেছে বা আপনার অ্যাকাউন্ট হ্যাক হয়েছে?",
        emergencyWarning: "🚨 জরুরি সতর্কতা: যেহেতু টাকা খোয়া গেছে বা অ্যাকাউন্ট হ্যাক হয়েছে, অবিলম্বে পদক্ষেপ নেওয়া অত্যন্ত প্রয়োজন।",
        evidenceNote: "📌 গুরুত্বপূর্ণ: অনুগ্রহ করে অবিলম্বে স্ক্রিনশট নিন। ট্রানজ্যাকশন আইডি, ফোন নম্বর এবং সন্দেহভাজন লিঙ্কগুলি সংরক্ষণ করুন।",
        ending: "আমি আপনার বিবরণ রেকর্ড করেছি। আপনার অ্যাকাউন্টগুলি সুরক্ষিত করতে অনুগ্রহ করে উপরে উল্লিখিত অফিসিয়াল পদক্ষেপগুলি অবিলম্বে অনুসরণ করুন।",
        categories: {
            upi_fraud: { title: "UPI এবং আর্থিক জালিয়াতি", actions: ["অবিলম্বে ১৯৩০ জাতীয় সাইবার ক্রাইম হেল্পলাইনে কল করুন।", "আপনার ব্যাঙ্কের সাথে যোগাযোগ করে ডেবিট কার্ড এবং নেট ব্যাঙ্কিং ব্লক করুন।", "cybercrime.gov.in পোর্টালে অভিযোগ দায়ের করুন।"] },
            hacked_account: { title: "হ্যাক হওয়া অ্যাকাউন্ট", actions: ["প্ল্যাটফর্মের অফিসিয়াল রিকভারি পেজ ব্যবহার করুন।", "বন্ধুদের এবং পরিবারকে সতর্ক করুন যাতে তারা প্রতারিত না হয়।"] },
            identity_theft: { title: "পরিচয় চুরি এবং নকল প্রোফাইল", actions: ["অ্যাপের মধ্যে নকল প্রোফাইলটিকে রিপোর্ট করুন।", "প্রোফাইলের লিঙ্ক এবং স্ক্রিনশট সংগ্রহ করে সাইবার সেলে রিপোর্ট করুন।"] },
            phishing: { title: "ফিশিং এবং ক্ষতিকারক লিঙ্ক", actions: ["অবিলম্বে ডিভাইসের ইন্টারনেট সংযোগ বিচ্ছিন্ন করুন।", "একটি নিরাপদ ডিভাইস থেকে আপনার ব্যাঙ্কিং এবং ইমেল পাসওয়ার্ড পরিবর্তন করুন।"] },
            job_scam: { title: "অনলাইন চাকরি ও বিনিয়োগ প্রতারণা", actions: ["প্রতারকদের সাথে সমস্ত যোগাযোগ বন্ধ করুন।", "চাকরির জন্য কখনও টাকা দেবেন না এবং ১৯৩০ এ কল করে রিপোর্ট করুন।"] },
            suspicious_call: { title: "সন্দেহভাজন কল / এসএমএস", actions: ["অপরিচিত কোনো APK ফাইল ইনস্টল করবেন না।", "সঞ্চার সাথী (Chakshu) পোর্টালে নম্বরটি রিপোর্ট করুন।"] },
            general: { title: "সাধারণ সাইবার নিরাপত্তা", actions: ["সমস্ত গুরুত্বপূর্ণ অ্যাকাউন্টে 2FA চালু করুন।"] }
        }
    }
};

// Simple auto intent matcher from text keyword analysis
export function classifyIntentFromText(text) {
    const lower = text.toLowerCase();
    if (lower.includes('upi') || lower.includes('money') || lower.includes('bank') || lower.includes('transfer') || lower.includes('pay') || lower.includes('rupees') || lower.includes('account debited') || lower.includes('पैसे') || lower.includes('रुपये')) {
        return 'upi_fraud';
    }
    if (lower.includes('hack') || lower.includes('password') || lower.includes('login') || lower.includes('instagram') || lower.includes('facebook') || lower.includes('gmail') || lower.includes('हैक')) {
        return 'hacked_account';
    }
    if (lower.includes('fake') || lower.includes('impersonat') || lower.includes('profile') || lower.includes('photo') || lower.includes('फर्जी') || lower.includes('बनावट')) {
        return 'identity_theft';
    }
    if (lower.includes('link') || lower.includes('click') || lower.includes('phishing') || lower.includes('otp') || lower.includes('लिंक') || lower.includes('ओटीपी')) {
        return 'phishing';
    }
    if (lower.includes('job') || lower.includes('work') || lower.includes('investment') || lower.includes('telegram') || lower.includes('task') || lower.includes('salary') || lower.includes('नौकरी') || lower.includes('नोकरी')) {
        return 'job_scam';
    }
    if (lower.includes('call') || lower.includes('sms') || lower.includes('whatsapp') || lower.includes('threat') || lower.includes('police call') || lower.includes('कॉल') || lower.includes('एसएमएस')) {
        return 'suspicious_call';
    }
    return 'general';
}
