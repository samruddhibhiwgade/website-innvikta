import "./styles/cyber-arcade.scss";

export const metadata = {
  title: "INNVIKTA - Gamified Security Awareness",
  description: "Experience security awareness training through immersive 3D gameplay and interactive quests.",
};

export default function CyberArcadeLayout({ children }) {
  return (
    <div className="cyber-arcade-scope">
      {children}
    </div>
  );
}
