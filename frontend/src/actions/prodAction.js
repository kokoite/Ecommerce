import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR, PROD_CATEGORY_REQUEST, PROD_CATEGORY_SUCCESS, PROD_CATEGRY_FAIL } from "../constant/constant"
import axios from 'axios'
export const getProduct = (keyword = "",currentPage=1,price=[0,25000],category = "",rating=0) => async(dispatch) =>{
    try{
        dispatch({
            type:ALL_PRODUCT_REQUEST
        });
        let link;
        if(category)
        {     
             link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
        }
        else
        {
             link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
        }
        console.log(link)
        const {data} = await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    }
    catch(error)
    {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            error:error.response.data.message
        })
    }
}
export const prodCategoryAction = ()=> async(dispatch)=> {
    try{
        dispatch({type:PROD_CATEGORY_REQUEST});
        const {data} = await axios.get("/api/v1/products/category");
        console.log(data.success + "products is not visible" + data.products);
        console.log(data.products);
        dispatch({type:PROD_CATEGORY_SUCCESS,payload:data})
    }
    catch(error)
    {
        dispatch({type:PROD_CATEGRY_FAIL,error:error.response.data.message})
    }
}
export const clearError = () => async(dispatch) =>{
    dispatch({type:CLEAR_ERROR})
}   