import { useContext } from 'react';
import Title from './Title';
import { AppContext } from '../context/AppContext';

const CartTotal = ({ shippingCost }) => {
    const { currency, getCartAmount } = useContext(AppContext);

    const subtotal = getCartAmount();
    const deliveryFee = shippingCost || 0; // Menggunakan shippingCost dari prop
    const total = subtotal + deliveryFee;

    // Fungsi untuk memformat angka menjadi format mata uang Indonesia
    const formatCurrency = (amount) => {
        return currency + amount.toLocaleString('id-ID', { minimumFractionDigits: 0 });
    };

    return (
        <div className='w-full'>
            <div className="text-2xl">
                <Title text1={'TOTAL'} text2={'KERANJANG'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{formatCurrency(subtotal)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>{formatCurrency(deliveryFee)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b className='pr-2'>Total</b>
                    <b>{formatCurrency(total)}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
