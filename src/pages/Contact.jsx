import { useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  useEffect(() => {
    document.title = "AS Denim - Kontak";
  }, []);
  return (
    <div>
      <div className="text-center text-2xl border-t pt-36">
        <Title text1={"KONTAK"} text2={"KAMI"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.as_logo} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Toko Kami</p>
          <p className="text-gray-500">
            Jl. Ahmad Tani 2, depan Aneka Motor, Sungai Raya, Kab. Kubu Raya,
            Kalimantan Barat.
          </p>
          <p className="text-gray-500">
            +62 858 4521 4967 <br />
            garisas336@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
