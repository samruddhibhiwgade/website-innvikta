"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import Circle from "@layouts/components/Circle";

const ThankYouPartnerPage = () => {
  return (
    <GSAPWrapper>
      <SeoMeta title="Thank You | Innvikta" description="Your partnership request has been submitted successfully." />
      
      <section className="relative overflow-hidden w-full min-h-screen flex items-center justify-center py-20" id="thankyou-partner-page">
        {/* Background elements */}
        <div className="bg-theme banner-bg absolute left-0 top-0 w-full h-full overflow-hidden z-0">
          <div className="absolute inset-0 bg-[#fffcf9]" />
          <img 
            src="/images/waves.svg" 
            className="absolute bottom-0 left-0 w-full h-auto opacity-70 z-0 pointer-events-none" 
            alt="waves"
          />
          <Circle className="circle left-[10%] top-12" width={32} height={32} fill={false} />
          <Circle className="circle left-[3%] top-[30%]" width={85} height={85} fill={false} />
          <Circle className="circle bottom-[20%] right-[3%]" width={65} height={65} />
          <Circle className="circle right-[12%] top-[15%]" width={20} height={20} />
        </div>

        <div className="container-xl relative z-20 w-full">
          <div className="row justify-center">
            {/* Widened container to col-lg-8 to prevent 'successfully' from wrapping */}
            <div className="col-12 md:col-10 lg:col-8 text-center px-4 -translate-y-8">
              {/* Title & Description */}
              <h1 className="text-slate-900 text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                Thank <span className="text-primary">You!</span>
              </h1>
              
              <h3 className="text-slate-800 text-xl md:text-2xl font-bold mb-4 whitespace-normal md:whitespace-nowrap">
                Your partnership request has been submitted successfully.
              </h3>
              
              <p className="text-slate-650 text-base md:text-lg max-w-xl mx-auto mb-10 font-medium leading-relaxed">
                We will review your organization&rsquo;s details and get in touch with you shortly to discuss next steps.
              </p>

              {/* CTAs with identical heights */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  className="bg-[#f15a24] hover:bg-orange-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center px-8 h-12 font-bold text-base shadow-lg shadow-orange-500/20 hover:scale-[1.02] transform"
                  href="/"
                >
                  Return Home
                </Link>
                <Link
                  className="btn btn-outline-primary h-12 flex items-center justify-center rounded-lg px-8 font-bold text-base hover:scale-[1.02] transform transition-all duration-300"
                  href="/solutions/insat"
                >
                  Explore InSAT Platform <FiArrowRight className="text-sm ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </GSAPWrapper>
  );
};

export default ThankYouPartnerPage;
