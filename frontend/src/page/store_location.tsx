import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, MapPin, Phone, Clock, Navigation, ShoppingCart, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";

export function StoreLocationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("All Services");
  const [cartCount] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      return items.reduce((sum: any, item: any) => sum + (item.quantity || 1), 0);
    }
    return 0;
  });

  const stores = [
    {
      id: 1,
      name: "Long Chau District 1",
      address: "123 Nguyen Hue St, District 1, Ho Chi Minh City",
      phone: "(028) 3822 1234",
      hours: "8:00 AM - 10:00 PM",
      services: ["Pharmacy", "Consultation", "Delivery"],
      distance: "1.2 km",
      isOpen: true,
    },
    {
      id: 2,
      name: "Long Chau Binh Thanh",
      address: "456 Xo Viet Nghe Tinh St, Binh Thanh District, Ho Chi Minh City",
      phone: "(028) 3899 5678",
      hours: "7:00 AM - 11:00 PM",
      services: ["Pharmacy", "Health Check", "Vaccination"],
      distance: "2.8 km",
      isOpen: true,
    },
    {
      id: 3,
      name: "Long Chau Thu Duc",
      address: "789 Vo Van Ngan St, Thu Duc City, Ho Chi Minh City",
      phone: "(028) 3123 9876",
      hours: "8:00 AM - 9:00 PM",
      services: ["Pharmacy", "Consultation"],
      distance: "5.1 km",
      isOpen: false,
    },
  ];

  // Extract unique services
  const services = ["All Services", ...Array.from(new Set(stores.flatMap((store) => store.services)))].sort();

  // Filter stores by search query and service
  const filteredStores = stores.filter(
    (store) =>
      (store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedService === "All Services" || store.services.includes(selectedService))
  );

  // Handle service filter change
  const handleServiceChange = (e: any) => {
    setSelectedService(e.target.value);
  };

  // Simulate geolocation-based sorting
  const handleLocateMe = () => {
    alert("Simulating geolocation: Sorting stores by proximity.");
    // In a real app, this would use navigator.geolocation and sort by actual distance
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
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
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for stores or addresses..."
                  className="pl-10 w-56 sm:w-72 border-none focus:ring-2 focus:ring-blue-500 rounded-full text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search for stores"
                />
              </div>
              <Link to="/cart" className="relative">
                <Button variant="outline" size="icon" className="hover:bg-blue-50">
                  <ShoppingCart className="h-4 w-4 text-gray-600" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white h-4 w-4 flex items-center justify-center rounded-full animate-pulse text-[10px]">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">Find a Long Chau Store</h1>
          <p className="text-sm text-gray-600 mb-5">
            Locate the nearest store for consultations and quality products
          </p>

          {/* Search and Filter */}
          <div className="max-w-md mx-auto space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter location or store name"
                className="pl-10 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full text-xs h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search for stores"
              />
            </div>
            <div className="relative">
              <select
                value={selectedService}
                onChange={handleServiceChange}
                className="w-full p-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer hover:bg-blue-50 transition-colors"
                aria-label="Select store service"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg h-9"
              onClick={handleLocateMe}
              aria-label="Find stores near me"
            >
              <MapPin className="h-4 w-4 mr-1" />
              Find Near Me
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Map Placeholder */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-64 lg:h-[500px] rounded-xl shadow-md border border-gray-200">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                    <p className="text-sm text-gray-700 font-medium">Interactive Map</p>
                    <p className="text-xs text-gray-500">Map integration will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Store List */}
          <motion.div
            className="order-1 lg:order-2 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md py-2 z-10">
              <h2 className="text-lg font-semibold text-gray-800">Stores Near You</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                {filteredStores.length} stores
              </Badge>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin">
              {filteredStores.map((store, index) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-200 rounded-xl border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-base text-gray-800">{store.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              className={cn(
                                store.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                                "text-xs"
                              )}
                            >
                              {store.isOpen ? "Open" : "Closed"}
                            </Badge>
                            <span className="text-xs text-gray-500">{store.distance} away</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-blue-50 text-blue-600 text-xs"
                          aria-label={`Get directions to ${store.name}`}
                        >
                          <Navigation className="h-3 w-3 mr-1" />
                          Directions
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600">{store.address}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          <a
                            href={`tel:${store.phone}`}
                            className="text-xs text-blue-600 hover:underline"
                            aria-label={`Call ${store.name}`}
                          >
                            {store.phone}
                          </a>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          <p className="text-xs text-gray-600">{store.hours}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {store.services.map((service) => (
                            <Badge
                              key={service}
                              variant="outline"
                              className="text-xs border-gray-300 text-gray-600"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 flex space-x-2">
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg h-9"
                          aria-label={`Visit ${store.name}`}
                        >
                          Visit Store
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-blue-600 hover:bg-blue-50 text-xs h-9"
                          onClick={() => window.location.href = `tel:${store.phone}`}
                          aria-label={`Call ${store.name}`}
                        >
                          Call Store
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {filteredStores.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-5"
                >
                  <p className="text-sm text-gray-600">No stores found.</p>
                  <Button
                    variant="outline"
                    className="mt-3 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedService("All Services");
                    }}
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .container {
          max-width: 1280px;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        select::-ms-expand {
          display: none;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #bfdbfe #f1f5f9;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #bfdbfe;
          border-radius: 4px;
        }
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          h1 {
            font-size: 1.25rem;
          }
          .map-card {
            height: 16rem;
          }
        }
      `}</style>
    </motion.div>
  );
}
