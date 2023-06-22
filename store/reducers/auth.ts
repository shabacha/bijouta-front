import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import Router from "next/router";
const initialState = {
  message: "",
  user:"",
  token:null,
  loading:false,
  error:""
}
export const register = createAsyncThunk<Response, any>(
  'register',
  async (payload) => {
    console.log('payload', payload)
    try {
      const res = await axios.post("http://localhost:8080/auth/register", payload);
    } catch (error: any) {
      return error;
    }
  }
);
export const login = createAsyncThunk<Response, any>(
  'login',
  async (payload) => {
    console.log('payload', payload)
    try {
      const res = await axios.post("http://localhost:8080/auth/login", payload);
      console.log("res login = ", res?.data);
      return res.data
    } catch (error: any) {
      return error;
    }
  }
);

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
      logout: (state,action) => {
          state.token = null;
          localStorage.clear()
      }
    },
    extraReducers:{
      [register.pending]:(state,action) => {
        state.loading = true
      },
      [register.fulfilled]:(state,action) => {
        state.loading = false
      },
      [register.rejected]:(state,action) => {
        state.loading = true
      },
      [login.pending]:(state,action) => {
        state.loading = true
      },
      [login.fulfilled]:(state,action) => {
        state.loading = false
        if (action.payload.error) {
          state.error = action.payload.error
        }else{
          console.log("action.payload = ",action.payload)
          state.message = action.payload.message
          state.token = action.payload.token
          localStorage.setItem("token",action.payload.token)
          state.user = action.payload.user
          Router.push("/")
         
        }
      },
      [login.rejected]:(state,action) => {
        state.loading = true
      }
    }
})

export default authSlice.reducer
