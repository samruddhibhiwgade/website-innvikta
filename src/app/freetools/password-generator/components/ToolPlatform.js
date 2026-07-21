import React from "react";
import { 
  FiRefreshCw, 
  FiCopy, 
  FiCheckCircle, 
  FiInfo, 
  FiEye, 
  FiEyeOff, 
  FiLock, 
  FiShield 
} from "react-icons/fi";

export default function ToolPlatform({
  generatorRef,
  strengthRef,
  activeTool,
  setActiveTool,
  passLength,
  setPassLength,
  includeUpper,
  setIncludeUpper,
  includeLower,
  setIncludeLower,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols,
  excludeSimilar,
  setExcludeSimilar,
  excludeAmbiguous,
  setExcludeAmbiguous,
  generatedPassword,
  generateRandomPassword,
  copiedGen,
  genAnalysis,
  wordCount,
  setWordCount,
  separator,
  setSeparator,
  capitalization,
  setCapitalization,
  passphraseIncludeNum,
  setPassphraseIncludeNum,
  passphraseIncludeSym,
  setPassphraseIncludeSym,
  useCustomPhrase,
  setUseCustomPhrase,
  customPhrase,
  setCustomPhrase,
  generatedPassphrase,
  generateRandomPassphrase,
  copiedPhrase,
  phraseAnalysis,
  checkPassword,
  setCheckPassword,
  showCheckPassword,
  setShowCheckPassword,
  checkAnalysis,
  copyToClipboard,
  setCopiedGen,
  setCopiedPhrase
}) {
  return (
    <section ref={generatorRef} className="section bg-white" style={{ padding: "4rem 0", position: "relative" }}>
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Tab Selector buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginBottom: "3rem", borderBottom: "1px solid #E5E7EB", paddingBottom: "1rem" }}>
          <button 
            onClick={() => setActiveTool("generator")} 
            style={{
              padding: "10px 24px",
              fontWeight: 700,
              borderRadius: "30px",
              fontSize: "0.95rem",
              backgroundColor: activeTool === "generator" ? "#F15A24" : "transparent",
              color: activeTool === "generator" ? "white" : "#4B5563",
              transition: "all 0.3s"
            }}
          >
            Password Generator
          </button>
          <button 
            onClick={() => setActiveTool("passphrase")} 
            style={{
              padding: "10px 24px",
              fontWeight: 700,
              borderRadius: "30px",
              fontSize: "0.95rem",
              backgroundColor: activeTool === "passphrase" ? "#F15A24" : "transparent",
              color: activeTool === "passphrase" ? "white" : "#4B5563",
              transition: "all 0.3s"
            }}
          >
            Passphrase Generator
          </button>
          <button 
            onClick={() => setActiveTool("strength")} 
            style={{
              padding: "10px 24px",
              fontWeight: 700,
              borderRadius: "30px",
              fontSize: "0.95rem",
              backgroundColor: activeTool === "strength" ? "#F15A24" : "transparent",
              color: activeTool === "strength" ? "white" : "#4B5563",
              transition: "all 0.3s"
            }}
          >
            Strength Analyzer
          </button>
        </div>

        {/* CARD ENCLOSING ACTIVE TOOL */}
        <div style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          padding: "2.5rem",
          maxWidth: "800px",
          margin: "0 auto"
        }}>

          {/* 1. PASSWORD GENERATOR VIEW */}
          {activeTool === "generator" && (
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>
                Strong Password Generator
              </h2>
              <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
                Generate secure, random, and unique passwords designed to resist brute-force attacks, credential stuffing, and account compromise.
              </p>

              <div style={{ 
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
                marginBottom: "2rem"
              }}>
                <span style={{ 
                  fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)", 
                  fontFamily: "monospace", 
                  fontWeight: 500, 
                  color: "#111827",
                  wordBreak: "break-all",
                  letterSpacing: "0.05em",
                  flex: 1
                }}>
                  {generatedPassword}
                </span>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button 
                    onClick={generateRandomPassword}
                    title="Regenerate password"
                    style={{ color: "#9CA3AF", padding: "8px", borderRadius: "8px" }}
                    className="hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    <FiRefreshCw size={18} />
                  </button>
                  <button 
                    onClick={() => copyToClipboard(generatedPassword, setCopiedGen)}
                    title="Copy to clipboard"
                    style={{ 
                      color: copiedGen ? "#10B981" : "#9CA3AF", 
                      padding: "8px", 
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center"
                    }}
                    className="hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    {copiedGen ? <FiCheckCircle size={18} /> : <FiCopy size={18} />}
                  </button>
                </div>
              </div>

              {/* Entropy Metrics */}
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                <div style={{ flex: 1, minWidth: "140px", backgroundColor: "#FFF5F2", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "#6B7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Strength</span>
                  <strong style={{ display: "block", fontSize: "1.25rem", color: genAnalysis.color, marginTop: "4px" }}>{genAnalysis.rating}</strong>
                </div>
                <div style={{ flex: 1, minWidth: "140px", backgroundColor: "#FFF5F2", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "#6B7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Estimated Crack Time</span>
                  <strong style={{ display: "block", fontSize: "1.1rem", color: "#111827", marginTop: "4px" }}>{genAnalysis.crackTime}</strong>
                </div>
              </div>

              {/* Controls Grid */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <label style={{ fontWeight: 700, color: "#374151" }}>Length: {passLength} characters</label>
                  </div>
                  <input 
                    type="range" 
                    min="8" 
                    max="64" 
                    value={passLength}
                    onChange={(e) => setPassLength(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "#F15A24" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                    Include Uppercase (A-Z)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                    Include Lowercase (a-z)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                    Include Numbers (0-9)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                    Include Symbols (!@#$%)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={excludeSimilar} onChange={(e) => setExcludeSimilar(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                    Exclude Similar (i, l, 1, L, o, 0)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={excludeAmbiguous} onChange={(e) => setExcludeAmbiguous(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                    Exclude Ambiguous ({"{ } [ ] ( )"})
                  </label>
                </div>
              </div>

              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                <button onClick={generateRandomPassword} className="btn btn-primary" style={{ flex: 1, padding: "12px" }}>
                  Generate Password
                </button>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "flex-start", gap: "8px", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "8px" }}>
                <FiInfo className="text-primary flex-shrink-0" style={{ marginTop: "3px" }} />
                <span style={{ fontSize: "0.85rem", color: "#4B5563", lineHeight: "1.4" }}>
                  <strong>Educational Note:</strong> Password strength depends heavily on length, randomness, uniqueness, and resistance to predictable dictionary matches.
                </span>
              </div>
            </div>
          )}

          {/* 2. PASSPHRASE GENERATOR VIEW */}
          {activeTool === "passphrase" && (
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>
                Secure Passphrase Generator
              </h2>
              <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
                Generate easy-to-remember passphrases that provide strong security through length and randomness.
              </p>

              <div style={{ 
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
                marginBottom: "2rem"
              }}>
                <span style={{ 
                  fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)", 
                  fontFamily: "monospace", 
                  fontWeight: 500, 
                  color: "#111827",
                  wordBreak: "break-all",
                  letterSpacing: "0.02em",
                  flex: 1
                }}>
                  {generatedPassphrase}
                </span>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button 
                    onClick={generateRandomPassphrase}
                    title="Regenerate passphrase"
                    style={{ color: "#9CA3AF", padding: "8px", borderRadius: "8px" }}
                    className="hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    <FiRefreshCw size={18} />
                  </button>
                  <button 
                    onClick={() => copyToClipboard(generatedPassphrase, setCopiedPhrase)}
                    title="Copy to clipboard"
                    style={{ 
                      color: copiedPhrase ? "#10B981" : "#9CA3AF", 
                      padding: "8px", 
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center"
                    }}
                    className="hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    {copiedPhrase ? <FiCheckCircle size={18} /> : <FiCopy size={18} />}
                  </button>
                </div>
              </div>

              {/* Entropy Metrics */}
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                <div style={{ flex: 1, minWidth: "140px", backgroundColor: "#FFF5F2", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "#6B7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Strength</span>
                  <strong style={{ display: "block", fontSize: "1.25rem", color: phraseAnalysis.color, marginTop: "4px" }}>{phraseAnalysis.rating}</strong>
                </div>
                <div style={{ flex: 1, minWidth: "140px", backgroundColor: "#FFF5F2", borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "#6B7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Estimated Crack Time</span>
                  <strong style={{ display: "block", fontSize: "1.1rem", color: "#111827", marginTop: "4px" }}>{phraseAnalysis.crackTime}</strong>
                </div>
              </div>

              {/* Controls Grid */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 700, color: "#374151" }}>
                    <input 
                      type="radio" 
                      name="passphraseMode" 
                      checked={!useCustomPhrase} 
                      onChange={() => setUseCustomPhrase(false)} 
                      style={{ accentColor: "#F15A24" }} 
                    />
                    Random Words
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 700, color: "#374151" }}>
                    <input 
                      type="radio" 
                      name="passphraseMode" 
                      checked={useCustomPhrase} 
                      onChange={() => setUseCustomPhrase(true)} 
                      style={{ accentColor: "#F15A24" }} 
                    />
                    Custom Phrase
                  </label>
                </div>

                {!useCustomPhrase ? (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <label style={{ fontWeight: 700, color: "#374151" }}>Words: {wordCount}</label>
                    </div>
                    <input 
                      type="range" 
                      min="3" 
                      max="8" 
                      value={wordCount}
                      onChange={(e) => setWordCount(parseInt(e.target.value))}
                      style={{ width: "100%", accentColor: "#F15A24" }}
                    />
                  </div>
                ) : (
                  <div>
                    <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Enter Your Custom Phrase</label>
                    <input 
                      type="text" 
                      value={customPhrase} 
                      onChange={(e) => setCustomPhrase(e.target.value)} 
                      placeholder="e.g. My favorite security tool is Innvikta 100%!" 
                      style={{ 
                        width: "100%", 
                        padding: "10px 14px", 
                        border: "1px solid #D1D5DB", 
                        borderRadius: "8px",
                        outline: "none"
                      }}
                    />
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Word Separator</label>
                    <select 
                      value={separator} 
                      onChange={(e) => setSeparator(e.target.value)}
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "8px" }}
                    >
                      <option value="-">Dash (-)</option>
                      <option value="_">Underscore (_)</option>
                      <option value=" ">Space ( )</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>Capitalization</label>
                    <select 
                      value={capitalization} 
                      onChange={(e) => setCapitalization(e.target.value)}
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "8px" }}
                    >
                      <option value="lowercase">lowercase</option>
                      <option value="titlecase">Title Case</option>
                      <option value="random">RaNdOm Case</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={passphraseIncludeNum} onChange={(e) => setPassphraseIncludeNum(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                    Append random digit
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={passphraseIncludeSym} onChange={(e) => setPassphraseIncludeSym(e.target.checked)} style={{ accentColor: "#F15A24" }} />
                    Append random symbol
                  </label>
                </div>
              </div>

              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                <button onClick={generateRandomPassphrase} className="btn btn-primary" style={{ flex: 1, padding: "12px" }}>
                  Generate Passphrase
                </button>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "flex-start", gap: "8px", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "8px" }}>
                <FiInfo className="text-primary flex-shrink-0" style={{ marginTop: "3px" }} />
                <span style={{ fontSize: "0.85rem", color: "#4B5563", lineHeight: "1.4" }}>
                  <strong>Educational Note:</strong> Longer passphrases are much easier to commit to memory and frequently more secure than short complex passwords.
                </span>
              </div>
            </div>
          )}

          {/* 3. PASSWORD STRENGTH ANALYZER VIEW */}
          {activeTool === "strength" && (
            <div ref={strengthRef}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>
                Password Strength Analyzer
              </h2>
              <p style={{ color: "#6B7280", marginBottom: "2rem" }}>
                Type a password below to test its strength locally. All calculations are executed browser-side.
              </p>

              {/* Input Field */}
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <input 
                  type={showCheckPassword ? "text" : "password"}
                  value={checkPassword}
                  onChange={(e) => setCheckPassword(e.target.value)}
                  placeholder="Enter password to check..."
                  style={{
                    width: "100%",
                    padding: "14px 3rem 14px 1.25rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    fontFamily: checkPassword ? "monospace" : "inherit"
                  }}
                />
                <button 
                  onClick={() => setShowCheckPassword(!showCheckPassword)}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9CA3AF"
                  }}
                >
                  {showCheckPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              {/* Strength Meter Bar */}
              {checkPassword && (
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontWeight: 700 }}>
                    <span style={{ color: "#374151" }}>Entropy Score: {checkAnalysis.score} / 5</span>
                    <span style={{ color: checkAnalysis.color }}>{checkAnalysis.rating}</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", backgroundColor: "#E5E7EB", borderRadius: "10px", overflow: "hidden" }}>
                    <div style={{ 
                      width: `${(checkAnalysis.score / 5) * 100}%`, 
                      height: "100%", 
                      backgroundColor: checkAnalysis.color,
                      transition: "width 0.3s"
                    }} />
                  </div>
                </div>
              )}

              {/* Results / Feedback Grid */}
              {checkPassword ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                  <div style={{ backgroundColor: "#F9FAFB", padding: "1.25rem", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                    <h4 style={{ margin: "0 0 0.75rem 0", fontSize: "0.9rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>Security Metrics</h4>
                    <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
                      <li>Length: <strong>{checkPassword.length} characters</strong></li>
                      <li>Diversity: <strong>{
                        ( /[a-z]/.test(checkPassword) ? 1 : 0) +
                        ( /[A-Z]/.test(checkPassword) ? 1 : 0) +
                        ( /[0-9]/.test(checkPassword) ? 1 : 0) +
                        ( /[^A-Za-z0-9]/.test(checkPassword) ? 1 : 0)
                      } / 4 types</strong></li>
                      <li>Crack Time: <strong style={{ color: checkAnalysis.color }}>{checkAnalysis.crackTime}</strong></li>
                    </ul>
                  </div>

                  <div style={{ backgroundColor: "#F9FAFB", padding: "1.25rem", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                    <h4 style={{ margin: "0 0 0.75rem 0", fontSize: "0.9rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>Recommendations</h4>
                    {checkAnalysis.feedback.length > 0 ? (
                      <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "6px", color: "#4B5563" }}>
                        {checkAnalysis.feedback.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10B981", fontSize: "0.9rem", fontWeight: 600 }}>
                        <FiCheckCircle /> Excellent! No security patterns detected.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ padding: "3rem", textAlign: "center", color: "#9CA3AF" }}>
                  <FiLock size={48} style={{ margin: "0 auto 1rem auto" }} />
                  <p style={{ margin: 0 }}>Type a password to launch real-time local checks.</p>
                </div>
              )}

              <div style={{ marginTop: "2rem", display: "flex", alignItems: "flex-start", gap: "8px", backgroundColor: "#FFF5F2", border: "1px solid #FFDDCF", padding: "1rem", borderRadius: "8px" }}>
                <FiShield className="text-primary flex-shrink-0" style={{ marginTop: "3px" }} />
                <span style={{ fontSize: "0.85rem", color: "#9A3412", lineHeight: "1.4" }}>
                  <strong>Privacy Notice:</strong> Your password calculations are fully local and client-side. We never capture, store, log, or transmit any inputs.
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
