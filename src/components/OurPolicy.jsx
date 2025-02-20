import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
            <div>
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>
                    Penukaran Yang Mudah</p>
                <p className='text-gray-400'>Lorem ipsum dolor sit.</p>
            </div>
            <div>
                <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>
                    Pengembalian Dalam 7 Hari</p>
                <p className='text-gray-400'>Lorem, ipsum dolor.</p>
            </div>
            <div>
                <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>
                    Dukungan Pelanggan Terbaik </p>
                <p className='text-gray-400'>Lorem ipsum dolor sit.</p>
            </div>
        </div>
    )
}

export default OurPolicy
