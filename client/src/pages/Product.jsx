import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import Loading from "../components/common/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [showAllSizes, setShowAllSizes] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const dummyProducts = [
          {
            _id: "1",
            name: "Áo sơ mi cao cấp",
            brand: "Gucci",
            image: "/images/product1.jpg",
            price: 1500,
            discountPrice: 1200,
            description: "Áo sơ mi sang trọng từ Gucci",
            category: "Áo",
            isNew: true,
            sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
            colors: ["Black", "White"],
            stock: 10,
          },
          {
            _id: "2",
            name: "Túi xách da thật",
            brand: "Louis Vuitton",
            image: "/images/product2.jpg",
            price: 2500,
            description: "Túi xách cao cấp da thật",
            category: "Túi xách",
            sizes: [],
            colors: ["Brown"],
            stock: 5,
          },
          {
            _id: "3",
            name: "Giày sneaker",
            brand: "Nike",
            image: "/images/product3.jpg",
            price: 800,
            discountPrice: 600,
            description: "Giày sneaker thoải mái",
            category: "Giày",
            sizes: ["39", "40", "41", "42", "43", "44", "45"],
            colors: ["White", "Black"],
            stock: 15,
          },
        ];

        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
        setCategories([...new Set(dummyProducts.map((p) => p.category))]);
        setBrands([...new Set(dummyProducts.map((p) => p.brand))]);
        setSizes([...new Set(dummyProducts.flatMap((p) => p.sizes))].filter(Boolean));
      } catch (error) {
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) => p.sizes.some((size) => selectedSizes.includes(size)));
    }
    filtered = filtered.filter(
      (p) => (p.discountPrice || p.price) >= priceRange.min && (p.discountPrice || p.price) <= priceRange.max
    );

    if (sortBy === "price-asc") {
      filtered = [...filtered].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === "price-desc") {
      filtered = [...filtered].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === "newest") {
      filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategories, selectedBrands, selectedSizes, priceRange, sortBy, searchQuery, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

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

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setPriceRange({ min: 0, max: Infinity });
    setSortBy("default");
    setSearchQuery("");
    setShowAllSizes(false);
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-luxuryGold">Trang chủ</Link> &gt; Sản phẩm
      </nav>

      {/* Search Bar */}
      <div className="mb-6 w-full md:w-1/2">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm, thương hiệu hoặc mô tả..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-luxuryGold transition-colors duration-300"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-1/4 bg-luxuryWhite dark:bg-gray-800 p-6 rounded-xl shadow-md lg:sticky lg:top-4">
          <h2 className="text-xl font-bold mb-4 text-luxuryBlack dark:text-luxuryWhite">Bộ lọc</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-luxuryBlack dark:text-luxuryWhite">Danh mục</h3>
            {categories.map((category) => (
              <div key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2 accent-luxuryGold"
                />
                <label htmlFor={category} className="text-gray-700 dark:text-gray-300">{category}</label>
              </div>
            ))}
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-luxuryBlack dark:text-luxuryWhite">Thương hiệu</h3>
            {brands.map((brand) => (
              <div key={brand} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2 accent-luxuryGold"
                />
                <label htmlFor={brand} className="text-gray-700 dark:text-gray-300">{brand}</label>
              </div>
            ))}
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-luxuryBlack dark:text-luxuryWhite">Kích thước</h3>
            {(showAllSizes ? sizes : sizes.slice(0, 5)).map((size) => (
              <div key={size} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="mr-2 accent-luxuryGold"
                />
                <label className="text-gray-700 dark:text-gray-300">{size}</label>
              </div>
            ))}
            {sizes.length > 5 && (
              <button
                onClick={() => setShowAllSizes(!showAllSizes)}
                className="text-xs text-luxuryGold mt-2"
              >
                {showAllSizes ? "Thu gọn" : "Xem thêm..."}
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-luxuryBlack dark:text-luxuryWhite">Sắp xếp theo</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-luxuryGold"
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>

          {/* Clear All */}
          <button
            onClick={resetFilters}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">Không tìm thấy sản phẩm</p>
          ) : (
            <>
              <div className="col-span-full mb-4 text-gray-700 dark:text-gray-300">
                Tìm thấy {filteredProducts.length} sản phẩm
              </div>
              {paginatedProducts.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-luxuryGold text-luxuryBlack rounded-full disabled:opacity-50 hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300"
        >
          Trước
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-full ${
              currentPage === page
                ? "bg-luxuryBlack text-luxuryWhite"
                : "bg-luxuryGold text-luxuryBlack hover:bg-luxuryBlack hover:text-luxuryWhite"
            } transition-all duration-300`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-luxuryGold text-luxuryBlack rounded-full disabled:opacity-50 hover:bg-luxuryBlack hover:text-luxuryWhite transition-all duration-300"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default Products;
