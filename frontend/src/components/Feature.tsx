import { CardContent, Card } from "@/components/ui/card";
import { Shield, Truck, Clock, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Feature() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const features = [
        {
            icon: <Shield className="h-14 w-14 text-blue-600 mx-auto mb-5" />,
            title: "Safe & Trusted",
            description: "Authentic medicines with clear origins, FDA approved, and quality guaranteed",
        },
        {
            icon: <Truck className="h-14 w-14 text-green-600 mx-auto mb-5" />,
            title: "Fast Delivery",
            description: "Delivery within 2-4 hours in Ho Chi Minh City with temperature-controlled transport",
        },
        {
            icon: <Clock className="h-14 w-14 text-purple-600 mx-auto mb-5" />,
            title: "24/7 Service",
            description: "Customer support and pharmacist consultation available anytime, anywhere",
        },
        {
            icon: <MapPin className="h-14 w-14 text-red-600 mx-auto mb-5" />,
            title: "500+ Stores",
            description: "Wide network across the country with convenient pickup locations",
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
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
    }, []);

    return (
        <section
            className="relative py-16 bg-gradient-to-br from-blue-900 via-indigo-800 to-cyan-600 overflow-hidden"
            ref={sectionRef}
            aria-labelledby="features-heading"
        >
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-600/20 opacity-30"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-12 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
                    <h2 id="features-heading" className="text-3xl lg:text-4xl font-bold text-white mb-3">
                        Why Choose Long Châu?
                    </h2>
                    <p className="text-base text-gray-100 max-w-xl mx-auto leading-relaxed">
                        We're committed to providing the best healthcare experience with our comprehensive services and trusted quality.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className={`group relative text-center bg-white/95 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 ${
                                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-12'
                            }`}
                            style={{ animationDelay: `${index * 150}ms` }}
                            aria-labelledby={`feature-title-${index}`}
                        >
                            {/* Gradient Border on Hover */}
                            <div
                                className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r rounded-xl transition-all duration-300`}
                            ></div>

                            <CardContent className="pt-8 pb-5 relative z-10">
                                {/* Icon with Gradient Circle */}
                                <div
                                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r justify-center rounded-full mb-5 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                                >
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3
                                    id={`feature-title-${index}`}
                                    className="font-semibold text-base text-gray-900 mb-2 group-hover:text-gray-800"
                                >
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-gray-600 leading-relaxed max-w-[90%] mx-auto group-hover:text-gray-700">
                                    {feature.description}
                                </p>

                                {/* Hover Effect Line */}
                                <div
                                    className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${feature.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                                ></div>
                            </CardContent>

                            {/* Floating Elements */}
                            <div
                                className={`absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                            ></div>
                            <div
                                className={`absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                            ></div>
                        </Card>
                    ))}
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
                    animation: fadeInUp 0.7s ease-out forwards;
                }

                .container {
                    max-width: 1280px;
                }

                @media (max-width: 640px) {
                    .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                }
            `}</style>
        </section>
    );
}
