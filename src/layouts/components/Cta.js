import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";
import { FiArrowRight } from "react-icons/fi";

function Cta({ fullWidth = false }) {
  const { title, content, button, button_secondary, enable } = config.call_to_action;
  if (!enable) return null;

  if (fullWidth) {
    return (
      <section className="cta-section cta section relative overflow-hidden bg-[#fff7f3] py-24 md:py-32 text-center">
        {/* Decorative Circles */}
        <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
          <Circle
            className="left-[10%] top-12"
            width={32}
            height={32}
            fill={false}
            fillValue="#FF5A1F"
          />
          <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
          <Circle
            className="left-[15%] bottom-[35%]"
            width={47}
            height={47}
            fill={false}
            fillValue="#FF5A1F"
          />

          <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
          <Circle
            className="right-[2%] bottom-[30%]"
            width={73}
            height={73}
            fill={false}
            fillValue="#FF5A1F"
          />
          <Circle
            className="right-[19%] bottom-[16%]"
            width={37}
            height={37}
            fill={false}
            fillValue="#FF5A1F"
          />
        </div>

        <div className="container-xl relative z-10">
          <div className="animate px-4">
            {markdownify(title, "h2", "section-title leading-tight")}
            {markdownify(content, "p", "mt-10")}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {button_secondary?.label && (
                <Link href={button_secondary.link} className="btn bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center font-bold text-sm whitespace-nowrap" style={{ padding: "14px 28px" }}>
                  {button_secondary.label}
                </Link>
              )}
              <Link href={button.link} className="btn bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm" style={{ padding: "14px 28px" }}>
                {button.label} <FiArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cta-section cta section pt-24 md:pt-32">
      <div className="container-xl">
        <div className="section relative px-4 text-center">
          <div className="animate">
            {markdownify(title, "h2", "section-title leading-tight")}
            {markdownify(content, "p", "mt-10")}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {button_secondary?.label && (
                <Link href={button_secondary.link} className="btn bg-orange-50/50 hover:bg-[#f15a24] border border-[#f15a24]/30 hover:border-[#f15a24] !text-[#f15a24] hover:!text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center font-bold text-sm whitespace-nowrap" style={{ padding: "14px 28px" }}>
                  {button_secondary.label}
                </Link>
              )}
              <Link href={button.link} className="btn bg-[#f15a24] hover:bg-orange-600 !text-white rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-bold shadow-md shadow-orange-500/10 text-sm" style={{ padding: "14px 28px" }}>
                {button.label} <FiArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[#fff7f3] rounded-2xl overflow-hidden -z-10">
            <Circle
              className="left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
              fillValue="#FF5A1F"
            />
            <Circle className="left-[3%] bottom-[13%]" width={85} height={85} fillValue="#FF5A1F" />
            <Circle
              className="left-[15%] bottom-[35%]"
              width={47}
              height={47}
              fill={false}
              fillValue="#FF5A1F"
            />

            <Circle className="right-[12%] top-[12%]" width={20} height={20} fillValue="#FF5A1F" />
            <Circle
              className="right-[2%] bottom-[30%]"
              width={73}
              height={73}
              fill={false}
              fillValue="#FF5A1F"
            />
            <Circle
              className="right-[19%] bottom-[16%]"
              width={37}
              height={37}
              fill={false}
              fillValue="#FF5A1F"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
