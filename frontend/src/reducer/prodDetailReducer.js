import { PROD_DETAIL_FAIL, PROD_DETAIL_REQUEST, PROD_DETAIL_SUCCESS } from "../constant/constant";

const prodDetailReducer = (state = {product:{}},action) =>{
    switch(action.type)
    {
        case PROD_DETAIL_REQUEST:
            return(
                {
                    loading:true,
                    ...state
                }
            )
        case PROD_DETAIL_SUCCESS:
            return(
                {
                    ...state,
                    loading:false,
                    product:action.payload.prod
                }
            )
        case PROD_DETAIL_FAIL:
            return(
                {
                    ...state,
                    loading:false,
                    error:action.error
                }
            )
        default:
            return({
                ...state
            })
    }
}
export default prodDetailReducer;