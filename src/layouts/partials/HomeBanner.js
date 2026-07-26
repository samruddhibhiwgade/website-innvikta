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
import { FiArrowRight } from "react-icons/fi";

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
  const swiperRef = useRef(null);

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

  // Auto-reset game after a delay when score reaches 4
  useEffect(() => {
    if (score === 4) {
      const timer = setTimeout(() => {
        resetGame();
      }, 6000); // 6 second delay to read the final notification
      return () => clearTimeout(timer);
    }
  }, [score, resetGame]);

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
    <section className="section banner pt-0 relative overflow-hidden" id="hero-banner">
      <div className="bg-theme banner-bg absolute left-0 top-0 w-full h-full overflow-hidden z-0">
        <ImageFallback 
          src="/images/Heroimg_homepage.png" 
          width={1920}
          height={1080}
          priority 
          className="w-full h-full object-cover object-center md:object-top opacity-100 will-change-transform" 
          alt="hero background"
        />
        {/* NetworkBackground removed */}
        {/* Circles removed */}
      </div>

      {/* Notification, Scene, HUD Pill removed */}

      <div className="container-xl relative z-20">
        <div className="row overflow-hidden rounded-2xl will-change-transform">
          <div className="col-12">
            <div className="row relative justify-start pb-6 md:pb-10">
              <div className="banner-content col-12 px-6 md:col-8 md:px-12 pb-0 pt-4 md:pt-20 text-left will-change-transform">
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
                        : bannerData.title.replace('<br />', '<br class="hidden md:block" />'),
                      "h1",
                      "mb-4 md:mb-6 banner-title font-black text-slate-900 text-[32px] leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
                    )}
                    <p className="banner-desc text-slate-600 text-[15px] leading-relaxed md:text-lg max-w-xl mr-auto mb-6 md:mb-8 font-medium px-2 md:px-0">
                      {isHookActive 
                        ? "Innvikta transforms complex cybersecurity training into engaging, gamified experiences. Level up your team's defense with interactive simulations and real-world threat scenarios."
                        : bannerData.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-start items-center gap-4 mt-8 banner-btn">
                  <Link 
                    href="/book-demo" 
                    className="btn bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm md:text-base"
                    style={{ padding: "14px 28px" }}
                  >
                    Book a Demo <FiArrowRight className="text-xs md:text-sm" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* End-to-end full page width image with increased size and responsive aspect scaling */}
      <div className="w-full max-w-7xl mx-auto relative -mt-12 md:-mt-28 px-4 md:px-8">
        <div className="banner-img relative w-full overflow-hidden group">
          <ImageFallback
            src="/images/home page dashboard.png"
            className="w-full h-auto object-contain relative z-0 transition-all duration-700 border-none"
            width={1920}
            height={1080}
            alt="banner image"
          />
        </div>
      </div>

      <div className="container-xl relative z-20">
        <div className="row border-y border-border py-6 md:py-10">
          <div className="col-12 text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Trusted By
            </span>
          </div>
          <div 
            className="animate from-right col-12"
            onMouseLeave={() => {
              if (swiperRef.current && swiperRef.current.autoplay) {
                swiperRef.current.autoplay.start();
              }
            }}
          >
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onTouchEnd={(swiper) => {
                setTimeout(() => {
                  if (swiper.autoplay) {
                    swiper.autoplay.start();
                  }
                }, 100);
              }}
              loop={true}
              slidesPerView={3}
              breakpoints={{
                540: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 6,
                },
                1200: {
                  slidesPerView: 7,
                },
              }}
              spaceBetween={16}
              modules={[Autoplay, FreeMode]}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={3000}
              grabCursor={true}
              allowTouchMove={true}
              freeMode={true}
              className="ticker-swiper"
            >
              {brands.map((brand, index) => (
                <SwiperSlide
                  className="h-16 md:h-20 cursor-pointer py-1"
                  key={"brand-" + index}
                >
                  <div className="relative h-14 md:h-16 w-full flex items-center justify-center bg-transparent p-2 md:p-3">
                    <img
                      className="max-h-8 md:max-h-10 max-w-[85%] object-contain mx-auto"
                      src={brand}
                      alt="brand logo"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
