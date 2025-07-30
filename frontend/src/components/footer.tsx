import { Link } from "react-router-dom";
import { Phone, Globe, Shield, Award, Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";

export function Footer() {
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
        }, 3000);
    };

    // Intersection Observer for animations
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
        <footer
        className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden"
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
        <div className="grid md:grid-cols-5 gap-8">
        {/* Brand Info and Newsletter */}
        <div className={`md:col-span-2 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center space-x-2 mb-6">
        <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">LC</span>
        </div>
        <span className="font-bold text-3xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Long Chau
        </span>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">
        Vietnam's leading trusted pharmacy chain, committed to providing quality healthcare products and services to millions of customers nationwide.
            </p>
        <div className="flex items-center space-x-4 mb-4">
        <Phone className="h-5 w-5 text-blue-400" />
        <span>1800 6928 (Free hotline)</span>
        </div>
        <div className="flex items-center space-x-4 mb-6">
        <Globe className="h-5 w-5 text-blue-400" />
        <a href="https://www.longchau.com.vn" className="hover:text-blue-300 transition-colors">
        www.longchau.com.vn
        </a>
        </div>
        {/* Newsletter Signup */}
        <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
        <Input
        placeholder="Enter your email"
        className={`bg-gray-800 border-0 text-white placeholder-gray-400 pr-10 focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
            error ? "border-red-500" : ""
        }`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white font-semibold transition-all duration-300"
        >
        Subscribe
        </Button>
        </form>
        {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
        {isSubmitted && (
            <p className="text-green-300 text-sm mt-2 flex items-center">
            <Award className="h-4 w-4 mr-1" />
            Subscribed! Welcome to our community.
                </p>
        )}
        </div>

        {/* Products */}
        <div className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '100ms' }}>
        <h3 className="font-semibold text-lg mb-6">Products</h3>
        <ul className="space-y-3 text-gray-300">
        {[
            { name: "Prescription Drugs", link: "/products" },
            { name: "Over-the-Counter", link: "/products" },
            { name: "Supplements", link: "/products" },
            { name: "Personal Care", link: "/products" },
            { name: "Medical Devices", link: "/products" },
        ].map((item, index) => (
            <li key={index}>
            <Link
            to={item.link}
            className="hover:text-blue-300 transition-colors group relative"
            >
            {item.name}
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            </li>
        ))}
        </ul>
        </div>

        {/* Services */}
        <div className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '200ms' }}>
        <h3 className="font-semibold text-lg mb-6">Services</h3>
        <ul className="space-y-3 text-gray-300">
        {[
            { name: "Upload Prescription", link: "/prescription" },
            { name: "Find Store", link: "/branches" },
            { name: "Loyalty Program", link: "/loyalty" },
            { name: "Track Order", link: "/orders" },
            { name: "Health Consultation", link: "/consultation" },
        ].map((item, index) => (
            <li key={index}>
            <Link
            to={item.link}
            className="hover:text-blue-300 transition-colors group relative"
            >
            {item.name}
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            </li>
        ))}
        </ul>
        </div>

        {/* Support */}
        <div className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '300ms' }}>
        <h3 className="font-semibold text-lg mb-6">Support</h3>
        <ul className="space-y-3 text-gray-300">
        {[
            { name: "Contact Us", link: "/contact" },
            { name: "FAQ", link: "/faq" },
            { name: "Privacy Policy", link: "/policy" },
            { name: "Terms of Service", link: "/terms" },
            { name: "Careers", link: "/careers" },
        ].map((item, index) => (
            <li key={index}>
            <Link
            to={item.link}
            className="hover:text-blue-300 transition-colors group relative"
            >
            {item.name}
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            </li>
        ))}
        </ul>
        </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
        <div className={`flex flex-col md:flex-row justify-between items-center ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '400ms' }}>
        <p className="text-gray-300 mb-4 md:mb-0">
        &copy; 2025 Long Chau Pharmacy. All rights reserved.
            </p>
        <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
        <Shield className="h-4 w-4 text-blue-400" />
        <span className="text-sm text-gray-300">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
        <Award className="h-4 w-4 text-blue-400" />
        <span className="text-sm text-gray-300">FDA Approved</span>
        </div>
        {/* Social Media Icons */}
        <div className="flex items-center space-x-4">
        <a href="https://instagram.com" className="text-gray-300 hover:text-blue-300 transition-colors">
        <Instagram className="h-5 w-5" />
        </a>
        <a href="https://facebook.com" className="text-gray-300 hover:text-blue-300 transition-colors">
        <Facebook className="h-5 w-5" />
        </a>
        <a href="https://twitter.com" className="text-gray-300 hover:text-blue-300 transition-colors">
        <Twitter className="h-5 w-5" />
        </a>
        </div>
        </div>
        </div>
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
            </footer>
    );
}
