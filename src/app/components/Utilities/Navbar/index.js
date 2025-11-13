import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

import LogoImage from "../../../../../public/logo/recomtel.png";

function Navbar() {
  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Promo", href: "/promo" },
    { name: "Aktivasi SIM Card", href: "/aktivasi" },
    { name: "Isi Ulang", href: "/isi-ulang" },
    { name: "Blog", href: "/blog" },
    { name: "Bantuan", href: "/bantuan" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black/30 shadow-sm z-50">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center text-sm font-medium text-gray-700">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <Image
            src={LogoImage}
            alt="Recomtel Logo"
            width={36}
            height={36}
            className="h-9 w-auto"
          />
        </Link>
        <div className="hidden text-white md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-amber-500 transition duration-150"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="
                            border border-amber-500 
                            text-white
                            font-semibold 
                            py-1 px-3 
                            rounded-full 
                            hover:bg-amber-500 
                            transition 
                            duration-150
                        "
          >
            Dapatkan SIM Card
          </button>
          <Link
            href="/login"
            className="p-2 transition duration-150 cursor-pointer"
          >
            <FaUser className="text-2xl hover:text-amber-500 transition duration-150 text-white" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
