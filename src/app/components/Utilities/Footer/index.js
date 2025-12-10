"use client";

import React from "react";
import Link from "next/link";

function Footer() {
  const quickLinks = [
    { name: "Beranda", href: "/" },
    { name: "Promo", href: "#" },
    { name: "Layanan", href: "#" },
  ];

  const legalLinks = [
    { name: "Syarat & Ketentuan", href: "#" },
    { name: "Kebijakan Privasi", href: "#" },
    { name: "FAQ", href: "#" },
  ];

  const renderLink = (link) => (
    <li key={link.name}>
      <Link
        href={link.href === "#" ? "/" : link.href}
        onClick={(e) => link.href === "#" && e.preventDefault()}
        className="text-gray-300 hover:text-amber-400 transition block px-2 py-1 rounded"
      >
        {link.name}
      </Link>
    </li>
  );

  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-amber-400">Recomtel</span>
            </div>

            <p className="text-sm text-gray-200">
              Membangun solusi digital terbaik dengan fokus pada desain dan
              pengalaman pengguna.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">
              Link Cepat
            </h4>
            <ul className="space-y-2 text-sm">{quickLinks.map(renderLink)}</ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Legal</h4>
            <ul className="space-y-2 text-sm">{legalLinks.map(renderLink)}</ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">
              Hubungi Kami
            </h4>
            <p className="text-sm text-gray-200">Email: info@recomtel.com</p>
            <p className="text-sm text-gray-200">Telepon: (123) 456-7890</p>
          </div>
        </div>

        <div className="text-center pt-6">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Recomtel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
