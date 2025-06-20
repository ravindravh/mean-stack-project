import React,{useState} from 'react'

const AddProducts = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const addData = async () => {
        console.warn(name, price, category, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch("http://localhost:5000/add-product", {
            method : 'post',
            body : JSON.stringify({name, price, category, company, userId}),
            headers : {
              'Content-type' : 'Application/json',              
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`             
            }
      
          })
          result = await result.json()
          alert("Item Created Successfully")
    }
    
  return (
    <div className='register'>
        <h1>Add Products</h1>
        <input className='inputbox' type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Name' />
        {!name && <span className='invalid'>Enter a valid Name</span>}
        <input className='inputbox' type='text' value={price} onChange={(e)=> setPrice(e.target.value)} placeholder='Enter price' />
        {!price && <span className='invalid'>Enter a valid Name</span>}
        <input className='inputbox' type='text' value={category} onChange={(e)=> setCategory(e.target.value)} placeholder='Enter Category' />
        {!category && <span className='invalid'>Enter a valid Name</span>}
        <input className='inputbox' type='text' value={company} onChange={(e)=> setCompany(e.target.value)} placeholder='Enter Company' />
        {!company && <span className='invalid'>Enter a valid Name</span>}
        <button className='appButton' type='button' onClick={addData} > Add </button>
        
    </div>
  )
}

export default AddProducts
