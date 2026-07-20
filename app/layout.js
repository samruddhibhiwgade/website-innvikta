"use client";

import config from "@config/config.json";
import theme from "@config/theme.json";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import Chatbot from "@layouts/partials/Chatbot";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/style.scss";

import TrackingProvider from "@layouts/components/TrackingProvider";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-secondary",
  display: "swap",
});
export default function RootLayout({ children }) {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* Google Tag Manager / Analytics */}
        {config.params.tag_manager_id && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.params.tag_manager_id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${config.params.tag_manager_id}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        <link rel="icon" type="image/png" href={config.site.favicon} />
        <link rel="apple-touch-icon" href={config.site.favicon} />
        <link rel="icon" href="/favicon.ico" />
        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />



        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </head>
      <body suppressHydrationWarning={true} className={`overflow-x-hidden ${inter.variable} ${satoshi.variable}`}>
        <TwSizeIndicator />
        <TrackingProvider>
          <Header />
          {children}
          <Footer />
          <Chatbot />
        </TrackingProvider>
      </body>
    </html>
  );
}
