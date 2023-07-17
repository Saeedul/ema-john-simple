import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log('products load before fetch');
        fetch('products.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                console.log('products loaded');
            })
    }, []);

    useEffect(() => {
        console.log('Local Storage first line', products);
        const storedCart = getShoppingCart();
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                console.log(addedProduct);
            }
        }
        // console.log('local storage finished');
    }, [products]) //ekhane products hocche dependency, meaning: jotobar change products hobe totobar ei useEffect take call korbe. This is called dependency injection.

    const handleAddToCart = (selectedProduct) => {
        const exists = cart.find(product => product.id === selectedProduct.id);
        const newCart = [...cart, selectedProduct] //ekhane ekta newCart variable bole declare korlam jekhane array er moddhe aager cart er moddhe jotogulo product ase sheguloke she copy korbe, tarpor e notun ekta parameter jog korlam shekhane notun jei product ta
        setCart(newCart);
        addToDb(selectedProduct.id);
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