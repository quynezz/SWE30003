import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ShoppingCart, Bookmark, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.jpg";
import pic4 from "@/assets/pic4.jpg";
import pic5 from "@/assets/pic5.jpg";
import pic6 from "@/assets/pic6.jpg";
import pic7 from "@/assets/pic7.jpg";

export function ArticlePage() {
    const { articleId } = useParams();
    const toast = useRef(null);
    const [savedArticles, setSavedArticles] = useState(() => {
        const saved = localStorage.getItem("savedArticles");
        return saved ? JSON.parse(saved) : [];
    });
    const [cartCount, setCartCount] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            const items = JSON.parse(savedCart);
            return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        }
        return 0;
    });

    const formatVND = (number) => {
        if (isNaN(number) || number === null) return "0 vnđ";
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " vnđ";
    };

    const articles = [
        {
            id: "1",
            title: "10 Loại Vitamin Thiết Yếu Cho Sức Khỏe Hàng Ngày",
            category: "Dinh Dưỡng",
            readTime: "5 phút đọc",
            image: pic4,
            gradient: "from-blue-500 to-cyan-500",
            excerpt: "Khám phá các vitamin quan trọng mà cơ thể bạn cần mỗi ngày để duy trì sức khỏe tối ưu.",
            content: [
                {
                    heading: "Giới Thiệu Về Vitamin",
                    text: "Vitamin là các hợp chất hữu cơ mà cơ thể cần với lượng nhỏ để hoạt động bình thường. Chúng đóng vai trò quan trọng trong quá trình trao đổi chất, miễn dịch và sức khỏe tổng thể. Bài viết này khám phá 10 loại vitamin thiết yếu bạn nên bổ sung vào thói quen hàng ngày."
                },
                {
                    heading: "Các Vitamin Quan Trọng",
                    text: "1. **Vitamin A**: Hỗ trợ thị lực và sức khỏe da. Có trong cà rốt, khoai lang và rau bina.\n2. **Vitamin C**: Tăng cường miễn dịch và phục hồi da. Có trong trái cây họ cam và ớt chuông.\n3. **Vitamin D**: Cải thiện sức khỏe xương và miễn dịch. Có từ ánh nắng mặt trời và sữa tăng cường.\n4. **Vitamin E**: Bảo vệ tế bào khỏi tổn thương. Có trong các loại hạt và hạt.\n5. **Vitamin K**: Cần thiết cho quá trình đông máu. Có trong rau xanh.\n6. **Vitamin nhóm B (B1, B2, B3, B5, B6, B7, B9, B12)**: Hỗ trợ sản xuất năng lượng và chức năng não. Có trong ngũ cốc nguyên hạt, trứng và thịt.\n7. **Vitamin B12**: Quan trọng cho chức năng thần kinh và sản xuất hồng cầu, đặc biệt với người ăn chay."
                },
                {
                    heading: "Cách Bổ Sung Vitamin",
                    text: "Chế độ ăn uống cân bằng là cách tốt nhất để bổ sung các vitamin này, nhưng thực phẩm bổ sung có thể giúp nếu lượng dinh dưỡng từ thức ăn không đủ. Hãy tham khảo ý kiến bác sĩ trước khi bắt đầu sử dụng bất kỳ thực phẩm bổ sung nào."
                }
            ]
        },
        {
            id: "2",
            title: "Quản Lý Tiểu Đường: Hướng Dẫn Toàn Diện",
            category: "Quản Lý Sức Khỏe",
            readTime: "8 phút đọc",
            image: pic5,
            gradient: "from-green-500 to-emerald-500",
            excerpt: "Tìm hiểu các chiến lược hiệu quả để quản lý tiểu đường thông qua thuốc, chế độ ăn và thay đổi lối sống.",
            content: [
                {
                    heading: "Hiểu Biết Về Tiểu Đường",
                    text: "Tiểu đường là một tình trạng mãn tính nơi cơ thể không thể điều chỉnh lượng đường trong máu đúng cách. Tiểu đường loại 1 là tự miễn, trong khi loại 2 thường liên quan đến lối sống. Quản lý hiệu quả có thể cải thiện chất lượng cuộc sống."
                },
                {
                    heading: "Chế Độ Ăn Uống",
                    text: "Tập trung vào thực phẩm có chỉ số đường huyết thấp như ngũ cốc nguyên hạt, rau củ và protein nạc. Tránh đồ uống có đường và carbohydrate tinh chế. Theo dõi khẩu phần ăn và duy trì lịch ăn uống đều đặn."
                },
                {
                    heading: "Thay Đổi Lối Sống",
                    text: "Tập thể dục thường xuyên, như đi bộ 30 phút mỗi ngày, cải thiện độ nhạy insulin. Các kỹ thuật quản lý căng thẳng như yoga và thiền cũng có thể giúp ích. Kiểm tra sức khỏe định kỳ với bác sĩ là rất quan trọng."
                }
            ]
        },
        {
            id: "3",
            title: "Sức Khỏe Tim Mạch: Mẹo Phòng Ngừa",
            category: "Tim Mạch",
            readTime: "6 phút đọc",
            image: pic6,
            gradient: "from-red-500 to-orange-500",
            excerpt: "Những cách đơn giản nhưng hiệu quả để duy trì trái tim khỏe mạnh và ngăn ngừa bệnh tim mạch.",
            content: [
                {
                    heading: "Tại Sao Sức Khỏe Tim Mạch Quan Trọng",
                    text: "Bệnh tim mạch là nguyên nhân hàng đầu gây tử vong trên toàn cầu. Các biện pháp phòng ngừa có thể giảm đáng kể nguy cơ và cải thiện chức năng tim."
                },
                {
                    heading: "Chiến Lược Phòng Ngừa",
                    text: "1. **Chế Độ Ăn Uống Lành Mạnh**: Ăn các thực phẩm tốt cho tim như cá béo, các loại hạt và ngũ cốc nguyên hạt. Hạn chế chất béo bão hòa và muối.\n2. **Tập Thể Dục**: Đặt mục tiêu ít nhất 150 phút hoạt động aerobic vừa phải mỗi tuần.\n3. **Bỏ Thuốc Lá**: Hút thuốc làm tổn thương mạch máu và tăng nguy cơ bệnh tim.\n4. **Kiểm Tra Định Kỳ**: Theo dõi cholesterol và huyết áp thường xuyên."
                },
                {
                    heading: "Thực Phẩm Bổ Sung Cho Tim",
                    text: "Axit béo Omega-3 và CoQ10 có thể hỗ trợ sức khỏe tim mạch. Luôn tham khảo ý kiến chuyên gia y tế trước khi bổ sung thực phẩm bổ sung."
                }
            ]
        },
        {
            id: "3",
            title: "Tăng Cường Hệ Miễn Dịch Tự Nhiên",
            category: "Miễn Dịch",
            readTime: "4 phút đọc",
            image: pic7,
            gradient: "from-purple-500 to-indigo-500",
            excerpt: "Các phương pháp tự nhiên và thực phẩm bổ sung để tăng cường hệ miễn dịch quanh năm.",
            content: [
                {
                    heading: "Tầm Quan Trọng Của Miễn Dịch",
                    text: "Hệ miễn dịch mạnh giúp cơ thể chống lại nhiễm trùng và duy trì sức khỏe. Các phương pháp tự nhiên có thể tăng cường khả năng phòng vệ của cơ thể."
                },
                {
                    heading: "Cách Tăng Cường Tự Nhiên",
                    text: "1. **Dinh Dưỡng**: Ăn thực phẩm giàu Vitamin C (trái cây họ cam), Vitamin D (cá), và kẽm (các loại hạt).\n2. **Giấc Ngủ**: Đặt mục tiêu ngủ 7-8 giờ chất lượng mỗi đêm.\n3. **Hydrat Hóa**: Uống đủ nước để hỗ trợ các chức năng cơ thể.\n4. **Tập Thể Dục**: Hoạt động thể chất vừa phải tăng cường phản ứng miễn dịch."
                },
                {
                    heading: "Thực Phẩm Bổ Sung",
                    text: "Xem xét sử dụng probiotics và thực phẩm bổ sung từ quả cơm cháy để hỗ trợ miễn dịch. Tham khảo ý kiến bác sĩ để đảm bảo an toàn."
                }
            ]
        }
    ];

    const article = articles.find((a) => a.id === articleId) || articles[0];

    const toggleSaveArticle = (id) => {
        setSavedArticles((prev) => {
            const newSaved = prev.includes(id)
                ? prev.filter((articleId) => articleId !== id)
                : [...prev, id];
            localStorage.setItem("savedArticles", JSON.stringify(newSaved));
            toast.current?.show({
                severity: newSaved.includes(id) ? 'success' : 'info',
                summary: newSaved.includes(id) ? 'Đã Lưu' : 'Đã Bỏ Lưu',
                detail: newSaved.includes(id) ? 'Bài viết đã được lưu thành công' : 'Bài viết đã được xóa khỏi danh sách lưu',
                life: 2000,
            });
            return newSaved;
        });
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50/30">
            <Toast ref={toast} />
            <div className="w-full mx-auto flex flex-col">
                <header className="bg-white/95 backdrop-blur-lg shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center overflow-hidden">
                                    <img
                                        src={logo}
                                        alt="Long Châu Logo"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    Long Châu
                                </span>
                            </Link>
                        </div>
                        <div className="relative">
                            <Link to="/cart">
                                <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-blue-50">
                                    <ShoppingCart className="h-5 w-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium">
                                            {cartCount}
                                        </span>
                                    )}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-100">
                        <CardContent className="p-4 sm:p-6 lg:p-8">
                            <div className="mb-6">
                                <Link to="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm mb-4">
                                    <ArrowLeft className="h-4 w-4 mr-1" />
                                    Quay lại Mẹo Sức Khỏe
                                </Link>
                                <div className="relative">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg mb-4"
                                    />
                                    <Badge className={cn("absolute top-3 left-3 bg-gradient-to-r", article.gradient, "text-white font-semibold")}>
                                        {article.category}
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                                        onClick={() => toggleSaveArticle(article.id)}
                                        aria-label={savedArticles.includes(article.id) ? "Bỏ lưu bài viết" : "Lưu bài viết"}
                                    >
                                        <Bookmark
                                            className={cn(
                                                "h-4 w-4",
                                                savedArticles.includes(article.id) ? "text-blue-600 fill-blue-600" : "text-gray-600"
                                            )}
                                        />
                                    </Button>
                                </div>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{article.title}</h1>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{article.readTime}</span>
                                    <span>{new Date().toLocaleDateString('vi-VN')}</span>
                                </div>
                            </div>

                            <div className="prose prose-sm sm:prose max-w-none">
                                <p className="text-gray-600 mb-6 text-sm sm:text-base">{article.excerpt}</p>
                                {article.content.map((section, index) => (
                                    <div key={index} className="mb-6">
                                        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">{section.heading}</h2>
                                        <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base">{section.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                                <Link to="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                                    <Button
                                        variant="outline"
                                        className="text-blue-600 hover:bg-blue-50 text-xs sm:text-sm h-8 sm:h-9"
                                        aria-label="Khám phá thêm bài viết sức khỏe"
                                    >
                                        Khám Phá Thêm Bài Viết
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn("text-xs sm:text-sm bg-gradient-to-r", article.gradient, "bg-clip-text text-transparent hover:underline")}
                                    onClick={() => toggleSaveArticle(article.id)}
                                    aria-label={savedArticles.includes(article.id) ? "Bỏ lưu bài viết" : "Lưu bài viết"}
                                >
                                    {savedArticles.includes(article.id) ? "Bỏ Lưu Bài Viết" : "Lưu Bài Viết"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <style>{`
                .prose {
                    color: #1f2937;
                    line-height: 1.75;
                }
                .prose h2 {
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                }
                .prose p {
                    margin-bottom: 1em;
                }
                @media (max-width: 640px) {
                    .max-w-3xl {
                        max-width: 100%;
                    }
                    .p-4 {
                        padding: 1rem;
                    }
                    .text-2xl {
                        font-size: 1.25rem;
                    }
                    .text-lg {
                        font-size: 1rem;
                    }
                    .text-sm {
                        font-size: 0.875rem;
                    }
                    .text-xs {
                        font-size: 0.75rem;
                    }
                    .h-8 {
                        height: 2rem;
                    }
                    .h-48 {
                        height: 10rem;
                    }
                }
                @media (min-width: 640px) and (max-width: 1024px) {
                    .h-56 {
                        height: 12rem;
                    }
                }
            `}</style>
        </div>
    );
}
