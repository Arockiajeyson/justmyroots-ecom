import React, { useState,useContext } from 'react'
import {BiHide} from 'react-icons/bi'
import {MdOutlineVisibility} from 'react-icons/md'
import {BsFillEmojiSmileUpsideDownFill} from 'react-icons/bs'
import axios from 'axios'
import ToastCon from './TostContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
export default function LoginPageE() {
    const [state,setstate] =useState(false)
    const [hideP,setHideP] =useState(false)
    const nav = useNavigate()
    const [send,setSend] =useState({
        Email:'',
        Password:''
    })
    const changelogin =()=>{
        setstate(true)
    }
    const changesignup =()=>{
        nav('/signup')
    }
    const visible =()=>{
        if(hideP){
            setHideP(false)
        }else{
            setHideP(true)
        }
    }
    const handeChange =async()=>{
        const {Email,Password} = send
        const res =await axios.post('https://just-backend.onrender.com/login',{Email,Password})
        console.log(res.data)
        if(res.data =='Register first'){
            toast.error(res.data)
        }else if(res.data[0] =='Logged-in'){
            toast.success(res.data[0])
            localStorage.setItem('t',true)
            nav('/product')
        }
    }
    return (
        <div className='con-div'>
            {state ? <><div>
                <h3>Login</h3>
            </div>
            <div>
                <input type="email" placeholder='Enter email ....' onChange={(e)=>setSend({...send,Email:e.target.value})}/>
            </div>
            <div>
                <input type={hideP ? 'text':'password'} placeholder='Enter password....' onChange={(e)=>setSend({...send,Password:e.target.value})}/>
                <div style={{position:'absolute',top:'25.5em',right:'30em',cursor:'pointer'}} onClick={visible}>{!hideP ? <BiHide/>:<MdOutlineVisibility/>}</div>
            </div>
            <div style={{width:'50%',marginTop:'10px'}}>
                <button style={{width:'100%',height:'40px'}} onClick={handeChange}>Login</button>
            </div></>:<div className='back'>
                <h1>Welcome Back <BsFillEmojiSmileUpsideDownFill/></h1>
                <h2>Already have an  account?</h2>
                <div onClick={changelogin} style={{cursor:'pointer',textAlign:'center',backgroundColor:'#dd7973',width:'30%',borderRadius:'.3em',height:'40px'}}><span style={{fontSize:'20px',fontWeight:'bold',marginTop:'15px'}}>Login</span></div>
                <h2>Need an account?</h2>
                <div onClick={changesignup} style={{cursor:'pointer',textAlign:'center',backgroundColor:'#dd7973',width:'30%',borderRadius:'.3em',height:'40px'}}><span style={{fontSize:'20px',fontWeight:'bold',marginTop:'15px'}}>Sign up</span></div>
            </div>}
        </div>
    )
}
