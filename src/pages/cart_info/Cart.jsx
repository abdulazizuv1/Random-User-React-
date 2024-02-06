import React, { useState, useEffect } from 'react';
import "./Cart.css";
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

function Cart() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await fetch(`http://localhost:3000/people/${id}`);
                const data = await req.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const deleteData = async (api, config)=>{
        await fetch(api, config)
        await navigate("/")
      }
    

    return (
        <>
            <div className="container">
                <div className="desc">
                    <h1 className='name'>Name: {product.name}</h1>
                    <p className='desc'>Description: {product.desc}</p>
                    <p className='desc'>Location: {product.location}</p>
                    <p className='desc'>Age: {product.age}</p>
                </div>
            </div>
            <div className="btn">
                <button className='cart_btn' onClick={()=>{
                    deleteData(`http://localhost:3000/people/${id}`, {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                      toast("Deleted")
                }}>DELETE</button>
            </div>
        </>
    );
}

export default Cart;
