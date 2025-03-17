import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const locations = [
  {
    city: "Kubu Raya",
    // location: "Kubu Raya ",
    // direction: "12 km"
  },
];

const About = () => {
  return (
    <div className="pt-36">
      {/* Section Title */}
      <div className="text-2xl text-center border-t">
        <Title text1={"LOKASI"} text2={"TOKO"} />
      </div>

      {/* Intro Section */}
      <div className="my-10 flex flex-col md:flex-row gap-10 items-center border p-6">
        <img
          className="w-full md:max-w-[200px]"
          src="/yulita_cake.png"
          alt="Yulita Cake"
        />
        <div className="flex flex-col justify-center gap-4 md:w-2/4 text-gray-600 text-center md:text-left text-xl md:text-2xl leading-loose">
          <p>
            Yulita Cakes merupakan toko Roti dan Kue kering bergaya Eropa yang
            ada di Kubu Raya Kalimantan Barat. 🍰✨
            <br />
            Di bawah ini adalah alamat toko kami 🏬 yang dapat Anda kunjungi.
          </p>
        </div>
      </div>

      {/* Outlet Section Title */}
      <div className="text-xl py-4 text-center">
        <Title text1={"Outlet Yulita"} text2={"Cakes"} />
      </div>

      {/* Outlet Section */}
      <div className="flex flex-col md:flex-row mb-20">
        {/* Google Maps Iframe Column */}
        <div className="flex justify-center md:w-1/2 rounded-2xl shadow-lg mb-6 p-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.815387737623!2d109.38512177507026!3d-0.06946849992984418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d5752ef0719af%3A0xc40b57fad7df9bd7!2sJl.%20Prona%20Desa%20Kapur%2C%20Kapur%2C%20Kec.%20Sungai%20Raya%2C%20Kabupaten%20Kubu%20Raya%2C%20Kalimantan%20Barat%2078235!5e0!3m2!1sid!2sid!4v1742050633918!5m2!1sid!2sid"
            width="600"
            height="450"
            style={{ border: 0, borderRadius: "16px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* Locations Grid Column */}
        <div className="w-full flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 text-sm md:w-1/2">
          {locations.map(({ city, location, direction }, index) => (
            <div
              key={index}
              className="border-4 border-pink-300 rounded-2xl shadow-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4 max-w-xs sm:w-auto"
            >
              <Title text1={"Kabupaten"} text2={city} />
              <b>
                Jl. Raya Desa Kapur. <br /> Gg. Prona No. 07
              </b>
              <p className="text-gray-600">
                {location}
                <br />
                Kalimantan Barat
              </p>
              <div className="text-pink-500 font-semibold">
                <h5>{direction}</h5>
                {/* <h5 className="underline cursor-pointer">Directions</h5> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
