import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Promotions() {
    const [isVisible, setIsVisible] = useState(false);
    const [copiedCode, setCopiedCode] = useState(null);
    const sectionRef = useRef(null);

    const promotions = [
        {
            id: 1,
            title: "New Customer Special",
            discount: "20% OFF",
            description: "Get 20% off your first order over 200,000₫",
            code: "WELCOME20",
            validUntil: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
            color: "from-blue-600 to-purple-600",
        },
        {
            id: 2,
            title: "Free Delivery Week",
            discount: "FREE SHIPPING",
            description: "Free delivery on all orders this week",
            code: "FREESHIP",
            validUntil: new Date(new Date().setDate(new Date().getDate() + 32)).toISOString().split('T')[0],
            color: "from-blue-600 to-teal-600",
        },
        {
            id: 3,
            title: "Vitamin Bundle Deal",
            discount: "Buy 2 Get 1",
            description: "Special offer on all vitamin supplements",
            code: "VITAMIN3",
            validUntil: new Date(new Date().setDate(new Date().getDate() + 33)).toISOString().split('T')[0],
            color: "from-blue-600 to-indigo-600",
        },
    ];

    // Calculate time remaining for countdown
    const getTimeRemaining = (endTime) => {
        const now = new Date();
        const timeLeft = new Date(endTime) - now;

        if (timeLeft <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [timers, setTimers] = useState(
        promotions.map((promo) => getTimeRemaining(promo.validUntil))
    );

    // Update countdown timers every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(promotions.map((promo) => getTimeRemaining(promo.validUntil)));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Intersection Observer for scroll animations
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

    // Copy to clipboard functionality
    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
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
                        Special Offers
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {" "}Just for You
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Don't miss out on these exclusive deals and promotions
                    </p>
                </div>

                {/* Promotions Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {promotions.map((promo, index) => {
                        const { days, hours, minutes, seconds } = timers[index] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
                        return (
                            <Card
                                key={promo.id}
                                className={`group relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                                    isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Background Gradient */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${promo.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                                ></div>

                                {/* Promo Header */}
                                <div className={`p-6 bg-gradient-to-r ${promo.color} text-white relative z-10`}>
                                    <div className="text-3xl font-bold mb-2">{promo.discount}</div>
                                    <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
                                    <p className="text-white/90 text-sm">{promo.description}</p>
                                </div>

                                {/* Promo Content */}
                                <CardContent className="p-6 relative z-10">
                                    {/* Countdown Timer */}
                                    <div className="flex justify-center space-x-4 mb-4 text-sm text-gray-600">
                                        <div className="text-center">
                                            <span className="block font-bold text-lg">{days}</span>
                                            <span className="text-xs">Days</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-bold text-lg">{hours}</span>
                                            <span className="text-xs">Hours</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-bold text-lg">{minutes}</span>
                                            <span className="text-xs">Minutes</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-bold text-lg">{seconds}</span>
                                            <span className="text-xs">Seconds</span>
                                        </div>
                                    </div>

                                    {/* Promo Code and Validity */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center space-x-2">
                                            <code className="text-sm font-mono">{promo.code}</code>
                                            <button
                                                onClick={() => copyToClipboard(promo.code)}
                                                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                            >
                                                {copiedCode === promo.code ? (
                                                    <Check className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Copy className="h-4 w-4 text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            Valid until {new Date(promo.validUntil).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Claim Button */}
                                    <Button
                                        className={`w-full bg-gradient-to-r ${promo.color} hover:opacity-90 text-white font-semibold transition-all duration-300 transform group-hover:scale-105`}
                                        onClick={() => window.location.href = '/shop'}
                                    >
                                        Claim Offer
                                    </Button>
                                </CardContent>

                                {/* Floating Elements */}
                                <div
                                    className={`absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                                ></div>
                                <div
                                    className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${promo.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                                ></div>
                            </Card>
                        );
                    })}
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
