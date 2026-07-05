import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";

function Cta() {
  const { title, content, button, button_secondary, enable } = config.call_to_action;
  if (!enable) return null;

  return (
    <section className="cta section pt-0">
      <div className="container-xl">
        <div className="section relative px-4 text-center">
          <div className="animate">
            {markdownify(title, "h2", "section-title leading-tight")}
            {markdownify(content, "p", "mt-10")}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link href={button.link} className="btn btn-primary">
                {button.label}
              </Link>
              {button_secondary?.label && (
                <Link href={button_secondary.link} className="btn btn-outline-primary">
                  {button_secondary.label}
                </Link>
              )}
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
