"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import NetworkBackground from "@layouts/components/NetworkBackground";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useState, useRef, Component } from "react";
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("@layouts/components/Scene"), { ssr: false });
import { useStore } from "../../store/useStore";
import { Target, Shield, AlertTriangle, MessageSquare, Phone, QrCode, Usb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { console.warn('Scene failed to render:', error.message); }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const HomeBanner = ({ banner: bannerData, brands }) => {
  const score = useStore((state) => state.score);
  const collectibles = useStore((state) => state.collectibles);
  const isHookActive = useStore((state) => state.isHookActive);
  const setIsHookActive = useStore((state) => state.setIsHookActive);
  const resetGame = useStore((state) => state.resetGame);
  
  const collectedItem = collectibles.find(c => c.isCollected);
  
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const prevCollectedId = useRef(null);

  useEffect(() => {
    if (collectedItem) {
      setCurrentNotification(collectedItem);
      setShowNotification(true);
      prevCollectedId.current = collectedItem.id;

      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 8000); // Increased slightly for better reading

      return () => clearTimeout(timer);
    } else {
      setShowNotification(false);
    }
  }, [collectedItem]);

  let infoTitle = "Threat Detected";
  let infoDesc = ["Unknown attack vector analyzed."];
  let Icon = AlertTriangle;
  
  if (currentNotification) {
    if (currentNotification.id === '1') {
      infoTitle = "YOU HOOKED WHATSAPP";
      infoDesc = [
        "Malicious messages sent via WhatsApp designed to trick you into sharing sensitive information. Attackers often impersonate friends.",
        "Always verify the sender's identity through another channel before interacting."
      ];
      Icon = MessageSquare;
    } else if (currentNotification.id === '2') {
      infoTitle = "YOU HOOKED VISHING";
      infoDesc = [
        "Voice phishing involves fraudulent phone calls where attackers pretend to be from trusted organizations like banks to steal your data.",
        "Remember that legitimate organizations will never ask for your passwords over the phone."
      ];
      Icon = Phone;
    } else if (currentNotification.id === '3') {
      infoTitle = "YOU HOOKED QUISHING";
      infoDesc = [
        "QR code phishing uses malicious codes to direct users to fake websites or trigger malware downloads.",
        "Always inspect physical QR codes for tampering and preview the URL before opening it."
      ];
      Icon = QrCode;
    } else if (currentNotification.id === '4') {
      infoTitle = "YOU HOOKED USB BAITING";
      infoDesc = [
        "Infected USB drives are left in public places, relying on human curiosity to compromise computers when plugged in.",
        "Never plug unknown USB devices into your computer."
      ];
      Icon = Usb;
    } else if (currentNotification.id === '5') {
      infoTitle = "YOU HOOKED SMISHING";
      infoDesc = [
        "SMS phishing uses fake text messages to trick you into clicking links. They often mimic delivery notifications.",
        "Do not reply to texts or click links. Contact the organization directly if needed."
      ];
      Icon = AlertTriangle;
    }
  }
  useEffect(() => {
    const ctx2 = gsap.context(() => {
      const banner = document.querySelector(".banner");
      const bannerBg = document.querySelector(".banner-bg");
      const bannerContent = document.querySelector(".banner-content");
      const header = document.querySelector(".header");
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.8 }
      )
      .fromTo(
        ".banner-img",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        ">-0.3"
      );

      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: () => `top ${header ? header.clientHeight : 100}`,
          scrub: 1,
        },
      });

      const position = (banner.offsetHeight - bannerBg.offsetHeight) * 0.4;
      parallaxTl
        .fromTo(
          bannerBg,
          {
            y: 0,
          },
          {
            y: -position,
          }
        )
        .fromTo(
          bannerContent,
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        )
        .fromTo(
          ".banner-bg .circle",
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        );
    });

    return () => ctx2.revert();
  }, []);

  return (
    <section className="section banner pt-0">
      <div className="container-xl">
        <div className="relative overflow-hidden" id="hero-banner">
          <div className="bg-theme banner-bg col-12 absolute left-0 top-0 h-full overflow-hidden">
            <ImageFallback 
              src="/images/background-hero.png" 
              fill 
              priority 
              className="object-cover opacity-60 will-change-transform" 
              alt="hero background"
            />
            <NetworkBackground />
            <Circle
              className="circle left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle
              className="circle left-[2.5%] top-[29%]"
              width={85}
              height={85}
            />
            <Circle
              className="circle bottom-[48%] left-[22%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle bottom-[37%] left-[15%]"
              width={47}
              height={47}
              fill={false}
            />
            <Circle
              className="circle bottom-[13%] left-[6%]"
              width={62}
              height={62}
              fill={false}
            />
            <Circle
              className="circle right-[12%] top-[15%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle right-[2%] top-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="circle right-[19%] top-[48%]"
              width={37}
              height={37}
              fill={false}
            />
            <Circle
              className="circle right-[33%] top-[54%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle bottom-[20%] right-[3%]"
              width={65}
              height={65}
            />

          </div>
          <div className="row overflow-hidden rounded-2xl relative z-20 will-change-transform">
            <div className="col-12">
              <div className="row relative justify-center pb-10">
                <div className="banner-content col-10 pb-0 pt-10 md:pt-20 text-center will-change-transform">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isHookActive ? "gamified" : "original"}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {markdownify(
                        isHookActive 
                          ? "Master Security Through <span class='text-primary'>Interactive Play</span>" 
                          : bannerData.title,
                        "h1",
                        "mb-6 banner-title font-black text-slate-900 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                      )}
                      <p className="banner-desc text-slate-600 text-base md:text-lg max-w-3xl mx-auto mb-8 font-medium leading-relaxed">
                        {isHookActive 
                          ? "Innvikta transforms complex cybersecurity training into engaging, gamified experiences. Level up your team's defense with interactive simulations and real-world threat scenarios."
                          : bannerData.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="banner-btn flex flex-wrap items-center justify-center gap-4">
                    <Link
                      className="btn btn-primary shadow-lg shadow-orange-500/15"
                      href={bannerData.link.href}
                    >
                      {bannerData.link.label}
                    </Link>
                    {bannerData.link_secondary && (
                      <Link
                        className="btn btn-outline-primary h-12 flex items-center justify-center rounded-[6px] px-6 font-bold"
                        href={bannerData.link_secondary.href}
                      >
                        {bannerData.link_secondary.label}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-12 md:col-10 relative mt-10">
                  <div className="banner-img relative w-full min-h-[400px] md:min-h-[600px] rounded-[32px] overflow-hidden shadow-2xl shadow-orange-500/10 group">
                    <ImageFallback
                      src="/images/banner-app.png"
                      className="w-full h-auto object-cover relative z-0 group-hover:blur-[2px] transition-all duration-700"
                      width={1200}
                      height={600}
                      alt="banner image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Glassmorphism Notification Overlay */}
          <AnimatePresence>
            {showNotification && currentNotification && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute top-8 left-4 z-40 w-60 bg-white/95 backdrop-blur-2xl border border-slate-200/60 rounded-[28px] p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] pointer-events-none overflow-hidden hidden md:block"
              >
                {/* Decorative background element */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#fe6019]/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-[#fe6019] animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#fe6019]">
                        Threat Detected
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#fe6019] flex items-center justify-center text-white shadow-lg shadow-orange-500/20 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black tracking-tight text-slate-900 font-secondary leading-none mb-1">
                          {infoTitle.toUpperCase()}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Analysis Complete</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2.5">
                      {infoDesc.map((para, index) => (
                        <p key={index} className="text-[11px] text-slate-500 leading-relaxed font-medium">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 z-30 pointer-events-none hidden md:block">
            <SceneErrorBoundary>
              <Scene />
            </SceneErrorBoundary>
          </div>

          {/* Unified Branded HUD Status Pill */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block">
            <motion.div 
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-full px-4 py-2 shadow-xl shadow-slate-200/40 pointer-events-none"
            >
              <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.1em]">
                {/* Status Section */}
                <div className="flex items-center gap-2">
                  <span className={`flex h-1.5 w-1.5 rounded-full animate-pulse ${isHookActive ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={isHookActive ? 'text-green-500' : 'text-red-500'}>
                    {isHookActive ? 'ACTIVATED:' : 'INACTIVE:'}
                  </span>
                </div>

                {/* Instruction Section */}
                <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setIsHookActive(!isHookActive)}
                      className="text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 pointer-events-auto hover:bg-slate-200 transition-colors active:scale-95"
                    >
                      Press [ E ]
                    </button>
                    <span className="text-slate-500 font-bold">{isHookActive ? 'to Deactivate' : 'to Hook'}</span>
                  </div>
                  <div className="w-px h-3 bg-slate-100 mx-1" />
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => resetGame()}
                      className="text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 pointer-events-auto hover:bg-slate-200 transition-colors active:scale-95"
                    >
                      Press [ R ]
                    </button>
                    <span className="text-slate-500 font-bold">to Reset</span>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                  <Target className="w-3.5 h-3.5 text-[#fe6019]" />
                  <span className="text-slate-900 font-black font-secondary text-xs">
                    {score}<span className="text-[9px] text-slate-300 ml-0.5">/ 4</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="row border-y border-border py-10">
            <div className="col-12 text-center mb-8">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Trusted By Companies</span>
            </div>
            <div className="animate from-right col-12">
              <Swiper
                loop={true}
                slidesPerView={4}
                breakpoints={{
                  992: {
                    slidesPerView: 7,
                  },
                }}
                spaceBetween={5}
                modules={[Autoplay, FreeMode]}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                speed={4000}
                grabCursor={false}
                allowTouchMove={false}
                freeMode={true}
                className="ticker-swiper"
              >
                {brands.map((brand, index) => (
                  <SwiperSlide
                    className="h-24 cursor-pointer px-2 py-2 grayscale transition hover:grayscale-0 lg:px-4"
                    key={"brand-" + index}
                  >
                    <div className="relative h-full w-full flex items-center justify-center bg-white/50 rounded-lg border border-slate-100/50">
                      <ImageFallback
                        className="object-contain p-2"
                        src={brand}
                        sizes="200px"
                        alt=""
                        fill={true}
                        priority={true}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
