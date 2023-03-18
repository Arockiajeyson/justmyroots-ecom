import React, { useEffect, useState } from 'react'

export default function Header() {
    const [state,setState] =useState([])
    const [about,setAbout] =useState(false)
    const [category,setCategory] =useState(false)
    const [brand ,setBrand] =useState(false)
    // useEffect(()=>{
    //     let maps =new Set()
    //     fetch('https://dummyjson.com/products?skip=0&&limit=100')
    //     .then((e)=>e.json())
    //     .then((e)=>{
    //         e.products.forEach((e)=>maps.add(e.category))
    //         setState([...maps])
    //         console.log([...maps])
    //     })
    // },[])
    return (
        <div className='header-div' style={{ display: 'flex',justifyContent:'space-between',width:'90%',cursor:'pointer'}}>
            <div>
                <img style={{ width: '80px' ,marginTop:'10px',marginLeft:'10px',borderRadius:'50%'}} src='https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1631/posts/40055/image-upload/Screenshot_2022_02_16_at_9_30_14_am_copy.jpg' alt="" />
            </div>
            <div >
                <h2 onMouseOver={()=>setAbout(true)} onMouseOut={()=>setAbout(false)}>About</h2>
                {about ?<div style={{position:'absolute',backgroundColor:'rgb(84, 169, 169)',borderRadius:'.6em',top:"60px"}} >
                    <p>Welcome to our site</p>
                </div>:''}
            </div>
            <div>
                <h2>Your Cart</h2>
            </div>
            <div>
                <h2>LogOut</h2>
            </div>
        </div>
    )
}
