import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { featuredProducts } from "@/data/featuredProducts";
import { useEffect, useState } from "react";

export function OrderSuccessPage() {
  const location = useLocation();
  const [orderData, setOrderData] = useState({
    orderId: "",
    cart: [],
    subtotal: 0,
    discount: 0,
    promoDiscount: 0,
    shippingCost: 0,
    total: 0,
    promoCode: null
  });

  localStorage.removeItem("cartItems");
  // Parse order data from query parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderParam = query.get("order");
    // Clear the localStorage if you want to reset the order data
    if (orderParam) {
      try {
        const parsedOrder = JSON.parse(decodeURIComponent(orderParam));
        // Map cart data to include full product details
        const items = parsedOrder.cart.map((item) => {
          const product = featuredProducts.find((p) => p.id === item.productId);
          return product ? { ...product, quantity: item.quantity } : null;
        }).filter((item) => item !== null);
        setOrderData({
          orderId: parsedOrder.orderId,
          cart: items,
          subtotal: parsedOrder.subtotal,
          discount: parsedOrder.discount,
          promoDiscount: parsedOrder.promoDiscount,
          shippingCost: parsedOrder.shippingCost,
          total: parsedOrder.total,
          promoCode: parsedOrder.promoCode
        });
      } catch (error) {
        console.error("Error parsing order data:", error);
      }
    }
  }, [location.search]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-1 inline" />
              Quay lại
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Long Châu
            </h1>
          </div>
          <div className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Đặt Hàng Thành Công!
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được ghi nhận với mã số{" "}
            <span className="font-semibold text-blue-600">{orderData.orderId}</span>.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-4">
              {orderData.cart.length === 0 ? (
                <p className="text-gray-600 text-center">Không có sản phẩm trong đơn hàng.</p>
              ) : (
                orderData.cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Đơn giá: {formatPrice(parseFloat(item.price))} x {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        Tổng: {formatPrice(parseFloat(item.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tạm tính:</span>
                <span>{formatPrice(orderData.subtotal)}</span>
              </div>
              {orderData.discount > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>Giảm giá:</span>
                  <span>-{formatPrice(orderData.discount)}</span>
                </div>
              )}
              {orderData.promoCode && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Mã khuyến mãi ({orderData.promoCode}):</span>
                  <span>-{formatPrice(orderData.promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển:</span>
                <span>{formatPrice(orderData.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-900">Tổng cộng:</span>
                <span className="text-blue-600">{formatPrice(orderData.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/products">
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Tiếp tục mua sắm
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-lg font-medium transition-all duration-300"
            onClick={() => alert("Chức năng xem chi tiết đơn hàng đang được phát triển.")}
          >
            Xem chi tiết đơn hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
