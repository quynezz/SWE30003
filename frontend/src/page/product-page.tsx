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
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-xl font-bold text-red-600">Product Not Found</h1>
                <p className="text-sm text-gray-600">The product you are looking for does not exist.</p>
                <Button
                    variant="outline"
                    className="mt-3 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs"
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
            "Procream 30g is a topical cream that supports the treatment of baby eczema, diaper rash, irritation, burns, and more. It is highly favored for its ability to quickly heal and restore damaged skin, maintain moisture, and effectively reduce skin damage. This is an excellent option if you're looking for a specialized cream for skin-related issues.",
        composition: [
            { name: "Purified water", amount: Math.random() > 0.5 ? "30%" : "25%" },
            { name: "Perfume", amount: Math.random() > 0.5 ? "1%" : "0.5%" },
            { name: "Chlorhexidine Gluconate", amount: Math.random() > 0.5 ? "0.1%" : "0.05%" },
            { name: "Cetrimonium Chloride", amount: Math.random() > 0.5 ? "0.1%" : "0.05%" },
            { name: "Sodium Hydroxide", amount: Math.random() > 0.5 ? "0.1%" : "0.05%" },
            { name: "Glycerin", amount: Math.random() > 0.5 ? "2%" : "1%" },
            { name: "Zinc Oxide", amount: Math.random() > 0.5 ? "10%" : "5%" },
            { name: "Panthenol", amount: Math.random() > 0.5 ? "2%" : "1%" },
            { name: "Ceramide", amount: Math.random() > 0.5 ? "1%" : "0.5%" },
            { name: "Silver Nano Solution", amount: Math.random() > 0.5 ? "0.1%" : "0.05%" },
            ],
        usage: "Apply 2-3 times daily, 6 hours apart. Apply a thin layer to the affected skin area and let it dry naturally.",
        targetUsers: "Suitable for adults and children from 3 months of age and older.",
        sideEffects: "No reported side effects of the product.",
        storage: "Store in a cool, dry place, away from direct sunlight.",
        manufacturer: "Thang Long",
        origin: "Vietnam",
        packaging: "Box x 30g",
        rating: product.rating || 4.7,
        reviewCount: product.reviewCount || "25 reviews",
        inStock: product.stock % 2 === 0,
        price: product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/(\.\d{2})$/, ",$1").concat(" vnđ"),
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
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
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
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10 w-56 sm:w-72 border-none focus:ring-2 focus:ring-blue-500 rounded-full text-xs"
                                    aria-label="Search products"
                                />
                            </div>
                            <Link to="/cart" className="relative">
                                <Button variant="outline" size="icon" className="hover:bg-blue-50">
                                    <ShoppingCart className="h-4 w-4 text-gray-600" />
                                    {cartCount > 0 && (
                                        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white h-4 w-4 flex items-center justify-center rounded-full animate-pulse text-[10px]">
                                            {cartCount}
                                        </Badge>
                                    )}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <motion.div
                    className="flex flex-col lg:flex-row gap-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Product Image */}
                    <div className="lg:w-1/2">
                        <Card className="rounded-xl shadow-md border border-gray-200 group">
                            <CardContent className="p-5">
                                <div className="relative mb-3">
                                    <img
                                        src={productDetails.image}
                                        alt={product.name}
                                        className="w-full h-72 lg:h-80 object-contain rounded-lg transition-transform duration-300"
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
                    <div className="lg:w-1/2 space-y-4">
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">{product.name}</h1>
                        <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium ml-1 text-gray-700">{productDetails.rating}</span>
                            <span className="text-xs text-gray-500 ml-2">({productDetails.reviewCount})</span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                            <p><span className="font-semibold">Brand:</span> {productDetails.brand}</p>
                            <p><span className="font-semibold">Origin:</span> {productDetails.origin}</p>
                            <p><span className="font-semibold">Packaging:</span> {productDetails.packaging}</p>
                        </div>
                        <div className="flex items-center">
                            <span className={cn("text-xs font-medium", productDetails.inStock ? "text-green-600" : "text-red-600")}>
                                {productDetails.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold text-blue-600 text-lg">{productDetails.price}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center border rounded-lg bg-white">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-none hover:bg-blue-50 text-gray-600 h-9 w-9"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </Button>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-14 text-center border-none focus:ring-0 text-xs h-9"
                                    aria-label="Product quantity"
                                />
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-none hover:bg-blue-50 text-gray-600 h-9 w-9"
                                    onClick={() => setQuantity(quantity + 1)}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg h-9"
                                disabled={!productDetails.inStock}
                                onClick={handleAddToCart}
                                aria-label={`Add ${product.name} to cart`}
                            >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                {productDetails.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="hover:bg-blue-50 h-9 w-9"
                                aria-label={`Add ${product.name} to wishlist`}
                            >
                                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                            </Button>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{productDetails.shortDescription}</p>
                    </div>
                </motion.div>

                {/* Product Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="mt-5 rounded-xl shadow-md border border-gray-200">
                        <CardContent className="p-5">
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Product Description</h2>
                            <p className="text-xs text-gray-600 mb-5 leading-relaxed">{productDetails.fullDescription}</p>
                            <h3 className="text-base font-semibold text-gray-800 mb-2">Key Ingredients' Benefits</h3>
                            <ul className="list-disc pl-4 text-xs text-gray-600 mb-5">
                                <li><strong>Ceramide:</strong> Creates a barrier to prevent moisture loss, protecting against dryness and irritation.</li>
                                <li><strong>Silver Nano Solution:</strong> Provides superior antibacterial properties, promotes skin regeneration, and prevents scarring.</li>
                                <li><strong>Panthenol:</strong> Softens, soothes, and reduces skin irritation, improving moisture and elasticity.</li>
                                <li><strong>Zinc:</strong> Reduces oil production, limits inflammation, and supports collagen formation.</li>
                            </ul>
                            <h3 className="text-base font-semibold text-gray-800 mb-2">Ingredients</h3>
                            <table className="w-full text-xs text-gray-600 mb-5 border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-2 font-semibold text-gray-800">Ingredient</th>
                                        <th className="text-left py-2 font-semibold text-gray-800">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productDetails.composition.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                                            <td className="py-2">{item.name}</td>
                                            <td className="py-2">{item.amount || "Not specified"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h3 className="text-base font-semibold text-gray-800 mb-2">Benefits</h3>
                            <p className="text-xs text-gray-600 mb-5">{productDetails.shortDescription}</p>
                            <h3 className="text-base font-semibold text-gray-800 mb-2">How to Use</h3>
                            <p className="text-xs text-gray-600 mb-5">{productDetails.usage}</p>
                            <h3 className="text-base font-semibold text-gray-800 mb-2">Target Users</h3>
                            <p className="text-xs text-gray-600 mb-5">{productDetails.targetUsers}</p>
                            <h3 className="text-base font-semibold text-gray-800 mb-2">Side Effects</h3>
                            <p className="text-xs text-gray-600 mb-5">{productDetails.sideEffects}</p>
                            <h3 className="text-base font-semibold text-gray-800 mb-2">Storage</h3>
                            <p className="text-xs text-gray-600 mb-5">{productDetails.storage}</p>
                            <h3 className="text-base font-semibold text-gray-800 mb-2">Manufacturer</h3>
                            <p className="text-xs text-gray-600">{productDetails.manufacturer}</p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Reviews Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="mt-5 rounded-xl shadow-md border border-gray-200">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-bold text-gray-800">Product Reviews</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowReviews(!showReviews)}
                                    className="text-blue-600 hover:text-blue-700 text-xs"
                                    aria-expanded={showReviews}
                                    aria-controls="reviews-section"
                                >
                                    {showReviews ? "Hide Reviews" : "Show Reviews"}
                                    {showReviews ? (
                                        <ChevronUp className="h-3 w-3 ml-1" />
                                    ) : (
                                        <ChevronDown className="h-3 w-3 ml-1" />
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
                                        <div className="flex items-center mb-5">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs font-medium ml-1 text-gray-700">{productDetails.rating}</span>
                                            <span className="text-xs text-gray-500 ml-2">({productDetails.reviewCount})</span>
                                        </div>
                                        <div className="space-y-5">
                                            {productDetails.reviews.map((review) => (
                                                <div key={review.id} className="border-b border-gray-100 pb-3">
                                                    <div className="flex items-center mb-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3 w-3 ${i < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                        <span className="ml-2 text-xs font-medium text-gray-700">{review.rating}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-600 italic mb-2">"{review.text}"</p>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs text-gray-600 font-medium">{review.author}</p>
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
                    <Card className="mt-5 rounded-xl shadow-md border border-gray-200">
                        <CardContent className="p-5">
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Frequently Asked Questions</h2>
                            <div className="space-y-3">
                                {[
                                    {
                                        question: "Why do infants often get eczema?",
                                        answer: "Infant eczema is common due to their delicate skin, which is easily irritated by environmental factors, food, or unsuitable skincare products.",
                                    },
                                    {
                                        question: "Can Procream be used for infant eczema or dry skin?",
                                        answer: "Yes, Procream is suitable for soothing and moisturizing skin for infants with eczema or dry skin, safe for children from 3 months of age and older.",
                                    },
                                    {
                                        question: "How long should I wait before reapplying the cream?",
                                        answer: "Reapply the cream every 6 hours, 2-3 times daily.",
                                    },
                                ].map((faq, index) => (
                                    <div key={index} className="border-b border-gray-100">
                                        <Button
                                            variant="ghost"
                                            className="w-full flex justify-between items-center text-left text-gray-800 font-medium py-2 text-sm hover:bg-blue-50"
                                            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                            aria-expanded={openFAQ === index}
                                            aria-controls={`faq-${index}`}
                                        >
                                            <span>{faq.question}</span>
                                            {openFAQ === index ? (
                                                <ChevronUp className="h-3 w-3 text-gray-600" />
                                            ) : (
                                                <ChevronDown className="h-3 w-3 text-gray-600" />
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
                                                    <p className="text-xs text-gray-600 py-2">{faq.answer}</p>
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
                        font-size: 1.25rem;
                    }
                    img {
                        height: 16rem;
                    }
                }
            `}</style>
        </motion.div>
    );
}
