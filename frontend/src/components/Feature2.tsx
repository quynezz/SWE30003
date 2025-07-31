import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Star, Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import paracetamol from "@/assets/paracetamol.jpg";
import vitaminc from "@/assets/vitaminc.jpg";
import amoxilin from "@/assets/amoxilin.png";
import omg3 from "@/assets/omg3.jpg";
import biotics from "@/assets/biotics.jpg";
import canxi from "@/assets/canxi.jpg";
import iron from "@/assets/iron.jpg";
import women from "@/assets/women.jpg";

export function Feature2() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const featuredProducts = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            price: "15,000",
            originalPrice: "20,000",
            brand: "Traphaco",
            rating: 4.5,
            reviews: 128,
            prescription: false,
            discount: 25,
            Image: paracetamol,
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            id: 2,
            name: "Vitamin C 1000mg",
            price: "85,000",
            brand: "DHG Pharma",
            rating: 4.8,
            reviews: 256,
            prescription: false,
            bestseller: true,
            Image: vitaminc,
            gradient: "from-green-500 to-emerald-500",
        },
        {
            id: 3,
            name: "Amoxicillin 500mg",
            price: "45,000",
            brand: "Imexpharm",
            rating: 4.3,
            reviews: 89,
            prescription: true,
            Image: amoxilin,
            gradient: "from-red-500 to-orange-500",
        },
        {
            id: 4,
            name: "Omega-3 Fish Oil",
            price: "120,000",
            brand: "Blackmores",
            rating: 4.7,
            reviews: 342,
            prescription: false,
            Image: omg3,
            gradient: "from-teal-500 to-cyan-500",
        },
        {
            id: 5,
            name: "Probiotics Complex",
            price: "180,000",
            brand: "Bio-Life",
            rating: 4.6,
            reviews: 198,
            prescription: false,
            new: true,
            Image: biotics,
            gradient: "from-purple-500 to-indigo-500",
        },
        {
            id: 6,
            name: "Calcium + D3",
            price: "95,000",
            brand: "Centrum",
            rating: 4.4,
            reviews: 167,
            prescription: false,
            Image: canxi,
            gradient: "from-amber-500 to-yellow-500",
        },
        {
            id: 7,
            name: "Iron Supplement",
            price: "65,000",
            brand: "Nature Made",
            rating: 4.5,
            reviews: 134,
            prescription: false,
            Image: iron,
            gradient: "from-blue-500 to-purple-500",
        },
        {
            id: 8,
            name: "Multivitamin Women",
            price: "110,000",
            brand: "One A Day",
            rating: 4.7,
            reviews: 289,
            prescription: false,
            Image: women,
            gradient: "from-pink-500 to-rose-500",
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
                <div className={`flex flex-col sm:flex-row justify-between items-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                            Featured{" "}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Products
                            </span>
                        </h2>
                        <p className="text-lg text-gray-200">Top-rated products trusted by our customers</p>
                    </div>
                    <Link to="/products">
                        <Button
                            variant="outline"
                            size="lg"
                            className={`border-2 border-white/80 text-white bg-gradient-to-r hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:border-none transition-all duration-300 transform hover:scale-105 cursor-pointer ${isVisible ? 'animate-pulse' : ''}`}
                        >
                            View All Products
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product, index) => (
                        <Card
                            key={product.id}
                            className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Background Gradient on Hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                            ></div>

                            <CardContent className="p-6 relative z-10">
                                {/* Product Image */}
                                <div className="relative mb-6 flex items-center justify-center">
                                    <img
                                        src={product.Image}
                                        alt={product.name}
                                        width={150}
                                        height={150}
                                        className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                                        {product.prescription && (
                                            <Badge className="bg-red-500 hover:bg-red-600 text-xs font-semibold">
                                                Prescription
                                            </Badge>
                                        )}
                                        {product.discount && (
                                            <Badge className="bg-orange-500 hover:bg-orange-600 text-xs font-semibold">
                                                -{product.discount}%
                                            </Badge>
                                        )}
                                        {product.bestseller && (
                                            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs font-semibold">
                                                Bestseller
                                            </Badge>
                                        )}
                                        {product.new && (
                                            <Badge className="bg-blue-500 hover:bg-blue-600 text-xs font-semibold">
                                                New
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="absolute top-2 right-2 flex space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="bg-white/80 hover:bg-white rounded-full"
                                        >
                                            <Heart className="h-4 w-4 text-gray-600 group-hover:text-red-500 transition-colors" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="bg-white/80 hover:bg-white rounded-full"
                                            onClick={() => window.location.href = `/product/${product.id}`}
                                        >
                                            <Eye className="h-4 w-4 text-gray-600 group-hover:text-blue-500 transition-colors" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-800">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm ml-1">{product.rating}</span>
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <span className="font-bold text-blue-600 text-lg">{product.price}₫</span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-gray-500 line-through ml-2">
                                                {product.originalPrice}₫
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <Button
                                    size="sm"
                                    className={`w-full bg-gradient-to-r ${product.gradient} hover:opacity-90 text-white font-semibold transition-all duration-300 transform group-hover:scale-105`}
                                >
                                    Add to Cart
                                </Button>

                                {/* Hover Effect Line */}
                                <div
                                    className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${product.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                                ></div>
                            </CardContent>

                            {/* Floating Elements */}
                            <div
                                className={`absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                            ></div>
                            <div
                                className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${product.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
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
