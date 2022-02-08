import React ,{Fragment,useEffect, useState}from 'react'
import ReactStars from 'react-rating-stars-component'
import './prodDetail.css'
import {useSelector,useDispatch} from 'react-redux'
import prodDetailAction from '../../actions/prodDetailAction';
import Carousel from 'react-material-ui-carousel'
import ReviewCard from '../Review/reviewCard';
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'
import { clearError } from '../../actions/prodAction';
import { addToCartAction } from '../../actions/cartAction';
const url = "https://i.ibb.co/DRST11n/1.webp";

export const ProductDetail = ({match}) =>{
    const [count,setCount] = useState(1);
    
    const alert = useAlert();
    const dispatch = useDispatch();
    const {product,loading,error} = useSelector((state) => state.product)
    useEffect(()=>{ 
        if(error)
        {
            alert.error(error);
            dispatch(clearError())
        }
        dispatch(prodDetailAction(match.params.id));
        window.scrollTo(0,0)
    },[dispatch,error,match.params.id,alert])
    const incrementCount = () =>{
        if(count === product.stock)
        {
            alert.success(`Maximum limit is ${count}`)
            return;
        } 
        setCount((prev) => prev+1); 
    }
    const decrementCount = () =>{
        if(count === 1)
        {
            alert.success(`Minimum limit is ${count}`)
            return;
        }
        setCount((prev) => prev-1);
    }
    const addToCartHandler = ()=>{
        alert.success("Items added successfully");
        dispatch(addToCartAction(count,product._id));
    } 
    const options =  {
            edit:false,
            color:'rgba(20,20,20,0.1)',
            size:20,
            activeColor:'tomato',
            isHalf:true,
    } 
    return (
          <Fragment>
              {loading ? (<Loader/>):(<Fragment>
              <div className = "productDetail" >
                <div >
                <Carousel className = "prod">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
                </div>
                <div >
                    <div className = "detailBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product #{product._id}</p>

                    </div>
                    
                    <div className = "detailBlock-2">
                        <ReactStars {...options} value={product.rating}  />
                        <span>({product.numOfReview} Reviews)</span>

                    </div>
                    <div className = "detailBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        
                        <div className ="detailBlock-3-1">
                            <div className = "detailBlock-3-1-1">
                                <button onClick={decrementCount}>-</button>
                                <input readOnly value={count} type = "number" placeholder='Enter the value' />
                                <button onClick={incrementCount}>+</button>
                            </div>
                            <button onClick = {addToCartHandler}>Add to Cart</button>
                        </div>
                        <p>
                            Status : 
                            <b className = {product.stock < 1 ? "redColor" :"greenColor"} >
                                {product.stock < 1 ? " Few pieces left" : " Available"}
                            </b>       
                        </p>
                    </div>
                    <div className = "detailBlock-4">
                        Description : <p>{product.description}</p>
                    </div>
                    <button className = "submitReview" >Submit Review</button>
                </div>
            </div>
            <h3 className = "reviewHeading">Reviews</h3>
             {product.numOfReview > 0?(
                <div className = "review">
                    {
                        product.reviews.map((review,idx) =>(
                            <ReviewCard key ={idx} review = {review} />
                        ))
                    }
                </div>
            ):(
                <p className = "noreviews">No reviews yet</p>
            )} 
          </Fragment>) }
          </Fragment>
      )
}