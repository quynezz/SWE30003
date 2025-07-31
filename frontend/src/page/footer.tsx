import { Link } from "react-router-dom";
import {
    Phone,
    Globe,
    Shield,
    Award,
} from "lucide-react";
import logo from "@/assets/logo.jpg";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
        <div className="flex items-center space-x-2 mb-6">
        <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
        <img
        src={logo}
        alt="Logo"
        className="object-cover rounded-lg"
        />
        </div>
        <span className="font-bold text-2xl">Long Châu Pharmacy</span>
        </div>
        <p className="text-gray-400 mb-6 leading-relaxed">
        Vietnam's leading trusted pharmacy chain, committed to providing
        quality healthcare products and services to millions of
        customers nationwide.
            </p>
        <div className="flex items-center space-x-4 mb-4">
        <Phone className="h-5 w-5 text-blue-400" />
        <span>1800 6928 </span>
        </div>
        <div className="flex items-center space-x-4">
        <Globe className="h-5 w-5 text-blue-400" />
        <span>www.longchau.com.vn</span>
        </div>
        </div>
        <div>
        <h3 className="font-semibold mb-6 text-lg">Products</h3>
        <ul className="space-y-3 text-gray-400">
        <li>
        <Link
        to="/products"
        className="hover:text-white transition-colors"
        >
        Prescription Drugs
        </Link>
        </li>
        <li>
        <Link
        to="/products"
        className="hover:text-white transition-colors"
        >
        Over-the-Counter
        </Link>
        </li>
        <li>
        <Link
        to="/products"
        className="hover:text-white transition-colors"
        >
        Supplements
        </Link>
        </li>
        <li>
        <Link
        to="/products"
        className="hover:text-white transition-colors"
        >
        Personal Care
        </Link>
        </li>
        <li>
        <Link
        to="/products"
        className="hover:text-white transition-colors"
        >
        Medical Devices
        </Link>
        </li>
        </ul>
        </div>
        <div>
        <h3 className="font-semibold mb-6 text-lg">Services</h3>
        <ul className="space-y-3 text-gray-400">
        <li>
        <Link
        to="/prescription"
        className="hover:text-white transition-colors"
        >
        Upload Prescription
        </Link>
        </li>
        <li>
        <Link
        to="/branches"
        className="hover:text-white transition-colors"
        >
        Find Store
        </Link>
        </li>
        <li>
        <Link
        to="/loyalty"
        className="hover:text-white transition-colors"
        >
        Loyalty Program
        </Link>
        </li>
        <li>
        <Link
        to="/orders"
        className="hover:text-white transition-colors"
        >
        Track Order
        </Link>
        </li>
        <li>
        <Link
        to="/consultation"
        className="hover:text-white transition-colors"
        >
        Health Consultation
        </Link>
        </li>
        </ul>
        </div>
        <div>
        <h3 className="font-semibold mb-6 text-lg">Support</h3>
        <ul className="space-y-3 text-gray-400">
        <li>
        <Link
        to="/contact"
        className="hover:text-white transition-colors"
        >
        Contact Us
        </Link>
        </li>
        <li>
        <Link
        to="/faq"
        className="hover:text-white transition-colors"
        >
        FAQ
        </Link>
        </li>
        <li>
        <Link
        to="/policy"
        className="hover:text-white transition-colors"
        >
        Privacy Policy
        </Link>
        </li>
                </ul>
        </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 mb-4 md:mb-0">
        &copy; 2024 Long Chau Pharmacy. All rights reserved.
            </p>
        <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
        <Shield className="h-4 w-4 text-blue-400" />
        <span className="text-sm text-gray-400">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
        <Award className="h-4 w-4 text-blue-400" />
        <span className="text-sm text-gray-400">FDA Approved</span>
        </div>
        </div>
        </div>
        </div>
        </div>
        </footer>
    );
}
