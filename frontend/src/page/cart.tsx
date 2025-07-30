import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingCart, Plus, Minus, Search, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { featuredProducts } from "@/data/featuredProducts";
import logo from "@/assets/logo.jpg";

export function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const hasProcessedQuery = useRef(false); // Track if query has been processed

  // Calculate total cart count (sum of quantities)
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
    return 0;
  });

  // Parse query parameters and update cart on initial load
  useEffect(() => {
    if (hasProcessedQuery.current) return; // Skip if already processed

    const query = new URLSearchParams(location.search);
    const productId = query.get("productId") && !isNaN(parseInt(query.get("productId"), 10)) ? parseInt(query.get("productId"), 10) : null;
    const quantity = query.get("quantity") && !isNaN(parseInt(query.get("quantity"), 10)) ? parseInt(query.get("quantity"), 10) : 1;

    if (productId) {
      const product = featuredProducts.find((p) => p.id === productId);
      if (product) {
        setCartItems((prev) => {
          const existingItem = prev.find((item) => item.id === productId);
          let newCart;
          if (existingItem) {
            // Update quantity if item exists
            newCart = prev.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
            );
          } else {
            // Add new item if it doesn't exist
            newCart = [...prev, { ...product, quantity }];
          }
          // Update localStorage
          localStorage.setItem("cartItems", JSON.stringify(newCart));
          // Update cart count
          setCartCount(newCart.reduce((sum, item) => sum + (item.quantity || 1), 0));
          return newCart;
        });
        hasProcessedQuery.current = true; // Mark query as processed
        // Clear query params after processing
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location.search, navigate]);

  // Persist cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // Update cart count whenever cartItems change
    setCartCount(cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0));
  }, [cartItems]);

  // Filter cart items based on search query
  const filteredCartItems = cartItems.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate totals
  const subtotal = filteredCartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shippingCost = filteredCartItems.length > 0 ? 30 : 0;
  const total = subtotal + shippingCost;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Handle quantity changes
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Handle item removal
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle checkout
  const handleCheckout = () => {
    const cartData = cartItems.map((item) => ({ productId: item.id, quantity: item.quantity }));
    navigate(`/checkout?cart=${encodeURIComponent(JSON.stringify(cartData))}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                        src={logo}
                        alt="Long Chau Logo"
                        className="h-full w-full object-cover"
                    />
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Long Chau
                </span>
            </Link>
          </div>
          <div className="relative">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="hover:bg-blue-50">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm font-medium text-blue-600">Giỏ hàng</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-gray-400">Thanh toán</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium text-gray-400">Hoàn tất</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Giỏ Hàng{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Của Bạn
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Xem lại các sản phẩm trong giỏ hàng và tiến hành thanh toán
          </p>
        </div>

        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Tìm sản phẩm trong giỏ"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg w-full shadow-sm"
            />
          </div>
        </div>

        {filteredCartItems.length === 0 ? (
          <div className="py-12 text-center">
            <Card className="max-w-md mx-auto bg-white shadow-lg rounded-xl">
              <CardContent className="p-6">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? "Không tìm thấy sản phẩm" : "Giỏ hàng trống"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? "Thử tìm kiếm với từ khóa khác"
                    : "Hãy thêm sản phẩm vào giỏ hàng để tiếp tục"
                  }
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Tiếp tục mua sắm
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Sản phẩm ({cartCount})</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCartItems([])}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-300"
                >
                  Xóa tất cả
                </Button>
              </div>

              <div className="space-y-4">
                {filteredCartItems.map((item, index) => (
                  <Card key={item.id} className="hover:shadow-md transition-all duration-300 rounded-xl">
                    <CardContent className="p-4 sm:p-6 flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">
                          {formatPrice(parseFloat(item.price))} / đơn vị
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="h-7 w-7 p-0 hover:bg-gray-200 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-7 w-7 p-0 hover:bg-gray-200 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">
                            {formatPrice(parseFloat(item.price) * item.quantity)}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-white shadow-lg rounded-xl">
                  <CardContent className="p-5 sm:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Tóm tắt đơn hàng
                    </h3>

                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tạm tính:</span>
                        <span className="font-medium">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Phí vận chuyển:</span>
                        <span className="font-medium">
                          {shippingCost === 0 ? 'Miễn phí' : formatPrice(shippingCost)}
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between text-base font-semibold">
                        <span className="text-gray-900">Tổng cộng:</span>
                        <span className="text-blue-600">{formatPrice(total)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-2.5 rounded-lg font-medium text-center transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={handleCheckout}
                        disabled={filteredCartItems.length === 0}
                      >
                        Tiến hành thanh toán
                      </Button>
                      <Link
                        to="/products"
                        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-lg font-medium text-center transition-all duration-300 block"
                      >
                        Tiếp tục mua sắm
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
