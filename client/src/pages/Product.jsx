// src/pages/Products.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import Loading from "../components/common/Loading";
import { getProducts } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);           // danh sách size để hiển thị checkbox
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllSizes, setShowAllSizes] = useState(false);

  const productsPerPage = 9;

  // Hàm trích xuất size thật dù data bị hỏng kiểu chuỗi JSON
  const extractRealSize = (sizeField) => {
    if (!sizeField) return null;

    // Trường hợp bình thường: size là string sạch
    if (typeof sizeField === "string" && !sizeField.includes("'0':")) {
      return sizeField.trim();
    }

    // Trường hợp bị hỏng: size là chuỗi kiểu "{\n '0': '3',\n '1': '8', ..."
    if (typeof sizeField === "string") {
      const match1 = sizeField.match(/'0':\s*['"]?([^'",}]+)/);
      const match2 = sizeField.match(/'1':\s*['"]?([^'",}]+)/);
      if (match1) {
        return match2 ? (match1[1] + match2[1]).trim() : match1[1].trim();
      }
    }

    return null;
  };

  // Lấy dữ liệu lần đầu
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        const data = Array.isArray(res.data) ? res.data : [];

        setProducts(data);
        setFilteredProducts(data);

        // Lấy danh mục & thương hiệu
        setCategories([...new Set(data.map((p) => p.category).filter(Boolean))]);
        setBrands([...new Set(data.map((p) => p.brand).filter(Boolean))]);

        // Lấy tất cả size (dù bị hỏng vẫn lấy được)
        const allSizes = data
          .flatMap((p) =>
            p.sizes?.map((s) => extractRealSize(s.size)).filter(Boolean) || []
          );
        setSizes([...new Set(allSizes)].sort());

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lọc + sắp xếp mỗi khi có thay đổi
  useEffect(() => {
    let result = [...products];

    // Tìm kiếm
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Lọc danh mục
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Lọc thương hiệu
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Lọc kích thước – quan trọng nhất
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((s) => {
          const real = extractRealSize(s.size);
          return real && selectedSizes.includes(real);
        })
      );
    }

    // Lọc giá
    result = result.filter((p) => {
      const price = p.discountPrice || p.price || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Sắp xếp
    if (sortBy === "price-asc") {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }

    setFilteredProducts(result);
    setCurrentPage(1); // reset về trang 1 khi lọc
  }, [
    products,
    searchQuery,
    selectedCategories,
    selectedBrands,
    selectedSizes,
    priceRange,
    sortBy,
  ]);

  // Phân trang
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setPriceRange({ min: 0, max: Infinity });
    setSortBy("default");
    setSearchQuery("");
    setShowAllSizes(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-luxuryGold">Trang chủ</Link> ›{" "}
        <span className="text-luxuryGold">Tất cả sản phẩm</span>
      </nav>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm, thương hiệu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 lg:w-1/3 px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-luxuryGold"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Bộ lọc */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-4">Danh mục</h3>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategory(cat)}
                  className="mr-3 accent-luxuryGold"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-4">Thương hiệu</h3>
            {brands.map((b) => (
              <label key={b} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b)}
                  onChange={() => handleBrand(b)}
                  className="mr-3 accent-luxuryGold"
                />
                <span>{b}</span>
              </label>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-4">Kích thước</h3>
            {(showAllSizes ? sizes : sizes.slice(0, 10)).map((size) => (
              <label key={size} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSize(size)}
                  className="mr-3 accent-luxuryGold"
                />
                <span>{size}</span>
              </label>
            ))}
            {sizes.length > 10 && (
              <button
                onClick={() => setShowAllSizes(!showAllSizes)}
                className="text-luxuryGold text-sm hover:underline mt-2"
              >
                {showAllSizes ? "Thu gọn" : "Xem thêm"}
              </button>
            )}
          </div>

          <button
            onClick={resetAll}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full transition"
          >
            Xóa tất cả bộ lọc
          </button>
        </aside>

        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none"
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá: Thấp → Cao</option>
              <option value="price-desc">Giá: Cao → Thấp</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>

          {currentItems.length === 0 ? (
            <p className="text-center text-gray-500 py-20 text-xl">
              Không tìm thấy sản phẩm nào
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {currentItems.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-luxuryGold rounded-full disabled:opacity-50"
              >
                Trước
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === i + 1
                      ? "bg-luxuryBlack text-white"
                      : "bg-luxuryGold"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-luxuryGold rounded-full disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;