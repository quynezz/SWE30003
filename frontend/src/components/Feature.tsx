import { CardContent, Card } from "@/components/ui/card";
import { Shield, Truck, Clock, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Feature() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const features = [
        {
            icon: <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />,
                title: "Safe & Trusted",
            description: "Authentic medicines with clear origins, FDA approved, and quality guaranteed",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Truck className="h-16 w-16 text-green-600 mx-auto mb-6" />,
                title: "Fast Delivery",
            description: "Delivery within 2-4 hours in Ho Chi Minh City with temperature-controlled transport",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: <Clock className="h-16 w-16 text-purple-600 mx-auto mb-6" />,
                title: "24/7 Service",
            description: "Customer support and pharmacist consultation available anytime, anywhere",
            gradient: "from-purple-500 to-indigo-500"
        },
        {
            icon: <MapPin className="h-16 w-16 text-red-600 mx-auto mb-6" />,
                title: "500+ Stores",
            description: "Wide network across the country with convenient pickup locations",
            gradient: "from-red-500 to-orange-500"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
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
        className="relative py-20 bg-gradient-to-r from-blue-900 via-indigo-800 to-cyan-600 overflow-hidden"
        ref={sectionRef}
        >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
        <div
        className="absolute inset-0"
        style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #3b82f6 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, #06b6d4 2px, transparent 2px)`,
            backgroundSize: "50px 50px"
        }}
        ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
        Why Choose Long Chau?
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
        We're committed to providing the best healthcare experience with our comprehensive services and trusted quality.
            </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
            <Card
            key={index}
            className={`group relative text-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            >
            {/* Background Gradient on Hover */}
            <div
            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
            ></div>

            <CardContent className="pt-8 pb-6 relative z-10">
            {/* Icon with Gradient Circle */}
            <div
            className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-full mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
            {feature.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-gray-800">
            {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto group-hover:text-gray-700">
            {feature.description}
            </p>

            {/* Hover Effect Line */}
            <div
            className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${feature.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></div>
            </CardContent>

            {/* Floating Elements */}
            <div
            className={`absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
            ></div>
            <div
            className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
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
