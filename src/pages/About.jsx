import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const locations = [
    {
        city: "BANDUNG",
        location: "Jl. LLRE Martadinata No. 154, Kota Bandung, Jawa Barat 40115",
        direction: "12 km"
    },
    {
        city: "PONTIANAK",
        location: "Jl. Gajah Mada No. 45, Kota Pontianak, Kalimantan Barat 78121",
        direction: "200 km"
    },
    {
        city: "BANJARMASIN",
        location: "Jl. A. Yani Km 5 No. 32, Kota Banjarmasin, Kalimantan Selatan 70249",
        direction: "300 km"
    },
    {
        city: "SINGKAWANG",
        location: "Jl. Alianyang No. 12, Kota Singkawang, Kalimantan Barat 79123",
        direction: "3200 km"
    },
    {
        city: "MEDAN",
        location: "Jl. Sisingamangaraja No. 88, Kota Medan, Sumatera Utara 20217",
        direction: "2300 km"
    },
    {
        city: "SURABAYA",
        location: "Jl. Raya Darmo No. 75, Kota Surabaya, Jawa Timur 60241",
        direction: "500 km"
    },
    {
        city: "SURABAYA",
        location: "Jl. Raya Darmo No. 75, Kota Surabaya, Jawa Timur 60241",
        direction: "500 km"
    },
    {
        city: "SURABAYA",
        location: "Jl. Raya Darmo No. 75, Kota Surabaya, Jawa Timur 60241",
        direction: "500 km"
    },
];



const About = () => {
    return (
        <div className='pt-36'>
            {/* Section Title */}
            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={'LOKASI'} text2={'TOKO'} />
            </div>

            {/* Intro Section */}
            <div className='my-10 flex flex-col md:flex-row gap-10 items-center'>
                <img className='w-full md:max-w-[200px]' src="/yulita_cake.png" alt="Yulita Cake" />
                <div className="flex flex-col justify-center gap-4 md:w-2/4 text-gray-600 text-center md:text-left">
                    <p>Terima kasih atas ketertarikan Anda pada produk Yulita Cakes 🍰✨.
                        <br /> Di bawah ini adalah alamat toko kami 🏬 yang dapat Anda kunjungi dan tersebar di seluruh Indonesia 🇮🇩🎉
                    </p>
                </div>
            </div>

            {/* Outlet Section */}
            <div className="text-xl py-4 text-center">
                <Title text1={'Outlet Yulita'} text2={'Cakes'} />
            </div>

            {/* Locations Grid */}
            <div className="w-full flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 text-sm mb-20">
                {locations.map(({ city, location, direction }, index) => (
                    <div key={index} className="border-4 border-pink-300 rounded-2xl shadow-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4 max-w-xs sm:w-auto">
                        <Title text1={'KOTA'} text2={city} />
                        <b>Martadinata<br />Jl. LLRE Martadinata / Jl. Riau No. 154</b>
                        <p className="text-gray-600">
                            {location}<br />Indonesia
                        </p>
                        <div className="text-pink-500 font-semibold">
                            <h5>{direction}</h5>
                            <h5 className="underline cursor-pointer">Directions</h5>
                        </div>
                    </div>
                ))}
            </div>


            {/* Newsletter Box */}
            <NewsletterBox />
        </div>
    )
}

export default About
