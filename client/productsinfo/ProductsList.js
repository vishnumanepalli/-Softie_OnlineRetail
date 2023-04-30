import { Card, Pagination } from "@windmill/react-ui";
import Product from "components/Product";
import Spinner from "components/Spinner";
import { useProduct } from "context/ProductContext";
import Layout from "layout/Layout";
import { useState } from "react";

const ProductList = () => {
  const { products, setPage } = useProduct();
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");

  const handleChange = (page) => {
    setPage(page);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const handleSearch = (query) => {
    setSearchText(query);
    setPage(1); // reset page number when search text changes
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setPage(1); // reset page number when filter changes
  };

  const filteredProducts = products?.filter((prod) => {
    // filter by search text
    if (searchText !== "") {
      return (
        prod.product_name.toLowerCase().includes(searchText.toLowerCase()) ||
        prod.product_description
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }
    // filter by selected filter
    if (filter !== "") {
      return prod.category_id === parseInt(filter);
    }
    return true; // no search text or filter selected
  });

  if (!products) {
    return (
      <>
        <Layout>
          <Spinner size={100} loading />
        </Layout>
      </>
    );
  }

  return (
    <Layout>
      <div className="container py-20 mx-auto">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 text-gray-700 border rounded"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div className="w-full sm:w-2/3">
            <select
              className="w-full px-4 py-2 text-gray-700 border rounded"
              value={filter}
              onChange={handleFilter}
            >
              <option value="">All categories</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </select>
          </div>
        </div>
        <Card className="flex flex-wrap h-full mx-2 mt-4">
          {filteredProducts.map((prod) => (
            <div
              className="w-full flex flex-col justify-between sm:w-1/2 md:w-1/3 lg:w-1/4 my-2 px-2 box-border"
              key={prod.product_id}
            >
              <Product product={prod} />
            </div>
          ))}
        </Card>
        <Pagination
          totalResults={filteredProducts.length}
          resultsPerPage={12}
          onChange={handleChange}
          label="Page navigation"
        />
      </div>
    </Layout>
  );
};

export default ProductList;
