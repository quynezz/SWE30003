import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Categories() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const categories = [
        {
            name: "Prescription Drugs",
            icon: "💊",
            count: "2,500+",
            description: "Doctor-prescribed medications",
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            name: "Vitamins & Supplements",
            icon: "🌿",
            count: "1,200+",
            description: "Health & wellness products",
            gradient: "from-green-500 to-emerald-500",
        },
        {
            name: "Personal Care",
            icon: "🧴",
            count: "800+",
            description: "Beauty & hygiene essentials",
            gradient: "from-purple-500 to-indigo-500",
        },
        {
            name: "Baby & Mom",
            icon: "👶",
            count: "600+",
            description: "Mother & child care products",
            gradient: "from-pink-500 to-rose-500",
        },
        {
            name: "Medical Devices",
            icon: "🩺",
            count: "400+",
            description: "Healthcare equipment & tools",
            gradient: "from-teal-500 to-cyan-500",
        },
        {
            name: "Traditional Medicine",
            icon: "🌱",
            count: "300+",
            description: "Natural & herbal remedies",
            gradient: "from-lime-500 to-green-500",
        },
        {
            name: "First Aid",
            icon: "🏥",
            count: "250+",
            description: "Emergency care supplies",
            gradient: "from-red-500 to-orange-500",
        },
        {
            name: "Nutrition",
            icon: "🥗",
            count: "350+",
            description: "Dietary supplements & foods",
            gradient: "from-amber-500 to-yellow-500",
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

    return (
        <section
        className="relative py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 overflow-hidden"
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
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
        Explore Our{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Product Categories
        </span>
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
        Discover our comprehensive range of healthcare products tailored to your needs
        </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
            <Link key={index} to="/products">
            <Card
            className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            >
            {/* Background Gradient on Hover */}
            <div
            className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
            ></div>

            <CardContent className="p-6 text-center relative z-10">
            {/* Icon with Gradient Circle */}
            <div
            className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-full mb-6 text-3xl group-hover:scale-110 transition-transform duration-300`}
            >
            {category.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-gray-800">
            {category.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-700">
            {category.description}
            </p>

            {/* Badge */}
            <Badge
            variant="secondary"
            className="mb-3 bg-gray-100 text-gray-700 group-hover:bg-gradient-to-r group-hover:text-white"
            >
            {category.count}
            </Badge>

            {/* Shop Now Link */}
            <div className="flex items-center justify-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            Shop Now
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Hover Effect Line */}
            <div
            className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${category.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></div>
            </CardContent>

            {/* Floating Elements */}
            <div
            className={`absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
            ></div>
            <div
            className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${category.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
            ></div>
            </Card>
            </Link>
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
