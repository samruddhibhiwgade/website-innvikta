"use client";
import { FiArrowRight } from "react-icons/fi";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import { markdownify } from "@lib/utils/textConverter";

const Challenges = ({ challenges }) => {
  return (
    <section className="section bg-body py-24 md:py-32 border-b border-border">
      <div className="container">
        <div className="row items-center">
          <div className="col-12 xl:col-5 mb-16 xl:mb-0 px-4 sm:px-6 md:px-8 xl:px-12">
            {markdownify(challenges.title, "h2", "mb-8 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight")}
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
            <style jsx global>{`
              .challenges-stats .text-primary {
                font-weight: 800;
              }
            `}</style>
          </div>
          <div className="col-12 xl:col-7 px-4 sm:px-6 md:px-8 xl:px-12">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pb-6 md:pb-0">
              {challenges.cards?.map((card, index) => (
                <div key={index} className="group h-[200px] sm:h-[260px] md:h-[450px] xl:h-[450px] [perspective:1000px] w-full">
                  <div className="relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                    {/* Front */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#FFFBF7] border border-orange-100 p-2 sm:p-4 md:p-6 flex flex-col [backface-visibility:hidden] shadow-sm overflow-hidden text-center justify-between">
                      {index === 0 && (
                        <div className="flex flex-col h-full justify-between">
                          <div className="card-icon-wrapper bg-[#FFEFEA] rounded-full flex items-center justify-center mx-auto w-8 h-8 sm:w-16 sm:h-16 p-1.5 sm:p-2.5">
                              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-8 sm:h-8">
                                  <circle cx="20" cy="20" r="14" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                                  <ellipse cx="20" cy="20" rx="6" ry="14" stroke="#f15a24" strokeWidth="2" fill="none" />
                                  <line x1="6" y1="20" x2="34" y2="20" stroke="#f15a24" strokeWidth="2" />
                                  <path d="M34 24 L42 38 L26 38 Z" fill="#f15a24" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                  <text x="34" y="35.5" fontFamily="Inter" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">!</text>
                              </svg>
                          </div>
                          <div className="card-number font-extrabold text-[#f15a24] mt-1 sm:mt-2 text-base sm:text-3xl md:text-[2.25rem]">$4.4M</div>
                          <div className="card-divider bg-[#f15a24] w-4 sm:w-8 h-[2px] sm:h-[3px] mx-auto my-1 sm:my-2"></div>
                          <h3 className="card-title font-bold text-dark mb-1 sm:mb-2 text-[10px] sm:text-sm md:text-base lg:text-[1.1rem] leading-snug">Average Global Breach Cost</h3>
                          <p className="card-description text-slate-500 text-[8px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed max-w-[220px] mx-auto mb-1">average global cost of a data breach</p>
                          <span className="card-source text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">SOURCE: IBM</span>
                          <div className="card-chart flex justify-center mt-auto">
                              <svg viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[70px] sm:max-w-[140px] h-auto mx-auto">
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
                          <div className="card-icon-wrapper bg-[#FFEFEA] rounded-full flex items-center justify-center mx-auto w-8 h-8 sm:w-16 sm:h-16 p-1.5 sm:p-2.5">
                              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-8 sm:h-8">
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
                          <div className="card-number font-extrabold text-[#f15a24] mt-1 sm:mt-2 text-base sm:text-3xl md:text-[2.25rem]">33%</div>
                          <div className="card-divider bg-[#f15a24] w-4 sm:w-8 h-[2px] sm:h-[3px] mx-auto my-1 sm:my-2"></div>
                          <h3 className="card-title font-bold text-dark mb-1 sm:mb-2 text-[10px] sm:text-sm md:text-base lg:text-[1.1rem] leading-snug">Unapproved AI Usage</h3>
                          <p className="card-description text-slate-500 text-[8px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed max-w-[220px] mx-auto mb-1">employees sharing data with unapproved AI tools</p>
                          <span className="card-source text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">SOURCE: IBM</span>
                          <div className="card-chart flex justify-center mt-auto">
                              <svg viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[70px] sm:max-w-[140px] h-auto mx-auto">
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
                          <div className="card-icon-wrapper bg-[#FFEFEA] rounded-full flex items-center justify-center mx-auto w-8 h-8 sm:w-16 sm:h-16 p-1.5 sm:p-2.5">
                              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-8 sm:h-8">
                                  <path d="M24 6 L38 12 L38 24 Q38 36, 24 42 Q10 36, 10 24 L10 12 Z" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                                  <path d="M18 24 L22 28 L30 18" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                              </svg>
                          </div>
                          <div className="card-number font-extrabold text-[#f15a24] mt-1 sm:mt-2 text-base sm:text-3xl md:text-[2.25rem]">67%</div>
                          <div className="card-divider bg-[#f15a24] w-4 sm:w-8 h-[2px] sm:h-[3px] mx-auto my-1 sm:my-2"></div>
                          <h3 className="card-title font-bold text-dark mb-1 sm:mb-2 text-[10px] sm:text-sm md:text-base lg:text-[1.1rem] leading-snug">Fewer Security Incidents</h3>
                          <p className="card-description text-slate-500 text-[8px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed max-w-[220px] mx-auto mb-1">fewer incidents reported after training</p>
                          <span className="card-source text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">SOURCE: FORTINET</span>
                          <div className="card-chart flex justify-center mt-auto">
                              <svg viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[70px] sm:max-w-[140px] h-auto mx-auto">
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
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-primary p-2 sm:p-4 md:px-8 flex items-center justify-center text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      <p className="text-[8px] xs:text-[10px] sm:text-sm md:text-base font-medium leading-tight sm:leading-relaxed h-max my-auto">
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
