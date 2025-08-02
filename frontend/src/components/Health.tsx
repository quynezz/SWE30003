import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import pic4 from "@/assets/pic4.jpg";
import pic5 from "@/assets/pic5.jpg";
import pic6 from "@/assets/pic6.jpg";
import pic7 from "@/assets/pic7.jpg";
import { Link } from "react-router-dom";

export function Health() {
    const [isVisible, setIsVisible] = useState(false);
    const [savedArticles, setSavedArticles] = useState(() => {
        const saved = localStorage.getItem("savedArticles");
        return saved ? JSON.parse(saved) : [];
    });
    const sectionRef = useRef(null);

    const healthTips = [
        {
            id: 1,
            title: "10 Loại Vitamin Thiết Yếu Cho Sức Khỏe Hàng Ngày",
            category: "Dinh Dưỡng",
            readTime: "5 phút đọc",
            image: pic4,
            excerpt: "Khám phá các vitamin quan trọng mà cơ thể bạn cần mỗi ngày để duy trì sức khỏe tối ưu.",
            gradient: "from-blue-500 to-cyan-500",
            link: "/articles/vitamins",
        },
        {
            id: 2,
            title: "Quản Lý Tiểu Đường: Hướng Dẫn Toàn Diện",
            category: "Quản Lý Sức Khỏe",
            readTime: "8 phút đọc",
            image: pic5,
            excerpt: "Tìm hiểu các chiến lược hiệu quả để quản lý tiểu đường thông qua thuốc, chế độ ăn và thay đổi lối sống.",
            gradient: "from-green-500 to-emerald-500",
            link: "/articles/diabetes",
        },
        {
            id: 3,
            title: "Sức Khỏe Tim Mạch: Mẹo Phòng Ngừa",
            category: "Tim Mạch",
            readTime: "6 phút đọc",
            image: pic6,
            excerpt: "Những cách đơn giản nhưng hiệu quả để duy trì trái tim khỏe mạnh và ngăn ngừa bệnh tim mạch.",
            gradient: "from-red-500 to-orange-500",
            link: "/articles/heart-health",
        },
        {
            id: 4,
            title: "Tăng Cường Hệ Miễn Dịch Tự Nhiên",
            category: "Miễn Dịch",
            readTime: "4 phút đọc",
            image: pic7,
            excerpt: "Các phương pháp tự nhiên và thực phẩm bổ sung để tăng cường hệ miễn dịch quanh năm.",
            gradient: "from-purple-500 to-indigo-500",
            link: "/articles/immunity",
        },
    ];

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

    const toggleSaveArticle = (id) => {
        setSavedArticles((prev) => {
            const newSaved = prev.includes(id)
                ? prev.filter((articleId) => articleId !== id)
                : [...prev, id];
            localStorage.setItem("savedArticles", JSON.stringify(newSaved));
            return newSaved;
        });
    };

    return (
        <section
            className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
            ref={sectionRef}
        >
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 30%, #3b82f6 2px, transparent 2px),
                        radial-gradient(circle at 80% 70%, #06b6d4 2px, transparent 2px)`,
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`text-center mb-12 sm:mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Mẹo Sức Khỏe &{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Bài Viết
                        </span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                        Cập nhật những thông tin mới nhất về sức khỏe và mẹo chăm sóc bản thân
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {healthTips.map((tip, index) => (
                        <Card
                            key={tip.id}
                            className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${tip.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                            ></div>

                            <div className="relative">
                                <img
                                    src={tip.image}
                                    alt={tip.title}
                                    className="w-full h-40 sm:h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                                />
                                <Badge
                                    className={`absolute top-3 left-3 bg-gradient-to-r ${tip.gradient} text-white font-semibold text-xs sm:text-sm`}
                                >
                                    {tip.category}
                                </Badge>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                                    onClick={() => toggleSaveArticle(tip.id)}
                                    aria-label={savedArticles.includes(tip.id) ? "Bỏ lưu bài viết" : "Lưu bài viết"}
                                >
                                    <Bookmark
                                        className={`h-4 w-4 ${
                                            savedArticles.includes(tip.id)
                                                ? "text-blue-600 fill-blue-600"
                                                : "text-gray-600"
                                        } group-hover:text-blue-500 transition-colors`}
                                    />
                                </Button>
                            </div>

                            <CardContent className="p-4 sm:p-6 relative z-10">
                                <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-800">
                                    {tip.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-3">
                                    {tip.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                                    <span>{tip.readTime}</span>
                                    <Link to={tip.link}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`p-0 h-auto text-blue-600 hover:text-blue-700 bg-gradient-to-r ${tip.gradient} bg-clip-text text-transparent group-hover:underline text-xs sm:text-sm`}
                                            aria-label={`Đọc thêm về ${tip.title}`}
                                        >
                                            Đọc Thêm
                                            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                                <div
                                    className={`absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 h-1 bg-gradient-to-r ${tip.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                                ></div>
                            </CardContent>

                            <div
                                className={`absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                            ></div>
                            <div
                                className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${tip.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                            ></div>
                        </Card>
                    ))}
                </div>
            </div>

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
                    max-width: 1200px;
                }

                @media (max-width: 640px) {
                    .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    .py-12 {
                        padding-top: 2rem;
                        padding-bottom: 2rem;
                    }
                    .text-3xl {
                        font-size: 1.875rem;
                    }
                    .text-base {
                        font-size: 0.875rem;
                    }
                    .h-40 {
                        height: 10rem;
                    }
                }
            `}</style>
        </section>
    );
}
