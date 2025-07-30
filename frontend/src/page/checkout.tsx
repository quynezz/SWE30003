import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocation, useNavigate } from "react-router-dom";
import { featuredProducts } from "@/data/featuredProducts";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, ArrowLeft, CreditCard, Banknote, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Toast } from 'primereact/toast';

// Utility function to generate a mock order ID
const generateOrderId = () => {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
};

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const toast = useRef(null);
  const [isVisible, setIsVisible] = useState(false);


  // Parse query parameters for multiple products
  const query = new URLSearchParams(location.search);
  const cartData = query.get("cart") ? JSON.parse(decodeURIComponent(query.get("cart"))) : [];
  const cartItems = cartData
    .map(item => ({
      ...featuredProducts.find(p => p.id === item.productId),
      quantity: item.quantity || 1
    }))
    .filter(item => item !== undefined);

  // Fallback if no valid cart items
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Giỏ Hàng Trống</h1>
        <p className="text-gray-600">Không có sản phẩm nào để thanh toán.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/cart")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Trở Về Giỏ Hàng
        </Button>
      </div>
    );
  }

  // State for user information and validation
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    promoCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);
  const [promoApplied, setPromoApplied] = useState(null);

  // Calculate total
  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const discount = Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 1 : 0;
  const shippingCost = cartItems.length > 0 ? 30 : 0;
  const promoDiscount = promoApplied === "SAVE10" ? 0.1 : 0;
  const discountAmount = subtotal * (discount / 100);
  const promoAmount = (subtotal - discountAmount) * promoDiscount;
  const discountedSubtotal = subtotal - discountAmount - promoAmount;
  const totalPrice = Math.floor(discountedSubtotal + shippingCost);

  // Format prices
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };
  const formattedSubtotal = formatPrice(subtotal);
  const formattedDiscountAmount = formatPrice(discountAmount);
  const formattedPromoAmount = formatPrice(promoAmount);
  const formattedShippingCost = formatPrice(shippingCost);
  const formattedTotalPrice = formatPrice(totalPrice);

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};
    if (!userInfo.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!userInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Vui lòng nhập email hợp lệ";
    if (!userInfo.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!userInfo.phone.match(/^\+?\d{10,12}$/)) newErrors.phone = "Vui lòng nhập số điện thoại hợp lệ";
    if (paymentMethod === "card") {
      if (!userInfo.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = "Vui lòng nhập số thẻ 16 chữ số";
      if (!userInfo.cardExpiry.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)) newErrors.cardExpiry = "Vui lòng nhập ngày hết hạn (MM/YY)";
      if (!userInfo.cardCVC.match(/^\d{3}$/)) newErrors.cardCVC = "Vui lòng nhập mã CVC 3 chữ số";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Handle promo code
  const handleApplyPromo = () => {
    if (userInfo.promoCode === "SAVE10") {
      setPromoApplied("SAVE10");
      setErrors((prev) => ({ ...prev, promoCode: null }));
    } else {
      setPromoApplied(null);
      setErrors((prev) => ({ ...prev, promoCode: "Mã khuyến mãi không hợp lệ" }));
    }
  };

  // Handle checkout confirmation
  const handleCheckout = () => {
    if (!validateInputs()) return;
    setIsLoading(true);
    const orderId = generateOrderId();
    const orderData = {
      orderId,
      cart: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),
      subtotal,
      discount: discountAmount,
      promoDiscount: promoAmount,
      shippingCost,
      total: totalPrice,
      promoCode: promoApplied
    };
    // Clear cart data from localStorage
    localStorage.removeItem("cart");
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Thanks for your order! Redirecting to order success page...',
      life: 3000,
    });
    setTimeout(() => {
      navigate(`/order-success?order=${encodeURIComponent(JSON.stringify(orderData))}`);
      setIsLoading(false);
    }, 3000);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={sectionRef}
    >
      <Toast ref={toast} />
      <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Long Châu
            </a>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="hover:bg-blue-50">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`mb-8 flex justify-center space-x-4 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">1</div>
            <span className="ml-2 text-sm font-medium text-gray-900">Giỏ hàng</span>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">2</div>
            <span className="ml-2 text-sm font-medium text-gray-900">Thanh toán</span>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">3</div>
            <span className="ml-2 text-sm font-medium text-gray-500">Hoàn tất</span>
          </div>
        </div>

        <h1 className={`text-3xl font-bold text-gray-900 mb-8 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>Thanh Toán</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className={`rounded-xl shadow-lg ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Thông Tin Khách Hàng</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Họ và Tên</Label>
                    <Input
                      id="name"
                      name="name"
                      value={userInfo.name}
                      onChange={handleInputChange}
                      className={cn("mt-1", errors.name && "border-red-500")}
                      placeholder="Nhập họ và tên"
                      aria-invalid={!!errors.name}
                      aria-describedby="name-error"
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      className={cn("mt-1", errors.email && "border-red-500")}
                      placeholder="Nhập email"
                      aria-invalid={!!errors.email}
                      aria-describedby="email-error"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium">Địa Chỉ Giao Hàng</Label>
                    <Input
                      id="address"
                      name="address"
                      value={userInfo.address}
                      onChange={handleInputChange}
                      className={cn("mt-1", errors.address && "border-red-500")}
                      placeholder="Nhập địa chỉ"
                      aria-invalid={!!errors.address}
                      aria-describedby="address-error"
                    />
                    {errors.address && (
                      <p id="address-error" className="text-xs text-red-600 mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Số Điện Thoại</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      className={cn("mt-1", errors.phone && "border-red-500")}
                      placeholder="Nhập số điện thoại"
                      aria-invalid={!!errors.phone}
                      aria-describedby="phone-error"
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">Phương Thức Thanh Toán</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-50 transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Banknote className="h-5 w-5 text-blue-600" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">Thanh toán khi nhận hàng (COD)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-50 transition-colors">
                    <RadioGroupItem value="bank" id="bank" />
                    <Banknote className="h-5 w-5 text-blue-600" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">Chuyển khoản ngân hàng</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">Thẻ tín dụng/ghi nợ</Label>
                  </div>
                </RadioGroup>

                <AnimatePresence>
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-4"
                    >
                      <div>
                        <Label htmlFor="cardNumber" className="text-sm font-medium">Số Thẻ</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={userInfo.cardNumber}
                          onChange={handleInputChange}
                          className={cn("mt-1", errors.cardNumber && "border-red-500")}
                          placeholder="1234 5678 9012 3456"
                          aria-invalid={!!errors.cardNumber}
                          aria-describedby="cardNumber-error"
                        />
                        {errors.cardNumber && (
                          <p id="cardNumber-error" className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry" className="text-sm font-medium">Ngày Hết Hạn</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={userInfo.cardExpiry}
                            onChange={handleInputChange}
                            className={cn("mt-1", errors.cardExpiry && "border-red-500")}
                            placeholder="MM/YY"
                            aria-invalid={!!errors.cardExpiry}
                            aria-describedby="cardExpiry-error"
                          />
                          {errors.cardExpiry && (
                            <p id="cardExpiry-error" className="text-xs text-red-600 mt-1">{errors.cardExpiry}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cardCVC" className="text-sm font-medium">CVC</Label>
                          <Input
                            id="cardCVC"
                            name="cardCVC"
                            value={userInfo.cardCVC}
                            onChange={handleInputChange}
                            className={cn("mt-1", errors.cardCVC && "border-red-500")}
                            placeholder="123"
                            aria-invalid={!!errors.cardCVC}
                            aria-describedby="cardCVC-error"
                          />
                          {errors.cardCVC && (
                            <p id="cardCVC-error" className="text-xs text-red-600 mt-1">{errors.cardCVC}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <Card className={`rounded-xl shadow-lg sticky top-24 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tóm Tắt Đơn Hàng</h2>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-md mr-4"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tạm tính:</span>
                      <span>{formattedSubtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-red-600">
                        <span>Giảm giá ({discount}%):</span>
                        <span>-{formattedDiscountAmount}</span>
                      </div>
                    )}
                    {promoApplied && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Mã khuyến mãi ({promoApplied}):</span>
                        <span>-{formattedPromoAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Phí vận chuyển:</span>
                      <span>{formattedShippingCost}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold mt-2">
                      <span>Tổng cộng:</span>
                      <span>{formattedTotalPrice}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      name="promoCode"
                      value={userInfo.promoCode}
                      onChange={handleInputChange}
                      placeholder="Nhập mã khuyến mãi"
                      className={cn("text-sm", errors.promoCode && "border-red-500")}
                      aria-invalid={!!errors.promoCode}
                      aria-describedby="promoCode-error"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyPromo}
                      className="text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90"
                    >
                      Áp dụng
                    </Button>
                  </div>
                  {errors.promoCode && (
                    <p id="promoCode-error" className="text-xs text-red-600">{errors.promoCode}</p>
                  )}
                  {promoApplied && (
                    <p className="text-xs text-green-600">Mã khuyến mãi {promoApplied} đã được áp dụng!</p>
                  )}
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white transition-all duration-300 transform hover:scale-105"
                    onClick={handleCheckout}
                    disabled={isLoading || !userInfo.name || !userInfo.email || !userInfo.address || !userInfo.phone || (paymentMethod === "card" && (!userInfo.cardNumber || !userInfo.cardExpiry || !userInfo.cardCVC))}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Đang xử lý...
                      </>
                    ) : (
                      "Xác Nhận Đặt Hàng"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div
        className={`absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
      ></div>
      <div
        className={`absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
      ></div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .container {
          max-width: 1280px;
        }

        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          h1 {
            font-size: 1.75rem;
          }
          .lg\\:w-2\\/3 {
            width: 100%;
          }
          .lg\\:w-1\\/3 {
            width: 100%;
          }
          .sticky {
            position: relative;
            top: 0;
          }
        }
      `}</style>
    </motion.div>
  );
}
