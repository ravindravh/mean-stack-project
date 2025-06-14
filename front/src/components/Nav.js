import react from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Nav = ()=>{
    const auth = localStorage.getItem("user")
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/signup')
    }
    return(
        <div>
            
            {auth ? 
            <ul className='nav-ul' >                
                <li><Link to ='/'> Products </Link> </li>
                <li><Link to ='/add'> Add Product </Link> </li>
                <li><Link to ='/update'> Update Product </Link> </li>                
                <li><Link to ='/profile'> Profile </Link> </li>                
                <li><Link to ='/login' onClick={logout} > Logout ({JSON.parse(auth).name}) </Link> </li> </ul> :
                <ul className="nav-ul" >                
                <li><Link to ='/login'> Login </Link></li>
                <li><Link to ='/SignUp'> SignUp </Link></li>  
            </ul>
            }
        </div>
    )
}

export default Nav;
