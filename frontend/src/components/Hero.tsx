import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Truck, Shield, Clock, Star, ArrowRight, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Hero() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const videoRef = useRef(null);

    // Video source from Pexels (free stock video)
    const videoSrc = "https://videos.pexels.com/video-files/855913/855913-hd_1920_1080_30fps.mp4";
    const fallbackImageSrc = "https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00025_5c3443a908.jpg";

    // Intersection Observer to detect when section is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (entry.isIntersecting && videoRef.current) {
                    videoRef.current.play();
                    setIsVideoPlaying(true);
                } else if (videoRef.current) {
                    videoRef.current.pause();
                    setIsVideoPlaying(false);
                }
            },
            {
                threshold: 0.2, // Trigger when 20% of the section is visible
            }
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

    const stats = [
        { number: "2M+", label: "Customers Served" },
        { number: "50K+", label: "Medicines Available" },
        { number: "4.9★", label: "Customer Rating" },
        { number: "24/7", label: "Support Available" }
    ];

    const features = [
        {
            icon: <Shield className="h-5 w-5" />,
            text: "Licensed & Certified Pharmacy",
            accent: "text-green-600"
        },
        {
            icon: <Truck className="h-5 w-5" />,
            text: "Free delivery over 300,000₫",
            accent: "text-blue-600"
        },
        {
            icon: <Clock className="h-5 w-5" />,
            text: "2-4 hours delivery in HCM",
            accent: "text-purple-600"
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden flex items-center"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-24 -right-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl ${isVisible ? 'animate-pulse' : ''}`}></div>
                <div className={`absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl ${isVisible ? 'animate-pulse delay-1000' : ''}`}></div>
                <div className={`absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-100/20 rounded-full blur-2xl ${isVisible ? 'animate-pulse delay-500' : ''}`}></div>
            </div>

            {/* Floating Elements */}
            <div className={`absolute top-20 right-20 ${isVisible ? 'animate-bounce delay-300' : ''}`}>
                <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-500" />
                </div>
            </div>
            <div className={`absolute bottom-32 left-16 ${isVisible ? 'animate-bounce delay-700' : ''}`}>
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-500" />
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 relative z-10 flex items-center h-full">
                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                    {/* Left Content */}
                    <div className="space-y-6">
                        {/* Badge with animation */}
                        <div className={`inline-flex items-center space-x-2 ${isVisible ? 'animate-fadeInUp' : ''}`}>
                            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 text-sm font-medium shadow-lg">
                                🏆 Vietnam's #1 Online Pharmacy
                            </Badge>
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-sm text-gray-600 ml-2">4.9/5</span>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <div className={`space-y-4 ${isVisible ? 'animate-fadeInUp delay-200' : ''}`}>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Your Health,{" "}
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                    Our Priority
                                </span>
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
                        </div>

                        {/* Description */}
                        <p className={`text-base text-gray-700 leading-relaxed max-w-md ${isVisible ? 'animate-fadeInUp delay-300' : ''}`}>
                            Experience healthcare made simple with Vietnam's most trusted online pharmacy.
                            Join over <span className="font-bold text-blue-600">2 million customers</span> who
                            choose us for safe, convenient, and reliable medical care.
                        </p>

                        {/* Action Buttons */}
                        <div className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fadeInUp delay-400' : ''}`}>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                                onClick={() => window.location.href = '/products'}
                            >
                                Shop Medicines
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                                onClick={() => window.location.href = '/prescription'}
                            >
                                Upload Prescription
                            </Button>
                        </div>

                        {/* Features */}
                        <div className={`space-y-3 ${isVisible ? 'animate-fadeInUp delay-500' : ''}`}>
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3 text-gray-700">
                                    <div className={`${feature.accent} bg-gray-50 rounded-full p-2`}>
                                        {feature.icon}
                                    </div>
                                    <span className="text-sm font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Video */}
                    <div className={`relative ${isVisible ? 'animate-fadeInUp delay-300' : ''}`}>
                        {/* Video Container */}
                        <div className="relative group">
                            <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl transform rotate-3 ${isVisible ? 'group-hover:rotate-6' : ''} transition-transform duration-500`}></div>
                            <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-3 ${isVisible ? 'group-hover:rotate-0' : ''} transition-transform duration-500`}>
                                <div className="aspect-[4/3] relative">
                                    <video
                                        ref={videoRef}
                                        src={videoSrc}
                                        poster={fallbackImageSrc}
                                        loop
                                        muted
                                        className="w-full h-full object-cover"
                                        onError={() => {
                                            setIsVideoPlaying(false);
                                        }}
                                    />
                                    {/* Play/Pause Button Overlay */}
                                    <div
                                        className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 cursor-pointer ${isVideoPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                                        onClick={() => {
                                            if (videoRef.current) {
                                                if (isVideoPlaying) {
                                                    videoRef.current.pause();
                                                    setIsVideoPlaying(false);
                                                } else {
                                                    videoRef.current.play();
                                                    setIsVideoPlaying(true);
                                                }
                                            }
                                        }}
                                    >
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                                            <Play className={`h-6 w-6 text-blue-600 ${isVideoPlaying ? 'hidden' : 'block'} ml-1`} />
                                            <svg className={`h-6 w-6 text-blue-600 ${isVideoPlaying ? 'block' : 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Cards */}
                        <div className={`absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-4 max-w-xs ${isVisible ? 'animate-fadeInUp delay-700' : ''}`}>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <Truck className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">Fast Delivery</p>
                                    <p className="text-xs text-gray-600">2-4 hours in HCM City</p>
                                    <div className="flex items-center mt-1">
                                        <div className={`w-2 h-2 bg-green-500 rounded-full ${isVisible ? 'animate-pulse' : ''}`}></div>
                                        <span className="text-xs text-green-600 ml-2 font-medium">Live tracking</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`absolute -top-5 -right-8 bg-white rounded-2xl shadow-xl p-3 ${isVisible ? 'animate-fadeInUp delay-800' : ''}`}>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">24/7 Support</p>
                                    <div className="flex items-center">
                                        <div className={`w-2 h-2 bg-green-500 rounded-full ${isVisible ? 'animate-pulse' : ''}`}></div>
                                        <span className="text-xs text-gray-600 ml-2">Online now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-600 { animation-delay: 0.6s; }
                .delay-700 { animation-delay: 0.7s; }
                .delay-800 { animation-delay: 0.8s; }
                .delay-900 { animation-delay: 0.9s; }
            `}</style>
        </section>
    );
}
