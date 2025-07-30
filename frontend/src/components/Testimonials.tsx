import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import pic8 from "@/assets/pic8.jpg";
import pic9 from "@/assets/pic9.jpg";
import pic10 from "@/assets/pic10.jpg";

// Fallback image in case avatar imports fail
const fallbackAvatar = "https://via.placeholder.com/40";

export function Testimonials() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Regular Customer",
            rating: 5,
            comment:
                "Long Chau has been my go-to pharmacy for years. Their online service is incredibly convenient and the delivery is always on time.",
            avatar: pic8 || fallbackAvatar,
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            role: "Healthcare Professional",
            rating: 5,
            comment:
                "I recommend Long Chau to my patients. They have a wide selection of quality medications and knowledgeable pharmacists.",
            avatar: pic9 || fallbackAvatar,
            gradient: "from-green-500 to-emerald-500",
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Mother of 2",
            rating: 5,
            comment:
                "The prescription upload feature is a game-changer for busy parents. Quick, easy, and reliable service every time.",
            avatar: pic10 || fallbackAvatar,
            gradient: "from-purple-500 to-indigo-500",
        },
    ];

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
                        What Our{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Customers Say
                        </span>
                    </h2>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                        Trusted by millions of customers across Vietnam
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={testimonial.id}
                            className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Background Gradient on Hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                            ></div>

                            <CardContent className="p-8 relative z-10">
                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform"
                                        />
                                    ))}
                                </div>

                                {/* Quote and Comment */}
                                <Quote className="h-8 w-8 text-gray-300 mb-4 group-hover:text-gray-400 transition-colors" />
                                <p className="text-gray-600 mb-6 leading-relaxed text-lg italic">
                                    "{testimonial.comment}"
                                </p>

                                {/* User Info */}
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-3 border-2 border-gray-200 group-hover:scale-105 transition-transform"
                                        onError={(e) => (e.target.src = fallbackAvatar)}
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900 group-hover:text-gray-800">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm text-gray-600 group-hover:text-gray-700">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Effect Line */}
                                <div
                                    className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${testimonial.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                                ></div>
                            </CardContent>

                            {/* Floating Elements */}
                            <div
                                className={`absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                            ></div>
                            <div
                                className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${testimonial.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
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
