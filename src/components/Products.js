import React from "react";
import { useQuery} from "react-query";
import axios from "axios";

const fetchProducts = async () => {
    const products = await fetch('http://test.chakito.com/m/index.php/wp-json/wp/v2/posts?&per_page=60&tags=26');

    return products.json();
}

const Products = () => {
    const { data, status } = useQuery('products', fetchProducts);
    console.log(data)
    return (
        <h1>Test</h1>
    )

}

export default Products;
