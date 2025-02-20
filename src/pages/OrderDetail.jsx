import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const OrderDetail = () => {
  const { authFetch } = useContext(AppContext);
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await authFetch(`/api/user/user_orders/${orderId}`);
        const data = await response.json();
        if (response.ok) {
          setOrder(data);
        } else {
          console.error('Failed to fetch order:', data.message);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [authFetch, orderId]);

  if (!order) {
    return <p>Memuat detail pesanan...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Detail Pesanan</h2>
      <p>No. Order: {order.order_number}</p>
      <p>
        Tanggal: {format(new Date(order.created_at), 'dd MMM yyyy HH:mm', { locale: id })}
      </p>
      <p>Status: {order.status}</p>
      <p>Total: Rp {Number(order.total_amount).toLocaleString('id-ID')}</p>

      {/* Daftar produk dalam pesanan */}
      <h3 className="text-xl font-semibold my-4">Produk Pesanan</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Produk</th>
            <th className="border-b p-2">Harga</th>
            <th className="border-b p-2">Qty</th>
            <th className="border-b p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.order_items.map((item) => (
            <tr key={item.id}>
              <td className="border-b p-2">{item.product.product_name}</td>
              <td className="border-b p-2">
                Rp {Number(item.price).toLocaleString('id-ID')}
              </td>
              <td className="border-b p-2">{item.qty}</td>
              <td className="border-b p-2">
                Rp {Number(item.price * item.qty).toLocaleString('id-ID')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
