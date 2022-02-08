import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/all'
import './home.css'
import Product from '../Product/prodCard'
import MetaData from '../../MetaData'
import {useSelector,useDispatch} from 'react-redux'
import { prodCategoryAction } from '../../actions/prodAction'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'
const Home = ()=>{
    const alert = useAlert();
    const dispatch = useDispatch();
    const {products,error,loading} = useSelector((state) => state.prodCategory);
    useEffect(()=>{
        if(error)
        {
            alert.error(error);
        }
        dispatch(prodCategoryAction());
    },[dispatch,error,alert])
    return(
        <Fragment>
            {loading ?(<Loader/>):(<Fragment>
            <MetaData title = "Home page"/>
            <div className='banner'>
                <h1>Welcome to Ecommerce</h1>
                <p>Find amazing product below</p>
                <a href='#container'>
                    <button>
                        Scroll {CgMouse}
                    </button>
                </a>
            </div>
            <h2 className='homeheading'>Featured Product</h2>
            <div className='container' id = 'container'>
                
                    {products && products.map((item,idx) => (
                        <div>
                        {item.list.length >= 1 ? (<h1>{item.item}</h1>):("")}
                        <div className='prodCategory'>
                        {item.list && item.list.map((product) =>(
                            <Product product={product} key = {idx} />
                        ))}
                        </div>
                        
                        </div>
                    ))}
            </div>
        </Fragment>)}
        </Fragment>
    )
}
export default Home;