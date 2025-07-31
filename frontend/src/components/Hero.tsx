import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Truck, Shield, Clock, Star, ArrowRight, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import pic3 from "../assets/pic3.jpg";
import { Link } from "react-router-dom";

export function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const imageSrc = pic3;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.2,
            }
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

    const stats = [
        { number: "2M+", label: "Customers Served" },
        { number: "50K+", label: "Medicines Available" },
        { number: "4.9★", label: "Customer Rating" },
        { number: "24/7", label: "Support Available" }
    ];

    const features = [
        {
            icon: <Shield className="h-5 w-5" />,
            text: "Licensed & Certified Pharmacy",
            accent: "text-green-600"
        },
        {
            icon: <Truck className="h-5 w-5" />,
            text: "Free delivery over 300,000₫",
            accent: "text-blue-600"
        },
        {
            icon: <Clock className="h-5 w-5" />,
            text: "2-4 hours delivery in HCM",
            accent: "text-purple-600"
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden flex items-center"
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-24 -right RELEASEDright-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl ${isVisible ? 'animate-pulse' : ''}`}></div>
                <div className={`absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl ${isVisible ? 'animate-pulse delay-1000' : ''}`}></div>
                <div className={`absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-100/20 rounded-full blur-2xl ${isVisible ? 'animate-pulse delay-500' : ''}`}></div>
            </div>

            <div className="container mx-auto px-8 py-12 relative z-10 flex items-center h-full">
                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                    <div className="space-y-6">
                        <div className={`inline-flex items-center space-x-2 ${isVisible ? 'animate-fadeInUp' : ''}`}>
                            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 text-sm font-medium shadow-lg">
                                🏆 Vietnam's #1 Online Pharmacy
                            </Badge>
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-sm text-gray-600 ml-2">4.9/5</span>
                            </div>
                        </div>

                        <div className={`space-y-4 ${isVisible ? 'animate-fadeInUp delay-200' : ''}`}>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Your Health,{" "}
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                    Our Priority
                                </span>
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
                        </div>

                        <p className={`text-base text-gray-700 leading-relaxed max-w-md ${isVisible ? 'animate-fadeInUp delay-300' : ''}`}>
                            Experience healthcare made simple with Vietnam's most trusted online pharmacy.
                            Join over <span className="font-bold text-blue-600">2 million customers</span> who
                            choose us for safe, convenient, and reliable medical care.
                        </p>

                        <div className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fadeInUp delay-400' : ''}`}>
                            <Link
                                to="/products"
                                className="group relative inline-flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label="Shop Medicines"
                            >
                                <span className="relative z-10">Shop Medicines</span>
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </Link>
                            <Link
                                to="/prescription"
                                className="group relative inline-flex items-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label="Upload Prescription"
                            >
                                <Upload className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                <span className="relative z-10">Upload Prescription</span>
                                <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </Link>
                        </div>

                        <div className={`space-y-3 ${isVisible ? 'animate-fadeInUp delay-500' : ''}`}>
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3 text-gray-700">
                                    <div className={`${feature.accent} bg-gray-50 rounded-full p-2`}>
                                        {feature.icon}
                                    </div>
                                    <span className="text-sm font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`relative ${isVisible ? 'animate-fadeInUp delay-300' : ''}`}>
                        <div className="relative group">
                            <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl transform rotate-3 ${isVisible ? 'group-hover:rotate-6' : ''} transition-transform duration-500`}></div>
                            <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-3 ${isVisible ? 'group-hover:rotate-0' : ''} transition-transform duration-500`}>
                                <div className="aspect-[4/3] relative">
                                    <img
                                        src={imageSrc}
                                        alt="Pharmacy Services"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={`absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-4 max-w-xs ${isVisible ? 'animate-fadeInUp delay-700' : ''}`}>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <Truck className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Fast Delivery</p>
                                    <p className="text-xs text-gray-600">2-4 hours in HCM City</p>
                                    <div className="flex items-center mt-1">
                                        <div className={`w-2 h-2 bg-green-500 rounded-full ${isVisible ? 'animate-pulse' : ''}`}></div>
                                        <span className="text-xs text-green-600 ml-2 font-medium">Live tracking</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`absolute -top-8 -right-8 bg-white rounded-2xl shadow-xl p-3 ${isVisible ? 'animate-fadeInUp delay-800' : ''}`}>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">24/7 Support</p>
                                    <div className="flex items-center">
                                        <div className={`w-2 h-2 bg-green-500 rounded-full ${isVisible ? 'animate-pulse' : ''}`}></div>
                                        <span className="text-xs text-gray-600 ml-2">Online now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-600 { animation-delay: 0.6s; }
                .delay-700 { animation-delay: 0.7s; }
                .delay-800 { animation-delay: 0.8s; }
                .delay-900 { animation-delay: 0.9s; }
            `}</style>
        </section>
    );
}
