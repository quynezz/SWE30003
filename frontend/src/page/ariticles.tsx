import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ShoppingCart, Bookmark, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.jpg";
import pic4 from "@/assets/pic4.jpg";
import pic5 from "@/assets/pic5.jpg";
import pic6 from "@/assets/pic6.jpg";
import pic7 from "@/assets/pic7.jpg";

export function ArticlePage() {
    const { articleId } = useParams(); // Get article ID from URL
    const toast = useRef(null);
    const [savedArticles, setSavedArticles] = useState(() => {
        const saved = localStorage.getItem("savedArticles");
        return saved ? JSON.parse(saved) : [];
    });
    const [cartCount, setCartCount] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            const items = JSON.parse(savedCart);
            return items.reduce((sum: any, item: any) => sum + (item.quantity || 1), 0);
        }
        return 0;
    });

    const articles = [
        {
            id: "vitamins",
            title: "10 Essential Vitamins for Daily Health",
            category: "Nutrition",
            readTime: "5 min read",
            image: pic4,
            gradient: "from-blue-500 to-cyan-500 PropTypes.element",
            excerpt: "Discover the most important vitamins your body needs every day for optimal health and wellness.",
            content: [
                {
                    heading: "Introduction to Vitamins",
                    text: "Vitamins are organic compounds that our bodies need in small amounts to function properly. They play critical roles in metabolism, immunity, and overall health. This article explores the 10 essential vitamins you should incorporate into your daily routine."
                },
                {
                    heading: "Key Vitamins for Health",
                    text: "1. **Vitamin A**: Supports vision and skin health. Found in carrots, sweet potatoes, and spinach.\n2. **Vitamin C**: Boosts immunity and skin repair. Available in citrus fruits and bell peppers.\n3. **Vitamin D**: Enhances bone health and immunity. Get it from sunlight and fortified dairy.\n4. **Vitamin E**: Protects cells from damage. Found in nuts and seeds.\n5. **Vitamin K**: Essential for blood clotting. Available in leafy greens.\n6. **B Vitamins (B1, B2, B3, B5, B6, B7, B9, B12)**: Support energy production and brain function. Found in whole grains, eggs, and meat.\n7. **Vitamin B12**: Crucial for nerve function and red blood cell production, especially for vegetarians."
                },
                {
                    heading: "How to Incorporate Vitamins",
                    text: "A balanced diet is the best way to get these vitamins, but supplements can help if dietary intake is insufficient. Consult a healthcare provider before starting any supplement regimen."
                }
            ]
        },
        {
            id: "diabetes",
            title: "Managing Diabetes: A Complete Guide",
            category: "Health Management",
            readTime: "8 min read",
            image: pic5,
            gradient: "from-green-500 to-emerald-500",
            excerpt: "Learn effective strategies for managing diabetes through medication, diet, and lifestyle changes.",
            content: [
                {
                    heading: "Understanding Diabetes",
                    text: "Diabetes is a chronic condition where the body cannot properly regulate blood sugar levels. Type 1 diabetes is autoimmune, while Type 2 is often lifestyle-related. Effective management can improve quality of life."
                },
                {
                    heading: "Diet and Nutrition",
                    text: "Focus on low-glycemic foods like whole grains, vegetables, and lean proteins. Avoid sugary drinks and processed carbs. Monitor portion sizes and maintain a consistent eating schedule."
                },
                {
                    heading: "Lifestyle Changes",
                    text: "Regular exercise, such as 30 minutes of walking daily, improves insulin sensitivity. Stress management techniques like yoga and meditation can also help. Regular check-ups with your doctor are crucial."
                }
            ]
        },
        {
            id: "heart-health",
            title: "Heart Health: Prevention Tips",
            category: "Cardiovascular",
            readTime: "6 min read",
            image: pic6,
            gradient: "from-red-500 to-orange-500",
            excerpt: "Simple yet effective ways to maintain a healthy heart and prevent cardiovascular diseases.",
            content: [
                {
                    heading: "Why Heart Health Matters",
                    text: "Cardiovascular diseases are a leading cause of death globally. Preventive measures can significantly reduce your risk and improve heart function."
                },
                {
                    heading: "Prevention Strategies",
                    text: "1. **Healthy Diet**: Eat heart-healthy foods like fatty fish, nuts, and whole grains. Limit saturated fats and sodium.\n2. **Exercise**: Aim for at least 150 minutes of moderate aerobic activity per week.\n3. **Quit Smoking**: Smoking damages blood vessels and increases heart disease risk.\n4. **Regular Check-ups**: Monitor cholesterol and blood pressure regularly."
                },
                {
                    heading: "Supplements for Heart Health",
                    text: "Omega-3 fatty acids and CoQ10 may support heart health. Always consult a healthcare professional before adding supplements."
                }
            ]
        },
        {
            id: "immunity",
            title: "Boost Your Immune System Naturally",
            category: "Immunity",
            readTime: "4 min read",
            image: pic7,
            gradient: "from-purple-500 to-indigo-500",
            excerpt: "Natural methods and supplements to strengthen your immune system year-round.",
            content: [
                {
                    heading: "The Importance of Immunity",
                    text: "A strong immune system helps your body fight off infections and stay healthy. Natural methods can enhance your body's defenses."
                },
                {
                    heading: "Natural Boosters",
                    text: "1. **Nutrition**: Eat foods rich in Vitamin C (citrus fruits), Vitamin D (fish), and zinc (nuts, seeds).\n2. **Sleep**: Aim for 7-8 hours of quality sleep nightly.\n3. **Hydration**: Drink plenty of water to support bodily functions.\n4. **Exercise**: Moderate physical activity boosts immune response."
                },
                {
                    heading: "Supplements",
                    text: "Consider probiotics and elderberry supplements for additional immune support. Consult a doctor to ensure they are safe for you."
                }
            ]
        }
    ];

    const article = articles.find((a) => a.id === articleId) || articles[0]; // Fallback to first article if ID not found

    const toggleSaveArticle = (id: any) => {
        setSavedArticles((prev: any) => {
            const newSaved = prev.includes(id)
                ? prev.filter((articleId: any) => articleId !== id)
                : [...prev, id];
            localStorage.setItem("savedArticles", JSON.stringify(newSaved));
            toast.current?.show({
                severity: newSaved.includes(id) ? 'success' : 'info',
                summary: newSaved.includes(id) ? 'Saved' : 'Unsaved',
                detail: newSaved.includes(id) ? 'Article saved successfully' : 'Article removed from saved',
                life: 2000,
            });
            return newSaved;
        });
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50/30">
            <Toast ref={toast} />
            <div className="w-full mx-auto flex flex-col">
                {/* Header */}
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
                <div className="flex-1 p-4 sm:p-6">
                    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-100">
                        <CardContent className="p-6 sm:p-8">
                            {/* Article Header */}
                            <div className="mb-6">
                                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm mb-4">
                                    <ArrowLeft className="h-4 w-4 mr-1" />
                                    Back to Health Tips
                                </Link>
                                <div className="relative">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-64 object-cover rounded-lg mb-4"
                                    />
                                    <Badge className={cn("absolute top-3 left-3 bg-gradient-to-r", article.gradient, "text-white font-semibold")}>
                                        {article.category}
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full"
                                        onClick={() => toggleSaveArticle(article.id)}
                                        aria-label={savedArticles.includes(article.id) ? "Unsave article" : "Save article"}
                                    >
                                        <Bookmark
                                            className={cn(
                                                "h-4 w-4",
                                                savedArticles.includes(article.id) ? "text-blue-600 fill-blue-600" : "text-gray-600"
                                            )}
                                        />
                                    </Button>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{article.title}</h1>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{article.readTime}</span>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="prose prose-sm sm:prose max-w-none">
                                <p className="text-gray-600 mb-6">{article.excerpt}</p>
                                {article.content.map((section, index) => (
                                    <div key={index} className="mb-6">
                                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{section.heading}</h2>
                                        <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Actions */}
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                                <Link to="/articles/health" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                                    <Button
                                        variant="outline"
                                        className="text-blue-600 hover:bg-blue-50 text-xs h-8"
                                        aria-label="Back to health tips"
                                    >
                                        Explore More Articles
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn("text-xs bg-gradient-to-r", article.gradient, "bg-clip-text text-transparent hover:underline")}
                                    onClick={() => toggleSaveArticle(article.id)}
                                    aria-label={savedArticles.includes(article.id) ? "Unsave article" : "Save article"}
                                >
                                    {savedArticles.includes(article.id) ? "Unsave Article" : "Save Article"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <style>{`
                .prose {
                    color: #1f2937;
                    line-height: 1.75;
                }
                .prose h2 {
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                }
                .prose p {
                    margin-bottom: 1em;
                }
                @media (max-width: 640px) {
                    .max-w-sm {
                        max-width: 100%;
                    }
                    .p-6 {
                        padding: 1rem;
                    }
                    .text-3xl {
                        font-size: 1.5rem;
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
                    .h-64 {
                        height: 12rem;
                    }
                }
            `}</style>
        </div>
    );
}
