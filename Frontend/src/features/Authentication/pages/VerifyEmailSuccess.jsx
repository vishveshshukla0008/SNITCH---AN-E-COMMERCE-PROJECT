import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  HiOutlineBadgeCheck,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { authApi } from "../services/auth.api";
import Button from "../../../shared/components/Button";
import Loader from "../../../shared/components/Loader";
import toast from "react-hot-toast";
import { useAuth } from "../hook/useAuth";

const VerifyEmailSuccess = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const { handleVerifyAccount } = useAuth();

  const verifyToken = async () => {
    try {
      const response = await handleVerifyAccount(token);
      setStatus("success");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message || "Verification failed. The link might be expired.",
      );
      toast.error("Verification failed");
    }
  };
  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token, navigate]);

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg">
        <Loader />
        <p className="mt-8 text-text-muted font-bold animate-pulse uppercase tracking-widest text-xs">
          Authenticating Your Account...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg transition-colors duration-500">
      <div className="w-full max-w-lg bg-bg-surface rounded-[40px] border border-border p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.4)] text-center relative overflow-hidden group">
        {status === "success" ? (
          <>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 mx-auto transform">
              <HiOutlineBadgeCheck className="text-primary text-5xl" />
            </div>

            <h1 className="text-3xl font-black text-text tracking-tighter uppercase mb-4">
              Verified <span className="text-primary">Successfully</span>
            </h1>

            <p className="text-text-muted font-medium mb-10 leading-relaxed">
              Welcome to the SNITCH squad. Your account is now active and ready
              for the boldest streetwear drops.
            </p>

            <div className="space-y-4">
              <Button fullWidth size="lg" onClick={() => navigate("/login")}>
                Go to Login
              </Button>
              <p className="text-xs text-text-muted opacity-60">
                Redirecting to login in 5 seconds...
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 mx-auto">
              <HiOutlineExclamationCircle className="text-red-500 text-5xl" />
            </div>

            <h1 className="text-3xl font-black text-text tracking-tighter uppercase mb-4">
              Link <span className="text-red-500">Expired</span>
            </h1>

            <p className="text-text-muted font-medium mb-10 leading-relaxed">
              {errorMessage}
            </p>

            <Button
              fullWidth
              variant="outline"
              size="lg"
              onClick={() => navigate("/signup")}>
              Back to Signup
            </Button>
          </>
        )}

        {/* Brand Marking */}
        <div className="mt-12 opacity-20 flex justify-center">
          <span className="text-xs font-black tracking-[0.5em] text-text uppercase italic">
            MMXXVI STUDIO
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailSuccess;
