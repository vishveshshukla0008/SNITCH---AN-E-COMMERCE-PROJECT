import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hook/useAuth";
import Input from "../../../shared/components/input";
import Button from "../../../shared/components/Button";
import Loader from "../../../shared/components/Loader";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const { authLoading, user } = useSelector((state) => state.auth);
  const { loginHandler } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  if (authLoading) return <Loader />;

  if (user && user.role === "seller") {
    return <Navigate to="/products/dashboard" replace />;
  }
  if (user && user.role === "buyer") {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data) => {
    await loginHandler(data);
  };

  return (
    <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-bg transition-colors duration-500">
      <div className="w-full max-w-5xl h-fit bg-bg-surface rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-10 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-12">
              <span className="text-xl font-black tracking-tighter text-text">
                SNITCH
              </span>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-text tracking-tight mb-3">
                Welcome back
              </h1>
              <p className="text-text-muted font-medium">
                Please enter your details to sign in
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email or Phone Number"
                type="text"
                placeholder="Enter email or phone"
                error={errors.identifier?.message}
                {...register("identifier", {
                  required: "Email or Phone is required",
                })}
              />

              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-bg-surface"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium text-text-muted select-none">
                  Remember for 30 days
                </label>
              </div>

              <Button type="submit" fullWidth size="lg" isLoading={authLoading}>
                Sign In
              </Button>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  size="lg"
                  leftIcon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </svg>
                  }>
                  <a href="/api/auth/google">Sign in with Google</a>
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  size="lg"
                  leftIcon={<FaGithub className="w-5 h-5" />}>
                  <a href="/api/auth/github">Sign in with Github</a>
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center text-sm font-medium text-text-muted">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-bold hover:underline">
              Sign up for free
            </Link>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden md:block w-1/2 relative bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/90 to-[#d97706] mix-blend-multiply" />

          {/* Decorative Elements */}
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-black/10 rounded-full blur-2xl animate-pulse" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
            <div className="mb-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <span className="block text-primary-foreground text-sm font-bold uppercase tracking-widest mb-1">
                New Collection
              </span>
              <h2 className="text-5xl font-extrabold text-primary-foreground tracking-tighter">
                UNLIMITED STYLE
              </h2>
            </div>
            <p className="max-w-md text-primary-foreground/90 font-medium leading-relaxed">
              Step into the world of SNITCH. High-quality streetwear designed
              for those who dare to be different.
            </p>
          </div>

          {/* Bottom attribution/image credit style */}
          <div className="absolute bottom-10 w-full flex justify-center text-primary-foreground/60 text-sm font-extrabold uppercase tracking-widest">
            © 2024 SNITCH STUDIO. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
