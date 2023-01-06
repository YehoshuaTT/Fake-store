import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useEffect } from 'react';
function SingleItem({ addToCart,cartItem }) {

    const [item, setItem] = useState([])

    const parm = useParams();

    useEffect(() => {
        const getItem = async () => { 
            const {data} = await axios.get(`http://localhost:3001/product?id=${parm.itemID}`) 
            setItem(data);
        }
        getItem()
    }, [])

    const sendCartToDB =async ()=>{
        let cart_user_id=localStorage.getItem("email")
        const theCart= {
            id:  cart_user_id,
            products: cartItem
        }         
    
    const {data} = await axios.post(`http://localhost:3001/cart/${cart_user_id}`,theCart,)
    }

    return (
        <>
            <div className='single-item'>
                <img className='single-img' src={item.image} ></img>
                <div className='single-title' >{item.title}</div>
                <div><button className="ATC-bottun" onClick={() => addToCart(item)}>Add to Cart</button></div>
                <div className='single-item-price'>{`${item.price} $`}</div>
                <div className='decription' >{item.description}</div>
            </div>
        </>
    )
}

export default SingleItem