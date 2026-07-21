import "./styles/cyberhelp.scss";
import CyberhelpThemeWrapper from "./components/CyberhelpThemeWrapper";

export const metadata = {
  title: "Innvikta Cyberhelp Center | Incident Guide & Emergency Freeze",
  description: "Get step-by-step guidance for cyber incident reporting, emergency bank account freezing, and complaint filing support with Innvikta Cyberhelp.",
};

export default function CyberhelpLayout({ children }) {
  return (
    <CyberhelpThemeWrapper>
      {children}
    </CyberhelpThemeWrapper>
  );
}
