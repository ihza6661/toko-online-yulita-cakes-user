
import React from 'react'
import { assets } from '../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import specific icons
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-0 sm:mt-40 text-sm">
                <div>
                    <img src={assets.as_logo} className='mb-5 mt-10 sm:mt-0 w-40' alt="" />
                </div>
                <div>
                    <p className='text-xl font-medium mb-5' >Layanan Pelanggan</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li className='cursor-pointer hover:text-black transition-all duration-300 hover:translate-x-1'>Beranda</li>
                        <li className='cursor-pointer hover:text-black transition-all duration-300 hover:translate-x-1'>Tentang Kami</li>
                        <li className='cursor-pointer hover:text-black transition-all duration-300 hover:translate-x-1'>Syarat & Ketentuan</li>
                        <li className='cursor-pointer hover:text-black transition-all duration-300 hover:translate-x-1'>Pengiriman</li>
                        <li className='cursor-pointer hover:text-black transition-all duration-300 hover:translate-x-1'>Kebijakan Privasi</li>
                        <li className='cursor-pointer hover:text-black transition-all duration-300 hover:translate-x-1'>FAQs</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Kontak</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>

                        <li className='cursor-pointer hover:text-black transition-all duration-300 hover:translate-x-1'>
                            <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px' }} />
                            +62 (8)9692 070270</li>
                        <li className='cursor-pointer hover:text-black transition-all duration-300 hover:translate-x-1'><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />as_denim@gmail.com</li>

                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-size-sm text-center'>Copyright 2024 - <span className='text-red-600'>Garis AS</span>  - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer

