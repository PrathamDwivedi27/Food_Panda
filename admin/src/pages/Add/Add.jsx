import { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify';


const Add = () => {

    const url='http://localhost:4000';
    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })

    const onChangeHandler=(e)=>{
        const name=e.target.name;              // yha name matlab jo key hai jaise description , price etc aur value bhi kya hai uska content
        const value=e.target.value;

        setData(data=>({...data,[name]:value}));
    }

    useEffect(()=>{
        console.log(data);
    },[data])

    const onSubmitHandler=async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("category",data.category);
        formData.append("price",Number(data.price));
        formData.append("image",image);

        const response =await axios.post(`${url}/api/food/add`,formData);

        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
            setImage(false);        //kul milake agar success rha to refresh kar do 
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    }
    

  return (
    <div className='add'>
        <form action="" className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" id="">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                    
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='add-btn'>Add</button>
        </form>
      
    </div>
  )
}

// flex col property is in index.css

export default Add;
