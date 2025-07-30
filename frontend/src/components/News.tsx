import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function News() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const sectionRef = useRef(null);

    // Basic email validation
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setError("");
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setEmail("");
        }, 3000); // Reset after 3 seconds
    };

    // Intersection Observer for animations
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
            className="relative py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden"
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
                <div className={`max-w-2xl mx-auto text-center ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Stay Updated with{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Health News
                        </span>
                    </h2>
                    <p className="text-lg text-gray-200 mb-8">
                        Subscribe to our newsletter for the latest health tips, product updates, and exclusive offers
                    </p>

                    {/* Newsletter Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <div className="relative flex-1">
                            <Input
                                placeholder="Enter your email address"
                                className={`bg-white/95 border-0 pr-10 focus:ring-2 focus:ring-blue-400 transition-all duration-300 group-hover:scale-105 ${
                                    error ? "border-red-500" : ""
                                }`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                            Subscribe
                        </Button>
                    </form>

                    {/* Error or Success Message */}
                    {error && (
                        <p className="text-red-300 text-sm mt-4 animate-fadeInUp">
                            {error}
                        </p>
                    )}
                    {isSubmitted && (
                        <p className="text-green-300 text-sm mt-4 animate-fadeInUp flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Successfully subscribed! Check your email for updates.
                        </p>
                    )}

                    {/* Subscriber Info */}
                    <p className="text-gray-200 text-sm mt-4">
                        Join over 100,000 subscribers. Unsubscribe anytime.
                    </p>
                </div>

                {/* Floating Elements */}
                <div
                    className={`absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                ></div>
                <div
                    className={`absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
                ></div>
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
