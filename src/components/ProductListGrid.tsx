import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Cookies from 'universal-cookie';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

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

      try {
        const response = await fetch(`https://dummyjson.com/auth/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError("مشکلی پیش آمده لطفا دوباره تلاش کنید");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const columnDefs: ColDef<Product>[] = [
    { headerName: "شناسه", field: "id", sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: "عنوان", field: "title", sortable: true, filter: 'agTextColumnFilter' },
    { headerName: "دسته بندی", field: "category", sortable: true, filter: 'agTextColumnFilter' },
    { headerName: "قیمت", field: "price", sortable: true, filter: 'agNumberColumnFilter' },
    {
      headerName: "تصویر",
      field: "images",
      cellRenderer: (params: ICellRendererParams<Product, string>) => (
        <img
          src={params.value || ''}  
          alt={params.data?.title || 'تصویر'}
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      ),
      filter: false,
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '600px', width: '80%', margin: "auto" }}>
      <h1 className="text-2xl font-bold mb-4 text-center my-10">لیست محصولات</h1>
      <AgGridReact
        rowData={products}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
        domLayout='autoHeight'
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          filter: true,
        }}
      />
    </div>
  );
}

export default ProductList;
