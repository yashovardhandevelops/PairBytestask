import React , {useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddForm = ({validateFunction}) => {


  const navigate = useNavigate();

  let localData = localStorage.getItem('formData')
  const[formData , setFormData] = useState({ id:  new Date().getTime().toString() ,name : "" , dob : "" , phone : "" , email : ""})
  
  const [data , setData] = useState(localData ? JSON.parse(localStorage.getItem('formData')) : [])

 
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
 }

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if(JSON.stringify(validateFunction(formData)) === '{}'){
      const newItem = { id:   new Date().getTime().toString() , name : formData.name , email : formData.email , phone : formData.phone , dob : formData.dob };
      const newArr = [...data , newItem]
        setData(newArr)
        localStorage.setItem('formData', JSON.stringify(newArr))
        setFormData({ id : "" , name : "" , dob : "" , phone : "" , email : ""})
        navigate(`/`, { replace: true });

    }
  };

  return (
    <div className=''>
    <h1 className='table-heading'>Add Data</h1>
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name = "name"
        value={formData.name}
        onChange={(e) => handleChange(e)}
        required
      />

      <p className='error-message'>{validateFunction(formData).name}</p>


      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name = "email"
        value={formData.email}
        onChange={(e) => handleChange(e)}
        required
      />

      <p className='error-message'>{validateFunction(formData).email}</p>


      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        value={formData.phone}
        name = "phone"
        onChange={(e) => handleChange(e)}
        required
      />

      <p className='error-message'>{validateFunction(formData).phone}</p>


      <label htmlFor="message">Date of Birth:</label>
      <input
        id="dob"
        value={formData.dob}
        name = "dob"
        type="date"
        onChange={(e) => handleChange(e)}
        required
      />
      <p className='error-message'>{validateFunction(formData).dob}</p>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default AddForm