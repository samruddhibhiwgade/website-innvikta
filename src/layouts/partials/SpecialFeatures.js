import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Link from "next/link";
import Image from "next/image";

const SpecialFeatures = ({ speciality }) => {
  return (
    <section className="section pt-20 pb-10 md:py-32 overflow-hidden">
      <div className="container">
        {/* Main Section Heading - H1, Branded Orange */}
        <div className="row justify-center text-center mb-8 md:mb-10">
          <div className="col-12 md:col-8">
            {markdownify(
              speciality.title || "Solutions to cut <span class='text-primary'>human cyber risk</span>",
              "h2",
              "text-3xl md:text-5xl !font-semibold leading-tight text-dark mb-4"
            )}
            {speciality.description && markdownify(
              speciality.description,
              "p",
              "text-lg text-slate-500 font-medium"
            )}
          </div>
        </div>

        {speciality.list?.map((item, index) => (
          <div
            key={index}
            className={`row relative items-center justify-between gap-y-0 md:gap-y-0 ${index !== 0 ? "mt-10 md:mt-16" : "mt-4 md:mt-10"
              }`}
          >
            {/* Decorative Waves for each row */}
            <div className={`hidden md:block absolute top-1/4 left-0 w-full -translate-y-1/2 -z-10 opacity-20 pointer-events-none ${index % 2 !== 0 ? 'rotate-180' : ''}`}>
               <Image 
                src="/images/wave.svg" 
                alt="wave decoration" 
                width={1381} 
                height={283} 
                className="w-full scale-150"
               />
            </div>
            <div className={`hidden md:block absolute top-3/4 left-0 w-full -translate-y-1/2 -z-10 opacity-30 pointer-events-none ${index % 2 === 0 ? 'rotate-180' : ''}`}>
               <Image 
                src="/images/wave.svg" 
                alt="wave decoration" 
                width={1381} 
                height={283} 
                className="w-full scale-125"
               />
            </div>


            <div
              className={`animate md:col-5 px-6 order-2 pt-4 md:pt-0 ${index % 2 === 0 ? "md:order-1 md:pr-0 md:pl-12 lg:pl-24" : "md:order-2 md:pl-0 md:pr-12 lg:pr-24"}`}
            >
              {/* Main Heading */}
              {item.subtitle && markdownify(
                item.subtitle,
                "h2",
                "!font-semibold leading-tight text-primary uppercase text-2xl md:text-3xl mb-1 md:mb-4"
              )}

              {/* Sub Heading / Metric - Further Reduced Size */}
              {item.title && markdownify(
                item.title,
                "p",
                "text-lg md:text-xl !font-semibold text-slate-500 leading-tight"
              )}

              {/* Description - Darker for visibility */}
              {item.description && markdownify(item.description, "p", "mt-2 md:mt-6 text-slate-700 text-lg leading-relaxed")}

              {item.button && (
                <div className="mt-6 md:mt-8">
                  <Link href={item.button.link} className="btn btn-primary inline-flex items-center justify-center font-bold">
                    {item.button.label}
                  </Link>
                </div>
              )}
            </div>
            <div
              className={`animate md:col-6 px-6 order-1 mb-0 md:mb-0 ${index % 2 === 0 ? "md:order-2 md:pl-0 md:pr-12 lg:pr-24" : "md:order-1 md:pr-0 md:pl-12 lg:pl-24"}`}
            >
              <ImageFallback
                src={item.image}
                width={585}
                height={447}
                alt={item.title || "solution feature image"}
                className="rounded-2xl shadow-sm border border-slate-100/50 w-full h-auto object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialFeatures;
