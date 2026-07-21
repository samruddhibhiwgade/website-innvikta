import { FaQuoteLeft } from "react-icons/fa";

const Blockquote = ({ name, children }) => {
  return (
    <blockquote className="my-6 relative border-l-[5px] border-l-[#f15a24] bg-slate-50/70 p-6 md:p-8 rounded-r-2xl shadow-sm not-italic text-left overflow-hidden">
      {/* Decorative quotes background icon */}
      <FaQuoteLeft className="absolute -right-4 -bottom-4 text-slate-200/40 text-7xl pointer-events-none" />
      
      <div className="text-slate-700 font-medium leading-relaxed text-sm md:text-base mb-4 relative z-10 font-secondary italic">
        {children}
      </div>
      
      {name && (
        <cite className="block border-t border-slate-200/60 pt-3 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 not-italic relative z-10">
          — {name}
        </cite>
      )}
    </blockquote>
  );
};

export default Blockquote;
