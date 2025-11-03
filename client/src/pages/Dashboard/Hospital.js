import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import moment from 'moment';
import API from '../../services/API';

const Hospital = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getHospitals = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/inventory/get-hospital');
      console.log('API Response:', data);
      if (data?.success) {
        setData(data?.hospitals || []); // Fix: Use hospitals, not donors
      } else {
        setError(data?.message || 'Failed to fetch hospitals');
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error.response?.data || error);
      setError(error.response?.data?.message || 'Error fetching hospitals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-4">Hospitals</h2>
        {loading ? (
          <p>Loading hospitals...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data.length === 0 ? (
          <p>No hospitals found.</p>
        ) : (
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
                  <td>{record.HospitalName || record.name||'Unknown Hospital'}</td> {/* Fix: Use name */}
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
        )}
      </div>
    </Layout>
  );
};

export default Hospital;