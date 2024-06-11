import React, { useState, ChangeEvent } from "react";

const ProductManager : React.FC = () => {
    const [products, setProducts] = useState<string[]>([]);
    const [productName, setProductName] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    const addProduct = () => {
        if (productName.trim()){
            setProducts([...products, productName]);
            setProductName('');
        }
    };

    const removeProduct = (productNameToRemove : string) => {
        setProducts(products.filter(product => product !== productNameToRemove));
    };

    const filteredProducts = products.filter(product => product.toLowerCase().includes(search.toLowerCase()));

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    };

    const handleSearchChange = (event : ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <h1>Gestor de productos</h1>
            <input
                type="text"
                value={productName}
                onChange={handleInputChange}
                placeholder="Ingresa el nombre del producto"
            />
            <button onClick={addProduct}>Agregar producto</button>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Buscar productos"
            />
            <ul>
                {filteredProducts.map((product, index) => (
                    <li key={index}>
                        {product}
                        <button onClick={() => removeProduct(product)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductManager;