import React from "react";
import Title from "../components/Title";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    document.title = "Yulita Cakes - Kontak";
  }, []);

  return (
    <div className="container mx-auto px-6 lg:px-12 max-w-screen-xl">
      <div className="text-center text-2xl border-t border-pink-200 pt-24 lg:pt-36">
        <Title text1="Kontak" text2="Yulita Cakes" />
        <p className="text-sm">
          Ada pertanyaan atau permintaan khusus? Jangan ragu untuk menghubungi
          kami langsung!
        </p>
      </div>
      <div className="my-12 lg:my-16 flex flex-col md:flex-row items-center justify-center md:items-start gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="w-full sm:w-3/4 md:w-1/2 lg:max-w-[480px]">
          <img
            className="w-full rounded-2xl shadow-2xl object-cover "
            src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cake Shop"
          />
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-col justify-start md:justify-center items-center md:items-start gap-6 text-center md:text-left max-w-md w-full">
          <div className="w-full">
            <h3 className="font-semibold text-3xl text-pink-900 dark:text-pink-500 tracking-wide mb-2">
              Kontak
            </h3>
            <div className="flex justify-center sm:justify-start items-center sm:items-start">
            <p className="leading-relaxed flex flex-col gap-2 font-light text-sm sm:text-xl">
              <a
                href="https://wa.me/6289603324917"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-800 transition"
              >
                <Phone size={25} className="text-pink-500 mr-2" /> +6289603324917
              </a>

              <a
                href="https://www.instagram.com/cakesyulita"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-800 transition"
              >
                <Instagram size={25} className="text-pink-500 mr-2" /> @cakesyulita
              </a>

              <a
                href="mailto:cakesyulita57@gmail.com"
                className="flex items-center gap-2 hover:text-pink-800 transition"
              >
                <Mail size={25} className="text-pink-500 mr-2" />
                cakesyulita57@gmail.com
              </a>
            </p>
            </div>
          </div>

          <div className="w-full pt-8">
            <h3 className="font-semibold text-3xl text-pink-900 dark:text-pink-500 tracking-wide">
              Pesanan & Custom Cake
            </h3>

            <p className=" leading-relaxed font-light text-lg">
              Dapatkan kue spesial untuk acara Anda
            </p>
          </div>

          <a
            href="https://wa.me/6289603324917"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
