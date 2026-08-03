/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["swiper"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'innvikta.co.in',
      },
      {
        protocol: 'http',
        hostname: '103.86.177.53', // the live server IP
      },
      {
        protocol: 'http',
        hostname: 'localhost', // for local testing
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // Standard page redirects
      { source: '/sample-page', destination: '/', permanent: true },
      { source: '/innvikta-security-awareness-training-isat', destination: '/solutions/insat', permanent: true },
      { source: '/phishing-simulator', destination: '/solutions/phishing-simulation', permanent: true },
      { source: '/built-in-lms', destination: '/solutions/insat', permanent: true },
      { source: '/phish-report-button', destination: '/solutions/phishing-simulation', permanent: true },
      { source: '/security-inbox', destination: '/solutions/phishing-simulation', permanent: true },
      { source: '/leadership', destination: '/about', permanent: true },
      { source: '/careers', destination: '/about', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/partners', destination: '/partners', permanent: true },
      { source: '/contact', destination: '/book-demo', permanent: true },
      { source: '/get-a-quote', destination: '/book-demo', permanent: true },
      { source: '/contact-support', destination: '/book-demo', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/customer-stories', destination: '/resources/case-studies', permanent: true },
      { source: '/news-coverage', destination: '/platform-updates', permanent: true },
      { source: '/events', destination: '/blog', permanent: true },
      { source: '/partner-with-us', destination: '/partners', permanent: true },
      
      // Interactive tools redirects
      { source: '/insat-security-awareness-calculator', destination: '/resources/maturity-calculator', permanent: true },
      { source: '/free-password-generator', destination: '/freetools/password-generator', permanent: true },
      { source: '/cyberhelp', destination: '/cyberhelp', permanent: true },
      { source: '/dpdp-act', destination: '/resources/dpdp-at-a-glance', permanent: true },
      { source: '/innvikta-arcade', destination: '/cyber-arcade', permanent: true },

      // Blog posts (redirecting root-level WordPress paths to Next.js /blog/[slug])
      { source: '/cybersecurity-in-the-workplace-protecting-todays-digital-workforce', destination: '/blog/cybersecurity-in-the-workplace-protecting-todays-digital-workforce', permanent: true },
      { source: '/unmasking-the-digital-deceit-delhi-high-court-sounds-alarm-on-cybercrime-surge', destination: '/blog/unmasking-the-digital-deceit-delhi-high-court-sounds-alarm-on-cybercrime-surge', permanent: true },
      { source: '/embrace-the-digital-evolution-elevate-your-2024-with-5-tech-savvy-resolutions', destination: '/blog/embrace-the-digital-evolution-elevate-your-2024-with-5-tech-savvy-resolutions', permanent: true },
      { source: '/cyber-threatscape-of-2024', destination: '/blog/cyber-threatscape-of-2024', permanent: true },
      { source: '/ransomware-attacks-on-healthcare-organizations', destination: '/blog/ransomware-attacks-on-healthcare-organizations', permanent: true },
      { source: '/security-awareness-training-empowering-the-pharmaceutical-frontline-against-cyber-threats', destination: '/blog/security-awareness-training-empowering-the-pharmaceutical-frontline-against-cyber-threats', permanent: true },
      { source: '/behind-the-scenes-crafting-an-effective-security-awareness-training-program', destination: '/blog/behind-the-scenes-crafting-an-effective-security-awareness-training-program', permanent: true },
      { source: '/interactive-simulations-transforming-security-awareness-training-experiences', destination: '/blog/interactive-simulations-transforming-security-awareness-training-experiences', permanent: true },
      { source: '/the-crucial-role-of-network-segmentation-in-enhancing-security', destination: '/blog/the-crucial-role-of-network-segmentation-in-enhancing-security', permanent: true },
      { source: '/understanding-and-avoiding-wi-fi-security-threats', destination: '/blog/understanding-and-avoiding-wi-fi-security-threats', permanent: true },
      { source: '/how-one-click-one-call-or-one-reply-can-compromise-your-digital-life', destination: '/blog/how-one-click-one-call-or-one-reply-can-compromise-your-digital-life', permanent: true },
      { source: '/cyber-hygiene-for-individuals-what-schools-and-colleges-dont-teach', destination: '/blog/cyber-hygiene-for-individuals-what-schools-and-colleges-dont-teach', permanent: true },
      { source: '/whatsapp-business-message-scams-what-you-need-to-know', destination: '/blog/whatsapp-business-message-scams-what-you-need-to-know', permanent: true },
      { source: '/what-to-do-after-cyber-fraud-in-india-immediate-steps-to-protect-yourself', destination: '/blog/what-to-do-after-cyber-fraud-in-india-immediate-steps-to-protect-yourself', permanent: true },
      { source: '/report-cyber-crime-india', destination: '/blog/report-cyber-crime-india', permanent: true },
      { source: '/one-exposed-api-key-is-all-it-takes-to-compromise-millions-of-records', destination: '/blog/one-exposed-api-key-is-all-it-takes-to-compromise-millions-of-records', permanent: true },
      { source: '/the-top-10-social-engineering-techniques-hackers-use', destination: '/blog/the-top-10-social-engineering-techniques-hackers-use', permanent: true },
      { source: '/social-media-oversharing-the-cyber-risk-hiding-in-plain-sight', destination: '/blog/social-media-oversharing-the-cyber-risk-hiding-in-plain-sight', permanent: true },
    ];
  },
};

module.exports = nextConfig;
