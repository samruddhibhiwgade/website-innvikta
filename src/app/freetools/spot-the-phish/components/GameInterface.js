import React from "react";
import Link from "next/link";
import { EMAILS } from "./constants";
import { 
  FiShield, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiInbox, 
  FiSend, 
  FiArchive, 
  FiTrash2, 
  FiArrowRight, 
  FiSearch, 
  FiMenu, 
  FiFileText, 
  FiCornerUpLeft, 
  FiCornerUpRight, 
  FiMoreHorizontal, 
  FiX, 
  FiClock,
  FiLinkedin,
  FiFacebook,
  FiTwitter
} from "react-icons/fi";

export default function GameInterface({
  gameStarted,
  setGameStarted,
  gameComplete,
  guesses,
  score,
  timer,
  formatTime,
  handleGuess,
  activeEmailId,
  setActiveEmailId,
  feedbackOverlay,
  isMobileListOpen,
  setIsMobileListOpen,
  restartGame
}) {
  const activeEmail = EMAILS.find(e => e.id === activeEmailId) || EMAILS[0];

  return (
    <section style={{ padding: "0 0 4rem 0", backgroundColor: "#FFFFFF", position: "relative" }}>
      <div className="container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        
        <div style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "700px"
        }}>
          <div style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden"
          }}>
            {/* 1. START SCREEN MODAL OVERLAY */}
            {!gameStarted && (
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 30,
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem"
              }}>
                <div style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  padding: "2.5rem 2rem",
                  maxWidth: "600px",
                  width: "100%",
                  position: "relative",
                  textAlign: "center"
                }}>
                  <div style={{
                    position: "absolute",
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(241, 90, 36, 0.05)",
                    filter: "blur(40px)",
                    top: "15%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    pointerEvents: "none"
                  }} />

                  <h2 style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "#111827",
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-heading)"
                  }}>
                    Spot the Phish
                  </h2>

                  <div style={{
                    width: "80px",
                    height: "3px",
                    backgroundColor: "#F15A24",
                    margin: "0 auto 1.5rem auto",
                    borderRadius: "2px"
                  }} />

                  <p style={{
                    fontSize: "1.05rem",
                    color: "#4B5563",
                    lineHeight: "1.6",
                    marginBottom: "2.5rem",
                    fontWeight: 500
                  }}>
                    Suspicious emails are landing in your inbox. Can you tell the difference between a harmless message and a malicious phishing attack? Put your phishing detection skills to the test and spot the phish!
                  </p>

                  <div style={{
                    display: "flex",
                    gap: "3rem",
                    marginBottom: "2.5rem",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "14px",
                        backgroundColor: "#FFF5F2",
                        color: "#F15A24",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        border: "1px solid #FFDDCF"
                      }}>
                        <FiShield />
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>Report Phishing</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "14px",
                        backgroundColor: "#D1FAE5",
                        color: "#10B981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        border: "1px solid #A7F3D0"
                      }}>
                        <FiCheckCircle />
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>Mark as Safe</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setGameStarted(true)}
                    style={{
                      backgroundColor: "#F15A24",
                      color: "white",
                      fontWeight: 700,
                      padding: "1rem 2.5rem",
                      borderRadius: "30px",
                      boxShadow: "0 10px 20px rgba(241, 90, 36, 0.15)",
                      border: "none",
                      fontSize: "1.05rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      margin: "0 auto",
                      transition: "all 0.2s"
                    }}
                    className="hover:opacity-90 hover:scale-102 transform transition-transform duration-200"
                  >
                    Start the Challenge <FiArrowRight />
                  </button>

                  <p style={{
                    fontSize: "0.8rem",
                    color: "#9CA3AF",
                    lineHeight: "1.5",
                    marginTop: "2.5rem",
                    borderTop: "1px solid #F3F4F6",
                    paddingTop: "1rem"
                  }}>
                    <strong>Disclaimer:</strong> In the real world, always take your time to inspect links and domains carefully. While this challenge tests your rapid reflexes for fun and practice, vigilance is your best defense against actual threats.
                  </p>
                </div>
              </div>
            )}

            {/* 2. TOP ACTION BAR */}
            <div style={{ 
              height: "70px",
              backgroundColor: "#FFFFFF", 
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 1rem",
              flexShrink: 0
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                <FiMenu 
                  className="text-gray-600 text-2xl cursor-pointer md:hidden" 
                  onClick={() => setIsMobileListOpen(!isMobileListOpen)}
                />
                <div className="hidden sm:flex" style={{ 
                  alignItems: "center", backgroundColor: "#F3F4F6", 
                  borderRadius: "20px", padding: "8px 16px", maxWidth: "250px", width: "100%", gap: "8px" 
                }}>
                  <FiSearch className="text-gray-500 text-lg" />
                  <span className="text-gray-500 text-sm">Search</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flex: 1, opacity: (!gameStarted || gameComplete || feedbackOverlay) ? 0.3 : 1, pointerEvents: (!gameStarted || gameComplete || feedbackOverlay) ? 'none' : 'auto', transition: "opacity 0.2s" }}>
                <button 
                  onClick={() => handleGuess('phish')}
                  style={{ 
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    background: "none", border: "none", cursor: "pointer", color: "#EF4444", gap: "4px"
                  }}
                  className="hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <FiShield size={26} />
                  <span className="hidden sm:inline" style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>Report as phishing</span>
                </button>
                
                <button 
                  onClick={() => handleGuess('safe')}
                  style={{ 
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    background: "none", border: "none", cursor: "pointer", color: "#10B981", gap: "4px"
                  }}
                  className="hover:bg-green-50 p-2 rounded-lg transition-colors"
                >
                  <FiCheckCircle size={26} />
                  <span className="hidden sm:inline" style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>Mark as safe</span>
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
                <div className="px-3 py-2 sm:px-4 sm:py-2" style={{ 
                  display: "flex", alignItems: "center", backgroundColor: "#FFF5F2", 
                  border: "1px solid #FFDDCF",
                  borderRadius: "24px", gap: "12px", color: "#F15A24"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ backgroundColor: "#F15A24", color: "#FFFFFF", borderRadius: "12px", padding: "2px 8px", fontSize: "13px", fontWeight: 700 }}>
                      {score}
                    </div>
                    <span className="hidden sm:inline" style={{ fontSize: "14px", fontWeight: 600, color: "#9A3412" }}>Score</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ backgroundColor: "#F15A24", color: "#FFFFFF", borderRadius: "12px", padding: "2px 8px", fontSize: "13px", fontWeight: 700, minWidth: "52px", textAlign: "center" }}>
                      {formatTime(timer)}
                    </div>
                    <span className="hidden sm:inline" style={{ fontSize: "14px", fontWeight: 600, color: "#9A3412" }}>Time</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3-PANE LAYOUT */}
            {!gameComplete ? (
              <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
                
                {/* Left Pane - Folders (Hidden on mobile) */}
                <div className="hidden lg:flex" style={{ 
                  width: "240px", 
                  borderRight: "1px solid #E5E7EB", 
                  flexDirection: "column", 
                  backgroundColor: "#F9FAFB",
                  padding: "1.5rem 0"
                }}>
                  <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "#E5E7EB", fontWeight: 600, color: "#111827", cursor: "pointer", fontSize: "15px" }}>
                    <FiInbox className="text-xl" />
                    <span style={{ flex: 1 }}>Inbox</span>
                    <span style={{ backgroundColor: "#F15A24", color: "white", fontSize: "12px", padding: "2px 8px", borderRadius: "12px" }}>
                      {EMAILS.length - Object.keys(guesses).length}
                    </span>
                  </div>
                  <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                    <FiAlertTriangle className="text-xl" /> <span>Junk Email</span>
                  </div>
                  <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                    <FiFileText className="text-xl" /> <span>Drafts</span>
                  </div>
                  <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                    <FiSend className="text-xl" /> <span>Sent Items</span>
                  </div>
                  <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                    <FiTrash2 className="text-xl" /> <span>Deleted Items</span>
                  </div>
                  <div style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", color: "#6B7280", cursor: "not-allowed", fontSize: "15px" }}>
                    <FiArchive className="text-xl" /> <span>Archive</span>
                  </div>
                </div>

                {/* Middle Pane - Message List */}
                <div 
                  className={`md:flex ${isMobileListOpen ? 'flex' : 'hidden'}`}
                  style={{ 
                    width: "350px", 
                    borderRight: "1px solid #E5E7EB", 
                    flexDirection: "column", 
                    backgroundColor: "#FFFFFF",
                    position: isMobileListOpen ? "absolute" : "relative",
                    zIndex: 10,
                    height: "100%",
                    boxShadow: isMobileListOpen ? "5px 0 15px rgba(0,0,0,0.1)" : "none"
                  }}
                >
                  {isMobileListOpen && (
                    <div style={{ padding: "1rem", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F9FAFB" }}>
                      <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>Inbox ({EMAILS.length - Object.keys(guesses).length})</span>
                      <FiX className="text-xl cursor-pointer text-gray-600" onClick={() => setIsMobileListOpen(false)} />
                    </div>
                  )}
                  
                  <div style={{ overflowY: "auto", flex: 1, padding: "0.5rem" }}>
                    {EMAILS.map((email) => {
                      const isGuessed = !!guesses[email.id];
                      const isActive = activeEmailId === email.id;
                      return (
                        <div 
                          key={email.id}
                          style={{
                            padding: "1rem",
                            borderRadius: "8px",
                            marginBottom: "4px",
                            backgroundColor: isActive ? "#F3F4F6" : "transparent",
                            cursor: isGuessed ? "default" : "pointer",
                            opacity: isGuessed && !isActive ? 0.4 : 1,
                            display: "flex",
                            gap: "1rem",
                            transition: "background-color 0.2s"
                          }}
                          onClick={() => {
                            if (!isGuessed && !feedbackOverlay) {
                              setActiveEmailId(email.id);
                              setIsMobileListOpen(false);
                            }
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                            <div style={{ 
                              width: "36px", height: "36px", borderRadius: "50%", 
                              backgroundColor: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "14px", fontWeight: 700, color: "#4B5563"
                            }}>
                              {email.senderInitials}
                            </div>
                            {!isGuessed && <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#F15A24" }}></div>}
                          </div>
                          
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                              <span style={{ fontWeight: isGuessed ? 500 : 700, color: "#111827", fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {email.senderName}
                              </span>
                              <span style={{ fontSize: "12px", color: "#6B7280", flexShrink: 0 }}>{email.date}</span>
                            </div>
                            <div style={{ fontSize: "14px", color: "#4B5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: isGuessed ? 400 : 500 }}>
                              {email.subject}
                            </div>
                            {isGuessed && (
                              <div style={{ marginTop: "6px", fontSize: "13px", fontWeight: 700, color: guesses[email.id] === (email.isPhishing ? 'phish' : 'safe') ? "#10B981" : "#EF4444" }}>
                                {guesses[email.id] === (email.isPhishing ? 'phish' : 'safe') ? "✓ Correct" : "✗ Incorrect"}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Pane - Reading Pane */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", position: "relative" }}>
                  <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #E5E7EB" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.3 }}>
                        {activeEmail.subject}
                      </h2>
                      <div className="hidden sm:flex" style={{ gap: "16px", color: "#9CA3AF", fontSize: "20px" }}>
                        <FiCornerUpLeft className="cursor-pointer hover:text-gray-700" />
                        <FiCornerUpRight className="cursor-pointer hover:text-gray-700" />
                        <FiMoreHorizontal className="cursor-pointer hover:text-gray-700" />
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#4B5563" }}>
                        {activeEmail.senderInitials}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>{activeEmail.senderName}</span>
                          <span style={{ color: "#6B7280", fontSize: "14px" }}>&lt;{activeEmail.senderEmail}&gt;</span>
                        </div>
                        <div style={{ color: "#9CA3AF", fontSize: "13px", marginTop: "4px" }}>
                          To: you@company.com • {activeEmail.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "2rem", flex: 1, overflowY: "auto", fontSize: "16px", color: "#374151", lineHeight: "1.6" }}>
                    <div dangerouslySetInnerHTML={{ __html: activeEmail.body }} />
                  </div>

                  {feedbackOverlay && (
                    <>
                      <div style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        backdropFilter: "blur(2px)",
                        zIndex: 19
                      }}></div>
                      
                      <div style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: "500px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "16px",
                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                        border: `3px solid ${feedbackOverlay.status === 'correct' ? "#10B981" : "#EF4444"}`,
                        padding: "2rem",
                        zIndex: 20,
                        animation: "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                      }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem" }}>
                          <div style={{ 
                            width: "64px", height: "64px", borderRadius: "50%", flexShrink: 0,
                            backgroundColor: feedbackOverlay.status === 'correct' ? "#D1FAE5" : "#FEE2E2", 
                            color: feedbackOverlay.status === 'correct' ? "#10B981" : "#EF4444",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" 
                          }}>
                            {feedbackOverlay.status === 'correct' ? <FiCheckCircle /> : <FiAlertTriangle />}
                          </div>
                          <div>
                            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem", fontWeight: 800, color: "#111827" }}>
                              {feedbackOverlay.status === 'correct' ? 'Correct!' : 'Incorrect!'}
                            </h3>
                            <p style={{ fontWeight: 600, color: feedbackOverlay.isPhishing ? "#EF4444" : "#10B981", fontSize: "1.1rem", marginBottom: "1rem" }}>
                              {feedbackOverlay.isPhishing ? "It was a Phishing Attempt." : "It was a Legitimate Email."}
                            </p>
                            <div style={{ backgroundColor: "#F9FAFB", padding: "1.25rem", borderRadius: "12px", border: "1px solid #E5E7EB", textAlign: "left" }}>
                              <p style={{ margin: 0, color: "#4B5563", fontSize: "15px", lineHeight: "1.6" }}>
                                {feedbackOverlay.message}
                              </p>
                            </div>
                            <div style={{ marginTop: "1.5rem", fontSize: "14px", color: "#6B7280", fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                              <FiClock className="animate-pulse" /> Loading next email automatically...
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              </div>
            ) : (
              /* Game Complete Screen */
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", backgroundColor: "#FFFFFF", maxWidth: "680px", margin: "0 auto", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <h2 style={{ 
                    fontSize: "2.25rem", 
                    fontWeight: 800, 
                    color: "#F15A24", 
                    margin: 0,
                    fontFamily: "var(--font-heading)"
                  }}>
                    {score >= 12 ? "Security Champion" : score >= 8 ? "Cyber Sentinel" : "Cyber Apprentice"}
                  </h2>
                </div>

                <div style={{ width: "100%", height: "1px", backgroundColor: "#E5E7EB", margin: "2rem 0" }} />

                <p style={{ fontSize: "1.125rem", color: "#374151", lineHeight: "1.6", textAlign: "center", margin: "0 0 2rem 0" }}>
                  You&apos;ve earned <strong style={{ color: "#F15A24" }}>{score} out of {EMAILS.length} points</strong> in <strong style={{ color: "#F15A24" }}>{formatTime(300 - timer)}</strong>! Remember, every apprentice to detective starts somewhere, and you&apos;re well on your way.
                </p>

                <div style={{ 
                  backgroundColor: "#FFF5F2", 
                  border: "1px solid #FFDDCF",
                  padding: "2rem", 
                  borderRadius: "16px", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  textAlign: "left", 
                  width: "100%", 
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                  gap: "1.5rem",
                  flexWrap: "wrap"
                }}>
                  <div style={{ flex: "1 1 300px" }}>
                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>
                      Enjoyed this phishing game?
                    </h3>
                    <p style={{ margin: 0, color: "#4B5563", fontSize: "0.95rem", lineHeight: "1.5" }}>
                      Try the real deal and see how Innvikta can reduce your human risk.
                    </p>
                  </div>
                  <Link href="/book-demo" style={{ 
                    backgroundColor: "#F15A24", 
                    color: "white", 
                    fontWeight: 700, 
                    padding: "0.75rem 1.5rem", 
                    borderRadius: "8px", 
                    boxShadow: "0 4px 10px rgba(241, 90, 36, 0.2)", 
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap"
                  }} className="bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-5 h-12 font-bold shadow-md shadow-orange-500/10">
                    Book a Demo <FiArrowRight className="text-xs" />
                  </Link>
                </div>

                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  width: "100%", 
                  marginTop: "2rem",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", letterSpacing: "0.05em" }}>
                    SHARE YOUR SCORE &amp; CHALLENGE FRIENDS TO KEEP THEM SAFE
                  </span>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://innvikta.com/freetools/spot-the-phish')}`} target="_blank" rel="noopener noreferrer" style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#111827", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }} className="hover:opacity-80">
                      <FiLinkedin size={16} />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://innvikta.com/freetools/spot-the-phish')}`} target="_blank" rel="noopener noreferrer" style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#111827", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }} className="hover:opacity-80">
                      <FiFacebook size={16} />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I scored ${score}/${EMAILS.length} in the Email Threat Identifier game! Can you beat my score?`)}&url=${encodeURIComponent('https://innvikta.com/freetools/spot-the-phish')}`} target="_blank" rel="noopener noreferrer" style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#111827", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }} className="hover:opacity-80">
                      <FiTwitter size={16} />
                    </a>
                  </div>
                </div>

                <button onClick={restartGame} style={{ textDecoration: "underline", color: "#6B7280", fontWeight: 500, fontSize: "0.95rem", cursor: "pointer", background: "none", border: "none", marginTop: "3rem" }}>
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
