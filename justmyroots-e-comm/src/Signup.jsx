import React, { useState } from 'react'
import { BiHide } from 'react-icons/bi'
import { MdOutlineVisibility } from 'react-icons/md'
import aixos from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const [hideP, setHideP] = useState(false)
    const nav =useNavigate()
    const [state,setState] =useState({
        Name:'',
        Email:'',
        Password:''
    })
    const visible = () => {
        if (hideP) {
            setHideP(false)
        } else {
            setHideP(true)
        }
    }
    const signup =async()=>{
        const {Name,Email,Password} =state
        const res =await aixos.post('https://just-backend.onrender.com/register',{Name,Email,Password})
        if(res.data =='try with new Email Id'){
            toast.error('Email id already exist')
        }else{
            toast.success(res.data)
            nav('/')
        }
    }
    return (
        <div className='signup'>
            <h1 style={{color:'wheat'}}>Sign-up</h1>
            <div>
                <input type="text" placeholder='Name' onChange={(e)=>setState({...state,Name:e.target.value})}/>
            </div>
            <div>
                <input type="email" placeholder='email...' onChange={(e)=>setState({...state,Email:e.target.value})}/>
            </div>
            <div>
                <input type={hideP ? 'text' : 'password'} placeholder='password....' onChange={(e)=>setState({...state,Password:e.target.value})}/>
                <div style={{ position: 'absolute', top: '28em', right: '33em', cursor: 'pointer' }} onClick={visible}>{!hideP ? <BiHide /> : <MdOutlineVisibility />}</div>
            </div>
            <div style={{width:'50%',marginTop:'10px'}}>
                <button style={{width:'100%',height:'40px'}} onClick={signup}>Sign-Up</button>
            </div>
        </div>
    )
}
