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
    document.title = "Yulita Cakes - Detail Akun";
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateData = {
        name: userData.name,
        email: userData.email,
      };

      if (userData.password) {
        updateData.password = userData.password;
        updateData.password_confirmation = userData.password_confirmation;
      }

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
        setUserData((prevState) => ({
          ...prevState,
          password: "",
          password_confirmation: "",
        }));
        setErrors({});
      } else if (response.status === 422) {
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
    <div className="rounded-lg w-full">
      <h2 className="text-2xl pt-6 font-semibold text-pink-500 mb-6 text-center">
        Detail Akun
      </h2>
      <form className="grid gap-5  p-6 rounded-xl shadow-lg w-full">
        <div>
          <label className="block text-pink-700 font-medium mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full border border-pink-400 bg-pink-50 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-pink-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full border border-pink-400 bg-pink-50 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-pink-700 font-medium mb-2">
            Password Baru
          </label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full border border-pink-400 bg-pink-50 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-pink-700 font-medium mb-2">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            name="password_confirmation"
            value={userData.password_confirmation}
            onChange={handleChange}
            className="w-full border border-pink-400 bg-pink-50 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password_confirmation[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-lg shadow-md hover:bg-pink-600 transition font-medium"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default AccountDetails;
