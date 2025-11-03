
import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import moment from 'moment';
import API from '../../services/API';
const OrganisationPage = () => {
  
  const [data, setData] = useState([]);
  

  const getOrg = async () => {
    try {
      
      const { data } = await API.get('/inventory/get-organisation');
      console.log('API Response:', data);
      if (data?.success) {
        setData(data?.organisations|| []); // Fix: Use hospitals, not donors
      } 
    } catch (error) {
      console.error('Error fetching hospitals:', error.response?.data || error);
      
    }
  };

  useEffect(() => {
    getOrg();
  }, []);

  return (
    <Layout>
      
          <table className="table container">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record) => (
                <tr key={record._id}>
                  <td>{record.organisationName|| 'Unknown Organisation'}</td> {/* Fix: Use name */}
                  <td>{record.email || 'N/A'}</td>
                  <td>{record.phone || 'N/A'}</td>
                  <td>{record.address || 'N/A'}</td>
                  <td>
                    {moment(record.createdAt).format('DD/MM/YYYY hh:mm A') || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       
      
    </Layout>
  );
};



export default OrganisationPage
