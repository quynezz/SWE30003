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

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const containerVariants = {
        initial: { opacity: 0, x: -100 },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8,
            },
        },
        exit: { opacity: 0, x: 100, transition: { duration: 0.5 } },
    };

    const formVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const toast = useRef<Toast>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValidEmail = validateEmail(email);
        if (isValidEmail && password.length >= 6) {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Login successful! Redirecting to home page...',
                life: 3000,
            });
            setTimeout(() => {
                window.location.href = '/products';
            }, 3000);
        } else {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Invalid email or password must be at least 6 characters!',
                life: 3000,
            });
            setEmailError(!isValidEmail);
        }
    };

    return (
        <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-screen w-screen overflow-hidden flex items-center justify-center"
        >
        <Toast ref={toast} />
        <div className="grid h-full w-full lg:grid-cols-2">
        {/* Left side: Form */}
        <div className="flex flex-col gap-4 p-6 md:p-8 lg:p-10 justify-center items-center">
        <div className="flex flex-1 items-center justify-center w-full">
        <div className="border border-black p-6 md:p-8 rounded-2xl bg-white shadow-md max-w-md w-full">
        <motion.form
        variants={formVariants}
        initial="initial"
        animate="animate"
        className={cn("flex flex-col gap-4 w-full", className)}
        onSubmit={handleSubmit}
        {...props}
        >
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold">Sign in to your account</h1>
        <p className="text-muted-foreground text-xs text-balance">
        Enter your email below to login to your account
        </p>
        </motion.div>
        <motion.div variants={itemVariants} className="grid gap-4 w-full">
        <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
        id="email"
        type="email"
        placeholder="m@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={emailError ? "border-red-500" : ""}
        />
        </div>
        <div className="grid gap-2">
        <div className="flex items-center">
        <Label htmlFor="password">Password</Label>
        <a
        href="#"
        className="ml-auto text-xs underline-offset-4 hover:underline"
        >
        Forgot your password?
        </a>
        </div>
        <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={password.length < 6 && email && !validateEmail(email) ? "border-red-500" : ""}
        />
        </div>
        <Button type="submit" className="w-full text-sm">
        <Link to="/home">Sign in</Link>
        </Button>
        <div className="after:border-border relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t w-full">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
        Or continue with
        </span>
        </div>
        <Button variant="outline" className="w-full text-sm">
        <img src={google} className="size-4" alt="google" />
        Sign in with Gmail
        </Button>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center text-xs w-full">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
        Sign up
        </Link>
        </motion.div>
        </motion.form>
        </div>
        </div>
        </div>

        {/* Right side: Image */}
        <div className="bg-muted relative hidden lg:block h-full w-full">
        <img
        src={pic1}
        alt="pic1"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        </div>
        </div>
        </motion.div>
    );
}
