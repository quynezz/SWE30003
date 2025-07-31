import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, MapPin, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { TrackingData } from "@/data/mockTrackingData";



export function Track() {
    const [orderId, setOrderId] = useState<string>("");
    const [trackingStatus, setTrackingStatus] = useState<any>(null);
    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Mock tracking data
    const mockTrackingData: any = TrackingData;

    // Handle tracking search
    const handleTrackOrder = () => {
        if (!orderId.trim() || !/^\d+$/.test(orderId)) {
            setError("Vui lòng nhập mã đơn hàng hợp lệ (chỉ chứa số)");
            setTrackingStatus(null);
            return;
        }
        const trackingInfo = mockTrackingData[orderId];
        if (trackingInfo) {
            setTrackingStatus(trackingInfo);
            setError("");
        } else {
            setError("Không tìm thấy đơn hàng với mã này");
            setTrackingStatus(null);
        }
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

    // Animation variants
    const containerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity:1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 relative overflow-hidden"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            ref={sectionRef}>

            <Navbar/>
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

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                {/* Header */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Theo Dõi{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Đơn Hàng
                        </span>
                    </h1>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                        Nhập mã đơn hàng của bạn để kiểm tra trạng thái giao hàng
                    </p>
                </motion.div>

                {/* Tracking Input */}
                <motion.div
                    variants={itemVariants}
                    className="max-w-md mx-auto mb-12"
                >
                    <Card className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        placeholder="Nhập mã đơn hàng (Thử từ 1-10)"
                                        value={orderId}
                                        onChange={(e) => {
                                            setOrderId(e.target.value);
                                            setError("");
                                        }}
                                        className="pl-10 pr-4 bg-white border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg"
                                    />
                                </div>
                                <Button
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                    onClick={handleTrackOrder}
                                >
                                    Theo dõi
                                </Button>
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Tracking Details */}
                {trackingStatus && (
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        className="grid lg:grid-cols-2 gap-8"
                    >
                        {/* Timeline */}
                        <Card className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg">
                            <CardContent className="p-6">
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-xl font-bold text-gray-900 mb-6"
                                >
                                    Trạng Thái Đơn Hàng #{trackingStatus.orderId}
                                </motion.h2>
                                <div className="space-y-6">
                                    {trackingStatus.steps.map((step: any, index: number) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="flex items-start"
                                        >
                                            <div className="flex flex-col items-center mr-4">
                                                <div
                                                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                                        step.completed
                                                            ? "bg-green-500 text-white"
                                                            : "bg-gray-200 text-gray-600"
                                                    }`}
                                                >
                                                    {step.completed ? (
                                                        <CheckCircle className="h-5 w-5" />
                                                    ) : (
                                                        <Clock className="h-5 w-5" />
                                                    )}
                                                </div>
                                                {index < trackingStatus.steps.length - 1 && (
                                                    <div
                                                        className={`h-12 w-1 mt-2 ${
                                                            step.completed ? "bg-green-500" : "bg-gray-200"
                                                        }`}
                                                    ></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{step.status}</p>
                                                <p className="text-sm text-gray-600">{step.date}</p>
                                                <p className="text-sm text-gray-600">{step.location}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.p
                                    variants={itemVariants}
                                    className="mt-6 text-sm text-gray-600"
                                >
                                    Dự kiến giao hàng: {trackingStatus.estimatedDelivery}
                                </motion.p>
                            </CardContent>
                        </Card>

                        {/* Mock Map */}
                        <Card className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg">
                            <CardContent className="p-6">
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-xl font-bold text-gray-900 mb-6"
                                >
                                    Vị Trí Giao Hàng
                                </motion.h2>
                                <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-50"></div>
                                    <MapPin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-red-500 animate-pulse" />
                                    <p className="absolute bottom-4 left-4 text-sm text-gray-800">
                                        {trackingStatus.steps[trackingStatus.steps.length - 1].location || "Đang cập nhật"}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>

            {/* Floating Elements */}
            <div
                className={`absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
            ></div>
            <div
                className={`absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isVisible ? 'animate-pulse' : ''}`}
            ></div>

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
                    max-width: 1280px;
                }

                @media (max-width: 640px) {
                    .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    h1 {
                        font-size: 2rem;
                    }
                    .lg\\:grid-cols-2 {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </motion.div>
    );
}
