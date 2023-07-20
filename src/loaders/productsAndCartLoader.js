import { getShoppingCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    //get Products
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    //get cart
    const savedCart = getShoppingCart();
    const initialCart = [];
    // console.log('savedCart', savedCart);
    for (const id in savedCart) {
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }

    return { products: products, initialCart: initialCart };
}