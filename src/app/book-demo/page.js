"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import SuccessPopup from "@layouts/partials/SuccessPopup";

import { freeDomains } from "./components/constants";
import HeroSection from "./components/Hero";
import TrustMetrics from "./components/TrustMetrics";
import DemoForm from "./components/DemoForm";

export default function DemoPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    company: "",
    teamSize: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const validateEmail = (email) => {
    if (!email) return "Please fill the required field";
    const domain = email.split("@")[1];
    if (freeDomains.includes(domain?.toLowerCase())) {
      return "Please use a work email address";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!form.fullName) newErrors.fullName = "Please fill the required field";
    if (!form.designation) newErrors.designation = "Please fill the required field";
    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;
    if (!form.phone) {
      newErrors.phone = "Please fill the required field";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!form.company) newErrors.company = "Please fill the required field";
    if (!form.teamSize) newErrors.teamSize = "Please fill the required field";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "Book Demo",
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          company: form.company,
          designation: form.designation,
          team_size: form.teamSize
        })
      })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.success) {
          router.push("/thank-you/demo");
        } else {
          alert("Error: " + (data.error || "Failed to submit demo request. Please try again."));
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        alert("An error occurred. Please try again later.");
      });
    } else {
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.text-red-500');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
          const inputEl = firstErrorEl.parentElement.querySelector('input, select, textarea');
          if (inputEl) {
            inputEl.focus();
          }
        }
      }, 100);
    }
  };

  const getEmailError = () => {
    if (errors.email) return errors.email;
    if (form.email) {
      const emailErr = validateEmail(form.email);
      if (emailErr && emailErr !== "Please fill the required field") {
        return emailErr;
      }
    }
    return "";
  };

  const getPhoneError = () => {
    if (errors.phone) return errors.phone;
    if (form.phone && form.phone.length > 0 && form.phone.length < 10) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  return (
    <GSAPWrapper>
      <SeoMeta title="Request a Free Demo | Innvikta" description="Request a personalized demo of Innvikta InSAT. Learn how we help enterprises reduce human cyber risk with security awareness training." />
      <div className="min-h-screen bg-[#fafafa]">
        <HeroSection />

        <section className="section py-16">
          <div className="container">
            <div className="row items-start justify-between px-6 md:px-12 lg:px-24">
              <TrustMetrics />
              <DemoForm 
                form={form}
                setForm={setForm}
                errors={errors}
                setErrors={setErrors}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
                getEmailError={getEmailError}
                getPhoneError={getPhoneError}
                validateEmail={validateEmail}
              />
            </div>
          </div>
        </section>
      </div>
      <SuccessPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        title="Demo Request Received!" 
        message="Thank you! Our team will contact you shortly to schedule your personalized live walkthrough." 
      />
    </GSAPWrapper>
  );
}
