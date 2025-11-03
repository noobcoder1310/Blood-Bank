import React, { useState } from "react";
import InputType from "../Form/InputType"; // adjust the path if needed
import API from "../../../services/API";
import { useSelector } from "react-redux";

const Modal = () => {
  const [inventorytype, setInventorytype] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState();
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please provide All fields");
      }

      const requestBody = {
        
        email,
        
        inventorytype,
        bloodGroup,
        quantity: Number(quantity),
      };

      console.log("Data being sent to backend:", requestBody); // <-- 🔍 LOG HERE

      const { data } = await API.post(
        "/inventory/create-inventory",
        requestBody
      );

      if (data?.status) {
        alert("New record added");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModalLong"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Manage Blood Record
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <label className="form-label">Inventory Type:</label>
            <div className="d-flex gap-4">
              <div className="form-check">
                <input
                  type="radio"
                  name="inventorytype"
                  value="in"
                  checked={inventorytype === "in"}
                  onChange={(e) => setInventorytype(e.target.value)}
                  className="form-check-input"
                  id="inRadio"
                />
                <label htmlFor="inRadio" className="form-check-label">
                  IN
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  name="inventorytype"
                  value="out"
                  checked={inventorytype === "out"}
                  onChange={(e) => setInventorytype(e.target.value)}
                  className="form-check-input"
                  id="outRadio"
                />
                <label htmlFor="outRadio" className="form-check-label">
                  OUT
                </label>
              </div>
            </div>
            <select
              className="form-select"
              aria-label="Default Select example"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option selected>{"open this select menu"}</option>
              <option value={"O+"}>O+</option>
              <option value={"A+"}>A+</option>
              <option value={"A-"}>A-</option>
              <option value={"AB+"}>AB+</option>
              <option value={"AB-"}>AB-</option>
              <option value={"B+"}>B+</option>
              <option value={"B-"}>B-</option>
            </select>
            <InputType
              labelText={inventorytype === 'out' ? 'Hospital Email' : 'Donor Email'}
              labelFor={"email"}
              inputType={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText={"Quantity(mL)"}
              labelFor={"quantity"}
              inputType={"number"}
              value={quantity}
              onChange={(e) => setQuantity((e.target.value))}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModalSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
