import React,{Fragment,useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux' 
import { getProduct } from '../../actions/prodAction';
import Product from './prodCard'
import Loader from '../layout/Loader/Loader'
import './products.css'
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import {useAlert} from 'react-alert'
export const Products = ({match}) =>{
    const alert = useAlert();
    const dispatch = useDispatch();
    const categories = ["Laptop","Mobile Phones","Watches","Footwear","Grocery","Furniture","Clothing"]
    const {products,productCount,error,loading,resultPerPage,filterResult} = useSelector((state) => state.products);
    const [currentPage,setCurrentPage] = useState(1);
    const [price,setPrice] = useState([0,25000]);
    const [category,setCategory] = useState("");
    const [rating,setRating] = useState(0);
    const setCurrentPageNo =(page)=>{
        setCurrentPage(page);
    }
    const priceHandler = (event,newPrice) =>{
        setPrice(newPrice);
    }
    useEffect(()=>{
        if(error)
        {
            return alert.error(error)
        }
        dispatch(getProduct(match.params.keyword,currentPage,price,category,rating));
    },[dispatch,match.params.keyword,currentPage,price,alert,error,category,rating])
    return(
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <h2 className='prodHeading'>Products</h2>
                    <div className='prods'>
                        
                        {products && products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}                        
                    </div>
                    <div className='filterbox'>
                            <Typography className = 'head'>Price </Typography>
                            <Slider
                            value = {price}
                            onChange={priceHandler}
                            valueLabelDisplay='on'
                            aria-labelledby='range-slider'
                            min = {0}
                            max = {25000}
                            color = 'secondary'
                            />
                        <Typography className = 'catHead'>Categories</Typography>
                        <ul className='categoryBox'>
                        {categories.map((category) =>(
                            <li className='categoryField' key = {category} onClick={()=> {setCategory(category)}}>{category}</li>
                        ))}
                        </ul>
                        <fieldset>
                            <Typography component = 'legend'>Ratings above</Typography>
                            <Slider
                            value = {rating}
                            onChange = {(old,newRating)=> setRating(newRating)}
                            valueLabelDisplay = 'auto'
                            aria-labelledby = 'continuos-slider'
                            min = {0}
                            max = {5}
                            color = 'secondary'
                            />
                        </fieldset>
                    </div>
                    { filterResult > resultPerPage ?(<div className = "pagination">
                    <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productCount}
                    onChange = {setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                    />
                </div>):(
                    <h1>no more products</h1>
                )}
                </Fragment>
            )}
        </Fragment> 
    )
}
