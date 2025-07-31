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
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const hasProcessedQuery = useRef(false);

  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
    return 0;
  });

  useEffect(() => {
    if (hasProcessedQuery.current) return;

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
            newCart = prev.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
            );
          } else {
            newCart = [...prev, { ...product, quantity }];
          }
          localStorage.setItem("cartItems", JSON.stringify(newCart));
          setCartCount(newCart.reduce((sum, item) => sum + (item.quantity || 1), 0));
          return newCart;
        });
        hasProcessedQuery.current = true;
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location.search, navigate]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartCount(cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0));
  }, [cartItems]);

  const filteredCartItems = cartItems.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const subtotal = filteredCartItems.reduce((sum, item) => sum + parseFloat(item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/(\.\d{2})$/, ",$1")) * item.quantity, 0);
  const shippingCost = filteredCartItems.length > 0 ? 30 : 0;
  const total = subtotal + shippingCost;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price * 1000).replace(/₫/, '').replace(/,/g, '.').trim().concat(' vn₫');
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const cartData = cartItems.map((item) => ({ productId: item.id, quantity: item.quantity }));
    navigate(`/checkout?cart=${encodeURIComponent(JSON.stringify(cartData))}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Long Chau Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Long Chau
              </span>
            </Link>
          </div>
          <div className="relative">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="hover:bg-blue-50 cursor-pointer">
                <ShoppingCart className="h-5 w-5 cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 cursor-pointer text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-5 flex justify-center">
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium">
                1
              </div>
              <span className="text-xs font-medium text-blue-600">Cart</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xs font-medium">
                2
              </div>
              <span className="text-xs font-medium text-gray-400">Checkout</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xs font-medium">
                3
              </div>
              <span className="text-xs font-medium text-gray-400">Complete</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-5">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Cart
            </span>
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Review the products in your cart and proceed to checkout
          </p>
        </div>

        <div className="max-w-md mx-auto mb-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products in cart"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg w-full shadow-sm text-xs"
            />
          </div>
        </div>

        {filteredCartItems.length === 0 ? (
          <div className="py-10 text-center">
            <Card className="max-w-md mx-auto bg-white shadow-md rounded-xl">
              <CardContent className="p-5">
                <ShoppingCart className="h-14 w-14 text-gray-400 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {searchQuery ? "No Products Found" : "Cart is Empty"}
                </h3>
                <p className="text-xs text-gray-600 mb-5">
                  {searchQuery
                    ? "Try searching with a different keyword"
                    : "Add products to your cart to continue"
                  }
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2 rounded-lg font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Continue Shopping
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Products ({cartCount})</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCartItems([])}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-300 text-xs"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-4">
                {filteredCartItems.map((item, index) => (
                  <Card key={item.id} className="hover:shadow-lg transition-all duration-300 rounded-xl">
                    <CardContent className="p-3 sm:p-5 flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-contain rounded-lg bg-gray-50"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-600 mb-1">
                          {formatPrice(parseFloat(item.price))} / unit
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="h-6 w-6 p-0 hover:bg-gray-200 rounded"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-7 text-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-6 w-6 p-0 hover:bg-gray-200 rounded"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-sm text-gray-900">
                            {formatPrice(parseFloat(item.price) * item.quantity)}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-white shadow-md rounded-xl">
                  <CardContent className="p-4 sm:p-5">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Order Summary
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Shipping Cost:</span>
                        <span className="font-medium">
                          {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                        <span className="text-gray-900">Total:</span>
                        <span className="text-blue-600">{formatPrice(total)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-2 rounded-lg font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={handleCheckout}
                        disabled={filteredCartItems.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                      <Link
                        to="/products"
                        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-medium text-xs text-center transition-all duration-300 block"
                      >
                        Continue Shopping
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
