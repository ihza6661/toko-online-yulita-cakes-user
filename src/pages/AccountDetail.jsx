import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AccountDetails = () => {
  const { authFetch } = useContext(AppContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "AS Denim - Detail Akun";
  }, []);

  // Mengambil data pengguna saat komponen dimount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authFetch("/api/user/get_user");
        const data = await response.json();

        if (response.ok) {
          setUserData((prevState) => ({
            ...prevState,
            name: data.name,
            email: data.email,
          }));
        } else {
          toast.error(data.message || "Gagal mengambil data pengguna.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Terjadi kesalahan saat mengambil data pengguna.");
      }
    };

    fetchUserData();
  }, [authFetch]);

  // Menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Hapus error saat input diubah
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  // Menangani submission formulir
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Persiapkan data untuk dikirim
      const updateData = {
        name: userData.name,
        email: userData.email,
      };

      // Sertakan field password jika pengguna ingin mengubah password
      if (userData.password) {
        updateData.password = userData.password;
        updateData.password_confirmation = userData.password_confirmation;
      }

      // Mengirim permintaan ke API
      const response = await authFetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Profil berhasil diperbarui.");
        // Hapus field password setelah berhasil update
        setUserData((prevState) => ({
          ...prevState,
          password: "",
          password_confirmation: "",
        }));
        setErrors({});
      } else if (response.status === 422) {
        // Error validasi; pastikan error berbentuk objek dan tampilkan pesan error pertama untuk tiap field
        setErrors(data.errors || {});
      } else {
        toast.error(data.message || "Gagal memperbarui profil.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Terjadi kesalahan saat memperbarui profil.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Detail Akun</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        {/* Field Nama Lengkap */}
        <div>
          <label className="block mb-1">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.name && (
            // Tampilkan pesan error pertama jika error.name berupa array
            <p className="text-red-500 text-sm">{errors.name[0]}</p>
          )}
        </div>

        {/* Field email */}
        <div>
          <label className="block mb-1">email</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            className="w-full border p-2"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email[0]}</p>
          )}
        </div>

        {/* Field Password Baru */}
        <div>
          <label className="block mb-1">Password Baru</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password[0]}</p>
          )}
        </div>

        {/* Field Konfirmasi Password Baru */}
        <div>
          <label className="block mb-1">Konfirmasi Password Baru</label>
          <input
            type="password"
            name="password_confirmation"
            value={userData.password_confirmation}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">
              {errors.password_confirmation[0]}
            </p>
          )}
        </div>

        {/* Tombol Submit */}
        <button type="submit" className="bg-black text-white px-4 py-2">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default AccountDetails;
