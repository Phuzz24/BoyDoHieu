import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Dummy data for products (replace with API fetch later)
    const dummyProducts = [
      {
        _id: 1,
        name: "Áo sơ mi cao cấp",
        brand: "Gucci",
        image: "/images/product1.jpg",
        price: 1500,
        discountPrice: 1200,
        description: "Áo sơ mi sang trọng từ Gucci",
        category: "Áo",
        isNew: true,
      },
      {
        _id: 2,
        name: "Túi xách da thật",
        brand: "Louis Vuitton",
        image: "/images/product2.jpg",
        price: 2500,
        description: "Túi xách cao cấp da thật",
        category: "Túi xách",
      },
      {
        _id: 3,
        name: "Giày sneaker",
        brand: "Nike",
        image: "/images/product3.jpg",
        price: 800,
        discountPrice: 600,
        description: "Giày sneaker thoải mái",
        category: "Giày",
      },
      {
        _id: 4,
        name: "Đồng hồ Rolex",
        brand: "Rolex",
        image: "/images/product4.jpg",
        price: 5000,
        description: "Đồng hồ cao cấp Rolex",
        category: "Phụ kiện",
      },
    ];

    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);

    // Extract unique categories and brands
    const uniqueCategories = [...new Set(dummyProducts.map((p) => p.category))];
    const uniqueBrands = [...new Set(dummyProducts.map((p) => p.brand))];
    setCategories(uniqueCategories);
    setBrands(uniqueBrands);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // Price filter
    filtered = filtered.filter(
      (p) => (p.discountPrice || p.price) >= priceRange.min && (p.discountPrice || p.price) <= priceRange.max
    );

    // Sorting
    if (sortBy === "price-asc") {
      filtered = [...filtered].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === "price-desc") {
      filtered = [...filtered].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === "newest") {
      filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, selectedBrands, priceRange, sortBy, searchQuery, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-luxuryGold transition-colors duration-300">
              Trang chủ
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span>Sản phẩm</span>
          </li>
        </ol>
      </nav>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm, thương hiệu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-luxuryWhite focus:ring-2 focus:ring-luxuryGold"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <aside className="lg:w-64 bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-6 text-luxuryBlack dark:text-luxuryWhite">Bộ lọc tìm kiếm</h2>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
            {categories.map((category) => (
              <label key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="form-checkbox text-luxuryGold rounded focus:ring-luxuryGold"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">{category}</span>
              </label>
            ))}
          </div>

          {/* Brands */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Thương hiệu</h3>
            {brands.map((brand) => (
              <label key={brand} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="form-checkbox text-luxuryGold rounded focus:ring-luxuryGold"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">{brand}</span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Khoảng giá ($)</h3>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min || ""}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-luxuryWhite"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max === Infinity ? "" : priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || Infinity })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-luxuryWhite"
              />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sắp xếp theo</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-luxuryWhite"
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">Không tìm thấy sản phẩm</p>
          ) : (
            filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button className="px-4 py-2 bg-luxuryGold text-luxuryBlack rounded-full mr-2 hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300">
          Trước
        </button>
        <button className="px-4 py-2 bg-luxuryGold text-luxuryBlack rounded-full hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300">
          Sau
        </button>
      </div>
    </div>
  );
};

export default Products;