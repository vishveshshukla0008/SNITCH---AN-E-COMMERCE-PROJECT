import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { HiOutlineMailOpen, HiOutlineArrowRight } from "react-icons/hi";
import Button from "../../../shared/components/Button";

const VerifyEmailNotice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email";
  const fromSignup = location.state?.fromSignup;

  // Security Gate: Redirect if not coming from a real signup
  useEffect(() => {
    if (!fromSignup) {
      navigate("/", { replace: true });
    }
  }, [fromSignup, navigate]);

  if (!fromSignup) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-bg transition-colors duration-500">
      <div className="w-full max-w-lg bg-bg-surface rounded-xl border border-border p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.4)] relative overflow-hidden group">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mb-16 group-hover:bg-primary/10 transition-colors duration-700" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon Section */}
          <div className="w-20 h-20  rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-all duration-500">
            <HiOutlineMailOpen className="text-primary text-5xl" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-black text-text tracking-tighter uppercase mb-4 leading-none">
            Check Your <br />Inbox
          </h1>

          {/* Subtext */}
          <p className="text-text-muted font-medium mb-8 leading-relaxed max-w-sm">
            We've sent a verification link to <br />
            <span className="text-text font-bold decoration-primary/30 underline underline-offset-4">{email}</span>. 
            Click the link to verify your account.
          </p>

          <div className="w-full space-y-4">
            <Button
              fullWidth
              variant="outline"
              size="lg"
              className="rounded-2xl border-2 border-text/10 py-6 hover:border-primary transition-all duration-300"
              onClick={() => window.open(`https://mail.google.com/`, "_blank")}
            >
              Open Email Client
            </Button>

            <Link
              to="/login"
              className="flex items-center justify-center gap-2 group/link py-2 text-sm font-bold text-text-muted hover:text-text transition-colors"
            >
              Back to Login
              <HiOutlineArrowRight className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Footer Fine Print */}
          <p className="mt-10 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-40">
            Didn't receive it? Check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailNotice;
