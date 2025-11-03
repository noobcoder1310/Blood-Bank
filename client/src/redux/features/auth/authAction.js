import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      if (data.status) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        
        return data;
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      HospitalName,
      website,
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        HospitalName,
        website,
      });
      if (data?.status) {
        alert("User registered successfully ")
        //toast.status("User registered successfully")
        window.location.replace('/login')
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async ( { rejectWithValue }) => {
    try {
      const res = await API.get('/auth/current-user');
      if (res?.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
