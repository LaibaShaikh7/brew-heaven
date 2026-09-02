import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coffee, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers =
      JSON.parse(localStorage.getItem("brewHavenUsers")) || [];

    const userExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (userExists) {
      alert("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem(
      "brewHavenUsers",
      JSON.stringify([...existingUsers, newUser])
    );

    localStorage.setItem(
      "brewHavenCurrentUser",
      JSON.stringify(newUser)
    );

    navigate("/coffee/hot");
  };

  return (
    <div className="min-h-screen bg-primary-container">

      {/* NAVBAR */}
      <nav className="flex h-20 items-center justify-between border-b border-on-surface/5 bg-white/70 px-6 backdrop-blur-xl md:px-16">

        <Link
          to="/coffee/hot"
          className="font-headline-md text-2xl text-primary"
        >
          Brew Haven
        </Link>

        <Link
          to="/coffee/hot"
          className="text-sm text-on-surface-variant hover:text-primary"
        >
          Back to Menu
        </Link>

      </nav>

      {/* SIGNUP CONTENT */}
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-12">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

          {/* LEFT SIDE */}
   <div className="relative hidden overflow-hidden md:flex md:min-h-[650px]">

  <img
    src="/images/signup.png"
    alt="Warm Brew Haven coffee"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Warm overlay */}
  <div className="absolute inset-0 bg-black/45" />

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-between p-12 text-white">

    <div>

      <Coffee
        size={34}
        className="text-white"
      />

      <h1 className="mt-10 font-headline-lg text-5xl leading-tight">
        Your coffee ritual starts here.
      </h1>

      <p className="mt-6 max-w-sm leading-relaxed text-white/85">
        Create your Brew Haven account and make ordering your
        favorite coffee and desserts effortless.
      </p>

    </div>

    <p className="text-sm text-white/70">
      Crafted for those who appreciate the ritual.
    </p>

  </div>

</div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-12">

            <div className="mb-8">

              <p className="text-xs uppercase tracking-[0.25em] text-secondary">
                Welcome to Brew Haven
              </p>

              <h2 className="mt-3 font-headline-lg text-4xl text-on-surface">
                Create your account
              </h2>

              <p className="mt-3 text-sm text-on-surface-variant">
                Join us and start ordering your favorites.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-outline/20 bg-primary-container px-4 py-3 outline-none focus:border-secondary"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-outline/20 bg-primary-container px-4 py-3 outline-none focus:border-secondary"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    minLength={6}
                    required
                    className="w-full rounded-xl border border-outline/20 bg-primary-container px-4 py-3 pr-12 outline-none focus:border-secondary"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                className="w-full rounded-full bg-secondary py-4 text-sm font-semibold uppercase tracking-widest text-white transition hover:scale-[1.01] hover:bg-tertiary"
              >
                Create Account
              </button>

            </form>

            <p className="mt-8 text-center text-sm text-on-surface-variant">

              Already have an account?{" "}

              <span className="font-semibold text-secondary">
                Sign in
              </span>

            </p>

          </div>

        </div>

      </main>

    </div>
  );
}