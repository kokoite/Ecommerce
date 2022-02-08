import React from 'react';
import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import  './prodCard.css'

const Product = ({product}) => {
    const options = {
        edit:false,
        color:'rgba(20,20,20,0.1)',
        size:20,
        activeColor:'tomato',
        value:product.rating || 0,
        isHalf:true,
    }
    const url = "https://i.ibb.co/DRST11n/1.webp"; 
    return (
      <Link className='productCard' to = {`/product/${product._id}`}>
          <img src={url} alt={product.name}/>
          <p>{product.name}</p>
          <div>
              <ReactStars {...options} />
              <span>{`${product.numOfReview}`} review</span>
          </div>
          <span>₹{product.price}</span>
      </Link>
  )
};
export default Product;