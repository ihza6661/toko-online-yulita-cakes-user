import { useEffect, useState, useContext, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Addresses = () => {
  const { authFetch } = useContext(AppContext);

  const getInitialFormData = () => ({
    recipient_name: "",
    phone_number: "",
    address_line1: "",
    address_line2: "",
    province: "",
    city: "",
    postal_code: "",
    is_default: false,
  });

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData());
  const [errors, setErrors] = useState({});
  const [editingAddressId, setEditingAddressId] = useState(null);

  useEffect(() => {
    document.title = "Yulita Cakes - Alamat Pengiriman";
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = useCallback(async () => {
    try {
      const response = await authFetch("/api/user/addresses");
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Gagal mengambil data alamat.");
      }
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error(
        error.message || "Terjadi kesalahan saat mengambil data alamat."
      );
    }
  }, [authFetch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  return (
    <div className="p-4 rounded-lg mx-auto bg-pink-100 inline-block lg:w-full">


      <h2 className="text-2xl font-semibold text-center text-pink-500 mb-4">Alamat Pengiriman</h2>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Tambah Alamat Baru
        </button>
      ) : (
        <form onSubmit={() => {}} className="mb-4 grid gap-4 bg-pink-100 p-6 rounded-xl">
  <div>
    <label className="block text-pink-700">Nama Penerima</label>
    <input 
      type="text" 
      name="recipient_name" 
      className="w-full border border-pink-400 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50"
    />
  </div>

  <div>
    <label className="block text-pink-700">Nomor Telepon</label>
    <input 
      type="text" 
      name="phone_number" 
      className="w-full border border-pink-400 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50"
    />
  </div>

  <button
    type="submit"
    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition"
  >
    Simpan Alamat
  </button>
</form>

      )}

      {addresses.length === 0 ? (
        <p className="text-gray-600">Anda belum menambahkan alamat.</p>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="border border-pink-300 p-4 rounded-lg bg-white shadow-md">
              <p className="font-semibold text-pink-700">{address.recipient_name}</p>
              <p>{address.phone_number}</p>
              <p>{address.address_line1}</p>
              {address.address_line2 && <p>{address.address_line2}</p>}
              <p>{address.city}, {address.province}, {address.postal_code}</p>
              {address.is_default && <span className="text-green-500">[Default]</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;