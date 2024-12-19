"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      // Simpan token di localStorage
      localStorage.setItem("token", data.token);
      
      // Redirect ke dashboard
      router.push("/Dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <style jsx>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: #2F7B5D !important;
        }
      `}</style>
      <div className="card w-full max-w-sm shadow-2xl bg-white border-2 border-[#2F7B5D]">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <div className="px-8 py-2">
              <h1 className="text-2xl font-bold text-[#2F7B5D]">MOTOREC</h1>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-left mb-2 text-[#2F7B5D]">Login Akun</h2>
          
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
              className="input input-bordered bg-white text-[#2F7B5D] border-[#2F7B5D] focus:bg-white focus:border-[#2F7B5D] focus:outline-none hover:border-[#2F7B5D]"
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
              placeholder="Masukkan password"
              className="input input-bordered bg-white text-[#2F7B5D] border-[#2F7B5D] focus:bg-white focus:border-[#2F7B5D] focus:outline-none hover:border-[#2F7B5D]"
              required
            />
            <label className="label">
              <Link href="/forgot-password" className="label-text-alt link link-hover text-[#2F7B5D]">
                Lupa password?
              </Link>
            </label>
          </div>

          <div className="mt-3">
            <div className="border-t-2 border-[#2F7B5D] mb-6"></div>
            <button 
              type="submit" 
              className={`w-full btn text-white bg-[#2F7B5D] hover:bg-[#246347] border-none disabled:bg-[#2F7B5D] disabled:text-white ${loading ? "loading loading-bar loading-lg text-white before:bg-white" : ""}`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p>
              Belum punya akun?{" "}
              <Link href="/Register" className="text-[#2F7B5D] hover:text-[#246347]">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
