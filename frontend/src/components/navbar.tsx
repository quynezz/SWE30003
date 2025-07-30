import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Heart, ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.jpg";

export function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const sectionRef = useRef(null);

    // Navigation items with dropdown support
    const navItems = [
        {
            name: "Products",
            link: "/products",
            dropdown: [
                { name: "Prescription Drugs", link: "/products/prescription" },
                { name: "Supplements", link: "/products/supplements" },
                { name: "Personal Care", link: "/products/personal-care" },
            ],
        },
        { name: "Prescription", link: "/prescription" },
        { name: "Stores", link: "/branches" },
    ];

    // Handle scroll for sticky navbar shadow
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
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

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full p-2 transition-all duration-300 ${
                isScrolled
                    ? "bg-background/95 backdrop-blur shadow-lg shadow-blue-500/20"
                    : "bg-background/95 backdrop-blur"
            }`}
            ref={sectionRef}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left: Logo */}
                <div
                    className={`flex items-center space-x-4 ${
                        isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10"
                    }`}
                >
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                                src={logo}
                                alt="Long Chau Logo"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Long Chau
                        </span>
                    </Link>
                </div>

                {/* Center: Navigation (Desktop) */}
                <nav
                    className={`hidden md:flex space-x-8 items-center ${
                        isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-12"
                    }`}
                    style={{ animationDelay: "100ms" }}
                >
                    {navItems.map((item, index) => (
                        <div key={index} className="relative group">
                            <Link
                                to={item.link}
                                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent"
                            >
                                {item.name}
                                {item.dropdown && (
                                    <svg
                                        className="ml-1 h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                )}
                            </Link>
                            {item.dropdown && (
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                                    {item.dropdown.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            to={subItem.link}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white rounded-lg"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right: Search and Icons */}
                <div
                    className={`flex items-center space-x-4 ${
                        isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10"
                    }`}
                    style={{ animationDelay: "200ms" }}
                >
                    {/* Search */}
                    <div
                        className={`relative w-[200px] sm:w-[300px] transition-all duration-300 ${
                            isSearchFocused ? "scale-105" : ""
                        }`}
                    >
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search medicines, supplements..."
                            className={`pl-10 pr-4 bg-white/95 border-0 focus:ring-2 focus:ring-blue-400 rounded-full transition-all duration-300 ${
                                isSearchFocused ? "shadow-md shadow-blue-500/20" : ""
                            }`}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                    </div>

                    {/* Icons */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:bg-blue-100 rounded-full"
                    >
                        <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                            3
                        </Badge>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-blue-100 rounded-full"
                    >
                        <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                    </Button>
                    <Link to="/cart">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative hover:bg-blue-100 rounded-full"
                        >
                            <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-500">
                                2
                            </Badge>
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-blue-100 rounded-full"
                        >
                            <User className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                        </Button>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden hover:bg-blue-100 rounded-full"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-gray-600" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-600" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className={`md:hidden bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 ${
                        isVisible ? "animate-fadeInDown" : "opacity-0 -translate-y-10"
                    }`}
                >
                    <nav className="flex flex-col p-4 space-y-4">
                        {navItems.map((item, index) => (
                            <div key={index}>
                                <Link
                                    to={item.link}
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                                {item.dropdown && (
                                    <div className="ml-4 space-y-2">
                                        {item.dropdown.map((subItem, subIndex) => (
                                            <Link
                                                key={subIndex}
                                                to={subItem.link}
                                                className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            )}

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }

                .animate-fadeInDown {
                    animation: fadeInDown 0.6s ease-out forwards;
                }

                .container {
                    max-width: 1200px;
                }
            `}</style>
        </header>
    );
}
