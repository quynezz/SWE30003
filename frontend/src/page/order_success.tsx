import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { featuredProducts } from "@/data/featuredProducts";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

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
        if (orderParam) {
            try {
                const parsedOrder = JSON.parse(decodeURIComponent(orderParam));
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

    // Format prices
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price * 1000).replace(/₫/, '').replace(/,/g, '.').trim().concat(' vn₫');
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
        <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
        </Link>
        </div>
        </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-6">
        <CheckCircle className="h-14 w-14 text-green-600 mx-auto mb-3" />
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        Order Placed Successfully!
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
        Thank you for your order. Your order has been recorded with ID{" "}
        <span className="font-semibold text-blue-600">{orderData.orderId}</span>.
            </p>
        </div>

        <Card className="max-w-3xl mx-auto bg-white shadow-md rounded-xl">
        <CardContent className="p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h2>
        <div className="space-y-3">
        {orderData.cart.length === 0 ? (
            <p className="text-sm text-gray-600 text-center">No products in the order.</p>
        ) : (
        orderData.cart.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 border-b py-3">
            <img
            src={item.image}
            alt={item.name}
            className="w-14 h-14 object-contain rounded-lg bg-gray-50"
            />
            <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-900">{item.name}</h3>
            <p className="text-xs text-gray-600">
            Unit Price: {formatPrice(parseFloat(item.price))} x {item.quantity}
            </p>
            <p className="text-xs font-medium text-gray-900">
            Total: {formatPrice(parseFloat(item.price) * item.quantity)}
            </p>
            </div>
            </div>
        ))
        )}
        </div>
        <div className="mt-5 border-t pt-3 space-y-2">
        <div className="flex justify-between text-xs">
        <span>Subtotal:</span>
        <span>{formatPrice(orderData.subtotal)}</span>
        </div>
        {orderData.discount > 0 && (
            <div className="flex justify-between text-xs text-red-600">
            <span>Discount:</span>
            <span>-{formatPrice(orderData.discount)}</span>
            </div>
        )}
        {orderData.promoCode && (
            <div className="flex justify-between text-xs text-green-600">
            <span>Promo Code ({orderData.promoCode}):</span>
            <span>-{formatPrice(orderData.promoDiscount)}</span>
            </div>
        )}
        <div className="flex justify-between text-xs">
        <span>Shipping Cost:</span>
        <span>{formatPrice(orderData.shippingCost)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold">
        <span className="text-gray-900">Total:</span>
        <span className="text-blue-600">{formatPrice(orderData.total)}</span>
        </div>
        </div>
        </CardContent>
        </Card>

        <div className="max-w-3xl mx-auto mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/products">
        <Button
        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
        Continue Shopping
        </Button>
        </Link>
        <Button
        variant="outline"
        className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 text-xs hover:bg-blue-50 py-2 rounded-lg font-medium transition-all duration-300"
        onClick={() => alert("Order details view is under development.")}
        >
        View Order Details
        </Button>
        </div>
        </div>
        </div>
    );
}
