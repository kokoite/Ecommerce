import React, { Fragment, useState } from 'react'
import './search.css'
const Search = ({history}) => {
    const [keyword,setKeyWord] = useState("");
    const searchSubmitHandler = (event)=>{
        event.preventDefault();
        if(keyword.trim())
        {
            history.push(`/products/${keyword}`)
        }
        else{
            history.push('/products');
        }
    }
    return (
        <Fragment>
            <form className = "searchbox" onSubmit = {searchSubmitHandler}>
                <input 
                type = "text"
                 placeholder = "Search the product" 
                 onChange = {(event) => setKeyWord(event.target.value)}
                value = {keyword} />
                <input type = "submit" value = "Search"/>
            </form>
        </Fragment>
    )
}

export default Search
