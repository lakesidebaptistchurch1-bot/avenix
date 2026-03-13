import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Redirect legacy file-based routes (HTML/PHP) to Next.js routes.
   *
   * This helps when old links are still shared/bookmarked during the migration.
   */
  async redirects() {
    return [
      { source: "/index-slider.html", destination: "/", permanent: true },

      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/service.html", destination: "/services", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },

      { source: "/donation.html", destination: "/donation", permanent: true },
      { source: "/donation.php", destination: "/donation", permanent: true },
      { source: "/donate.php", destination: "/donation", permanent: true },

      { source: "/payment.php", destination: "/payment", permanent: true },
      { source: "/thank-you.php", destination: "/thank-you", permanent: true },

      { source: "/login.php", destination: "/login", permanent: true },
      { source: "/signup.php", destination: "/signup", permanent: true },
      { source: "/forgot-password.php", destination: "/forgot-password", permanent: true },
      { source: "/reset-password.php", destination: "/reset-password", permanent: true },
    ];
  },

  /**
   * Keep compatibility for the Paystack webhook URL used by the old PHP backend.
   * (Webhooks may not follow redirects reliably, so we rewrite internally.)
   */
  async rewrites() {
    return [
      { source: "/backend/paystack_webhook.php", destination: "/api/paystack/webhook" },
      { source: "/backend/initiate_donation.php", destination: "/api/donations/initiate" },
    ];
  },
};

export default nextConfig;
