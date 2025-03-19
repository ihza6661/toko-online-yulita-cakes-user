import { useEffect, useState, useContext, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Addresses = () => {
  const { authFetch } = useContext(AppContext);

  // Initial form data structure
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
    document.title = "Yulita Cakes - Alamat";
  }, []);

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Fetch addresses function with useCallback
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

  // Handle form input changes
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

  // Handle form submission for add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const url = editingAddressId
        ? `/api/user/addresses/${editingAddressId}`
        : "/api/user/addresses";
      const method = editingAddressId ? "PUT" : "POST";

      const response = await authFetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Alamat berhasil disimpan.");
        // Refresh addresses to update default flags and new entries
        await fetchAddresses();
        resetForm();
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        throw new Error(data.message || "Gagal menyimpan alamat.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error(error.message || "Terjadi kesalahan saat menyimpan alamat.");
    }
  };

  // Handle address deletion
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
      try {
        const response = await authFetch(`/api/user/addresses/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message || "Alamat berhasil dihapus.");
          // Refresh addresses after deletion
          await fetchAddresses();
        } else {
          throw new Error(data.message || "Gagal menghapus alamat.");
        }
      } catch (error) {
        console.error("Error deleting address:", error);
        toast.error(
          error.message || "Terjadi kesalahan saat menghapus alamat."
        );
      }
    }
  };

  // Handle editing an address
  const handleEdit = (address) => {
    setFormData({
      recipient_name: address.recipient_name,
      phone_number: address.phone_number,
      address_line1: address.address_line1,
      address_line2: address.address_line2 || "",
      province: address.province,
      city: address.city,
      postal_code: address.postal_code,
      is_default: address.is_default,
    });
    setEditingAddressId(address.id);
    setShowForm(true);
  };

  // Reset the form to initial state
  const resetForm = () => {
    setFormData(getInitialFormData());
    setEditingAddressId(null);
    setShowForm(false);
    setErrors({});
  };

  // Client-side form validation function
  const validateFormData = (data) => {
    const errors = {};
    if (!data.recipient_name)
      errors.recipient_name = ["Nama penerima wajib diisi."];
    if (!data.phone_number)
      errors.phone_number = ["Nomor telepon wajib diisi."];
    if (!data.address_line1)
      errors.address_line1 = ["Alamat baris 1 wajib diisi."];
    if (!data.province) errors.province = ["Provinsi wajib diisi."];
    if (!data.city) errors.city = ["Kota wajib diisi."];
    if (!data.postal_code) errors.postal_code = ["Kode pos wajib diisi."];
    return errors;
  };

  return (
    <div className="p-4 rounded-lg mx-auto inline-block lg:w-full">
      <h2 className="text-2xl pt-6 font-semibold text-pink-500 mb-6 text-center">
        Alamat Pengiriman
      </h2>

      {!showForm ? (
        <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-pink-500 hover:bg-pink-600 text-white font-normal px-4 py-2 rounded-lg flex mx-auto"
      >
        Tambah Alamat Baru
      </button>
      
      ) : (
        <form
        onSubmit={handleSubmit}
        className="mb-4 grid gap-4 bg-pink-100 p-6 rounded-xl"
      >
        <div>
          <label className="block text-pink-700">Nama Penerima</label>
          <input
            type="text"
            name="recipient_name"
            value={formData.recipient_name}
            onChange={handleChange}
            className="w-full border border-pink-300 p-1 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50 outline-none"
          />
          {errors.recipient_name && (
            <p className="text-red-500 text-sm">{errors.recipient_name[0]}</p>
          )}
        </div>
      
        <div>
          <label className="block text-pink-700">Nomor Telepon</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full border border-pink-300 p-1 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50 outline-none"
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm">{errors.phone_number[0]}</p>
          )}
        </div>
      
        <div>
          <label className="block text-pink-700">Alamat Baris 1</label>
          <input
            type="text"
            name="address_line1"
            value={formData.address_line1}
            onChange={handleChange}
            className="w-full border border-pink-300 p-1 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50 outline-none"
          />
          {errors.address_line1 && (
            <p className="text-red-500 text-sm">{errors.address_line1[0]}</p>
          )}
        </div>
      
        <div>
          <label className="block text-pink-700">Alamat Baris 2</label>
          <input
            type="text"
            name="address_line2"
            value={formData.address_line2}
            onChange={handleChange}
            className="w-full border border-pink-300 p-1 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50 outline-none"
          />
        </div>
      
        <div>
          <label className="block text-pink-700">Provinsi</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full border border-pink-300 p-1 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50 outline-none"
          />
          {errors.province && (
            <p className="text-red-500 text-sm">{errors.province[0]}</p>
          )}
        </div>
      
        <div>
          <label className="block text-pink-700">Kota</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-pink-300 p-1 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50 outline-none"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city[0]}</p>
          )}
        </div>
      
        <div>
          <label className="block text-pink-700">Kode Pos</label>
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            className="w-full border border-pink-300 p-1 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50 outline-none"
          />
          {errors.postal_code && (
            <p className="text-red-500 text-sm">{errors.postal_code[0]}</p>
          )}
        </div>
      
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_default"
            checked={formData.is_default}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-pink-700">Jadikan alamat utama</label>
        </div>
      
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-normal px-4 py-3 rounded-lg shadow-md transition"
          >
            {editingAddressId ? "Perbarui Alamat" : "Simpan Alamat"}
          </button>
          {editingAddressId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white font-normal px-4 py-3 rounded-lg shadow-md transition"
            >
              Batal
            </button>
          )}
        </div>
      </form>
      
      )}

      {addresses.length === 0 ? (
        <p className="text-gray-600">Anda belum menambahkan alamat.</p>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-pink-300 p-4 rounded-lg font-light bg-white shadow-md leading-relaxed"
            >
              <p className="font-normal text-pink-700">
                {address.recipient_name}
              </p>
              <p>{address.phone_number}</p>
              <p>{address.address_line1}</p>
              {address.address_line2 && <p>{address.address_line2}</p>}
              <p>
                {address.city}, {address.province}, {address.postal_code}
              </p>
              {address.is_default && (
                <span className="text-red-500">[Default]</span>
              )}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-normal px-3 py-1 rounded"
                >
                  Ubah
                </button>

                <button
                  onClick={() => handleDelete(address.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-normal px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
