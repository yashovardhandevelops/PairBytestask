import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Main.css"

function DataTable() {
    let localData = localStorage.getItem('formData')

    const navigate = useNavigate();


  const [dataArr, setDataArr] = useState(localData ? JSON.parse(localData) : []);
  const handleDelete = (index) => {
    let newData = dataArr.filter((item,i)=>{
        if(i !== index){
            return item
        }
    })
    
    localStorage.setItem('formData' , JSON.stringify(newData))
    setDataArr(newData)
  };

  const handleEdit = (id)=>{
    navigate(`/edit/${id}`, { replace: true });
  }

  const handleAdd = (e)=>{
    navigate(`/add`, { replace: true });
  }
  return (
    <>
    <h1> User data</h1>
    {dataArr?.length > 0 && <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>DOB</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {  dataArr.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.dob}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>
              <button className="edit-btn" onClick={()=> handleEdit(item.id)}>Edit</button>
            </td>
            <td>
              <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>}

    <button className='add-data-btn' onClick={(e)=>{handleAdd(e)}}>Add Data</button>
    </>
  );
}

export default DataTable;
