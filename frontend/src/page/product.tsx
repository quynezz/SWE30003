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
    // Initialize cart count from localStorage
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
    if (sortOption === "price-low") return parseFloat(a.price) - parseFloat(b.price);
    if (sortOption === "price-high") return parseFloat(b.price) - parseFloat(a.price);
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
    price: parseFloat(product.price).toString().concat(".000đ"),
    originalPrice: (parseFloat(product.price) + Math.floor(Math.random() * 10) + 50).toString().concat(".000đ"),
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
    e.stopPropagation(); // Prevent card click navigation
    const product = featuredProducts.find((p) => p.id === productId);
    if (product) {
      const savedCart = localStorage.getItem("cartItems");
      let cartItems = savedCart ? JSON.parse(savedCart) : [];
      const existingItem = cartItems.find((item) => item.id === productId);
      if (existingItem) {
        // Update quantity if item exists
        cartItems = cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item
        cartItems.push({ ...product, quantity: 1 });
      }
      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // Update cart count
      setCartCount(cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0));
      // Navigate to cart page
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                        src={logo}
                        alt="Long Chau Logo"
                        className="h-full w-full object-cover"
                    />
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Long Chau
                </span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-10 w-64 sm:w-80 border-none focus:ring-2 focus:ring-blue-500 rounded-full"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Tìm kiếm sản phẩm"
                />
              </div>
              <Link to="/cart" className="relative">
                <Button variant="outline" size="icon" className="hover:bg-blue-50">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white h-5 w-5 flex items-center justify-center rounded-full animate-pulse">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 1024) && (
              <motion.div
                className="lg:w-64 w-full fixed lg:static top-0 left-0 h-full bg-white/95 backdrop-blur-md lg:bg-transparent z-30 lg:z-auto shadow-xl lg:shadow-none"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="p-4 space-y-5">
                  <div className="flex justify-between items-center lg:hidden">
                    <h3 className="text-lg font-bold text-gray-800">Bộ lọc</h3>
                    <Button variant="ghost" size="icon" onClick={toggleFilterSidebar} aria-label="Đóng bộ lọc">
                      <X className="h-5 w-5 text-gray-600" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">Danh mục</h3>
                    <div className="relative">
                      <select
                        value={category || "All Categories"}
                        onChange={handleCategoryChange}
                        className="w-full p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer hover:bg-blue-50 transition-colors"
                        aria-label="Chọn danh mục sản phẩm"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-800">Khoảng giá</h3>
                    <form className="space-y-3" onSubmit={handleFilterSubmit}>
                      <div className="space-y-2">
                        <Label htmlFor="min_price" className="text-sm text-gray-600">Giá tối thiểu</Label>
                        <Input
                          id="min_price"
                          placeholder="0"
                          name="min_price"
                          type="number"
                          defaultValue={minPrice}
                          className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                          aria-label="Giá tối thiểu"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max_price" className="text-sm text-gray-600">Giá tối đa</Label>
                        <Input
                          id="max_price"
                          placeholder="∞"
                          name="max_price"
                          type="number"
                          defaultValue={maxPrice}
                          className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                          aria-label="Giá tối đa"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                      >
                        Áp dụng
                      </Button>
                    </form>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg"
                    onClick={handleClearFilters}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Sản phẩm</h1>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden hover:bg-blue-50"
                  onClick={toggleFilterSidebar}
                  aria-label={isFilterOpen ? "Đóng bộ lọc" : "Mở bộ lọc"}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <RadioGroup
                  value={sortOption}
                  onValueChange={(value) => {
                    setSortOption(value);
                    setCurrentPage(1);
                  }}
                  className="flex items-center space-x-3 flex-wrap"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="default" />
                    <Label htmlFor="default" className="text-sm text-gray-600">Mặc định</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-low" id="price-low" />
                    <Label htmlFor="price-low" className="text-sm text-gray-600">Giá: Thấp đến Cao</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-high" id="price-high" />
                    <Label htmlFor="price-high" className="text-sm text-gray-600">Giá: Cao đến Thấp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rating" id="rating" />
                    <Label htmlFor="rating" className="text-sm text-gray-600">Đánh giá</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="available" id="available" />
                    <Label htmlFor="available" className="text-sm text-gray-600">Còn Hàng</Label>
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
                <h1 className="text-2xl font-bold text-red-600">Không tìm thấy sản phẩm</h1>
                <p className="text-gray-600">Hãy thử điều chỉnh bộ lọc của bạn.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-blue-50 text-blue-600 hover:bg-blue-100"
                  onClick={handleClearFilters}
                >
                  Xóa bộ lọc
                </Button>
              </motion.div>
            )}

            {/* Products Grid */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                    className="hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer border-gray-200"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <img
                          src={product.image}
                          width="600"
                          height="600"
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-md mb-2"
                        />
                        {product.discount && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                            -{product.discount}%
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 bg-white/80 hover:bg-white"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Thêm ${product.name} vào danh sách yêu thích`}
                        >
                          <Heart className="h-4 w-4 text-gray-500 hover:text-red-500 transition-colors" />
                        </Button>
                      </div>

                      <h3 className="font-medium mb-2 line-clamp-2 text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Thương hiệu:</span> {product.brand}
                      </p>
                      <div className="flex items-center mb-3">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1 text-gray-700">{product.rating}</span>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                      </div>
                      <div className="flex items-center mb-4">
                        <span className={cn("text-sm", product.inStock ? "text-green-600" : "text-red-600")}>
                          {product.inStock ? "Còn hàng" : "Hết hàng"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="font-bold text-blue-600">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                        disabled={!product.inStock}
                        onClick={(e) => handleAddToCart(product.id, e)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2 cursor-pointer" />
                        {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="hover:bg-blue-50 text-blue-600"
                >
                  Trước
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-blue-600"}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="hover:bg-blue-50 text-blue-600"
                >
                  Sau
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
            font-size: 1.75rem;
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        select::-ms-expand {
          display: none; /* Hide default arrow in IE */
        }
      `}</style>
    </motion.div>
  );
}
