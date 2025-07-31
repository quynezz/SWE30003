import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Bell, ShoppingCart, CheckCircle, Package, Star, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function NotificationPage() {
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

    const itemVariants = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const toast = useRef(null);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [cartCount, setCartCount] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            const items = JSON.parse(savedCart);
            return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        }
        return 0;
    });

    const notifications = [
        {
            id: 1,
            type: "Order",
            message: "Your order #LC12345 has been shipped!",
            timestamp: "2025-07-31 14:30",
            isRead: false,
            status: "PENDING",
            icon: <Package className="h-4 w-4 text-blue-600" />,
        },
        {
            id: 2,
            type: "Promotion",
            message: "Get 20% off on all vitamins this week!",
            timestamp: "2025-07-31 09:15",
            isRead: true,
            status: "DONE",
            icon: <Star className="h-4 w-4 text-yellow-500" />,
        },
        {
            id: 3,
            type: "System",
            message: "Your prescription upload was successful.",
            timestamp: "2025-07-30 16:45",
            isRead: false,
            status: "DONE",
            icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        },
        {
            id: 4,
            type: "Order",
            message: "Order #LC12344 is out for delivery.",
            timestamp: "2025-07-30 10:00",
            isRead: true,
            status: "REJECTED",
            icon: <Package className="h-4 w-4 text-blue-600" />,
        },
    ];

    const filters = ["All", "Order", "Promotion", "System"];

    const filteredNotifications = selectedFilter === "All"
        ? notifications
        : notifications.filter((notif) => notif.type === selectedFilter);

    const handleMarkAsRead = (id) => {
        toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Notification marked as read',
            life: 2000,
        });
    };

    const handleMarkAllRead = () => {
        toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'All notifications marked as read',
            life: 2000,
        });
    };

    // Define background colors for notification types and statuses
    const typeStyles = {
        Order: "bg-blue-50 border-blue-100",
        Promotion: "bg-yellow-50 border-yellow-100",
        System: "bg-green-50 border-green-100",
    };

    const statusStyles = {
        DONE: "bg-green-100 text-green-800",
        PENDING: "bg-yellow-100 text-yellow-800",
        REJECTED: "bg-red-100 text-red-800",
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50/30 sm:p-4"
        >
            <Toast ref={toast} />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Long Chau Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Long Chau
              </span>
            </Link>
          </div>
          <div className="relative">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="hover:bg-blue-50">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>
                {/* Main Content */}
                <motion.div
                    className="flex-1 flex items-center justify-center p-2 sm:p-4"
                    variants={containerVariants}
                >
                    <Card className="w-full max-w-sm sm:max-w-md bg-white shadow-lg rounded-xl border border-gray-100">
                        <CardContent className="p-4 sm:p-6">
                            <motion.div variants={itemVariants} className="text-center mb-4">
                                <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                                    <Bell className="h-5 w-5 text-blue-600" />
                                    Notifications
                                </h1>
                                <p className="text-xs text-gray-600 mt-1">
                                    Stay updated with your orders and promotions
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="relative w-32">
                                        <select
                                            value={selectedFilter}
                                            onChange={(e) => setSelectedFilter(e.target.value)}
                                            className="w-full p-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-blue-50"
                                            aria-label="Filter notifications"
                                        >
                                            {filters.map((filter) => (
                                                <option key={filter} value={filter}>
                                                    {filter}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs text-blue-600 hover:bg-blue-50 h-8"
                                        onClick={handleMarkAllRead}
                                        aria-label="Mark all notifications as read"
                                    >
                                        Mark All Read
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                className="space-y-3 max-h-[50vh] overflow-y-auto scrollbar-thin"
                                variants={itemVariants}
                            >
                                {filteredNotifications.length === 0 ? (
                                    <motion.div
                                        variants={itemVariants}
                                        className="text-center py-4"
                                    >
                                        <p className="text-xs text-gray-600">No notifications found.</p>
                                        <Button
                                            variant="outline"
                                            className="mt-2 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs h-8"
                                            onClick={() => setSelectedFilter("All")}
                                        >
                                            Clear Filter
                                        </Button>
                                    </motion.div>
                                ) : (
                                    filteredNotifications.map((notif, index) => (
                                        <motion.div
                                            key={notif.id}
                                            variants={itemVariants}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Card className={cn(
                                                "p-3 flex items-start gap-3",
                                                notif.isRead ? typeStyles[notif.type] : cn(typeStyles[notif.type], "border-opacity-50")
                                            )}>
                                                <div className="mt-1">{notif.icon}</div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-medium text-gray-800">{notif.message}</p>
                                                    <p className="text-[10px] text-gray-500">{notif.timestamp}</p>
                                                    {!notif.isRead && (
                                                        <Button
                                                            variant="link"
                                                            size="sm"
                                                            className="text-xs text-blue-600 p-0 h-auto"
                                                            onClick={() => handleMarkAsRead(notif.id)}
                                                            aria-label={`Mark notification ${notif.message} as read`}
                                                        >
                                                            Mark as Read
                                                        </Button>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Badge className={cn("text-[10px]", statusStyles[notif.status])}>
                                                        {notif.status}
                                                    </Badge>
                                                    <Badge className="text-[10px] bg-blue-100 text-blue-800">
                                                        {notif.type}
                                                    </Badge>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))
                                )}
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <style>{`
                .scrollbar-thin {
                    scrollbar-width: thin;
                    scrollbar-color: #bfdbfe #f1f5f9;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 3px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #bfdbfe;
                    border-radius: 3px;
                }
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
