import React, { useEffect, useState } from 'react';
import Header from "../../components/shared/Layout/Header";
import API from '../../services/API';

const Analytics = () => {
  const [data, setData] = useState([]);
  const colors = ['#FFF2E0', '#C0C9EE', '#A2AADB', '#898AC4', '#CD5656', '#AF3E3E', '#511D43', '#075B5E'];

  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupdata);
        //console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap ">
        {data?.map((record,i) => (
          <div className="card m-2 p-1" key={i} style={{ width: "18rem",backgroundColor:`${colors[i] }`}} >
            
            <div className="card-body">
            <h5 className="card-title bg-light text-dark text-center mb-3 ">{record.bloodGroup}</h5>
              <p className="card-text">
                Total In: <b>{record.totalIn} mL</b><br />
                Total Out: <b>{record.totalOut}</b> mL
              </p>
              
            </div>

            <div className="card-footer text-light bg-dark text-center">
              Total Available:<b>{record.availableBlood}</b>
          </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Analytics;
