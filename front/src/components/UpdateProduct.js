import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams()

    useEffect(() => {
        getProductDetails()
    },[])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

    }   

    const UpdateData = async () => {
        console.warn(name, price, category, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch("http://localhost:5000/update", {
            method : 'patch',
            body : JSON.stringify({name, price, category, company, userId}),
            headers : {
              'Content-type' : 'Application/json'
            }
      
          })
          result = await result.json()
          alert("Item Created Successfully")
    }
    
  return (
    <div className='register'>
        <h1>Add Products</h1>
        <input className='inputbox' type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Name' />
        
        <input className='inputbox' type='text' value={price} onChange={(e)=> setPrice(e.target.value)} placeholder='Enter price' />
        
        <input className='inputbox' type='text' value={category} onChange={(e)=> setCategory(e.target.value)} placeholder='Enter Category' />
        
        <input className='inputbox' type='text' value={company} onChange={(e)=> setCompany(e.target.value)} placeholder='Enter Company' />
        
        <button className='appButton' type='button' onClick={UpdateData} > Update </button>
        
    </div>
  )
}

export default UpdateProduct
