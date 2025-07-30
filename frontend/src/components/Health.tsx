import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import pic4 from "@/assets/pic4.jpg";
import pic5 from "@/assets/pic5.jpg";
import pic6 from "@/assets/pic6.jpg";
import pic7 from "@/assets/pic7.jpg";

export function Health() {
    const [isVisible, setIsVisible] = useState(false);
    const [savedArticles, setSavedArticles] = useState([]);
    const sectionRef = useRef(null);

    const healthTips = [
        {
            id: 1,
            title: "10 Essential Vitamins for Daily Health",
            category: "Nutrition",
            readTime: "5 min read",
            Image: pic4,
            excerpt: "Discover the most important vitamins your body needs every day for optimal health and wellness.",
            gradient: "from-blue-500 to-cyan-500",
            link: "/articles/vitamins",
        },
        {
            id: 2,
            title: "Managing Diabetes: A Complete Guide",
            category: "Health Management",
            readTime: "8 min read",
            Image: pic5,
            excerpt: "Learn effective strategies for managing diabetes through medication, diet, and lifestyle changes.",
            gradient: "from-green-500 to-emerald-500",
            link: "/articles/diabetes",
        },
        {
            id: 3,
            title: "Heart Health: Prevention Tips",
            category: "Cardiovascular",
            readTime: "6 min read",
            Image: pic6,
            excerpt: "Simple yet effective ways to maintain a healthy heart and prevent cardiovascular diseases.",
            gradient: "from-red-500 to-orange-500",
            link: "/articles/heart-health",
        },
        {
            id: 4,
            title: "Boost Your Immune System Naturally",
            category: "Immunity",
            readTime: "4 min read",
            Image: pic7,
            excerpt: "Natural methods and supplements to strengthen your immune system year-round.",
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
        setSavedArticles((prev) =>
                         prev.includes(id) ? prev.filter((articleId) => articleId !== id) : [...prev, id]
                        );
    };

    return (
        <section
        className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
        ref={sectionRef}
        >
        {/* Background Pattern */}
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

        <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Health Tips &{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        Articles
        </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Stay informed with the latest health insights and wellness tips
        </p>
        </div>

        {/* Health Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {healthTips.map((tip, index) => (
            <Card
            key={tip.id}
            className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            >
            {/* Background Gradient on Hover */}
            <div
            className={`absolute inset-0 bg-gradient-to-br ${tip.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
            ></div>

            {/* Image Section */}
            <div className="relative">
            <img
            src={tip.Image}
            alt={tip.title}
            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            />
            <Badge
            className={`absolute top-3 left-3 bg-gradient-to-r ${tip.gradient} text-white font-semibold`}
            >
            {tip.category}
            </Badge>
            <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full"
            onClick={() => toggleSaveArticle(tip.id)}
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

            <CardContent className="p-6 relative z-10">
            {/* Title */}
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-800">
            {tip.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {tip.excerpt}
            </p>

            {/* Read Time and Button */}
            <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{tip.readTime}</span>
            <Button
            variant="ghost"
            size="sm"
            className={`p-0 h-auto text-blue-600 hover:text-blue-700 bg-gradient-to-r ${tip.gradient} bg-clip-text text-transparent group-hover:underline`}
            onClick={() => window.location.href = tip.link}
            >
            Read More
            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            </div>

            {/* Hover Effect Line */}
            <div
            className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${tip.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></div>
            </CardContent>

            {/* Floating Elements */}
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
            `}</style>
            </section>
    );
}
