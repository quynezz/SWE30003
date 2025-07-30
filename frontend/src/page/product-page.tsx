import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, ShoppingCart, Heart, ChevronDown, ChevronUp, ArrowLeft, Search } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { featuredProducts } from "@/data/featuredProducts";
import { useState, useEffect } from "react";
import { reviewsListData } from "@/data/ReviewListData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";

// Sample reviews
const reviewsList = reviewsListData;

// Function to randomly select 3 reviews
const getRandomReviews = () => {
    const shuffled = [...reviewsList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
};

export function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            const items = JSON.parse(savedCart);
            return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        }
        return 0;
    });
    const [quantity, setQuantity] = useState(1);
    const [showReviews, setShowReviews] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);

    // Convert id to number and handle invalid cases
    const productId = id && !isNaN(parseInt(id, 10)) ? parseInt(id, 10) : null;
    const product = productId ? featuredProducts.find((p) => p.id === productId) : null;

    // Fallback if product not found
    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
            <p className="text-gray-600">The product you are looking for does not exist.</p>
                <Button
            variant="outline"
            className="mt-4 bg-blue-50 text-blue-600 hover:bg-blue-100"
            onClick={() => navigate("/products")}
            >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
            </Button>
            </div>
        );
    }

    // Handle Add to Cart
    const handleAddToCart = () => {
        const savedCart = localStorage.getItem("cartItems");
        let cartItems = savedCart ? JSON.parse(savedCart) : [];
        const existingItem = cartItems.find((item) => item.id === productId);
        if (existingItem) {
            cartItems = cartItems.map((item) =>
                                      item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
                                     );
        } else {
            cartItems.push({ ...product, quantity });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        setCartCount(cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0));
        navigate(`/cart?productId=${productId}&quantity=${quantity}`);
    };

    // Product details with random reviews
    const productDetails = {
        shortDescription: product.description,
        fullDescription:
            "Procream 30g là kem bôi hỗ trợ điều trị chàm sữa, hăm tã, kích ứng, bỏng,... rất được ưa chuộng. Với khả năng phục hồi và làm lành nhanh các tổn thương trên da, duy trì độ ẩm và hỗ trợ giảm tổn thương da hiệu quả, đây là một trong những gợi ý tốt nếu bạn đang quan tâm đến kem đặc trị các tổn thương da liên quan.",
        composition: [
            { name: "Purified water", amount: "" },
            { name: "Perfume", amount: "" },
            { name: "Chlorhexidine Gluconate", amount: "" },
            { name: "BHT", amount: "" },
            { name: "Benzalkonium Chloride", amount: "" },
            { name: "Polysorbate 60", amount: "" },
            { name: "Isohexadecane", amount: "" },
            { name: "Hydroethyl acrylate", amount: "" },
            { name: "Peg 400", amount: "" },
            { name: "EDTA", amount: "" },
            { name: "Ceteareth 20", amount: "" },
            { name: "Ceteraryl Alcohol", amount: "" },
            { name: "IPM", amount: "" },
            { name: "Vaselin", amount: "" },
            { name: "Almond oil", amount: "" },
            { name: "Lanolin", amount: "" },
            { name: "Zinc oxide", amount: "" },
            { name: "Panthenol", amount: "" },
            { name: "Silver Nano Solution", amount: "" },
            { name: "Vitamin E", amount: "" },
            { name: "Ceramide", amount: "" },
        ],
        usage: "Dùng 2 - 3 lần/ngày, cách nhau 6 giờ. Mỗi lần thoa một lớp mỏng lên vùng da cần sử dụng, để khô tự nhiên.",
        targetUsers: "Dùng cho người lớn và trẻ em từ 3 tháng tuổi trở lên.",
        sideEffects: "Chưa có báo cáo về tác dụng phụ của sản phẩm.",
        storage: "Nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.",
        manufacturer: "Thăng Long",
        origin: "Việt Nam",
        packaging: "Hộp x 30g",
        rating: product.rating || 4.7,
        reviewCount: product.reviewCount || "25 đánh giá",
        inStock: product.stock % 2 === 0,
        price: parseFloat(product.price).toString().concat(".000đ"),
        brand: product.brandName || "PRO CREAM",
        image: product.image || "/placeholder.svg",
        discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 1 : null,
        reviews: getRandomReviews(),
    };

    return (
        <motion.div
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
        {/* Header */}
        <header className="border-b bg-white sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
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
        <div className="flex items-center space-x-4">
        <div className="relative">
        </div>
        <Link to="/cart" className="relative">
        <Button variant="outline" size="icon" className="hover:bg-blue-50">
        <ShoppingCart className="h-4 w-4 text-gray-600" />
        {cartCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white h-5 w-5 flex items-center justify-center rounded-full animate-pulse">
            {cartCount}
            </Badge>
        )}
        </Button>
        </Link>
        </div>
        </div>
        </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
        className="flex flex-col lg:flex-row gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        {/* Product Image */}
        <div className="lg:w-1/2">
        <Card className="rounded-xl shadow-lg border border-gray-200 group">
        <CardContent className="p-6">
        <div className="relative mb-4">
        <img
        src={productDetails.image}
        alt={product.name}
        className="w-full h-80 lg:h-96 object-contain rounded-lg transition-transform duration-300"
        />
        {productDetails.discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium">
            -{productDetails.discount}%
            </Badge>
        )}
        </div>
        </CardContent>
        </Card>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 space-y-5">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">{product.name}</h1>
        <div className="flex items-center">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium ml-2 text-gray-700">{productDetails.rating}</span>
        <span className="text-sm text-gray-500 ml-2">({productDetails.reviewCount})</span>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
        <p><span className="font-semibold">Thương hiệu:</span> {productDetails.brand}</p>
        <p><span className="font-semibold">Xuất xứ:</span> {productDetails.origin}</p>
        <p><span className="font-semibold">Quy cách:</span> {productDetails.packaging}</p>
        </div>
        <div className="flex items-center">
        <span className={cn("text-sm font-medium", productDetails.inStock ? "text-green-600" : "text-red-600")}>
        {productDetails.inStock ? "Còn hàng" : "Hết hàng"}
        </span>
        </div>
        <div className="flex items-center">
        <span className="font-bold text-blue-600 text-2xl">{productDetails.price}</span>
        </div>
        <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-lg bg-white">
        <Button
        variant="outline"
        size="sm"
        className="border-none hover:bg-blue-50 text-gray-600 h-10 w-10"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        aria-label="Giảm số lượng"
        >
        -
            </Button>
        <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        className="w-16 text-center border-none focus:ring-0 text-sm h-10"
        aria-label="Số lượng sản phẩm"
        />
        <Button
        variant="outline"
        size="sm"
        className="border-none hover:bg-blue-50 text-gray-600 h-10 w-10"
        onClick={() => setQuantity(quantity + 1)}
        aria-label="Tăng số lượng"
        >
        +
            </Button>
        </div>
        <Button
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg h-10"
        disabled={!productDetails.inStock}
        onClick={handleAddToCart}
        aria-label={`Thêm ${product.name} vào giỏ hàng`}
        >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {productDetails.inStock ? "Thêm vào Giỏ Hàng" : "Hết Hàng"}
        </Button>
        <Button
        variant="outline"
        size="icon"
        className="hover:bg-blue-50 h-10 w-10"
        aria-label={`Thêm ${product.name} vào danh sách yêu thích`}
        >
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
        </Button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{productDetails.shortDescription}</p>
        </div>
        </motion.div>

        {/* Product Description */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        >
        <Card className="mt-6 rounded-xl shadow-lg border border-gray-200">
        <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Mô tả sản phẩm</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{productDetails.fullDescription}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Công dụng của các thành phần chính</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 mb-6">
        <li><strong>Ceramide:</strong> Tạo hàng rào ngăn chặn thẩm thấu, khóa độ ẩm, ngăn ngừa khô da và kích ứng.</li>
        <li><strong>Dung dịch nano bạc:</strong> Kháng khuẩn vượt trội, thúc đẩy tái tạo da, tránh để lại sẹo.</li>
        <li><strong>Panthenol:</strong> Làm mềm, làm dịu và chống kích ứng da, cải thiện độ ẩm và độ đàn hồi.</li>
        <li><strong>Zinc:</strong> Giảm tiết dầu, hạn chế viêm nhiễm, hỗ trợ sản sinh collagen.</li>
        </ul>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Thành phần</h3>
        <table className="w-full text-sm text-gray-600 mb-6 border-collapse">
        <thead>
        <tr className="border-b border-gray-200">
        <th className="text-left py-3 font-semibold text-gray-800">Thành phần</th>
        <th className="text-left py-3 font-semibold text-gray-800">Hàm lượng</th>
        </tr>
        </thead>
        <tbody>
        {productDetails.composition.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
            <td className="py-3">{item.name}</td>
            <td className="py-3">{item.amount || "Không xác định"}</td>
            </tr>
        ))}
        </tbody>
        </table>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Công dụng</h3>
        <p className="text-sm text-gray-600 mb-6">{productDetails.shortDescription}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Cách dùng</h3>
        <p className="text-sm text-gray-600 mb-6">{productDetails.usage}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Đối tượng sử dụng</h3>
        <p className="text-sm text-gray-600 mb-6">{productDetails.targetUsers}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Tác dụng phụ</h3>
        <p className="text-sm text-gray-600 mb-6">{productDetails.sideEffects}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Bảo quản</h3>
        <p className="text-sm text-gray-600 mb-6">{productDetails.storage}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Nhà sản xuất</h3>
        <p className="text-sm text-gray-600">{productDetails.manufacturer}</p>
        </CardContent>
        </Card>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        >
        <Card className="mt-6 rounded-xl shadow-lg border border-gray-200">
        <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Đánh giá sản phẩm</h2>
        <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowReviews(!showReviews)}
        className="text-blue-600 hover:text-blue-700"
        aria-expanded={showReviews}
        aria-controls="reviews-section"
        >
        {showReviews ? "Ẩn đánh giá" : "Xem đánh giá"}
        {showReviews ? (
            <ChevronUp className="h-4 w-4 ml-2" />
        ) : (
        <ChevronDown className="h-4 w-4 ml-2" />
        )}
        </Button>
        </div>
        <AnimatePresence>
        {showReviews && (
            <motion.div
            id="reviews-section"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
            >
            <div className="flex items-center mb-6">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-2 text-gray-700">{productDetails.rating}</span>
            <span className="text-sm text-gray-500 ml-2">({productDetails.reviewCount})</span>
            </div>
            <div className="space-y-6">
            {productDetails.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4">
                <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">{review.rating}</span>
                </div>
                <p className="text-sm text-gray-600 italic mb-2">"{review.text}"</p>
                <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 font-medium">{review.author}</p>
                <p className="text-xs text-gray-400">{review.date}</p>
                </div>
                </div>
            ))}
            </div>
            </motion.div>
        )}
        </AnimatePresence>
        </CardContent>
        </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        >
        <Card className="mt-6 rounded-xl shadow-lg border border-gray-200">
        <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Câu hỏi thường gặp</h2>
        <div className="space-y-4">
        {[
            {
                question: "Vì sao trẻ sơ sinh hay bị bệnh chàm sữa?",
                answer: "Chàm sữa thường gặp ở trẻ sơ sinh do da bé còn non nớt, dễ bị kích ứng bởi các yếu tố như môi trường, thực phẩm, hoặc sản phẩm chăm sóc da không phù hợp.",
            },
            {
                question: "Bé bị chàm sữa, khô da có dùng được Procream không?",
                answer: "Có, Procream phù hợp để làm dịu và dưỡng ẩm da cho bé bị chàm sữa hoặc khô da, an toàn cho trẻ từ 3 tháng tuổi trở lên.",
            },
            {
                question: "Thời gian thích hợp để bôi lại kem sau lần bôi trước là bao lâu?",
                answer: "Nên bôi lại kem sau mỗi 6 giờ, 2-3 lần mỗi ngày.",
            },
        ].map((faq, index) => (
            <div key={index} className="border-b border-gray-100">
            <Button
            variant="ghost"
            className="w-full flex justify-between items-center text-left text-gray-800 font-medium py-3 hover:bg-blue-50"
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            aria-expanded={openFAQ === index}
            aria-controls={`faq-${index}`}
            >
            <span>{faq.question}</span>
            {openFAQ === index ? (
                <ChevronUp className="h-4 w-4 text-gray-600" />
            ) : (
            <ChevronDown className="h-4 w-4 text-gray-600" />
            )}
            </Button>
            <AnimatePresence>
            {openFAQ === index && (
                <motion.div
                id={`faq-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
                >
                <p className="text-sm text-gray-600 py-3">{faq.answer}</p>
                </motion.div>
            )}
            </AnimatePresence>
            </div>
        ))}
        </div>
        </CardContent>
        </Card>
        </motion.div>
        </div>

        <style>{`
            .container {
                max-width: 1280px;
            }
            .group:hover img {
                transform: scale(1.05);
            }
            .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.7;
                }
            }
            @media (max-width: 640px) {
                .container {
                    padding-left: 1rem;
                    padding-right: 1rem;
                }
                h1 {
                    font-size: 1.75rem;
                }
                img {
                    height: 20rem;
                }
            }
            `}</style>
            </motion.div>
    );
}
