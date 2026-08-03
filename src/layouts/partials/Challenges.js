"use client";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import { markdownify } from "@lib/utils/textConverter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import { useState } from "react";

const Challenges = ({ challenges }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  const renderCardInnerStats = (card, index) => {
    if (index === 0) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="14" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                <ellipse cx="20" cy="20" rx="6" ry="14" stroke="#f15a24" strokeWidth="2" fill="none" />
                <line x1="6" y1="20" x2="34" y2="20" stroke="#f15a24" strokeWidth="2" />
                <path d="M34 24 L42 38 L26 38 Z" fill="#f15a24" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <text x="34" y="35.5" fontFamily="Inter" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">!</text>
              </svg>
            </div>
            <div className="card-number">$4.44M</div>
            <div className="card-divider"></div>
            <h3 className="card-title">Average Global Breach Cost</h3>
            <p className="card-description">average global cost of a data breach</p>
            <span className="card-source">SOURCE: IBM</span>
          </div>
          <div className="card-chart">
            <svg width="150" height="92" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
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
      );
    }
    if (index === 1) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <div className="card-number">1 in 3</div>
            <div className="card-divider"></div>
            <h3 className="card-title">Unapproved AI Usage</h3>
            <p className="card-description">employees sharing sensitive data with unapproved AI tools</p>
            <span className="card-source">SOURCE: GARTNER 2025</span>
          </div>
          <div className="card-chart">
            <svg width="150" height="92" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
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
      );
    }
    if (index === 2) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div className="card-icon-wrapper" style={{ background: "#FFEFEA", display: "inline-flex", padding: "0.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", marginLeft: "auto", marginRight: "auto" }}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 6 L38 12 L38 24 Q38 36, 24 42 Q10 36, 10 24 L10 12 Z" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                <path d="M18 24 L22 28 L30 18" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="card-number">67%</div>
            <div className="card-divider"></div>
            <h3 className="card-title">Fewer Security Incidents</h3>
            <p className="card-description">organizations reporting fewer incidents after awareness training</p>
            <span className="card-source">SOURCE: FORTINET 2025</span>
          </div>
          <div className="card-chart">
            <svg width="150" height="92" viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto" }}>
              <path d="M25 80 A50 50 0 0 1 125 80" stroke="#FFEFEA" strokeWidth="10" strokeLinecap="round" fill="none" />
              <path d="M25 80 A50 50 0 0 1 120.5 37" stroke="#f15a24" strokeWidth="10" strokeLinecap="round" fill="none" />
              <g transform="translate(63, 52)">
                <path d="M12 2 L22 6 L22 14 Q22 21 12 25 Q2 21 2 14 L2 6 Z" stroke="#f15a24" strokeWidth="2" fill="#FFEFEA" />
                <path d="M8 13 L11 16 L16 10" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>
            </svg>
          </div>
        </div>
      );
    }
  };

  const renderCardInnerOriginal = (card, index, isMobile = false) => {
    const iconWrapperClass = isMobile 
      ? "card-icon-wrapper bg-[#FFEFEA] rounded-full flex items-center justify-center mx-auto w-11 h-11 p-2"
      : "card-icon-wrapper bg-[#FFEFEA] rounded-full flex items-center justify-center mx-auto w-8 h-8 sm:w-16 sm:h-16 p-1.5 sm:p-2.5";
    
    const svgClass = isMobile 
      ? "w-5 h-5"
      : "w-4 h-4 sm:w-8 sm:h-8";

    const numberClass = isMobile 
      ? "card-number font-extrabold text-[#f15a24] mt-1.5 text-2xl"
      : "card-number font-extrabold text-[#f15a24] mt-1 sm:mt-2 text-base sm:text-3xl md:text-[2.25rem]";

    const dividerClass = isMobile 
      ? "card-divider bg-[#f15a24] w-6 h-[2px] mx-auto my-1.5"
      : "card-divider bg-[#f15a24] w-4 sm:w-8 h-[2px] sm:h-[3px] mx-auto my-1 sm:my-2";

    const titleClass = isMobile 
      ? "card-title font-bold text-dark mb-1 text-xs leading-tight"
      : "card-title font-semibold text-dark mb-1 sm:mb-2 text-[10px] sm:text-sm md:text-base lg:text-[1.1rem] leading-snug";

    const descClass = isMobile 
      ? "card-description text-slate-500 text-[11px] leading-snug max-w-[190px] mx-auto mb-1.5"
      : "card-description text-slate-500 text-[8px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed max-w-[220px] mx-auto mb-1";

    const sourceClass = isMobile 
      ? "card-source text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 block"
      : "card-source text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block";

    const chartWrapperClass = isMobile 
      ? "card-chart flex justify-center mt-auto max-w-[85px] mx-auto"
      : "card-chart flex justify-center mt-auto";

    const chartSvgClass = isMobile 
      ? "w-full h-auto mx-auto"
      : "w-full max-w-[70px] sm:max-w-[140px] h-auto mx-auto";

    return (
      <div className="flex flex-col h-full justify-between">
        {index === 0 && (
          <>
            <div className={iconWrapperClass}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={svgClass}>
                <circle cx="20" cy="20" r="14" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                <ellipse cx="20" cy="20" rx="6" ry="14" stroke="#f15a24" strokeWidth="2" fill="none" />
                <line x1="6" y1="20" x2="34" y2="20" stroke="#f15a24" strokeWidth="2" />
                <path d="M34 24 L42 38 L26 38 Z" fill="#f15a24" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <text x="34" y="35.5" fontFamily="Inter" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">!</text>
              </svg>
            </div>
            <div className={numberClass}>$4.44M</div>
            <div className={dividerClass}></div>
            <h3 className={titleClass} style={{ fontWeight: isMobile ? 700 : 500 }}>Average Global Breach Cost</h3>
            <p className={descClass}>average global cost of a data breach</p>
            <span className={sourceClass}>SOURCE: IBM</span>
            <div className={chartWrapperClass}>
              <svg viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" className={chartSvgClass}>
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
          </>
        )}

        {index === 1 && (
          <>
            <div className={iconWrapperClass}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={svgClass}>
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
            <div className={numberClass}>1 in 3</div>
            <div className={dividerClass}></div>
            <h3 className={titleClass} style={{ fontWeight: isMobile ? 700 : 500 }}>Unapproved AI Usage</h3>
            <p className={descClass}>employees sharing sensitive data with unapproved AI tools</p>
            <span className={sourceClass}>SOURCE: GARTNER 2025</span>
            <div className={chartWrapperClass}>
              <svg viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" className={chartSvgClass}>
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
          </>
        )}

        {index === 2 && (
          <>
            <div className={iconWrapperClass}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={svgClass}>
                <path d="M24 6 L38 12 L38 24 Q38 36, 24 42 Q10 36, 10 24 L10 12 Z" stroke="#f15a24" strokeWidth="2.5" fill="none" />
                <path d="M18 24 L22 28 L30 18" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className={numberClass}>67%</div>
            <div className={dividerClass}></div>
            <h3 className={titleClass} style={{ fontWeight: isMobile ? 700 : 500 }}>Fewer Security Incidents</h3>
            <p className={descClass}>organizations reporting fewer incidents after awareness training</p>
            <span className={sourceClass}>SOURCE: FORTINET 2025</span>
            <div className={chartWrapperClass}>
              <svg viewBox="0 0 150 92" fill="none" xmlns="http://www.w3.org/2000/svg" className={chartSvgClass}>
                <path d="M25 80 A50 50 0 0 1 125 80" stroke="#FFEFEA" strokeWidth="10" strokeLinecap="round" fill="none" />
                <path d="M25 80 A50 50 0 0 1 120.5 37" stroke="#f15a24" strokeWidth="10" strokeLinecap="round" fill="none" />
                <g transform="translate(63, 52)">
                  <path d="M12 2 L22 6 L22 14 Q22 21 12 25 Q2 21 2 14 L2 6 Z" stroke="#f15a24" strokeWidth="2" fill="#FFEFEA" />
                  <path d="M8 13 L11 16 L16 10" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
              </svg>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <section className="section challenges-section bg-body pt-6 pb-16 md:pt-16 md:pb-32 border-b border-border">
      <div className="container">
        <div className="row items-center">
          <div className="col-12 xl:col-5 mb-8 xl:mb-0 px-4 sm:px-6 md:px-8 xl:px-12">
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
            <div className="mt-8">
              <Link
                href="/book-demo"
                className="btn bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm"
                style={{ padding: "14px 28px" }}
              >
                Book a Demo <FiArrowRight className="text-xs" />
              </Link>
            </div>
            <style jsx global>{`
              .challenges-stats .text-primary {
                font-weight: 800;
              }
              .challenges-swiper .swiper-pagination-bullet-active {
                background: #f15a24 !important;
              }
              .challenges-swiper .swiper-pagination {
                bottom: 0px !important;
              }
            `}</style>
          </div>
          <div className="col-12 xl:col-7 mt-0 xl:mt-0 px-4 sm:px-6 md:px-8 xl:px-12">
            {/* Mobile View: Custom Horizontal Sliding Layout (Peeking Cards, no scripts) */}
            <div className="insat-page">
              <div className="flex md:hidden overflow-x-auto gap-4 pb-6 w-full snap-x snap-mandatory no-scrollbar pt-[15px]" style={{ marginTop: "1rem" }}>
                {challenges.cards?.map((card, index) => (
                  <div key={index} className="group h-[355px] w-[220px] shrink-0 snap-center [perspective:1000px]">
                    <div className="relative h-full w-full rounded-[24px] transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                      {/* Front */}
                      <div className="stats-card absolute inset-0 h-full w-full rounded-[24px] bg-[#FFFBF7] border border-orange-100 p-6 flex flex-col [backface-visibility:hidden] shadow-sm overflow-hidden text-center justify-between">
                        {renderCardInnerStats(card, index)}
                      </div>
                      {/* Back */}
                      <div className="absolute inset-0 h-full w-full rounded-[24px] bg-primary p-6 flex items-center justify-center text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl overflow-y-auto">
                        <p className="text-xs font-semibold leading-relaxed">
                          {card.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop View: Grid Layout */}
            <div className="hidden md:grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pb-6 md:pb-0">
              {challenges.cards?.map((card, index) => (
                <div key={index} className="group h-[200px] sm:h-[260px] md:h-[450px] xl:h-[450px] [perspective:1000px] w-full">
                  <div className="relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                    {/* Front */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#FFFBF7] border border-orange-100 p-2 sm:p-4 md:p-6 flex flex-col [backface-visibility:hidden] shadow-sm overflow-hidden text-center justify-between">
                      {renderCardInnerOriginal(card, index, false)}
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
