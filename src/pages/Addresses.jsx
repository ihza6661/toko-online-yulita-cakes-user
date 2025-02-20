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
    document.title = "AS Denim - Alamat";
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

  // Handle form submission
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
    <div>
      <h2 className="text-xl font-semibold mb-4">Alamat Saya</h2>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-black text-white px-4 py-2"
        >
          Tambah Alamat Baru
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4 grid gap-4 max-w-md">
          {renderFormFields()}
          <div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 mr-2"
            >
              {editingAddressId ? "Perbarui Alamat" : "Simpan Alamat"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 ? (
        <p>Anda belum menambahkan alamat.</p>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="border p-4 rounded">
              <p className="font-semibold">{address.recipient_name}</p>
              <p>{address.phone_number}</p>
              <p>{address.address_line1}</p>
              {address.address_line2 && <p>{address.address_line2}</p>}
              <p>
                {address.city}, {address.province}, {address.postal_code}
              </p>
              {address.is_default && (
                <span className="text-green-500">[Default]</span>
              )}
              <div className="mt-2">
                <button
                  className="text-blue-500 hover:underline mr-4"
                  onClick={() => handleEdit(address)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(address.id)}
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

  // Render form fields with validation
  function renderFormFields() {
    const fields = [
      { label: "Nama Penerima", name: "recipient_name", type: "text" },
      { label: "Nomor Telepon", name: "phone_number", type: "text" },
      { label: "Alamat Baris 1", name: "address_line1", type: "text" },
      { label: "Alamat Baris 2", name: "address_line2", type: "text" },
      { label: "Provinsi", name: "province", type: "text" },
      { label: "Kota", name: "city", type: "text" },
      { label: "Kode Pos", name: "postal_code", type: "text" },
    ];

    return (
      <>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block mb-1">
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border p-2"
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm">{errors[field.name][0]}</p>
            )}
          </div>
        ))}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="is_default"
              checked={formData.is_default}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">Jadikan alamat default</span>
          </label>
        </div>
      </>
    );
  }
};

export default Addresses;
