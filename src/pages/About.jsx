import { useEffect } from "react";
import Title from "../components/Title";

const About = () => {
  useEffect(() => {
    document.title = "AS Denim - Tentang Kami";
  }, []);
  return (
    <div className="pt-36 flex flex-col items-center justify-center">
      <div className="text-2xl text-center pt-8">
        <Title text1={"TENTANG"} text2={"KAMI"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16 items-center justify-center">
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            <b>AS Denim</b> adalah perusahaan yang bergerak di bidang penjualan
            pakaian bekas dengan fokus utama pada kualitas produk dan kenyamanan
            pelanggan. Berdiri sejak 26 Mei 2022, AS Denim berlokasi di Jl.
            Ahmad Tani 2, depan Aneka Motor, Sungai Raya, Kab. Kubu Raya,
            Kalimantan Barat. AS Denim berdedikasi untuk menyediakan produk
            pakaian bekas yang stylish, nyaman, dan tetap terjangkau bagi
            pelanggannya. Produk-produk AS Denim mencakup berbagai kategori,
            mulai dari kaos, kemeja, hingga celana.
          </p>
          <b className="text-gray-800">VISI KAMI</b>
          <p>
            As Denim memiliki visi menjadi toko pakaian bekas yang mampu
            menyediakan pakaian yang dapat memenuhi gaya fashion yang unik dan
            sesuai dengan kepribadian masyarakat.
          </p>
          <b className="text-gray-800">MISI KAMI</b>
          <ul className="list-disc pl-6">
            <li>
              Menediakan koleksi pakaian bekas berkualitas yang dapat memenuhi
              berbagai gaya fashion dan selera pelanggan.
            </li>
            <li>
              Memberikan pengalaman berbelanja yang menyenangkan dengan
              pelayanan yang ramah, cepat, dan efisien.
            </li>
            <li>
              Meningkatkan kepercayaan pelanggan dengan memastikan setiap produk
              yang dijual memiliki kualitas terbaik dan sesuai dengan standar
              kenyamanan.
            </li>
            <li>
              Menawarkan pakaian bekas yang dapat mencerminkan kepribadian
              pelanggan, dengan tetap mengikuti perkembangan tren fashion
              terkini.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
