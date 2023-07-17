import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleAddToCart = (product) => {
        console.log(product);
        // cart.push(product);
        const newCart = [...cart, product] //ekhane ekta newCart variable bole declare korlam jekhane array er moddhe aager cart er moddhe jotogulo product ase sheguloke she copy korbe, tarpor e notun ekta parameter jog korlam shekhane notun jei product ta
        setCart(newCart);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product} //product er nam e props hobe jetar value hobe product
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
        //<Cart cart={cart}></Cart> er moddhe cart={cart} mane hocche cart namer ekta props pathailam jetar value hocche ei "{cart}" ta
    );
};

export default Shop;