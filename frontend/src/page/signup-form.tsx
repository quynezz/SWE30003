import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import google from "@/assets/google.png";
import pic2 from "@/assets/pic2.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Loader2 } from "lucide-react";

export function SignUpForm({ className, ...props }) {
    const containerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.5,
            },
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    const formVariants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const toast = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const validateForm = () => {
        const newErrors = { name: "", email: "", password: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be 6+ characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Sign up successful! Redirecting to login...',
                life: 2000,
            });
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Sign up failed. Please try again.',
                life: 2000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setIsGoogleLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Google sign up successful! Redirecting...',
                life: 2000,
            });
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Google sign up failed. Please try again.',
                life: 2000,
            });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 p-2 sm:p-4"
        >
            <Toast ref={toast} />
            <div className="grid w-full max-w-5xl lg:grid-cols-2 gap-4 h-[90vh] max-h-[800px]">
                {/* Form */}
                <motion.div
                    className="flex items-center justify-center p-2 sm:p-4"
                    variants={formVariants}
                >
                    <div className="w-full max-w-sm bg-white shadow-lg rounded-xl border border-gray-100">
                        <div className="p-4 sm:p-6">
                            <motion.form
                                variants={formVariants}
                                className={cn("flex flex-col gap-3", className)}
                                onSubmit={handleSubmit}
                                {...props}
                            >
                                <motion.div variants={itemVariants} className="text-center">
                                    <h1 className="text-lg sm:text-xl font-bold text-gray-800">Create Account</h1>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Join Long Chau for quality healthcare
                                    </p>
                                </motion.div>

                                <motion.div variants={itemVariants} className="grid gap-3">
                                    <div className="grid gap-1">
                                        <Label htmlFor="name" className="text-xs font-medium text-gray-700">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={cn("text-xs h-8", errors.name && "border-red-500 focus:ring-red-500")}
                                            aria-invalid={!!errors.name}
                                            aria-describedby="name-error"
                                            disabled={isLoading || isGoogleLoading}
                                        />
                                        {errors.name && (
                                            <p id="name-error" className="text-[10px] text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-1">
                                        <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={cn("text-xs h-8", errors.email && "border-red-500 focus:ring-red-500")}
                                            aria-invalid={!!errors.email}
                                            aria-describedby="email-error"
                                            disabled={isLoading || isGoogleLoading}
                                        />
                                        {errors.email && (
                                            <p id="email-error" className="text-[10px] text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-1">
                                        <Label htmlFor="password" className="text-xs font-medium text-gray-700">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={cn("text-xs h-8", errors.password && "border-red-500 focus:ring-red-500")}
                                            aria-invalid={!!errors.password}
                                            aria-describedby="password-error"
                                            disabled={isLoading || isGoogleLoading}
                                        />
                                        {errors.password && (
                                            <p id="password-error" className="text-[10px] text-red-600">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs rounded-lg h-8"
                                        disabled={isLoading || isGoogleLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                                Signing Up...
                                            </>
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </Button>

                                    <div className="relative text-center">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <span className="relative bg-white px-2 text-[10px] text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 text-xs h-8"
                                        onClick={handleGoogleSignUp}
                                        disabled={isLoading || isGoogleLoading}
                                    >
                                        {isGoogleLoading ? (
                                            <>
                                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                                Connecting...
                                            </>
                                        ) : (
                                            <>
                                                <img src={google} className="h-3 w-3 mr-1" alt="Google" />
                                                Sign up with Google
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                <motion.div variants={itemVariants} className="text-center text-[10px] text-gray-600">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-blue-600 hover:underline"
                                        aria-label="Sign in to existing account"
                                    >
                                        Sign in
                                    </Link>
                                </motion.div>
                            </motion.form>
                        </div>
                    </div>
                </motion.div>

                {/* Image */}
                <motion.div
                    className="hidden lg:block relative h-full bg-gray-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <img
                        src={pic2}
                        alt="Pharmacy background"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-600/30"></div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .max-w-sm {
                        max-width: 100%;
                    }
                    .p-4 {
                        padding: 0.75rem;
                    }
                    .text-xl {
                        font-size: 1.125rem;
                    }
                    .text-xs {
                        font-size: 0.75rem;
                    }
                    .h-8 {
                        height: 2rem;
                    }
                }
                @media (min-height: 800px) {
                    .h-[90vh] {
                        height: 100vh;
                    }
                }
            `}</style>
        </motion.div>
    );
}
