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
      <div className="text-center text-2xl border-t pt-24 lg:pt-36">
        <Title text1="HUBUNGI" text2="KAMI" />
      </div>
      <div className="my-12 lg:my-16 flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="w-full sm:w-3/4 md:w-1/2 lg:max-w-[480px]">
          <img
            className="w-full rounded-xl shadow-xl object-cover"
            src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cake Shop"
          />
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-col justify-start md:justify-center items-center md:items-start gap-6 text-center md:text-left max-w-md w-full">
          <div className="w-full">
            <h3 className="font-semibold text-2xl text-pink-900 text-start">
              Kontak
            </h3>

            <p className="text-pink-500 leading-relaxed flex flex-col gap-1 text-2xl">
              <a
                href="https://wa.me/6289603324917"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Phone size={18} /> +6289603324917
              </a>

              <a
                href="https://www.instagram.com/cakesyulita"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Instagram size={18} /> @cakesyulita
              </a>

              <a
                href="mailto:cakesyulita57@gmail.com"
                className="flex items-center gap-2 hover:underline"
              >
                <Mail size={18} /> cakesyulita57@gmail.com
              </a>
            </p>
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-2xl text-pink-900">
              Pesanan & Custom Cake
            </h3>

            <p className="text-pink-500 leading-relaxed">
              Dapatkan kue spesial untuk acara Anda
            </p>
          </div>
          <a
            href="https://wa.me/6289603324917"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
