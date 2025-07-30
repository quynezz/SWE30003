import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import google from "@/assets/google.png";
import pic2 from "@/assets/pic2.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState, useRef } from 'react'; // Added useRef
import { Toast } from 'primereact/toast';

export function SignUpForm({ className, ...props }: React.ComponentProps<"form">) {
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
    const [name, setName] = useState("");
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
        if (isValidEmail && name && password.length >= 6) {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Sign up successful!, Redirecting to login page...',
                life: 3000,
            });
            setTimeout(() => {
                window.location.href = '/login';
            }
            , 3000);
        } else {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Invalid email, name is required, or password must be at least 6 characters!',
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
        <h1 className="text-xl font-bold">Create your new account</h1>
        <p className="text-muted-foreground text-xs text-balance">
        Enter your details below to sign up
        </p>
        </motion.div>
        <motion.div variants={itemVariants} className="grid gap-4 w-full">
        <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
        id="name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={!name && email && !validateEmail(email) ? "border-red-500" : ""}
        />
        </div>
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
        <Label htmlFor="password">Password</Label>
        <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={password.length < 6 && email && !validateEmail(email) ? "border-red-500" : ""}
        />
        </div>
        <Button type="submit" className="w-full text-sm">
        Sign up
        </Button>
        <div className="after:border-border relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t w-full">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
        Or continue with
        </span>
        </div>
        <Button variant="outline" className="w-full text-sm">
        <img src={google} className="size-4" alt="google" />
        Sign up with Gmail
        </Button>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center text-xs w-full">
        Don&apos;t have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
        Sign in
        </Link>
        </motion.div>
        </motion.form>
        </div>
        </div>
        </div>

        {/* Right side: Image */}
        <div className="bg-muted relative hidden lg:block h-full w-full">
        <img
        src={pic2}
        alt="pic2"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        </div>
        </div>
        </motion.div>
    );
}
