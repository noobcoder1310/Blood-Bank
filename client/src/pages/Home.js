import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from'moment'

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  //get
  const getBloodrecords = async () => {
  try {
    const response = await API.get(`/inventory/get-inventory?ts=${Date.now()}`);
    if (response.data?.success) {
      setData(response.data?.inventory);
      console.log(data)
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getBloodrecords();
  }, []);
  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h4
            className="ms-4"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalLong"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-plus text-success py-4"></i>
            Add Inventory
          </h4>

          {/* Your modal component remains untouched */}
          <table class="table container">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Donor Email</th>
                <th scope="col">Time & date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record)=>(
                <tr key={record._id}>
                
                <td>{record.bloodGroup}</td>
                <td>{record.inventorytype}</td>
                <td>{record.quantity}(mL)</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>

                </tr>
              ))}
             
              
            </tbody>
          </table>
          <Modal />
        </>
      )}
    </Layout>
  );
};

export default HomePage;
