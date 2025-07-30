import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { featuredProducts } from "@/data/featuredProducts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { reviewsListData } from "@/data/ReviewListData";


// Sample reviews
const reviewsList = reviewsListData;

// Function to randomly select 3 reviews
const getRandomReviews = () => {
    const shuffled = [...reviewsList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
};

export function ProductDetailPage() {
    // Get product ID from URL params
    const { id } = useParams();
    const navigate = useNavigate();

    // Convert id to number and handle invalid cases
    const productId = id && !isNaN(parseInt(id, 10)) ? parseInt(id, 10) : null;

    // Find product by ID
    const product = productId ? featuredProducts.find((p) => p.id === productId) : null;

    // Fallback if product not found
    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
                <p className="text-gray-600">The product you are looking for does not exist.</p>
            </div>
        );
    }

    // State for quantity
    const [quantity, setQuantity] = useState(1);

    // Format price
    const price = parseFloat(product.price).toString().concat(".000đ");
    // Handle Add to Cart
    const handleAddToCart = () => {
        navigate(`/checkout?productId=${productId}&quantity=${quantity}`);
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
        price: product.price || "99.000",
        brand: product.brandName || "PRO CREAM",
        image: product.image || "/placeholder.svg",
        discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 1 : null,
        reviews: getRandomReviews(),
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
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
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Image and Basic Info */}
                    <div className="lg:w-1/2">
                        <Card className="rounded-xl shadow-lg">
                            <CardContent className="p-6">
                                <div className="relative mb-4 group">
                                    <img
                                        src={productDetails.image}
                                        alt={product.name}
                                        className="w-full h-96 object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {productDetails.discount && (
                                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                                            -{productDetails.discount}%
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-1/2 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <div className="flex items-center">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium ml-2">{productDetails.rating}</span>
                            <span className="text-sm text-gray-500 ml-2">({productDetails.reviewCount})</span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-semibold">Thương hiệu:</span> {productDetails.brand}</p>
                            <p><span className="font-semibold">Xuất xứ:</span> {productDetails.origin}</p>
                            <p><span className="font-semibold">Quy cách:</span> {productDetails.packaging}</p>
                        </div>
                        <div className="flex items-center">
                            <span className={`text-sm font-medium ${productDetails.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                {productDetails.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold text-blue-600 text-2xl">{price}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded-lg">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-none"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </Button>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center border-none"
                                />
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-none"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                                disabled={!productDetails.inStock}
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {productDetails.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                            <Button variant="outline" size="icon" className="hover:bg-blue-50">
                                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                            </Button>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{productDetails.shortDescription}</p>
                    </div>
                </div>

                {/* Detailed Description */}
                <Card className="mt-8 rounded-xl shadow-lg">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{productDetails.fullDescription}</p>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Công dụng của các thành phần chính</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-600 mb-6">
                            <li><strong>Ceramide:</strong> Tạo hàng rào ngăn chặn thẩm thấu, khóa độ ẩm, ngăn ngừa khô da và kích ứng.</li>
                            <li><strong>Dung dịch nano bạc:</strong> Kháng khuẩn vượt trội, thúc đẩy tái tạo da, tránh để lại sẹo.</li>
                            <li><strong>Panthenol:</strong> Làm mềm, làm dịu và chống kích ứng da, cải thiện độ ẩm và độ đàn hồi.</li>
                            <li><strong>Zinc:</strong> Giảm tiết dầu, hạn chế viêm nhiễm, hỗ trợ sản sinh collagen.</li>
                        </ul>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thành phần</h3>
                        <table className="w-full text-sm text-gray-600 mb-6 border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 font-semibold">Thành phần</th>
                                    <th className="text-left py-3 font-semibold">Hàm lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productDetails.composition.map((item, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="py-3">{item.name}</td>
                                        <td className="py-3">{item.amount || "Không xác định"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Công dụng</h3>
                        <p className="text-sm text-gray-600 mb-6">{productDetails.shortDescription}</p>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cách dùng</h3>
                        <p className="text-sm text-gray-600 mb-6">{productDetails.usage}</p>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Đối tượng sử dụng</h3>
                        <p className="text-sm text-gray-600 mb-6">{productDetails.targetUsers}</p>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tác dụng phụ</h3>
                        <p className="text-sm text-gray-600 mb-6">{productDetails.sideEffects}</p>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Bảo quản</h3>
                        <p className="text-sm text-gray-600 mb-6">{productDetails.storage}</p>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nhà sản xuất</h3>
                        <p className="text-sm text-gray-600">{productDetails.manufacturer}</p>
                    </CardContent>
                </Card>

                {/* Customer Reviews */}
                <Card className="mt-8 rounded-xl shadow-lg">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Đánh giá sản phẩm</h2>
                        <div className="flex items-center mb-6">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium ml-2">{productDetails.rating}</span>
                            <span className="text-sm text-gray-500 ml-2">({productDetails.reviewCount})</span>
                        </div>
                        <div className="space-y-6">
                            {productDetails.reviews.map((review) => (
                                <div key={review.id} className="border-b pb-4">
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="ml-2 text-sm font-medium">{review.rating}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 italic mb-2">"{review.text}"</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500 font-medium">{review.author}</p>
                                        <p className="text-xs text-gray-400">{review.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* FAQs */}
                <Card className="mt-8 rounded-xl shadow-lg">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
                        <div className="space-y-6">
                            <div>
                                <p className="font-medium text-gray-900">Vì sao trẻ sơ sinh hay bị bệnh chàm sữa?</p>
                                <p className="text-sm text-gray-600 mt-1">Chàm sữa thường gặp ở trẻ sơ sinh do da bé còn non nớt, dễ bị kích ứng bởi các yếu tố như môi trường, thực phẩm, hoặc sản phẩm chăm sóc da không phù hợp.</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Bé bị chàm sữa, khô da có dùng được Procream không?</p>
                                <p className="text-sm text-gray-600 mt-1">Có, Procream phù hợp để làm dịu và dưỡng ẩm da cho bé bị chàm sữa hoặc khô da, an toàn cho trẻ từ 3 tháng tuổi trở lên.</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Thời gian thích hợp để bôi lại kem sau lần bôi trước là bao lâu?</p>
                                <p className="text-sm text-gray-600 mt-1">Nên bôi lại kem sau mỗi 6 giờ, 2-3 lần mỗi ngày.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <style>{`
                .container {
                    max-width: 1280px;
                }
                .group:hover img {
                    transform: scale(1.05);
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
                        height: 16rem;
                    }
                }
            `}</style>
        </div>
    );
}
