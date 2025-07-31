import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { featuredProducts } from "@/data/featuredProducts";
import { useState, useEffect } from "react";
import { Search, Filter, Star, ShoppingCart, Heart, Grid, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.jpg";

export function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse URL parameters
  const urlParams = new URLSearchParams(location.search);
  const category = urlParams.get("category");
  const minPrice = urlParams.get("min_price");
  const maxPrice = urlParams.get("max_price");

  // State for filters and UI
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
    return 0;
  });
  const productsPerPage = 12;

  // Initialize filtered products
  let filteredProducts = featuredProducts || [];

  // Apply search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // Apply price filter
  if (minPrice || maxPrice) {
    const min = minPrice && !isNaN(parseFloat(minPrice)) ? parseFloat(minPrice) : 0;
    const max = maxPrice && !isNaN(parseFloat(maxPrice)) ? parseFloat(maxPrice) : Infinity;
    filteredProducts = filteredProducts.filter((product) => {
      const price = parseFloat(product.price);
      return !isNaN(price) && price >= min && price <= max;
    });
  }

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") {
      const aPrice = parseFloat(a.price.replace(/\./g, '').replace(',', '.'));
      const bPrice = parseFloat(b.price.replace(/\./g, '').replace(',', '.'));
      return aPrice - bPrice;
    }
    if (sortOption === "price-high") {
      const aPrice = parseFloat(a.price.replace(/\./g, '').replace(',', '.'));
      const bPrice = parseFloat(b.price.replace(/\./g, '').replace(',', '.'));
      return bPrice - aPrice;
    }
    if (sortOption === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortOption === "available") return (b.stock % 2 === 0) - (a.stock % 2 === 0);
    return (b.stock % 2 === 0) - (a.stock % 2 === 0);
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Map products
  const products = paginatedProducts.map((product) => ({
    id: product.id,
    price: product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/(\.\d{2})$/, ",$1").concat(" vnđ"),
    originalPrice: product.price ? (parseFloat(product.price.replace(/\./g, '').replace(',', '.')) * (1 + Math.random() * 0.3)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/(\.\d{2})$/, ",$1").concat(" vnđ") : null,
    rating: product.rating || 4.0,
    reviews: product.reviewCount?.toLocaleString() || "0",
    inStock: product.stock % 2 === 0,
    discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 1 : null,
    brand: product.brandName || "Unknown Brand",
    name: product.name.slice(0, 25) + (product.name.length > 30 ? "..." : ""),
    image: product.image || "/placeholder.svg",
    category: product.category || "Uncategorized",
  }));

  // Extract unique categories
  const categories = ["All Categories", ...Array.from(new Set((featuredProducts || []).map((product) => product.category || "Uncategorized"))).sort()];

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const params = new URLSearchParams(location.search);
    if (selectedCategory === "All Categories") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`/products?${params.toString()}`);
    setCurrentPage(1);
  };

  // Handle filter submission
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMinPrice = formData.get("min_price");
    const newMaxPrice = formData.get("max_price");
    const params = new URLSearchParams();
    if (category && category !== "All Categories") params.set("category", category);
    if (newMinPrice) params.set("min_price", newMinPrice);
    if (newMaxPrice) params.set("max_price", newMaxPrice);
    navigate(`/products?${params.toString()}`);
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSortOption("default");
    navigate("/products");
    setIsFilterOpen(false);
    setCurrentPage(1);
  };

  // Add to cart and update localStorage
  const handleAddToCart = (productId, e) => {
    e.stopPropagation();
    const product = featuredProducts.find((p) => p.id === productId);
    if (product) {
      const savedCart = localStorage.getItem("cartItems");
      let cartItems = savedCart ? JSON.parse(savedCart) : [];
      const existingItem = cartItems.find((item) => item.id === productId);
      if (existingItem) {
        cartItems = cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        cartItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setCartCount(cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0));
      navigate(`/cart?productId=${productId}&quantity=1`);
    }
  };

  // Toggle filter sidebar on mobile
  const toggleFilterSidebar = () => {
    setIsFilterOpen((prev) => !prev);
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
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 w-56 sm:w-72 border-none focus:ring-2 focus:ring-blue-500 rounded-full text-xs"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Search products"
                />
              </div>
              <Link to="/cart" className="relative">
                <Button variant="outline" size="icon" className="hover:bg-blue-50 cursor-pointer">
                  <ShoppingCart className="h-4 w-4 cursor-pointer" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-600 text-white h-4 w-4 flex items-center justify-center cursor-pointer rounded-full animate-pulse text-[10px]">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 1024) && (
              <motion.div
                className="lg:w-60 w-full fixed lg:static top-0 left-0 h-full bg-white/95 backdrop-blur-md lg:bg-transparent z-30 lg:z-auto shadow-xl lg:shadow-none"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center lg:hidden">
                    <h3 className="text-base font-bold text-gray-800">Filters</h3>
                    <Button variant="ghost" size="icon" onClick={toggleFilterSidebar} aria-label="Close filters">
                      <X className="h-5 w-5 text-gray-600" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800 mb-2">Category</h3>
                    <div className="relative">
                      <select
                        value={category || "All Categories"}
                        onChange={handleCategoryChange}
                        className="w-full p-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer hover:bg-blue-50 transition-colors"
                        aria-label="Select product category"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800 mb-2">Price Range</h3>
                    <form className="space-y-2" onSubmit={handleFilterSubmit}>
                      <div className="space-y-1">
                        <Label htmlFor="min_price" className="text-xs text-gray-600">Minimum Price</Label>
                        <Input
                          id="min_price"
                          placeholder="0"
                          name="min_price"
                          type="number"
                          defaultValue={minPrice}
                          className="text-xs border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                          aria-label="Minimum price"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="max_price" className="text-xs text-gray-600">Maximum Price</Label>
                        <Input
                          id="max_price"
                          placeholder="∞"
                          name="max_price"
                          type="number"
                          defaultValue={maxPrice}
                          className="text-xs border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                          aria-label="Maximum price"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg"
                      >
                        Apply Filters
                      </Button>
                    </form>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl font-bold text-gray-800">Products</h1>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden hover:bg-blue-50"
                  onClick={toggleFilterSidebar}
                  aria-label={isFilterOpen ? "Close filters" : "Open filters"}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <RadioGroup
                  value={sortOption}
                  onValueChange={(value) => {
                    setSortOption(value);
                    setCurrentPage(1);
                  }}
                  className="flex items-center space-x-2 flex-wrap"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="default" id="default" />
                    <Label htmlFor="default" className="text-xs text-gray-600">Default</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="price-low" id="price-low" />
                    <Label htmlFor="price-low" className="text-xs text-gray-600">Price: Low to High</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="price-high" id="price-high" />
                    <Label htmlFor="price-high" className="text-xs text-gray-600">Price: High to Low</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="rating" id="rating" />
                    <Label htmlFor="rating" className="text-xs text-gray-600">Rating</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="available" id="available" />
                    <Label htmlFor="available" className="text-xs text-gray-600">In Stock</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {products.length === 0 && (
              <motion.div
                className="mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-xl font-bold text-red-600">No Products Found</h1>
                <p className="text-gray-600 text-sm">Try adjusting your filters.</p>
                <Button
                  variant="outline"
                  className="mt-3 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Products Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer border-gray-200 rounded-xl"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <CardContent className="p-3">
                      <div className="relative mb-3">
                        <img
                          src={product.image}
                          width="600"
                          height="600"
                          alt={product.name}
                          className="w-full h-44 object-cover rounded-md mb-2"
                        />
                        {product.discount && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                            -{product.discount}%
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 bg-white/80 hover:bg-white"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Add ${product.name} to wishlist`}
                        >
                          <Heart className="h-4 w-4 text-gray-500 hover:text-red-500 transition-colors" />
                        </Button>
                      </div>

                      <h3 className="font-medium text-sm mb-1 line-clamp-2 text-gray-800">{product.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">
                        <span className="font-semibold">Brand:</span> {product.brand}
                      </p>
                      <div className="flex items-center mb-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1 text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <span className={cn("text-xs", product.inStock ? "text-green-600" : "text-red-600")}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-bold text-blue-600 text-sm">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through ml-2">{product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg"
                        disabled={!product.inStock}
                        onClick={(e) => handleAddToCart(product.id, e)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1 cursor-pointer" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="hover:bg-blue-50 text-blue-600 text-xs"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-blue-600 text-white text-xs" : "hover:bg-blue-50 text-blue-600 text-xs"}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="hover:bg-blue-50 text-blue-600 text-xs"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .container {
          max-width: 1280px;
        }
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          h1 {
            font-size: 1.25rem;
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        select::-ms-expand {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}
