import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "../Main.css"


function EditForm({ validateFunction }) {

  const navigate = useNavigate()

  let localData = localStorage.getItem('formData')

  let { id } = useParams();


  let EditFormData = () => {
    let data = JSON.parse(localData).find((item) => {
      return item.id === id
    })
    return data
  }

  const [formData, setFormData] = useState({ id: new Date().getTime().toString(), name: EditFormData().name, dob: EditFormData().dob, phone: EditFormData().phone, email: EditFormData().email })


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  }


  const handleEdit = (e) => {
    e.preventDefault();
    if (JSON.stringify(validateFunction(formData)) === '{}') {
      const newItem = { id: new Date().getTime().toString(), name: formData.name, email: formData.email, phone: formData.phone, dob: formData.dob };

      let newArr = JSON.parse(localData)?.map((item, i) => {
        if (item.id === id) {
          return newItem
        } else {
          return item
        }
      })
      localStorage.setItem('formData', JSON.stringify(newArr))
      navigate(`/`, { replace: true });
    }
  };

  return (
    <>
      <h1 className='table-heading'>Edit Data</h1>
      <form className="form" onSubmit={handleEdit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
          required
        />

        <p className='error-message'>{validateFunction(formData).name}</p>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
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
          name="phone"
          onChange={(e) => handleChange(e)}
          required
        />

        <p className='error-message'>{validateFunction(formData).phone}</p>


        <label htmlFor="message">Date of Birth:</label>
        <input
          id="dob"
          value={formData.dob}
          type="date"
          name="dob"
          onChange={(e) => handleChange(e)}
          required
        />

        <p className='error-message'>{validateFunction(formData).dob}</p>

        <button type="submit">Edit</button>
      </form>

    </>
  );
}

export default EditForm;
