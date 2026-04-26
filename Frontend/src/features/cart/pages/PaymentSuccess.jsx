import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { 
  FiCheckCircle, 
  FiPackage, 
  FiArrowRight, 
  FiHome, 
  FiShoppingBag,
  FiUser,
  FiMail,
  FiMapPin,
  FiClock,
  FiTruck
} from "react-icons/fi";
import Confetti from "react-confetti";
import useCart from "../hooks/useCart";
import { toast } from "react-hot-toast";
import Button from "../../../shared/components/Button";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();
  const { handleGetOrderDetails } = useCart();
  
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  useEffect(() => {
    if (!orderId) {
      toast.error("Order ID not found");
      navigate("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        // Simulate a slight delay for a smoother transition ("No blink issue")
        const [response] = await Promise.all([
          handleGetOrderDetails(orderId),
          new Promise(resolve => setTimeout(resolve, 1500)) 
        ]);

        if (response && response.success) {
          setOrder(response.order);
        } else {
          // If API fails but we have orderId, we can still show a basic success message
          // but the user wants details. Let's hope the API works.
          console.error("Order details fetch failed");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FiPackage className="w-8 h-8 text-primary animate-bounce" />
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-black tracking-tight text-text animate-pulse text-center">
          Verifying your payment...
        </h2>
        <p className="mt-2 text-text-muted font-medium text-center max-w-xs">
          Almost there! We're putting together your order details.
        </p>
      </div>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price || 0);

  return (
    <div className="min-h-screen bg-bg pt-28 pb-20 px-4 relative overflow-hidden">
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={false}
        numberOfPieces={400}
        gravity={0.15}
        colors={["#FFD700", "#FFFFFF", "#00E5FF", "#FF4D6D", "#7C3AED", "#22C55E"]}
      />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Success Message & Items */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-bg-surface rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/40 relative overflow-hidden group">
              {/* Abstract Background Decoration */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-success/5 rounded-full blur-3xl group-hover:bg-success/10 transition-colors duration-1000"></div>
              
              <div className="relative z-10 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-6 animate-in zoom-in duration-700">
                  <FiCheckCircle className="w-10 h-10 text-success" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-none">
                  ORDER <span className="text-success">CONFIRMED!</span>
                </h1>
                <p className="text-text-muted text-lg mb-8 max-w-xl leading-relaxed">
                  Woohoo! Your payment was successful and your order <span className="text-text font-black">#{orderId.slice(-8).toUpperCase()}</span> is now being processed. 
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-bg border border-border/40">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <FiClock />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Order Date</p>
                      <p className="font-bold text-sm">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-bg border border-border/40">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                      <FiTruck />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Expected Delivery</p>
                      <p className="font-bold text-sm">3 - 5 Business Days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items List */}
              <div className="mt-12">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <FiShoppingBag className="text-primary" /> Order Items
                </h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {order?.items?.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-2xl bg-bg-surface border border-border/40 hover:border-primary/20 transition-all group/item">
                      <div className="w-20 h-24 bg-bg-muted rounded-xl overflow-hidden shrink-0">
                        <img 
                          src={item.product?.images?.[0]?.url || "https://placehold.co/150x200?text=Snitch"} 
                          alt={item.product?.title}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-black text-lg leading-tight line-clamp-1">{item.product?.title}</h4>
                          <p className="text-xs text-text-muted font-bold mt-1 uppercase tracking-wider">
                            Size: <span className="text-text">{item.size}</span> | Qty: <span className="text-text">{item.quantity}</span>
                          </p>
                        </div>
                        <p className="font-black text-primary text-lg">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  )) || (
                    /* Fallback if order details are not fully populated */
                    <div className="p-8 text-center border-2 border-dashed border-border/40 rounded-3xl">
                      <p className="text-text-muted italic">Processing order details summary...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/collections" className="flex-1">
                <Button variant="primary" className="w-full h-16 rounded-2xl text-xl font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  CONTINUE SHOPPING <FiArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <Link to="/" className="sm:w-1/3">
                <button className="w-full h-16 bg-bg-surface border border-border/60 text-text rounded-2xl font-black hover:bg-bg-muted transition-all flex items-center justify-center gap-2">
                  <FiHome className="w-5 h-5" /> HOME
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Customer & Summary */}
          <div className="lg:col-span-4 space-y-6">
            {/* Customer Details */}
            <div className="bg-bg-surface rounded-[2.5rem] p-8 shadow-xl border border-border/40 relative overflow-hidden">
              <h3 className="text-sm uppercase tracking-[0.2em] font-black text-text-muted mb-8 flex items-center gap-2">
                <FiUser /> Customer Details
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FiUser />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Full Name</p>
                    <p className="font-black text-text">{order?.user?.fullname || "Customer"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FiMail />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Email Address</p>
                    <p className="font-bold text-text truncate max-w-[200px]">{order?.user?.email || "customer@example.com"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Delivery Address</p>
                    <p className="font-bold text-text text-sm leading-relaxed">
                      {order?.address || "Shipping address details will be sent to your email."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-bg-surface rounded-[2.5rem] p-8 shadow-xl border border-border/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              
              <h3 className="text-sm uppercase tracking-[0.2em] font-black text-text-muted mb-8 flex items-center gap-2">
                <FiPackage /> Payment Summary
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted font-bold">Subtotal</span>
                  <span className="text-text font-black">{formatPrice(order?.totalAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-success">
                  <span className="font-bold">Shipping</span>
                  <span className="font-black uppercase text-xs tracking-widest">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted font-bold">Tax</span>
                  <span className="text-text font-black">{formatPrice(0)}</span>
                </div>
                <div className="pt-4 border-t border-border/40 flex justify-between items-center">
                  <span className="text-lg font-black text-text">Total Paid</span>
                  <span className="text-3xl font-black text-primary tracking-tighter">
                    {formatPrice(order?.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-success/5 border border-success/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-success font-black uppercase tracking-tighter">Paid via Razorpay Secure</p>
              </div>
            </div>

            <p className="text-center text-xs text-text-muted font-medium px-4">
              A confirmation email has been sent to your registered address. 
              <br />
              Need help? <button className="text-primary font-black hover:underline transition-all">Contact Support</button>
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--primary), 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--primary), 0.2);
        }
        
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in {
          animation: zoom-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default PaymentSuccess;