import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { useContext, useEffect, useState } from "react";

const locations = [
  {
    city: "Kubu Raya",
    // location: "Kubu Raya ",
    // direction: "12 km"
  },
];

const About = () => {
  useEffect(() => {
    document.title = "Yulita Cakes - About";
  }, []);

  return (
    <div className="section-padding min-h-screen">
      {/* Section Title
      // <div className="text-2xl text-center">
      //   <Title text1={"LOKASI"} text2={"TOKO"} />
      // </div> */}

      {/* Intro Section */}
      <div className="my-10 flex flex-col md:flex-row gap-10 items-center px-0 sm:px-36 p-6 rounded-xl">
        <img
          className="w-full md:max-w-[200px] bg-pink-50 dark:bg-gray-300 p-5 rounded-3xl shadow-sm"
          src="/yulita_cake.png"
          alt="Yulita Cake"
        />
        <div className="flex flex-col justify-center gap-4 md:w-2/4 text-gray-700 text-center md:text-left text-xl md:text-2xl leading-relaxed">
          <p className="font-normal">
            <span className="text-pink-600 text-3xl font-semibold font-serif">
              Yulita Cakes
            </span>{" "}
            Toko Roti dan Kue kering bergaya Eropa yang ada di Kubu
            Raya Kalimantan Barat. 🍰✨
          </p>
        </div>
      </div>

      {/* Outlet Section Title */}
      <div className="text-xl py-6 text-center text-pink-800">
        <Title text1={"Kunjungi Toko"} text2={"Kami"} />
      </div>

      {/* Outlet Section */}
      <div className="flex flex-col md:flex-row mb-20 gap-8  px-0 sm:px-36">
        {/* Google Maps Iframe Column */}
        <div className="flex justify-center md:w-1/2 bg-white dark:bg-gray-300 p-4 rounded-xl shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.815387737623!2d109.38512177507026!3d-0.06946849992984418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d5752ef0719af%3A0xc40b57fad7df9bd7!2sJl.%20Prona%20Desa%20Kapur%2C%20Kapur%2C%20Kec.%20Sungai%20Raya%2C%20Kabupaten%20Kubu%20Raya%2C%20Kalimantan%20Barat%2078235!5e0!3m2!1sid!2sid!4v1742050633918!5m2!1sid!2sid"
            width="100%"
            height="450"
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
              <p className="text-gray-600 text-sm">{location} Kalimantan Barat</p>
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

export default About;
