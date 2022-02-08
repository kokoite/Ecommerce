import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR, PROD_CATEGORY_CLEAR_ERROR, PROD_CATEGORY_REQUEST, PROD_CATEGORY_SUCCESS, PROD_CATEGRY_FAIL } from "../constant/constant";

export const prodReducer = (state ={products:[]},action) =>{
    switch(action.type)
    {
        case ALL_PRODUCT_REQUEST:
            return(
                {
                    loading:true,
                }
            )
        case ALL_PRODUCT_SUCCESS:
            return (
                {
                    ...state,
                    loading:false,
                    products:action.payload.products,
                    productCount:action.payload.productCount,
                    resultPerPage:action.payload.resultPerPage,
                    filterResult:action.payload.filterResult
                }
            )
        case ALL_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR:
            return (
                {
                    ...state,
                    error:null
                }
            )
        default:
            return state;
    }
}
export const productCategoryReducer = (state = {},action) =>{
    switch(action.type)
    {
        case PROD_CATEGORY_REQUEST:
            return{
                loading:true,
            }
        case PROD_CATEGORY_SUCCESS:
            console.log(action.payload.products);
            return {
                ...state,
                loading:false,
                products:action.payload.products
            }
        case PROD_CATEGRY_FAIL:
            return{
                loading:false,
                error:action.error
            }
        case PROD_CATEGORY_CLEAR_ERROR:
            return {
                error:null,
            }
        default:
            return state
    }
}