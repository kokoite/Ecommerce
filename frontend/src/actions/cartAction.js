import { ADD_TO_CART, REMOVE_TO_CART, SAVE_ADDRESS } from "../constant/constant"
import axios from 'axios'
export const addToCartAction = (quantity,id) => async(dispatch,getState) =>{
    const {data} = await axios.get(`/api/v1/product/${id}`);
    const {prod} = data;
    console.log(data);
    dispatch({type:ADD_TO_CART,payload:{
        product:prod._id,
        name:prod.name,
        price:prod.price,
        quantity,
        stock:prod.stock,
        image:prod.images[0].url
    }})
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}
export const removeCartAction = (id) => async(dispatch,getState)=>{
    dispatch({type:REMOVE_TO_CART,payload:id});
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}
export const saveAddressAction = (data) => async(dispatch,getState) =>{
    dispatch({type:SAVE_ADDRESS,payload:data});
    localStorage.setItem('shippingAddress',JSON.stringify(data));
}