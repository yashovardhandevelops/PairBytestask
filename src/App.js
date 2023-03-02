import React, { useState } from 'react'
import AddForm from './Pages/AddForm'
import EditForm from './Pages/EditForm';
import { Routes, Route } from "react-router-dom";
import DataTable from './Pages/DataTable';

const App = () => {

  let localData = localStorage.getItem('formData')


  const validateFunction = ({ name, dob, phone, email }) => {
    let errors = {};

    // Check name
    if (!name || name.length > 50) {
      errors.name = "Name is required and must be no more than 50 characters";
    }

    // Check date of birth
    const currentYear = new Date().getFullYear();
    const year = dob.split("-")[0];
    const age = currentYear - year;

    if (age < 18) {
      errors.age = "Please enter age More than 18 years";
    }

    let checkDuplicatePhoneNo = (localData ? JSON.parse(localData): []).find((item) => {
      return item.phone === phone
    })

    // Check phone number
    if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
    } else if (checkDuplicatePhoneNo) {
      errors.phone = "This phone number is already in use";
    }

    let checkDuplicateEmail = (localData ? JSON.parse(localData): []).find((item) => {
      return item.email === email
    })

    // Check email address
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    } else if (checkDuplicateEmail) {
      errors.email = "This email address is already in use";
    }
    
    return errors;
  }


  return (
    <Routes>
      <Route path="/" element={<DataTable />} />
      <Route path="/add" element={<AddForm validateFunction={validateFunction} />} />
      <Route path="/edit/:id" element={<EditForm validateFunction={validateFunction} />} />
    </Routes>
  )
}

export default App