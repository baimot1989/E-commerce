import { useCallback, useEffect, useMemo, useState } from "react";
import FilterBar from '../components/filterBar'; 
import ProductList from '../components/productList'; 
import { useFetchData } from "../../hooks/fetchData"; // Custom hook to fetch data from API
const ProductPage = () => {
    // Fetch categories from API
    const { data: categories = [], isloading: loadingCategories } = useFetchData('http://localhost:3000/categories');

    // Fetch products from API
    const { data: products = [], isloading: loadingProducts } = useFetchData('http://localhost:3000/products');
   
    // State to store the filtered list of products
    const [filtered, setFiltered] = useState([]);

    // Calculate the maximum product price (used for the price slider filter)
    const maxPrice = useMemo(() => {
        if (products.length === 0) return 0;
        return Math.max(...products.map(p => Number(p.price)));
    }, [products]);

    // Initialize filtered products to all products when they load
    useEffect(() => {
        setFiltered(products);
    }, [products]);

    /**
     * Callback to handle filtering based on selected category, price, and search title
     *  Contains category, price, and title from the FilterBar
     */
    const handleFilterChange = useCallback(({ category, price, title }) => {
        const filteredData = products.filter((product) => {
            const matchCategory = category === 'All' || product.category == category;
            const matchPrice = product.price <= price;
            const matchTitle = product.title.toLowerCase().includes(title.toLowerCase());

            return matchCategory && matchTitle && matchPrice;
        });

        setFiltered(filteredData); 
    }, [products]);

    // Show loading message while fetching data
    if (loadingProducts || loadingCategories) return <p>Loading...</p>;

    return (
        <div>
            <FilterBar
                categories={['All', ...categories]}
                maxPrice={maxPrice}
                onFilterChange={handleFilterChange}
            />
            <ProductList products={filtered} />
        </div>
    );
};

export default ProductPage;

