import { useEffect } from "react";
import useCart from "../hooks/useCart";
import { useSelector } from "react-redux";
import Loader from "../../../shared/components/Loader";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiArrowRight,
  FiTruck,
  FiGift,
  FiShield,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import Button from "../../../shared/components/Button";
import { useRazorpay } from "react-razorpay";
import toast from "react-hot-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartLoading, cartTotalAmount, cartTotalQuantity } =
    useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const {
    getCartHandler,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCreateCartOrder,
    handleVerifyCartPayment,
  } = useCart();
  useEffect(() => {
    getCartHandler();
  }, []);

  console.log(cartItems);

  const { Razorpay, error, isLoading } = useRazorpay();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price || 0);

  async function handleCheckOut() {
    const res = await handleCreateCartOrder();
    console.log(res);
    const options = {
      key: "rzp_test_ShNSkpxt3emQVJ",
      amount: res.order.amount,
      currency: res.order.currency,
      name: "Snitch",
      description: "Your cart transaction",
      order_id: res.order.id,

      handler: async function (response) {
        const res = await handleVerifyCartPayment(response);
        if (res.success) {
          toast.success(res.message);
          navigate(`/payment/success?order_id=${response?.razorpay_order_id}`);
        } else {
          toast.error(res.message);
          navigate(`/payment/error?order_id=${response?.razorpay_order_id}`);
        }
      },

      prefill: {
        name: user.fullname,
        email: user.email,
        contact: user.contact,
      },

      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  }

  if (cartLoading && cartItems.length === 0) return <Loader />;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="relative mb-10">
          <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center animate-pulse">
            <FiShoppingBag className="w-12 h-12 text-primary/30" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-bg-surface shadow-lg rounded-full flex items-center justify-center text-xl">
            😟
          </div>
        </div>
        <h2 className="text-4xl font-black mb-4 tracking-tight">
          Your bag is feeling a bit lonely
        </h2>
        <p className="text-text-muted mb-10 max-w-sm text-lg leading-relaxed">
          It looks like you haven't added anything yet. Our new arrivals are
          waiting for a home!
        </p>
        <Link to="/collections">
          <Button
            variant="primary"
            className="px-10 h-14 rounded-full font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
            Go Find Something Cool
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4 border-b border-border/40 pb-8">
          <div>
            <h1 className="text-5xl font-black mb-3 tracking-tighter">
              My Bag{" "}
              <span className="text-primary/20">({cartTotalQuantity})</span>
            </h1>
            <p className="text-text-muted font-medium text-lg">
              {cartTotalQuantity === 1
                ? "Just one item for now."
                : `You've picked out ${cartTotalQuantity} great items!`}
            </p>
          </div>
          <Link
            to="/collections"
            className="group text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-2 transition-all">
            Continue Shopping{" "}
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        k
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Items List */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              {cartItems.map((item) => {
                const currentVariant = Array.isArray(item.product?.variants)
                  ? item.product.variants.find((v) => v._id === item.variant)
                  : item.product?.variants;
                const originalPrice = item.price?.amount || 0;
                const addedPrice = item.price?.discountPrice || originalPrice;
                const finalPrice = item.currentPrice || addedPrice;

                const priceDiff = finalPrice - addedPrice;
                const isPriceDecreased = priceDiff < 0;
                const isPriceIncreased = priceDiff > 0;
                const isPriceChangedSinceAdded =
                  isPriceDecreased || isPriceIncreased;
                const hasDiscount = originalPrice > finalPrice;

                return (
                  <div
                    key={`${item.product?._id}-${item.variant}-${item.size}`}
                    className="group relative flex gap-6 md:gap-8 bg-bg-surface p-2 rounded-xl border border-transparent hover:border-border/40 transition-all">
                    {/* Product Image */}
                    <div className="w-32 h-44 md:w-40 md:h-52 rounded-xl overflow-hidden bg-bg-muted shrink-0 shadow-inner">
                      <img
                        src={
                          currentVariant?.images?.[0]?.url ||
                          item.product?.images?.[0]?.url ||
                          (Array.isArray(item.product?.variants)
                            ? item.product.variants[0]?.images?.[0]?.url
                            : null) ||
                          "https://placehold.co/200x300?text=No+Image"
                        }
                        alt={item.product?.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between py-4 pr-4 md:pr-6">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-text/40 mb-1 block">
                              {item.product?.brand || "SNITCH"} |{" "}
                              {item.product?.category}
                            </span>
                            <h3 className="font-black text-xl md:text-2xl tracking-tight leading-tight transition-colors">
                              {item.product?.title}
                            </h3>
                          </div>
                          <button
                            onClick={() =>
                              handleRemoveItem(
                                item.product?._id,
                                item.variant,
                                item.size,
                              )
                            }
                            className="p-3 text-text-muted hover:text-error hover:bg-error/5 rounded-2xl transition-all active:scale-90"
                            title="Remove from bag">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex flex-col gap-3 mb-6">
                          {item.size && (
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-text text-bg rounded-full shadow-sm w-fit">
                              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                                Size
                              </span>
                              <span className="text-xs font-black uppercase">
                                {item.size}
                              </span>
                            </div>
                          )}

                          {isPriceDecreased && (
                            <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-xl border border-success/20 animate-in fade-in slide-in-from-left-2 duration-500">
                              <span className="text-[11px] font-black uppercase tracking-wider flex items-center gap-2">
                                <span className="flex h-2 w-2 rounded-full bg-success animate-ping" />
                                Good News! Price has decreased by{" "}
                                {formatPrice(Math.abs(priceDiff))}
                              </span>
                            </div>
                          )}

                          {isPriceIncreased && (
                            <div className="flex items-center gap-2 bg-error/10 text-error px-4 py-2 rounded-xl border border-error/20 animate-in fade-in slide-in-from-left-2 duration-500">
                              <span className="text-[11px] font-black uppercase tracking-wider flex items-center gap-2">
                                <span className="flex h-2 w-2 rounded-full bg-error animate-pulse" />
                                Price Updated! Increased by{" "}
                                {formatPrice(priceDiff)} (Due to market rate)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        {/* Organic Quantity Controls */}
                        <div className="flex items-center bg-bg-muted rounded-2xl p-1.5 shadow-inner">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product?._id,
                                item.variant,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-bg-surface hover:shadow-sm rounded-xl transition-all text-text-muted hover:text-black active:scale-90">
                            <FiMinus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-12 text-center font-black text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product?._id,
                                item.variant,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-bg-surface hover:shadow-sm rounded-xl transition-all text-text-muted hover:text-black active:scale-90">
                            <FiPlus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-black text-text tracking-tighter">
                            {formatPrice(finalPrice * item.quantity)}
                          </p>
                          {hasDiscount && (
                            <p className="text-[11px] text-text-muted line-through font-bold">
                              {formatPrice(originalPrice * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-bg-surface p-6 rounded-xl border border-border/40 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiGift className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Add a gift note</h4>
                    <p className="text-[10px] text-text-muted">
                      Personalize your order for a loved one.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-bg-surface p-6 rounded-xl border border-border/40 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-success/10 text-success flex items-center justify-center">
                    <FiShield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Secure checkout</h4>
                    <p className="text-[10px] text-text-muted">
                      Your data is protected by SNITCH encryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="bg-bg-surface rounded-xl p-10 shadow-2xl shadow-border/40 border border-border/40">
                <h2 className="text-3xl font-black mb-10 tracking-tight">
                  Summary
                </h2>

                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted font-medium">
                      Subtotal
                    </span>
                    <span className="font-black text-xl tracking-tight">
                      {formatPrice(cartTotalAmount)}
                    </span>
                  </div>

                  <div className="pt-8 border-t border-border/40 flex justify-between items-end">
                    <div>
                      <span className="font-black text-lg block mb-1">
                        Order Total
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-5xl font-black text-text tracking-tighter leading-none mb-1">
                        {formatPrice(cartTotalAmount)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleCheckOut}
                    variant="primary"
                    className="w-full h-16 rounded-xl text-xl font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Proceed to checkout
                  </Button>
                  <p className="text-center text-[10px] text-text-muted font-bold px-6 leading-relaxed">
                    By clicking checkout, you acknowledge that items in your bag
                    are not reserved and may sell out.
                  </p>
                </div>

                {/* Secure Trust Badges - More human style */}
                <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-20">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-4"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    className="h-5"
                  />
                </div>
              </div>

              {/* Need help section */}
              <div className="mt-6 text-center">
                <p className="text-xs text-text-muted font-medium">
                  Need help with your order?{" "}
                  <button className="text-primary font-black hover:underline underline-offset-4 ml-1">
                    Chat with us
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Humanize: Why SNITCH? Section */}
        <div className="mt-32 pt-20 border-t border-border/40">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4 tracking-tight">
              The SNITCH Promise
            </h2>
            <p className="text-text-muted font-medium max-w-lg mx-auto">
              We're not just selling clothes; we're building a community of the
              bold and the restless.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center space-y-4 group cursor-default">
              <div className="w-16 h-16 bg-bg-surface rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-3xl">⚡</span>
              </div>
              <h4 className="font-black text-lg">Fastest Delivery</h4>
              <p className="text-xs text-text-muted leading-relaxed px-4">
                From our warehouse to your doorstep in record time. Because
                style waits for no one.
              </p>
            </div>
            <div className="text-center space-y-4 group cursor-default">
              <div className="w-16 h-16 bg-bg-surface rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-3xl">💎</span>
              </div>
              <h4 className="font-black text-lg">Premium Quality</h4>
              <p className="text-xs text-text-muted leading-relaxed px-4">
                Every stitch is inspected. Every fabric is curated. Only the
                best for the squad.
              </p>
            </div>
            <div className="text-center space-y-4 group cursor-default">
              <div className="w-16 h-16 bg-bg-surface rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-3xl">🔄</span>
              </div>
              <h4 className="font-black text-lg">Easy Returns</h4>
              <p className="text-xs text-text-muted leading-relaxed px-4">
                Didn't fit? Not your vibe? No worries. Our 7-day return policy
                has you covered.
              </p>
            </div>
            <div className="text-center space-y-4 group cursor-default">
              <div className="w-16 h-16 bg-bg-surface rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-3xl">🛡️</span>
              </div>
              <h4 className="font-black text-lg">100% Secure</h4>
              <p className="text-xs text-text-muted leading-relaxed px-4">
                Your data is safer than a secret. Shop with absolute peace of
                mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
