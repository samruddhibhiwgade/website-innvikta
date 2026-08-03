"use client";

import Script from "next/script";
import Circle from "@layouts/components/Circle";
import { markdownify } from "@lib/utils/textConverter";

const ShortIntro = ({ intro }) => {
  return (
    <section className="video-bg-theme section short-intro-section relative overflow-hidden py-24 md:py-32">
      {/* Decorative Circles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <Circle
          className="left-[10%] top-12"
          width={32}
          height={32}
          fill={false}
        />
        <Circle className="left-[3%] top-[30%]" width={85} height={85} />
        <Circle
          className="bottom-[52%] left-[22%]"
          width={20}
          height={20}
        />
        <Circle
          className="bottom-[35%] left-[15%]"
          width={47}
          height={47}
          fill={false}
        />
        <Circle
          className="bottom-[6%] left-[6%]"
          width={62}
          height={62}
          fill={false}
        />
        <Circle className="right-[12%] top-[12%]" width={20} height={20} />
        <Circle
          className="right-[2%] top-[30%]"
          width={73}
          height={73}
          fill={false}
        />
        <Circle
          className="right-[19%] top-[50%]"
          width={37}
          height={37}
          fill={false}
        />
        <Circle className="right-[33%] top-[52%]" width={20} height={20} />
        <Circle
          className="bottom-[18%] right-[5%]"
          width={65}
          height={65}
        />
      </div>

      <div className="container-xl relative z-20">
        <div className="px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 text-center lg:text-left">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="w-full max-w-[580px] shadow-lg rounded-2xl overflow-hidden border-4 border-white/80 bg-black">
                <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
                <Script src="https://fast.wistia.com/embed/xclhqa3p6f.js" strategy="lazyOnload" type="module" />
                
                <style dangerouslySetInnerHTML={{__html: `
                  wistia-player[media-id='xclhqa3p6f']:not(:defined) { 
                    background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/xclhqa3p6f/swatch'); 
                    display: block; 
                    filter: blur(5px); 
                    padding-top:56.25%; 
                  }
                `}} />
                
                <wistia-player media-id="xclhqa3p6f" aspect="1.7777777777777777" style={{ display: 'block', width: '100%' }}>
                  <div className="wistia_preload_transcript_outer_wrapper" style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-56.25%" }}>
                    <div className="wistia_preload_transcript_inner_wrapper" style={{ overflow: "auto" }}>
                      <p className="wistia_preload_transcript_text" aria-hidden="true" tabIndex={-1} style={{ textAlign: "justify", fontSize: "5px" }}>
                        Picture this. You're enjoying coffee and intend to pay for it using the QR code on your table. Woah. Not so fast. Before you scan, here's the scoop. Crafty hackers might have placed their own QR code over the original one. Scanning it could drain your bank account faster than you can say. Cappuccino. Your personal information could be at risk. Your secrets could be exposed, but fear not. In this digital age, where the criminal is literally leading you towards the trap, the key to steer clear of and outsmart them is in your hands too. Bravo. You're the guardian of your digital realm.
                      </p>
                    </div>
                  </div>
                </wistia-player>
              </div>
            </div>
            <div className="w-full lg:w-1/2 animate">
              {intro.subtitle && <p className="mb-4">{intro.subtitle}</p>}
              {markdownify(intro.title, "h2", "mb-8 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight")}
              {markdownify(intro.description, "p", "mt-6 text-lg")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortIntro;
