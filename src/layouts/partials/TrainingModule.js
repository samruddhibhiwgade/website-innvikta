"use client";

const TrainingModule = () => {
  return (
    <section className="section bg-[#fef6e8]/30 overflow-hidden">
      <div className="container">
        <div className="row justify-center text-center mb-12">
          <div className="col-12 lg:col-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Experience Our <span className="text-primary">Interactive</span> Training
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              This is how our training module looks like—engaging, cinematic, and designed to transform security awareness into second nature.
            </p>
          </div>
        </div>

        <div className="row justify-center">
          <div className="col-12 lg:col-10">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm group">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/-tmmOl6JYiY?si=hjJ_sYlssyiKxRU8&controls=0"
                  title="Innvikta Training Module Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingModule;
