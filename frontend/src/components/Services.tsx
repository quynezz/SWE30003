import { Stethoscope, CheckCircle, Truck, Shield, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export function Services() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const services = [
        {
            icon: <FileText className="h-8 w-8 text-blue-600" />,
                title: "Prescription Services",
            description: "Upload prescriptions online and get medications delivered to your door",
            features: [
                "Digital prescription upload",
                "Pharmacist consultation",
                "Insurance coverage check",
            ],
            gradient: "from-blue-200 to-cyan-200",
            action: { text: "Upload Now", link: "/prescription" },
        },
        {
            icon: <Stethoscope className="h-8 w-8 text-green-600" />,
                title: "Health Consultations",
            description: "Get expert advice from licensed pharmacists and healthcare professionals",
            features: [
                "Free health consultations",
                "Medication reviews",
                "Health screenings",
            ],
            gradient: "from-green-200 to-emerald-200",
            action: { text: "Book Consultation", link: "/" },
        },
        {
            icon: <Truck className="h-8 w-8 text-purple-600" />,
                title: "Fast Delivery",
            description: "Same-day delivery available in major cities across Vietnam",
            features: [
                "2-4 hour delivery",
                "Temperature-controlled transport",
                "Real-time tracking",
            ],
            gradient: "from-purple-200 to-indigo-200",
            action: { text: "Track Order", link: "/track" },
        },
        {
            icon: <Shield className="h-8 w-8 text-red-600" />,
                title: "Quality Assurance",
            description: "All medications are sourced from certified manufacturers and suppliers",
            features: [
                "FDA approved products",
                "Batch tracking",
                "Expiry date monitoring",
            ],
            gradient: "from-red-200 to-orange-200",
            action: { text: "Learn More", link: "/" },
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
        Our{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        Comprehensive Services
        </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Tailored healthcare solutions to meet all your medical and wellness needs
        </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
            <Card
            key={index}
            className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            >
            {/* Background Gradient on Hover */}
            <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
            ></div>

            <CardContent className="p-8 relative z-10">
            {/* Icon with Gradient Circle */}
            <div
            className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
            >
            {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800">
            {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {service.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 mb-6">
            {service.features.map((feature, idx) => (
                <li
                key={idx}
                className="flex items-center text-sm text-gray-600 group-hover:text-gray-700"
                >
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                {feature}
                </li>
            ))}
            </ul>

            {/* Call to Action */}
            <Button
            variant="outline"
            className={`w-full border-2 border-gray-300 hover:border-none hover:bg-gradient-to-r ${service.gradient} text-gray-700 hover:text-white font-semibold transition-all duration-300 transform group-hover:scale-105`}
            onClick={() => window.location.href = service.action.link}
            >
            {service.action.text}
            </Button>

            {/* Hover Effect Line */}
            <div
            className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${service.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></div>
            </CardContent>

            {/* Floating Elements */}
            <div
            className={`absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
            ></div>
            <div
            className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${service.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
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
