import {combineReducers,applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {prodReducer} from './reducer/prodReducer';
import prodDetailReducer from './reducer/prodDetailReducer';
import { loginReducer } from './reducer/loginReducer';
import { profileReducer } from './reducer/profileReducer';
import { forgetPasswordReducer,resetPasswordReducer } from './reducer/passwordReducer';
import { cartReducer } from './reducer/cartReducer';
import { createOrderReducer, myOrder, orderDetailReducer } from './reducer/orderReducer';
import { productCategoryReducer } from './reducer/prodReducer';
const rootReducer = combineReducers({
    products:prodReducer,
    prodCategory:productCategoryReducer,
    product:prodDetailReducer,
    user:loginReducer,
    updateProfile:profileReducer,
    forgetPassword:forgetPasswordReducer,
    resetPassword:resetPasswordReducer,
    cart:cartReducer,
    newOrder:createOrderReducer,
    myOrder:myOrder,
    orderDetail:orderDetailReducer,
});
let initialState = {
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[],
        shippingAddress:localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')):{},
    },
};
const middleware = [thunk]
const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store;
