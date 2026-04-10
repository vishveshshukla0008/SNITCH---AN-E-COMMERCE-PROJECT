import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import Input from "../../../shared/components/input";
import Button from "../../../shared/components/Button";
import Loader from "../../../shared/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../hook/useAuth";

const Signup = () => {
  const { authLoading, user } = useSelector((state) => state.auth);
  const { handleRegister } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
      role: "buyer",
    },
  });

  if (authLoading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  const password = watch("password");

  if (authLoading) {
    return <Loader />;
  }

  const onSubmit = async (data) => {
    const { confirmPassword, ...formData } = data;
    await handleRegister(formData);
  };

  return (
    <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-2 bg-bg transition-colors duration-500">
      <div className="w-full max-w-5xl h-fit bg-bg-surface rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xl font-black tracking-tighter text-text">
                SNITCH
              </span>
            </div>

            <div className="mb-6">
              <h1 className="text-4xl font-extrabold text-text tracking-tight mb-2">
                Join the squad
              </h1>
              <p className="text-text-muted font-medium">
                Create your account and start shopping
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  error={errors.fullname?.message}
                  {...register("fullname", {
                    required: "Invalid Fullname",
                    minLength: { value: 3, message: "Invalid Fullname" },
                  })}
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register("email", {
                  required: "Invalid Email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email",
                  },
                })}
              />

              <Input
                label="Contact Number"
                type="tel"
                placeholder="Enter 10 digit number"
                error={errors.contact?.message}
                {...register("contact", {
                  required: "Invalid Contact",
                  minLength: { value: 10, message: "Invalid Contact" },
                })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password must be from 6 to 12 characters long !",
                  minLength: {
                    value: 6,
                    message: "Password must be from 6 to 12 characters long !",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be from 6 to 12 characters long !",
                  },
                })}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Repeat your password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              <div className="sm:col-span-2 space-y-1.5 text-left">
                <label className="text-sm font-medium text-text-muted">
                  Account Role
                </label>
                <div className="flex gap-4">
                  {["buyer", "seller"].map((role) => (
                    <label key={role} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        value={role}
                        className="peer hidden"
                        {...register("role", {
                          required: "Invalid Role : buyer or seller",
                        })}
                      />
                      <div className="w-full py-3 px-4 rounded-xl border border-border bg-bg-surface text-center font-bold text-text-muted peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary transition-all duration-200">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-xs font-semibold text-error mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2 pt-2">
                <Button
                  type="submit"
                  isLoading={authLoading}
                  fullWidth
                  size="lg">
                  Create Account
                </Button>
              </div>

              <div className="sm:col-span-2">
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
                  Sign up with Google
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center text-sm font-medium text-text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline">
              Sign in here
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
                Welcome New Member
              </span>
              <h2 className="text-5xl font-black text-primary-foreground tracking-tighter">
                UNLEASH YOUR STYLE
              </h2>
            </div>
            <p className="max-w-md text-primary-foreground/90 font-medium leading-relaxed">
              Join the most exclusive community in streetwear. Get early access
              to limited drops and member-only rewards.
            </p>
          </div>

          <div className="absolute w-full bottom-10 flex justify-center text-primary-foreground/60 text-xs font-bold uppercase tracking-widest">
            © 2024 SNITCH STUDIO. ESTABLISHED FOR THE BOLD.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
