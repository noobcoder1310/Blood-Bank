import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment';
import  { useEffect, useState } from 'react';
import API from '../../services/API';
import { useSelector } from 'react-redux';
const Donation = () => {
  const{user}=useSelector(state=>state.auth)
      const [data, setData] = useState([]);
      const getDonors=async()=>{
        try {
          const {data}=await API.post('/inventory/get-inventory-hospital',{
              filters:{
                  inventorytype:"in",
                  donor:user?._id
              }
          })
          console.log(data)
          if(data?.success){
              setData(data?.inventory)
              console.log(data);
          }
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(()=>{
          getDonors();
      },[user]);
    return (
  <Layout>
        <div className='container mt-3'>
            <table className="table container">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">quantity</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
    {data.map((record) => (
      <tr key={record._id}>
        <td>{record.bloodGroup || 'N/A'}</td>
        <td>{record.inventorytype || 'N/A'}</td>
       <td>{record.quantity || 'N/A'}</td>
  
        <td>{record.donor?.phone || 'N/A'}</td>
        <td>{record.donor?.address || 'N/A'}</td>
        <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A') || 'N/A'}</td>
      </tr>
    ))}
  </tbody>
  
            </table>
               </div>
  
        
      </Layout>
      
      
    )
}

export default Donation
