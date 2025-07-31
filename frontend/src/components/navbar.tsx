import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Heart, ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      return items.reduce((sum: any, item: any) => sum + (item.quantity || 1), 0);
    }
    return 0;
  });
  const sectionRef = useRef(null);
  const dropdownRef = useRef(null);

  const navItems = [
    {
      name: "Products",
      link: "/products",
      dropdown: [
        { name: "Prescription Drugs", link: "/products" },
        { name: "Supplements", link: "/products" },
        { name: "Personal Care", link: "/products" },
      ],
    },
    { name: "Prescription", link: "/prescription" },
    { name: "Stores", link: "/branches" },
    { name: "Articles", link: "/branches" ,
        dropdown: [
        { name: "Vitatmins", link: "/articles/vitamins" },
        { name: "Nutritions", link: "/articles/diabetes" },
        { name: "Heath-related", link: "/articles/heart-health" },
        { name: "cardiovascular", link: "/articles/immunity" },
      ],
},
{ name: "Track Order", link: "/track" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (event.key === "cartItems") {
        const items = event.newValue ? JSON.parse(event.newValue) : [];
        setCartCount(items.reduce((sum: any, item: any) => sum + (item.quantity || 1), 0));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDropdown = (index: any) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full p-0 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-blue-500/20"
          : "bg-white/95 backdrop-blur-md"
      }`}
      ref={sectionRef}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div
          className={`flex items-center space-x-3 ${
            isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10"
          }`}
        >
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src={logo}
                alt="Long Châu Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Long Châu
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
            <div key={index} className="relative" ref={item.dropdown ? dropdownRef : null}>
              <Link
                to={item.link}
                className="text-sm font-medium text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:bg-clip-text transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-cyan-600 after:transition-all after:duration-300 hover:after:w-full"
                onClick={(e) => {
                  if (item.dropdown) {
                    e.preventDefault();
                    toggleDropdown(index);
                  }
                }}
                aria-expanded={openDropdown === index}
                aria-controls={item.dropdown ? `dropdown-${index}` : undefined}
              >
                {item.name}
                {item.dropdown && (
                  <svg
                    className={`ml-1 h-3 w-3 inline transition-transform duration-300 ${
                      openDropdown === index ? "rotate-180" : ""
                    }`}
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
                <AnimatePresence>
                  {openDropdown === index && (
                    <motion.div
                      id={`dropdown-${index}`}
                      className="absolute left-0 top-10 w-56 bg-white rounded-xl shadow-2xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className="block px-4 py-2 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white rounded-lg transition-all duration-200"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Search and Icons */}
        <div
          className={`flex items-center space-x-3 ${
            isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          {/* Search */}
          <div
            className={`relative w-40 sm:w-56 lg:w-64 transition-all duration-300 ${
              isSearchFocused ? "scale-105 shadow-lg shadow-blue-500/20" : ""
            }`}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Find medicines or supplements"
              className={`pl-10 pr-4 bg-white/95 border-none focus:ring-2 focus:ring-blue-500 rounded-full text-xs placeholder-gray-400 transition-all duration-300 ${
                isSearchFocused ? "shadow-md shadow-blue-500/20" : ""
              }`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              aria-label="Tìm kiếm thuốc hoặc thực phẩm chức năng"
            />
          </div>

          {/* Icons */}
          <Link to="/notification">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-blue-50 rounded-full transition-transform duration-200 hover:scale-110"
            aria-label="Thông báo"
          >
            <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500 animate-pulse">
              3
            </Badge>
          </Button>
        </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-blue-50 rounded-full transition-transform duration-200 hover:scale-110"
            aria-label="Danh sách yêu thích"
          >
            <Heart className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
          </Button>
          <Link to="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-blue-50 rounded-full transition-transform duration-200 hover:scale-110"
              aria-label={`Giỏ hàng (${cartCount} sản phẩm)`}
            >
              <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500 animate-pulse">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-blue-50 rounded-full transition-transform duration-200 hover:scale-110"
              aria-label="Tài khoản người dùng"
            >
              <User className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-blue-50 rounded-full transition-transform duration-200 hover:scale-110"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
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
          className={`md:hidden bg-white/95 backdrop-blur-md shadow-xl transition-all duration-500 ease-in-out ${
            isVisible ? "animate-slideInDown" : "opacity-0 -translate-y-10"
          }`}
        >
          <nav className="flex flex-col p-6 space-y-5">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-3">
                <Link
                  to={item.link}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2 block"
                  onClick={(e) => {
                    if (item.dropdown) {
                      e.preventDefault();
                      toggleDropdown(index);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  aria-expanded={openDropdown === index}
                  aria-controls={item.dropdown ? `mobile-dropdown-${index}` : undefined}
                >
                  {item.name}
                  {item.dropdown && (
                    <svg
                      className={`ml-1 h-3 w-3 inline transition-transform duration-300 ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
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
                {item.dropdown && openDropdown === index && (
                  <motion.div
                    id={`mobile-dropdown-${index}`}
                    className="ml-4 space-y-2 mt-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-1.5 px-3 transition-all duration-200"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
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

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInDown {
          animation: slideInDown 0.5s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
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
    </header>
  );
}
