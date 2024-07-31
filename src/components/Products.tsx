import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Pagination from "./Pagination";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";

const cookies = new Cookies();

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string;
  category: string;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const token = cookies.get("token");

      if (!token) {
        navigate("/");
        return;
      }
      const skip = (currentPage - 1) * productsPerPage;

      try {
        const response = await fetch(
          `https://dummyjson.com/auth/products?limit=${productsPerPage}&skip=${skip}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
       
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        setError("مشکلی پیش آمده لطفا دوباره تلاش کنید");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

 
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-[#faf9f9] w-full h-fit py-8">
    <div className="container mx-auto px-4 mb-8">
      <h1 className="text-2xl font-bold mb-4 text-center py-2">
        لیست محصولات
      </h1>
      <div className="text-center mb-4">
        <Link to="/productgrid">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        مشاهده محصولات با کتاب خانه گرید
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white table-auto my-8">
        <thead>
          <tr>
            <th className="py-2 border bg-gray-200">شناسه</th>
            <th className="py-2 border bg-gray-200">عنوان</th>
            <th className="py-2 border bg-gray-200">دسته بندی</th>
            <th className="py-2 border bg-gray-200">قیمت</th>
            <th className="py-2 border bg-gray-200">تصویر</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.title}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">
                <img
                  src={product.images}
                  alt={product.title}
                  width="50"
                  height="50"
                  style={{ objectFit: 'cover' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={totalProducts}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  </div>
  );
}

export default ProductList;
