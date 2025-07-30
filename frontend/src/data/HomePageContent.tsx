import {
  Users,
  FileText,
  Stethoscope,
  Truck,
  Shield,
  MapPin,
  Clock,
  Pill,
} from "lucide-react";

export const healthTips = [
  {
    id: 1,
    title: "10 Essential Vitamins for Daily Health",
    category: "Nutrition",
    readTime: "5 min read",
    img: "/placeholder.svg?height=200&width=300",
    excerpt:
      "Discover the most important vitamins your body needs every day for optimal health and wellness.",
  },
  {
    id: 2,
    title: "Managing Diabetes: A Complete Guide",
    category: "Health Management",
    readTime: "8 min read",
    img: "/placeholder.svg?height=200&width=300",
    excerpt:
      "Learn effective strategies for managing diabetes through medication, diet, and lifestyle changes.",
  },
  {
    id: 3,
    title: "Heart Health: Prevention Tips",
    category: "Cardiovascular",
    readTime: "6 min read",
    img: "/placeholder.svg?height=200&width=300",
    excerpt:
      "Simple yet effective ways to maintain a healthy heart and prevent cardiovascular diseases.",
  },
  {
    id: 4,
    title: "Boost Your Immune System Naturally",
    category: "Immunity",
    readTime: "4 min read",
    img: "/placeholder.svg?height=200&width=300",
    excerpt:
      "Natural methods and supplements to strengthen your immune system year-round.",
  },
];
export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    rating: 5,
    comment:
      "Long Chau has been my go-to pharmacy for years. Their online service is incredibly convenient and the delivery is always on time.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Healthcare Professional",
    rating: 5,
    comment:
      "I recommend Long Chau to my patients. They have a wide selection of quality medications and knowledgeable pharmacists.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Mother of 2",
    rating: 5,
    comment:
      "The prescription upload feature is a game-changer for busy parents. Quick, easy, and reliable service every time.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
];

export const services = [
  {
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    title: "Prescription Services",
    description:
      "Upload prescriptions online and get medications delivered to your door",
    features: [
      "Digital prescription upload",
      "Pharmacist consultation",
      "Insurance coverage check",
    ],
  },
  {
    icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
    title: "Health Consultations",
    description:
      "Get expert advice from licensed pharmacists and healthcare professionals",
    features: [
      "Free health consultations",
      "Medication reviews",
      "Health screenings",
    ],
  },
  {
    icon: <Truck className="h-8 w-8 text-blue-600" />,
    title: "Fast Delivery",
    description: "Same-day delivery available in major cities across Vietnam",
    features: [
      "2-4 hour delivery",
      "Temperature-controlled transport",
      "Real-time tracking",
    ],
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Quality Assurance",
    description:
      "All medications are sourced from certified manufacturers and suppliers",
    features: [
      "FDA approved products",
      "Batch tracking",
      "Expiry date monitoring",
    ],
  },
];

export const stats = [
  {
    number: "500+",
    label: "Store Locations",
    icon: <MapPin className="h-6 w-6" />,
  },
  {
    number: "2M+",
    label: "Happy Customers",
    icon: <Users className="h-6 w-6" />,
  },
  {
    number: "50K+",
    label: "Products Available",
    icon: <Pill className="h-6 w-6" />,
  },
  {
    number: "24/7",
    label: "Customer Support",
    icon: <Clock className="h-6 w-6" />,
  },
];

export const promotions = [
  {
    id: 1,
    title: "New Customer Special",
    discount: "20% OFF",
    description: "Get 20% off your first order over 200,000₫",
    code: "WELCOME20",
    validUntil: "Dec 31, 2024",
    color: "bg-gradient-to-r from-blue-500 to-purple-600",
  },
  {
    id: 2,
    title: "Free Delivery Week",
    discount: "FREE SHIPPING",
    description: "Free delivery on all orders this week",
    code: "FREESHIP",
    validUntil: "Dec 25, 2024",
    color: "bg-gradient-to-r from-blue-500 to-teal-600",
  },
  {
    id: 3,
    title: "Vitamin Bundle Deal",
    discount: "Buy 2 Get 1",
    description: "Special offer on all vitamin supplements",
    code: "VITAMIN3",
    validUntil: "Jan 15, 2025",
    color: "bg-gradient-to-r from-blue-500 to-indigo-600",
  },
];
