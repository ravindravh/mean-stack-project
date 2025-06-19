import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const [products, setProducts] = useState([])
  useEffect( () => {
    getProducts()
  },[] )

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products")
    result = await result.json()
    setProducts(Array.isArray(result) ? result : [])
  }

  const searchHandler =  async (event) => {
    let key =event.target.value
    if(key){
    let result = await fetch (`http://localhost:5000/search/${key}`)
    result = await result.json()
    if(result) {
      setProducts(result)
    }} else {
      getProducts()
    }

  }

  const deleteProduct = async(id) =>{
    let result = await fetch(`http://localhost:5000/product/${id}`,
    {
      method : "Delete"
    }
    )
    result = await result.json()
    if(result){
      getProducts()
    }

  }
  console.warn("product",products )
  return (
    <div className='products'>
      <h3>Product List</h3>
      <input type='text' placeholder='Search Product' className='search-product' onChange={searchHandler} /> 
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Category</li>
        <li>Price</li>
        <li>Company</li> 
        <li>Operation</li>       
      </ul>
      {

      
       products.length>0 ? products.map((item, index) => 
        <ul>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>{item.category}</li>
        <li>{item.price}</li>
        <li>{item.company}</li>  
        <li>
          <button onClick={()=>deleteProduct(item._id)} >Delete</button>
          <Link to={"/update/"+item._id}>Update</Link>
          </li>      
      </ul>
       ) : <h1> No Result Found...</h1>
      }
   
      
     
    </div>
  )
}

export default ProductList