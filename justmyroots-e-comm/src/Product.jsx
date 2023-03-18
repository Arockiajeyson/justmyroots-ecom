import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import toast from 'react-hot-toast';
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
};
export default function Product() {
    const [state, setState] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [discription, setDiscription] = useState(false)
    const [f, setf] = useState()
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState()
    const [i, setI] = useState([])
    const [about, setAbout] = useState(false)
    const [carts, setCarts] = useState(false)
    const [idx] =useState([])
    const [search,setSearch] =useState()
    const [fil,setfil] =useState([])
    const [filt,setFilt] =useState(false)
    const nav =useNavigate()
    useEffect(() => {
        let val =localStorage.getItem('t')
        console.log(val)
        if(!val){
            nav('/')
        }
        fetch('https://dummyjson.com/products?skip=0&&limit=100')
            .then(e => e.json())
            .then(e => { setState(e.products); console.log(e.products) })
            .catch(e => console.log(e))

    }, [])
    const userPa = 6
    const pageVist = pageNo * userPa
    const changePages = ({ selected }) => {
        setPageNo(selected)
        setFilt(false)
    }
    const handleOpen = (p) => {
        setOpen(true)
        setAmount(p)
    };
    const handleClose = () => {
        toast.success('Order confirmed')
        setOpen(false)
    };
    const abbToCart = (l) => {
        if(idx.includes(l)){
            toast.error('This item is already added to your cart')
            return
        }
        idx.push(l)
        const finds = state.find((e) => e.id == l)
        if (!i.includes(finds)) {
            setI([...i, finds])
        }
        console.log(i)
    }
    const cart = () => {
        if(idx.length==0){
            toast.error('Your cart is empty')
            return
        }
        setCarts(true)
    }
    const ser =()=>{
        const fi = state.filter((e)=>e.brand ===search || e.category==search)
        setfil(fi)
        setFilt(true)

    }
    const removefromCart =(m)=>{
        const l = i.findIndex((e)=>e.id==m)
        const k =idx.findIndex((e)=>e ==m)
        idx.splice(k,1)
        i.splice(l,1)
        toast.success('Removed')

    }
    const logout =()=>{
        localStorage.clear()
        nav('/')
    }
    return (
        <>
            {!carts ?<div className='products'>
                <div className='header-div' style={{ display: 'flex', justifyContent: 'space-between', width: '90%', cursor: 'pointer' }}>
                    <div>
                        <img style={{ width: '80px', marginTop: '10px', marginLeft: '10px', borderRadius: '50%' }} src='https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1631/posts/40055/image-upload/Screenshot_2022_02_16_at_9_30_14_am_copy.jpg' alt="" />
                    </div>
                    <div >
                        <h2 onMouseOver={() => setAbout(true)} onMouseOut={() => setAbout(false)}>About</h2>
                        {about ? <div style={{ position: 'absolute', backgroundColor: 'rgb(84, 169, 169)', borderRadius: '.6em', top: "60px" }} >
                            <p>Welcome to our site</p>
                        </div> : ''}
                    </div>
                    <div>
                        <h2 onClick={cart}>Your Cart</h2>
                    </div>
                    {filt ?<div>
                        <h2 onClick={()=>setFilt(false)}>Back</h2>
                        </div>:''}
                    <div>
                        <h2 onClick={logout}>LogOut</h2>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '99%' }}>
                    <input onChange={(e)=>setSearch(e.target.value)} type="text" style={{ width: '30%', height: '40px', outline: 'none', fontSize: '17px', border: 'none', borderRadius: '5px', backgroundColor: 'yellowgreen' }} placeholder='Search brand or category....' />
                    <span onClick={ser} style={{ position: 'absolute', top: '5.3em', right: '2.2em', cursor: 'pointer' }} ><AiOutlineSearch /></span>
                </div>
                <div className='dis'>
                    { !filt  ?state.slice(pageVist, pageVist + userPa).map((e) => {
                        return (
                            <div key={e.id} style={{ marginTop: '.5em', backgroundColor: 'GrayText', width: '30em', borderRadius: '.5em', display: 'flex' }}>
                                <div onMouseOver={() => { setf(e.id); setDiscription(true) }} onMouseOut={() => setDiscription(false)} style={{ padding: '5px', position: 'relative' }}>
                                    <img style={{ width: '300px', height: '200px', borderRadius: '.5em', position: 'static' }} src={e.images[0]} />
                                    <p style={{ textAlign: 'center', backgroundColor: ' rgb(202, 127, 127)', padding: '10px', borderRadius: '.5em', color: 'white', position: 'absolute', top: '0', right: '10px' }}>{e.discountPercentage} %</p>
                                </div>
                                <div style={{ marginLeft: '1em', padding: '2px', position: 'relative' }}>
                                    <p style={{ textAlign: 'end', backgroundColor: 'teal', padding: '10px', borderRadius: '.5em', color: 'white' }}>Rs :{e.price}</p>
                                    <p style={{ textAlign: 'start', backgroundColor: 'yellowgreen', padding: '10px', borderRadius: '.5em' }}>Brand :{e.brand}</p>
                                    <div>
                                        <Button onClick={() => abbToCart(e.id)} className='btn' style={{ width: '100%', height: '2.5em', borderRadius: '.5em', border: 'none', backgroundColor: 'white' }}>Add to Cart</Button>
                                    </div>
                                    <div>
                                        <Button onClick={() => handleOpen(e.price)} className='btn' style={{ width: '100%', height: '2.5em', marginTop: '.6em', borderRadius: '.5em', border: 'none', backgroundColor: 'white' }}>Buy</Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
                                                    Total amount : {amount}
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center' }}>
                                                    Are u sure do u want to confirm ??
                                                </Typography>
                                                <Button onClick={handleClose} style={{ marginLeft: '12em' }}>Confirm</Button>
                                            </Box>
                                        </Modal>
                                    </div>
                                    {/* {f == e.id && discription ? <div style={{ position: 'absolute', top: '100px', backgroundColor: '#a881af', padding: '20px', borderRadius: '.5em',top:'0' }}><span style={{ fontSize: '20px' }}>Description: </span>{e.description}<h3>Title :{e.title}</h3></div> : ''} */}
                                </div>
                            </div>
                        )
                    }): fil.map((e) => {
                        return (
                            <div key={e.id} style={{ marginTop: '.5em', backgroundColor: 'GrayText', width: '30em', borderRadius: '.5em', display: 'flex' }}>
                                <div onMouseOver={() => { setf(e.id); setDiscription(true) }} onMouseOut={() => setDiscription(false)} style={{ padding: '5px', position: 'relative' }}>
                                    <img style={{ width: '300px', height: '200px', borderRadius: '.5em', position: 'static' }} src={e.images[0]} />
                                    <p style={{ textAlign: 'center', backgroundColor: ' rgb(202, 127, 127)', padding: '10px', borderRadius: '.5em', color: 'white', position: 'absolute', top: '0', right: '10px' }}>{e.discountPercentage} %</p>
                                </div>
                                <div style={{ marginLeft: '1em', padding: '2px', position: 'relative' }}>
                                    <p style={{ textAlign: 'end', backgroundColor: 'teal', padding: '10px', borderRadius: '.5em', color: 'white' }}>Rs :{e.price}</p>
                                    <p style={{ textAlign: 'start', backgroundColor: 'yellowgreen', padding: '10px', borderRadius: '.5em' }}>Brand :{e.brand}</p>
                                    <div>
                                        <Button onClick={() => abbToCart(e.id)} className='btn' style={{ width: '100%', height: '2.5em', borderRadius: '.5em', border: 'none', backgroundColor: 'white' }}>Add to Cart</Button>
                                    </div>
                                    <div>
                                        <Button onClick={() => handleOpen(e.price)} className='btn' style={{ width: '100%', height: '2.5em', marginTop: '.6em', borderRadius: '.5em', border: 'none', backgroundColor: 'white' }}>Buy</Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
                                                    Total amount : {amount}
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center' }}>
                                                    Are u sure do u want to confirm ??
                                                </Typography>
                                                <Button onClick={handleClose} style={{ marginLeft: '12em' }}>Confirm</Button>
                                            </Box>
                                        </Modal>
                                    </div>
                                    {/* {f == e.id && discription ? <div style={{ position: 'absolute', top: '100px', backgroundColor: '#a881af', padding: '20px', borderRadius: '.5em',top:'0' }}><span style={{ fontSize: '20px' }}>Description: </span>{e.description}<h3>Title :{e.title}</h3></div> : ''} */}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {!filt?<ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    onPageChange={changePages}
                    pageCount={10}
                    containerClassName={"paginationBttns"}
                    previousClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />:''}
            </div> :<div style={{marginTop:'0',width:'100%'}}>
                <h2 onClick={()=>setCarts(false)} style={{textAlign:'end',color:'teal',width:'95%',cursor:'pointer'}}>Back To Home</h2>
                <div className='dis'>
                    {i.map((e) => {
                        return (
                            <div key={e.id} style={{ marginTop: '.5em', backgroundColor: 'GrayText', width: '30em', borderRadius: '.5em', display: 'flex' ,marginLeft:'2em'}}>
                                <div onMouseOver={() => { setf(e.id); setDiscription(true) }} onMouseOut={() => setDiscription(false)} style={{ padding: '5px', position: 'relative' }}>
                                    <img style={{ width: '300px', height: '200px', borderRadius: '.5em', position: 'static' }} src={e.images[0]} />
                                    <p style={{ textAlign: 'center', backgroundColor: ' rgb(202, 127, 127)', padding: '10px', borderRadius: '.5em', color: 'white', position: 'absolute', top: '0', right: '10px' }}>{e.discountPercentage} %</p>
                                </div>
                                <div style={{ marginLeft: '1em', padding: '2px', position: 'relative' }}>
                                    <p style={{ textAlign: 'end', backgroundColor: 'teal', padding: '10px', borderRadius: '.5em', color: 'white' }}>Rs :{e.price}</p>
                                    <p style={{ textAlign: 'start', backgroundColor: 'yellowgreen', padding: '10px', borderRadius: '.5em' }}>Brand :{e.brand}</p>
                                    <div>
                                        <Button onClick={() => removefromCart(e.id)} className='btn' style={{ width: '100%', height: '2.5em', borderRadius: '.5em', border: 'none', backgroundColor: 'white' }}>Remove</Button>
                                    </div>
                                    <div>
                                        <Button onClick={() => handleOpen(e.price)} className='btn' style={{ width: '100%', height: '2.5em', marginTop: '.6em', borderRadius: '.5em', border: 'none', backgroundColor: 'white' }}>Buy</Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
                                                    Total amount : {amount}
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center' }}>
                                                    Are u sure do u want to confirm ??
                                                </Typography>
                                                <Button onClick={handleClose} style={{ marginLeft: '12em' }}>Confirm</Button>
                                            </Box>
                                        </Modal>
                                    </div>
                                    {/* {f == e.id && discription ? <div style={{ position: 'absolute', top: '100px', backgroundColor: '#a881af', padding: '20px', borderRadius: '.5em',top:'0' }}><span style={{ fontSize: '20px' }}>Description: </span>{e.description}<h3>Title :{e.title}</h3></div> : ''} */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}</>

    )
}
