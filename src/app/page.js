import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaInfinity, FaSignal } from "react-icons/fa";
import HeroBackground from "../../public/images/assets1.png";

const benefitsData = [
  {
    iconName: "clock",
    title: "Kuota Utuh 24 Jam",
    description:
      "Nikmati kuota tanpa pembagian waktu, aktif 24 jam penuh tanpa batas.",
  },
  {
    iconName: "infinity",
    title: "Nomor Aktif Selamanya",
    description:
      "Nomor Anda akan tetap aktif selama Anda melakukan isi ulang minimal 1x dalam setahun.",
  },
  {
    iconName: "signal",
    title: "Sinyal Kuat",
    description:
      "Didukung oleh jaringan Telkomsel, sinyal dijamin kuat dan stabil di seluruh Indonesia.",
  },
];

const IconMap = {
  clock: FaClock,
  infinity: FaInfinity,
  signal: FaSignal,
};

function BenefitCard({ iconName, title, description }) {
  const IconComponent = IconMap[iconName] || FaSignal;

  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg  text-center border border-gray-100">
      <div className="mx-auto w-16 h-16 flex items-center justify-center bg-amber-100 rounded-full mb-4">
        <IconComponent className="text-3xl text-amber-500" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}


export default function HomePage() {
  return (
    <main>
      <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        <Image
          src={HeroBackground}
          alt="Banner"
          layout="fill"
          objectFit="center"
          priority={true}
          className="z-0"
        />

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-white text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
              BARENG <span className="text-amber-200">Recomtel</span> SERUNYA
              GAK ADA ABISNYA
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
            Satu provider banyak untungnya!
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefitsData.map((benefit) => (
              <BenefitCard
                key={benefit.title}
                iconName={benefit.iconName}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>


          <div className="text-center mt-12">
            <Link
              href="/register"
              className="text-amber-500 font-semibold text-lg flex items-center justify-center group transition"
            >
              Gabung Sekarang
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="pt-15 pb-10 bg-white"></section>
    </main>
  );
}
