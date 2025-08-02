import { MapPin, Users, Pill, Clock, TrendingUp, Award, Shield, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function Stats() {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedNumbers, setAnimatedNumbers] = useState({});
    const sectionRef = useRef(null);

    const stats = [
        {
            number: "500+",
            label: "Store Locations",
            icon: <MapPin className="h-7 w-7" />,
                gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50",
            description: "Across Vietnam",
            finalNumber: 500
        },
        {
            number: "2M+",
            label: "Happy Customers",
            icon: <Users className="h-7 w-7" />,
                gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-50 to-pink-50",
            description: "Trust our service",
            finalNumber: 2000000
        },
        {
            number: "50K+",
            label: "Products Available",
            icon: <Pill className="h-7 w-7" />,
                gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-50 to-emerald-50",
            description: "Quality medicines",
            finalNumber: 50000
        },
        {
            number: "24/7",
            label: "Customer Support",
            icon: <Clock className="h-7 w-7" />,
                gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-50 to-red-50",
            description: "Always available",
            finalNumber: 24
        },
    ];

    const achievements = [
        { icon: <Award className="h-5 w-5" />, text: "ISO Certified" },
            { icon: <Shield className="h-5 w-5" />, text: "Licensed Pharmacy" },
            { icon: <TrendingUp className="h-5 w-5" />, text: "Growing Fast" },
            { icon: <Zap className="h-5 w-5" />, text: "Quick Delivery" }
    ];

    const formatNumber = (num, isSpecial = false) => {
        if (isSpecial) return "24/7";
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
        return `${num}+`;
    };

    const animateNumber = (finalNumber, index, isSpecial = false) => {
        let current = 0;
        const increment = finalNumber / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            setAnimatedNumbers(prev => ({
                ...prev,
                [index]: formatNumber(Math.floor(current), isSpecial)
            }));
        }, 30);
        return () => clearInterval(timer);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!isVisible) {
                        setIsVisible(true);
                        const timers = stats.map((stat, index) => {
                            return setTimeout(() => {
                                return animateNumber(stat.finalNumber, index, stat.number === "24/7");
                            }, index * 200);
                        });
                        return () => timers.forEach(clearTimeout);
                    }
                } else {
                    setIsVisible(false);
                    setAnimatedNumbers({}); // Reset numbers when out of view
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isVisible]);

    return (
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden" ref={sectionRef}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #06b6d4 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
        }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
        <div className={`inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
        <TrendingUp className="h-4 w-4" />
        <span>Trusted by Millions</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Healthcare Excellence in{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        Numbers
        </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Join millions of satisfied customers who trust us for their healthcare needs
            </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
            <div
            key={index}
            className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300`}></div>

            {/* Content */}
            <div className="relative z-10">
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {stat.icon}
            </div>

            {/* Number */}
            <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
            {animatedNumbers[index] || "0"}
            </div>

            {/* Label */}
            <div className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-gray-800 transition-colors">
            {stat.label}
            </div>

            {/* Description */}
            <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
            {stat.description}
            </div>

            {/* Hover Effect Line */}
            <div className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${stat.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>

            {/* Floating Elements */}
            <div className={`absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}></div>
            <div className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}></div>
            </div>
        ))}
        </div>

        {/* Achievement Badges */}
        <div className={`bg-white rounded-2xl shadow-lg p-8 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '400ms' }}>
        <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Us?</h3>
        <p className="text-gray-600">Certified excellence in healthcare delivery</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
            <div
            key={index}
            className={`flex flex-col items-center space-y-3 p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 group ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            {achievement.icon}
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors text-center">
            {achievement.text}
            </span>
            </div>
        ))}
        </div>
        </div>

        {/* Bottom CTA */}
        <Link to="/" className="block mt-12 text-center">
        <div className={`text-center mt-12 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '600ms' }}>
        <div
        className={`inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${isVisible ? 'animate-pulse' : ''}`}
        onClick={() => window.location.href = '/'}
        >
        <span className="font-semibold">Join Our Growing Community</span>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
        </div>
        </Link>
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
