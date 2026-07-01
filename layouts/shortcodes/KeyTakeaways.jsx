"use client";

import React from "react";

const KeyTakeaways = ({ title = "Key Takeaways", type = "bullet", children }) => {
  // Choose list-style class based on type prop
  let listStyleClass = "key-takeaways-bullet";
  if (type === "number") {
    listStyleClass = "key-takeaways-number";
  } else if (type === "roman") {
    listStyleClass = "key-takeaways-roman";
  }

  return (
    <div className="my-8 p-6 bg-[#f8fafc] border border-slate-100 rounded-2xl shadow-sm max-w-3xl mx-auto text-left relative overflow-hidden">
      <div className="mb-4">
        <h4 className="text-base md:text-lg font-extrabold text-slate-900 m-0 uppercase tracking-wide">
          {title}
        </h4>
      </div>
      <div className={`prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed font-semibold ${listStyleClass}`}>
        {children}
      </div>

      <style jsx global>{`
        /* Custom styled lists inside KeyTakeaways */
        .key-takeaways-bullet ul,
        .key-takeaways-number ol,
        .key-takeaways-roman ol {
          list-style-type: none !important;
          padding-left: 0 !important;
          display: flex;
          flex-direction: column;
          gap: 0.65rem !important; /* Space between each point */
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }

        .key-takeaways-bullet ul li p,
        .key-takeaways-number ol li p,
        .key-takeaways-roman ol li p {
          display: inline !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* Bullet style */
        .key-takeaways-bullet ul li {
          position: relative;
          padding-left: 1.25rem !important;
          margin-bottom: 0 !important;
        }
        .key-takeaways-bullet ul li::before {
          content: "-" !important;
          position: absolute;
          left: 0;
          color: #64748b; /* Slate-500 */
          font-weight: bold;
          font-size: 1rem;
        }

        /* Number style */
        .key-takeaways-number ol {
          counter-reset: takeaway-counter;
        }
        .key-takeaways-number ol li {
          position: relative;
          padding-left: 1.5rem !important;
          margin-bottom: 0 !important;
        }
        .key-takeaways-number ol li::before {
          counter-increment: takeaway-counter;
          content: counter(takeaway-counter) "." !important;
          position: absolute;
          left: 0;
          color: #64748b;
          font-weight: bold;
        }

        /* Roman numerals style */
        .key-takeaways-roman ol {
          counter-reset: takeaway-roman-counter;
        }
        .key-takeaways-roman ol li {
          position: relative;
          padding-left: 2rem !important;
          margin-bottom: 0 !important;
        }
        .key-takeaways-roman ol li::before {
          counter-increment: takeaway-roman-counter;
          content: counter(takeaway-roman-counter, upper-roman) "." !important;
          position: absolute;
          left: 0;
          color: #64748b;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default KeyTakeaways;
