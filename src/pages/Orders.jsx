import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import format from "date-fns/format";
import id from "date-fns/locale/id";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { authFetch } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AS Denim - Pesanan";
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authFetch("/api/user/user_orders");
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [authFetch]);

  return (
    <div className="p-4 bg-pink-100 rounded-lg w-full">
      <h2 className="text-2xl text-center text-pink-500 font-semibold mb-6">Pesanan Saya</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">Anda belum memiliki pesanan.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">No. Order</th>
              <th className="border-b p-2">Tanggal</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Total</th>
              <th className="border-b p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border-b p-2">{order.order_number}</td>
                <td className="border-b p-2">
                  {format(new Date(order.created_at), "dd MMM yyyy HH:mm", {
                    locale: id,
                  })}
                </td>
                <td className="border-b p-2 capitalize">{order.status}</td>
                <td className="border-b p-2">
                  Rp {Number(order.total_amount).toLocaleString("id-ID")}
                </td>
                <td className="border-b p-2">
                  <button
                    onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                    className="text-blue-500 hover:underline"
                  >
                    Lihat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
