import React from "react";
import Title from "../components/Title";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
const locations = [
  {
    city: "Kubu Raya",
    // location: "Kubu Raya ",
    // direction: "12 km"
  },
];

const Contact = () => {
  useEffect(() => {
    document.title = "Yulita Cakes - Kontak";
  }, []);

  return (
    <div className="prose prose-pink dark:prose-invert lg:prose-lg max-w-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-start text-2xl border-t border-pink-200 pt-24 lg:pt-36">
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
                    <Phone size={25} className="text-pink-500 mr-2" />{" "}
                    +6289603324917
                  </a>

                  <a
                    href="https://www.instagram.com/cakesyulita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-pink-800 transition"
                  >
                    <Instagram size={25} className="text-pink-500 mr-2" />{" "}
                    @cakesyulita
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
      </motion.div>

      {/* Outlet Section Title */}
      <div className="text-start text-xl py-6 text-pink-800 max-w-4xl mx-auto">
        <Title text1={"Kunjungi Toko"} text2={"Kami"} />
      </div>

      {/* Outlet Section */}
      <div className="flex flex-col md:flex-row mb-20 gap-8  px-0 sm:px-36 mx-auto items-center justify-center">
        {/* Google Maps Iframe Column */}
        <div className="flex justify-center md:w-1/2 bg-white dark:bg-gray-300 p-2 rounded-xl shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.815387737623!2d109.38512177507026!3d-0.06946849992984418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d5752ef0719af%3A0xc40b57fad7df9bd7!2sJl.%20Prona%20Desa%20Kapur%2C%20Kapur%2C%20Kec.%20Sungai%20Raya%2C%20Kabupaten%20Kubu%20Raya%2C%20Kalimantan%20Barat%2078235!5e0!3m2!1sid!2sid!4v1742050633918!5m2!1sid!2sid"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "16px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Locations Grid Column */}
        <div className=" flex flex-col md:flex-row flex-wrap  items-center gap-6 text-sm md:w-1/2">
          {locations.map(({ city, location, direction }, index) => (
            <div
              key={index}
              className="border-2 border-pink-400 dark:border-gray-600 rounded-2xl shadow-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4 max-w-xs sm:w-auto bg-pink-50 dark:bg-gray-900 hover:shadow-2xl transition-all duration-300"
            >
              <Title text1={"Kabupaten"} text2={city} />
              <p className="text-gray-800 text-base">
                Jl. Raya Desa Kapur. Gg. Prona No. 07
              </p>
              <p className="text-gray-600 text-sm">
                {location} Kalimantan Barat
              </p>
              <div className="text-pink-600 font-semibold">
                <h5>{direction}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
