import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  
  useEffect(() => {
    let judul = isLogin ? "Masuk" : "Register";
    document.title = `AS Denim - ${judul}`;
  });
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  // Initial form data structure
  const getInitialFormData = () => ({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // State Management
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(getInitialFormData());
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
      global: null,
    }));
  };

  // Client-side form validation function
  const validateFormData = (data) => {
    const errors = {};

    if (!data.email) errors.email = ["Email wajib diisi."];
    if (!data.password) errors.password = ["Password wajib diisi."];

    if (!isLogin) {
      if (!data.name) errors.name = ["Nama wajib diisi."];
      if (!data.password_confirmation)
        errors.password_confirmation = ["Konfirmasi password wajib diisi."];
      if (data.password !== data.password_confirmation)
        errors.password_confirmation = ["Konfirmasi password tidak cocok."];
    }

    return errors;
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

    const endpoint = isLogin ? "/api/user/login" : "/api/user/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          setToken(data.token);
          toast.success("Login berhasil!");
          navigate("/");
        } else {
          toast.success("Registrasi berhasil! Silakan login.");
          resetForm();
          setIsLogin(true);
        }
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        throw new Error(
          data.message || "Terjadi kesalahan, silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error(
        error.message || "Terjadi kesalahan jaringan, silakan coba lagi."
      );
    }
  };

  // Reset the form to initial state
  const resetForm = () => {
    setFormData(getInitialFormData());
    setErrors({});
  };

  // Toggle between login and register forms
  const toggleForm = () => {
    resetForm();
    setIsLogin(!isLogin);
  };

  return (
    <div className="pt-24">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-reguler text-3xl">
            {isLogin ? "MASUK" : "DAFTAR"}
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {errors.global && (
          <div className="text-red-500">
            <p>{errors.global}</p>
          </div>
        )}

        {renderFormFields()}

        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {isLogin ? "MASUK" : "DAFTAR"}
        </button>

        <p className="mt-4 text-sm">
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
            {isLogin ? "Daftar" : "Masuk"}
          </span>
        </p>
      </form>
    </div>
  );

  // Render form fields with validation
  function renderFormFields() {
    const fields = [];

    if (!isLogin) {
      fields.push(
        { label: "Nama Lengkap", name: "name", type: "text", required: true },
      );
    }

    fields.push(
      { label: "Email", name: "email", type: "email", required: true },
      { label: "Password", name: "password", type: "password", required: true }
    );

    if (!isLogin) {
      fields.push({
        label: "Konfirmasi Password",
        name: "password_confirmation",
        type: "password",
        required: true,
      });
    }

    return (
      <>
        {fields.map((field) => (
          <div key={field.name} className="w-full">
            <input
              name={field.name}
              onChange={handleChange}
              value={formData[field.name]}
              type={field.type}
              className="w-full px-3 py-2 border border-gray-800"
              placeholder={field.label}
              required={field.required}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm">{errors[field.name][0]}</p>
            )}
          </div>
        ))}
      </>
    );
  }
};

export default AuthForm;
