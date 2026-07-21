"use client";

import { markdownify } from "@lib/utils/textConverter";
import ImageFallback from "./components/ImageFallback";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Circle from "./components/Circle";
import Cta from "./components/Cta";

const Product = ({ data }) => {
  const { frontmatter } = data;
  const {
    hero,
    social_proof,
    feature_grid,
    secret_sauce,
    analytics,
    faqs,
    cta,
  } = frontmatter;

  // FAQ state
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <>
      {/* 1. Hero Section (Light Background) */}
      <section className="section bg-theme-light pb-12 pt-10 lg:pt-16">
        <div className="container">
          <div className="row items-center">
            <div className="md:col-6">
              {markdownify(hero.subtitle, "p", "text-primary font-semibold mb-4")}
              {markdownify(hero.title, "h1", "mb-6")}
              {markdownify(hero.content, "p", "mb-8 text-lg")}
              <Link href={hero.button.link} className="btn btn-primary">
                {hero.button.label}
              </Link>
            </div>
            <div className="md:col-6 mt-10 md:mt-0 relative">
              <div className="relative w-full aspect-[4/3]">
                <ImageFallback
                  src={hero.image}
                  fill
                  alt="Hero Image"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Features - Z-Pattern (Light Backgrounds) */}
      {hero.features.map((feature, index) => (
        <section key={index} className={`section ${index % 2 === 0 ? 'bg-body' : 'bg-theme-light'} py-12 md:py-16`}>
          <div className="container">
            <div className={`row items-center ${feature.image_position === 'right' ? 'flex-row-reverse' : ''}`}>
              <div className="md:col-6 mb-10 md:mb-0">
                <ImageFallback
                  src={feature.image}
                  width={500}
                  height={400}
                  alt={feature.title}
                  className="w-full object-contain rounded-xl shadow-lg"
                />
              </div>
              <div className="md:col-6 md:px-10">
                {markdownify(feature.title, "h2", "mb-4")}
                {markdownify(feature.content, "p", "mb-6")}
                <ul className="mb-8 space-y-3">
                  {feature.list.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={feature.button.link} className="btn btn-outline-primary">
                  {feature.button.label}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* 2. Social Proof Section */}
      <section className="section bg-body py-12 md:py-16 text-center">
        <div className="container">
          {markdownify(social_proof.title, "h2", "mb-12")}
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
             {social_proof.badges.map((badge, index) => (
               <div key={index} className="w-32 h-32 relative">
                  <ImageFallback src={badge} fill alt="Badge" className="object-contain grayscale hover:grayscale-0 transition" />
               </div>
             ))}
          </div>

          <div className="max-w-4xl mx-auto bg-theme-light p-8 rounded-2xl relative shadow-sm border border-border">
            <svg className="absolute top-4 left-4 w-12 h-12 text-primary opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            <p className="text-xl md:text-2xl font-medium mb-6 italic">"{social_proof.testimonial.quote}"</p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 relative mr-4 flex-shrink-0">
                <ImageFallback src={social_proof.testimonial.image} fill className="rounded-full object-cover" alt={social_proof.testimonial.author} />
              </div>
              <div className="text-left">
                <h4 className="h6 mb-0">{social_proof.testimonial.author}</h4>
                <span className="text-sm text-text">{social_proof.testimonial.role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Feature Grid */}
      <section className="section bg-theme-light py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-16">
            {markdownify(feature_grid.title, "h2", "mb-4")}
          </div>
          <div className="row">
            {feature_grid.items.map((item, index) => (
              <div key={index} className="md:col-6 lg:col-4 mb-8">
                <div className="bg-body p-8 rounded-xl h-full shadow-sm hover:shadow-md transition-shadow border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                    {/* Placeholder for SVG icon, ideally mapped from item.icon */}
                    <div className="w-6 h-6 bg-primary rounded-full"></div> 
                  </div>
                  <h3 className="h5 mb-4">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Secret Sauce" / Behavioral Science (Distinct Light Background) */}
      <section className="section bg-border-secondary py-12 md:py-16 relative overflow-hidden">
        <Circle className="absolute top-0 right-0 opacity-20" width={400} height={400} />
        <div className="container relative z-10">
          <div className="row items-center">
            <div className="md:col-6 mb-10 md:mb-0">
               <div className="relative p-4 md:p-8">
                 {/* Blob shape behind image */}
                 <div className="absolute inset-0 bg-theme-light rounded-3xl z-0"></div>
                 <ImageFallback 
                    src={secret_sauce.person_image} 
                    width={400} 
                    height={500} 
                    className="relative z-10 rounded-2xl w-full object-cover shadow-xl" 
                    alt={secret_sauce.person_name} 
                 />
                 <div className="absolute -bottom-6 -right-6 bg-body p-6 rounded-xl shadow-lg z-20 max-w-xs border border-border">
                    <p className="text-sm italic mb-2">"{secret_sauce.person_quote}"</p>
                    <p className="text-xs font-bold text-primary">- {secret_sauce.person_name}</p>
                 </div>
               </div>
            </div>
            <div className="md:col-6 md:pl-12">
              {markdownify(secret_sauce.title, "h2", "mb-6")}
              {markdownify(secret_sauce.content, "p", "mb-8 text-lg")}
              <ul className="space-y-4">
                {secret_sauce.list.map((item, i) => (
                  <li key={i} className="flex items-center">
                     <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 font-bold">{i+1}</span>
                     <span className="font-medium text-dark">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Analytics & Trust Banner */}
      <section className="section bg-body py-12 md:py-16 text-center">
        <div className="container">
           {markdownify(analytics.title, "h2", "mb-4")}
           {markdownify(analytics.content, "p", "mb-12 max-w-2xl mx-auto")}
           
           <div className="mb-20 max-w-4xl mx-auto">
             <ImageFallback src={analytics.image} width={800} height={400} alt="Analytics Dashboard" className="w-full rounded-xl shadow-lg border border-border" />
           </div>

           <div>
              <p className="text-sm font-bold uppercase tracking-wider text-light mb-8">{analytics.trusted_by}</p>
              <div className="col-12">
                <Swiper
                  loop={true}
                  slidesPerView={3}
                  breakpoints={{
                    992: { slidesPerView: 5 },
                  }}
                  spaceBetween={20}
                  modules={[Autoplay, FreeMode]}
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                  }}
                  speed={5000}
                  freeMode={true}
                >
                  {analytics.brands.map((brand, index) => (
                    <SwiperSlide
                      className="h-16 px-6 py-4 grayscale transition hover:grayscale-0"
                      key={"brand-" + index}
                    >
                      <div className="relative h-full">
                        <ImageFallback className="object-contain" src={brand} alt="brand" fill={true} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
           </div>
        </div>
      </section>

      {/* 6. FAQs */}
      <section className="section bg-theme-light py-12 md:py-16">
        <div className="container">
          <div className="row">
            <div className="md:col-4 mb-10 md:mb-0">
               {markdownify(faqs.title, "h2", "mb-6")}
               <button className="btn btn-primary mt-4">View all FAQs</button>
            </div>
            <div className="md:col-8">
               <div className="space-y-4">
                  {faqs.questions.map((faq, index) => (
                    <div key={index} className="bg-body border border-border rounded-lg overflow-hidden">
                       <button 
                         className="w-full text-left p-6 font-semibold flex justify-between items-center focus:outline-none"
                         onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                       >
                         {faq.title}
                         <svg className={`w-5 h-5 transition-transform ${activeFaq === index ? 'rotate-180 text-primary' : 'text-text'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                       </button>
                       <div className={`px-6 pb-6 text-text ${activeFaq === index ? 'block' : 'hidden'}`}>
                         <p>{faq.content}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer CTA specific for product or default CTA */}
      <section className="section bg-primary text-white py-16 text-center">
         <div className="container">
            {markdownify(cta.title, "h2", "text-white mb-6")}
            {markdownify(cta.content, "p", "text-light mb-10 max-w-xl mx-auto")}
            <Link href={cta.button_link} className="btn btn-primary">
              {cta.button_label}
            </Link>
         </div>
      </section>
    </>
  );
};

export default Product;
