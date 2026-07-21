import React from "react";
import { FiArrowRight, FiChevronLeft, FiCheck } from "react-icons/fi";
import { CATEGORIES } from "./constants";

export default function AssessmentForm({
  currentQuestionIndex,
  answers,
  selectAnswer,
  handlePrev,
  handleNext
}) {
  const currentCat = CATEGORIES[currentQuestionIndex];
  const selectedAnswer = answers[currentCat.id];

  return (
    <section className="section bg-white" style={{ padding: "6rem 0 4rem 0" }}>
      <div className="container max-w-3xl mx-auto px-4">
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderLeft: "4px solid #F15A24",
            borderRadius: "16px",
            padding: "2.5rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            maxWidth: "700px",
            margin: "0 auto",
            width: "100%"
          }}
          className="text-left space-y-6"
        >
          <div className="flex justify-between items-center">
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#F15A24", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Category {currentQuestionIndex + 1} of {CATEGORIES.length}: <span style={{ color: "#1F1F1F" }}>{currentCat.name}</span>
            </span>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              {CATEGORIES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "12px",
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: i <= currentQuestionIndex ? "#F15A24" : "#E7E7E7",
                    transition: "background-color 0.3s ease"
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-950 mb-1 leading-snug">{currentCat.question}</h3>
            <p className="text-[12px] text-slate-500">{currentCat.description}</p>
          </div>

          <div className="space-y-3">
            {currentCat.levelDescriptions.map((desc, idx) => {
              const isSelected = selectedAnswer === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectAnswer(idx)}
                  className="w-full text-left rounded-xl border transition-all flex items-center justify-between cursor-pointer"
                  style={{
                    padding: "14px 20px",
                    fontSize: "0.9rem",
                    border: isSelected ? "2px solid #F15A24" : "1px solid #E5E7EB",
                    backgroundColor: isSelected ? "#FFF9F6" : "#FFFFFF",
                    color: isSelected ? "#F15A24" : "#374151",
                    fontWeight: isSelected ? "600" : "500",
                  }}
                >
                  <span>{desc}</span>
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-4"
                    style={{
                      borderColor: isSelected ? "#F15A24" : "#D1D5DB",
                      backgroundColor: isSelected ? "#F15A24" : "transparent"
                    }}
                  >
                    {isSelected && <FiCheck className="text-[10px] text-white" />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="flex items-center justify-center gap-1.5 text-slate-500 font-bold hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-xs"
              style={{ background: "none", border: "none", padding: "8px 16px" }}
            >
              <FiChevronLeft />
              <span>Back</span>
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
              className="flex items-center justify-center gap-1.5 text-white rounded-lg font-bold shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
              style={{ 
                backgroundColor: "#F15A24", 
                border: "none",
                padding: "12px 28px"
              }}
            >
              <span>{currentQuestionIndex === CATEGORIES.length - 1 ? "Get Results" : "Next"}</span>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
