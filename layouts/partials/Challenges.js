"use client";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import { markdownify } from "@lib/utils/textConverter";

const Challenges = ({ challenges }) => {
  return (
    <section className="section bg-body py-24 border-b border-border">
      <div className="container">
        <div className="row items-center">
          <div className="col-12 lg:col-5 mb-16 lg:mb-0 px-6 md:px-12 lg:px-16">
            <h2 className="mb-8 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
              {challenges.title}
            </h2>
            {challenges.stats_summary && (
              <div className="text-lg md:text-xl leading-relaxed font-medium mb-4">
                {markdownify(challenges.stats_summary, "div", "challenges-stats")}
              </div>
            )}
            {challenges.description && (
              <div className="text-slate-600 mb-8 leading-relaxed">
                {markdownify(challenges.description)}
              </div>
            )}
            <div style={{ marginTop: "2rem" }}>
              <a className="btn btn-primary btn-cta" href="/book-demo" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '8px' }}>
                <span>Book A Demo</span>
                <div className="arrow-wrapper" style={{ display: 'inline-flex', alignItems: 'center', margin: 0 }}>
                  <svg className="arrow-icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.29985 4.50047L0 1.20062L0.942813 0.257812L5.18545 4.50047L0.942813 8.74306L0 7.80027L3.29985 4.50047Z" fill="currentColor" />
                  </svg>
                </div>
              </a>
            </div>
            <style jsx global>{`
              .challenges-stats .text-primary {
                font-weight: 800;
              }
            `}</style>
          </div>
          <div className="col-12 lg:col-7 px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {challenges.cards?.map((card, index) => (
                <div key={index} className="group h-[450px] [perspective:1000px]">
                  <div className="relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                    {/* Front */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#FFFBF7] border border-orange-100 p-6 flex flex-col [backface-visibility:hidden] shadow-sm overflow-hidden text-center justify-between">
                      {index === 0 && (
                        <div className="flex flex-col h-full justify-between">
                          <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", width: "64px", height: "64px", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "32px", height: "32px" }}>
                                  <circle cx="20" cy="20" r="14" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                                  <ellipse cx="20" cy="20" rx="6" ry="14" stroke="#f15a24" strokeWidth="2" fill="none" />
                                  <line x1="6" y1="20" x2="34" y2="20" stroke="#f15a24" strokeWidth="2" />
                                  <path d="M34 24 L42 38 L26 38 Z" fill="#f15a24" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                  <text x="34" y="35.5" fontFamily="Inter" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">!</text>
                              </svg>
                          </div>
                          <div className="card-number" style={{ fontSize: "2.25rem", fontWeight: "800", color: "#f15a24", marginTop: "0.5rem" }}>$4.4M</div>
                          <div className="card-divider" style={{ width: "32px", height: "3px", backgroundColor: "#f15a24", margin: "0.5rem auto" }}></div>
                          <h3 className="card-title" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.25rem", lineHeight: "1.3" }}>Average Global Breach Cost</h3>
                          <p className="card-description" style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: "1.4", margin: "0 auto 0.25rem", maxWidth: "220px" }}>average global cost of a data breach</p>
                          <span className="card-source" style={{ fontSize: "0.65rem", fontWeight: "700", color: "#94a3b8", display: "block", marginBottom: "0.75rem" }}>SOURCE: IBM</span>
                          <div className="card-chart" style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
                              <svg width="140" height="80" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                                  <line x1="10" y1="90" x2="140" y2="90" stroke="#FFEFEA" strokeWidth="1" />
                                  <rect x="15" y="18" width="14" height="72" rx="2" fill="#f15a24" />
                                  <rect x="39" y="34" width="14" height="56" rx="2" fill="#f15a24" fillOpacity="0.9" />
                                  <rect x="63" y="50" width="14" height="40" rx="2" fill="#f15a24" fillOpacity="0.7" />
                                  <rect x="87" y="66" width="14" height="24" rx="2" fill="#f15a24" fillOpacity="0.5" />
                                  <rect x="111" y="78" width="14" height="12" rx="2" fill="#f15a24" fillOpacity="0.3" />
                                  <path d="M22 18 C 50 18, 95 32, 118 78" stroke="#f15a24" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                                  <path d="M113 78 L119 80 L119 73" stroke="#f15a24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                  <circle cx="132" cy="78" r="10" fill="#f15a24" />
                                  <text x="132" y="82" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="white" textAnchor="middle">$</text>
                              </svg>
                          </div>
                        </div>
                      )}

                      {index === 1 && (
                        <div className="flex flex-col h-full justify-between">
                          <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", width: "64px", height: "64px", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "32px", height: "32px" }}>
                                  <path d="M22 12 C16 12, 10 16, 10 24 C10 28, 13 32, 16 34 C17 35, 18 36, 18 37 C18 40, 20 40, 22 40 L22 12 Z" stroke="#f15a24" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                                  <path d="M16 20 C18 20, 20 22, 22 22" stroke="#f15a24" strokeWidth="2" />
                                  <path d="M14 28 C17 28, 19 28, 22 26" stroke="#f15a24" strokeWidth="2" />
                                  <path d="M26 12 C32 12, 38 16, 38 24 C38 28, 35 32, 32 34 C31 35, 30 36, 30 37 C30 40, 28 40, 26 40 L26 12 Z" stroke="#f15a24" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                                  <circle cx="34" cy="20" r="2" fill="#f15a24" />
                                  <line x1="26" y1="20" x2="32" y2="20" stroke="#f15a24" strokeWidth="2" />
                                  <circle cx="32" cy="28" r="2" fill="#f15a24" />
                                  <line x1="26" y1="28" x2="30" y2="28" stroke="#f15a24" strokeWidth="2" />
                                  <circle cx="30" cy="34" r="2" fill="#f15a24" />
                                  <line x1="26" y1="34" x2="28" y2="34" stroke="#f15a24" strokeWidth="2" />
                              </svg>
                          </div>
                          <div className="card-number" style={{ fontSize: "2.25rem", fontWeight: "800", color: "#f15a24", marginTop: "0.5rem" }}>33%</div>
                          <div className="card-divider" style={{ width: "32px", height: "3px", backgroundColor: "#f15a24", margin: "0.5rem auto" }}></div>
                          <h3 className="card-title" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.25rem", lineHeight: "1.3" }}>Unapproved AI Usage</h3>
                          <p className="card-description" style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: "1.4", margin: "0 auto 0.25rem", maxWidth: "220px" }}>employees sharing sensitive data with unapproved AI tools</p>
                          <span className="card-source" style={{ fontSize: "0.65rem", fontWeight: "700", color: "#94a3b8", display: "block", marginBottom: "0.75rem" }}>SOURCE: IBM</span>
                          <div className="card-chart" style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
                              <svg width="140" height="80" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                                  <g transform="translate(15, 26)">
                                      <circle cx="16" cy="14" r="8" stroke="#f15a24" strokeWidth="2" fill="none" />
                                      <path d="M2 36 C2 28, 8 24, 16 24 C24 24, 30 28, 30 36" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" fill="none" />
                                  </g>
                                  <g transform="translate(57, 18)">
                                      <circle cx="16" cy="14" r="8" stroke="#f15a24" strokeWidth="2" fill="none" />
                                      <path d="M2 36 C2 28, 8 24, 16 24 C24 24, 30 28, 30 36" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" fill="#FFEFEA" />
                                      <path d="M16 28 L23 40 L9 40 Z" fill="#f15a24" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                      <text x="16" y="38" fontFamily="Inter" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">!</text>
                                  </g>
                                  <g transform="translate(99, 26)">
                                      <circle cx="16" cy="14" r="8" stroke="#f15a24" strokeWidth="2" fill="none" />
                                      <path d="M2 36 C2 28, 8 24, 16 24 C24 24, 30 28, 30 36" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" fill="none" />
                                  </g>
                              </svg>
                          </div>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="flex flex-col h-full justify-between">
                          <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", width: "64px", height: "64px", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
                              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "32px", height: "32px" }}>
                                  <path d="M24 6 L38 12 L38 24 Q38 36, 24 42 Q10 36, 10 24 L10 12 Z" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                                  <path d="M18 24 L22 28 L30 18" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                              </svg>
                          </div>
                          <div className="card-number" style={{ fontSize: "2.25rem", fontWeight: "800", color: "#f15a24", marginTop: "0.5rem" }}>67%</div>
                          <div className="card-divider" style={{ width: "32px", height: "3px", backgroundColor: "#f15a24", margin: "0.5rem auto" }}></div>
                          <h3 className="card-title" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#1e293b", marginBottom: "0.25rem", lineHeight: "1.3" }}>Fewer Security Incidents</h3>
                          <p className="card-description" style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: "1.4", margin: "0 auto 0.25rem", maxWidth: "220px" }}>organizations reporting fewer incidents after training</p>
                          <span className="card-source" style={{ fontSize: "0.65rem", fontWeight: "700", color: "#94a3b8", display: "block", marginBottom: "0.75rem" }}>SOURCE: FORTINET</span>
                          <div className="card-chart" style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
                              <svg width="140" height="80" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
                                  <path d="M25 80 A50 50 0 0 1 125 80" stroke="#FFEFEA" strokeWidth="10" strokeLinecap="round" fill="none" />
                                  <path d="M25 80 A50 50 0 0 1 120.5 37" stroke="#f15a24" strokeWidth="10" strokeLinecap="round" fill="none" />
                                  <g transform="translate(63, 52)">
                                      <path d="M12 2 L22 6 L22 14 Q22 21 12 25 Q2 21 2 14 L2 6 Z" stroke="#f15a24" strokeWidth="2" fill="#FFEFEA" />
                                      <path d="M8 13 L11 16 L16 10" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                  </g>
                              </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-primary px-8 flex items-center justify-center text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl">
                      <p className="text-sm md:text-base font-medium leading-relaxed">
                        {card.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenges;
