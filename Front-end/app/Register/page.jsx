"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Semua field harus diisi");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format email tidak valid");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      // Registrasi berhasil
      router.push("/Login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8">
      <div className="card w-full max-w-md shadow-2xl bg-white border-2 border-[#2F7B5D]">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <div className="px-8 py-2">
              <h1 className="text-2xl font-bold text-[#2F7B5D]">MOTOREC</h1>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-left mb-2 text-[#2F7B5D]">Daftar Akun</h2>

          {error && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#2F7B5D]">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              className="input input-bordered bg-white text-[#2F7B5D] border-[#2F7B5D] focus:bg-white focus:border-[#2F7B5D] focus:outline-none hover:border-[#2F7B5D] active:bg-white disabled:bg-white [&:not(:placeholder-shown)]:bg-white autofill:bg-white [-webkit-autofill]:bg-white"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#2F7B5D]">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              className="input input-bordered bg-white text-[#2F7B5D] border-[#2F7B5D] focus:bg-white focus:border-[#2F7B5D] focus:outline-none hover:border-[#2F7B5D] active:bg-white disabled:bg-white [&:not(:placeholder-shown)]:bg-white autofill:bg-white [-webkit-autofill]:bg-white"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#2F7B5D]">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="input input-bordered bg-white text-[#2F7B5D] border-[#2F7B5D] focus:bg-white focus:border-[#2F7B5D] focus:outline-none hover:border-[#2F7B5D] active:bg-white disabled:bg-white [&:not(:placeholder-shown)]:bg-white autofill:bg-white [-webkit-autofill]:bg-white"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#2F7B5D]">Konfirmasi Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Masukkan ulang password"
              className="input input-bordered bg-white text-[#2F7B5D] border-[#2F7B5D] focus:bg-white focus:border-[#2F7B5D] focus:outline-none hover:border-[#2F7B5D] active:bg-white disabled:bg-white [&:not(:placeholder-shown)]:bg-white autofill:bg-white [-webkit-autofill]:bg-white"
              required
            />
          </div>

          <div className="mt-5">
            <div className="border-t-2 border-[#2F7B5D] mb-6"></div>
            <button 
              type="submit" 
              className={`w-full btn text-white bg-[#2F7B5D] hover:bg-[#246347] border-none disabled:bg-[#2F7B5D] disabled:text-white ${loading ? "loading loading-bar loading-lg text-white before:bg-white" : ""}`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Daftar"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p>
              Sudah punya akun?{" "}
              <Link href="/Login" className="text-[#2F7B5D] hover:text-[#246347]">
                Login di sini
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
