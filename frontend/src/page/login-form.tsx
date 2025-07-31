import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import google from "@/assets/google.png";
import pic1 from "@/assets/pic1.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";



export function LoginForm({ className, ...props }) {
    const containerVariants = {
        initial: { opacity: 0, y: 50 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.6,
            },
        },
        exit: { opacity: 0, y: -50, transition: { duration: 0.4 } },
    };

    const formVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const toast = useRef(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const validateForm = () => {
        const newErrors = { email: "", password: "" };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Real-time validation
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Login successful! Redirecting to home page...',
                life: 3000,
            });
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Login failed. Please try again.',
                life: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        try {
            // Simulate Google OAuth
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Google login successful! Redirecting...',
                life: 3000,
            });
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Google login failed. Please try again.',
                life: 3000,
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
            className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 p-4"
        >
            <Toast ref={toast} />
            <div className="grid w-full max-w-7xl lg:grid-cols-2 gap-6">
                {/* Left side: Form */}
                <motion.div
                    className="flex items-center justify-center p-4 sm:p-6 lg:p-8"
                    variants={formVariants}
                >
                    <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-100">
                        <CardContent className="p-6 sm:p-8">
                            <motion.form
                                variants={formVariants}
                                className={cn("flex flex-col gap-5", className)}
                                onSubmit={handleSubmit}
                                {...props}
                            >
                                <motion.div variants={itemVariants} className="text-center">
                                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Sign in to access your Long Chau account
                                    </p>
                                </motion.div>

                                <motion.div variants={itemVariants} className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={cn("text-sm", errors.email && "border-red-500 focus:ring-red-500")}
                                            aria-invalid={!!errors.email}
                                            aria-describedby="email-error"
                                            disabled={isLoading}
                                        />
                                        {errors.email && (
                                            <p id="email-error" className="text-xs text-red-600 mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                                Password
                                            </Label>
                                            <Link
                                                to="/forgot-password"
                                                className="text-xs text-blue-600 hover:underline"
                                                aria-label="Forgot password"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={cn("text-sm", errors.password && "border-red-500 focus:ring-red-500")}
                                            aria-invalid={!!errors.password}
                                            aria-describedby="password-error"
                                            disabled={isLoading}
                                        />
                                        {errors.password && (
                                            <p id="password-error" className="text-xs text-red-600 mt-1">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm rounded-lg h-10"
                                        disabled={isLoading || isGoogleLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                Signing In...
                                            </>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </Button>

                                    <div className="relative text-center">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <span className="relative bg-white px-2 text-xs text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 text-sm h-10"
                                        onClick={handleGoogleLogin}
                                        disabled={isLoading || isGoogleLoading}
                                    >
                                        {isGoogleLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                Connecting...
                                            </>
                                        ) : (
                                            <>
                                                <img src={google} className="h-4 w-4 mr-2" alt="Google" />
                                                Sign in with Google
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                <motion.div variants={itemVariants} className="text-center text-xs text-gray-600">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/signup"
                                        className="text-blue-600 hover:underline"
                                        aria-label="Sign up for a new account"
                                    >
                                        Sign up
                                    </Link>
                                </motion.div>
                            </motion.form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Right side: Image */}
                <motion.div
                    className="hidden lg:block relative h-full bg-gray-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img
                        src={pic1}
                        alt="Pharmacy background"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-600/30"></div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .max-w-md {
                        max-width: 100%;
                    }
                    .p-6 {
                        padding: 1rem;
                    }
                    .text-2xl {
                        font-size: 1.5rem;
                    }
                    .text-sm {
                        font-size: 0.875rem;
                    }
                    .h-10 {
                        height: 2.25rem;
                    }
                }
            `}</style>
        </motion.div>
    );
}
