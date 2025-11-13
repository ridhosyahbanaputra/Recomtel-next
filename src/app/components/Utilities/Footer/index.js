// src/components/Footer.jsx

import React from "react";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  const quickLinks = [
    { name: "Beranda", href: "/" },
    { name: "Promo", href: "/promo" },
    { name: "Layanan", href: "/layanan" },
  ];

  const legalLinks = [
    { name: "Syarat & Ketentuan", href: "/terms" },
    { name: "Kebijakan Privasi", href: "/privacy" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-amber-400">Recomtel</span>
            </div>

            <p className="text-sm text-gray-400">
              Membangun solusi digital terbaik dengan fokus pada desain dan
              pengalaman pengguna.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Link Cepat</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-amber-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-amber-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
            <p className="text-sm text-gray-400">Email: info@recomtel.com</p>
            <p className="text-sm text-gray-400">Telepon: (123) 456-7890</p>
          </div>
        </div>

        <div className="text-center pt-6">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Recomtel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
