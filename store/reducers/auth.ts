import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
const initialState = {
  message: "",
  user:"",
  token:"",
  loading:false,
  error:""
}
export const register = createAsyncThunk<Response, any>(
  'register',
  async (payload) => {
    console.log('payload', payload)
    try {
      const res = await axios.post("http://localhost:8080/auth/register", payload);
      console.log("res register = ", res?.data);
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
      return res.data?.token
    } catch (error: any) {
      return error;
    }
  }
);
export const login1 = (body: any) => createAsyncThunk('login', async(data)=>{
   try {
    const res = await axios.post("http://localhost:8080/auth/login", body);
    console.log("res", res?.data);
  } catch (error) {
    console.log("error is: ", error);
  }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
      addToken: (state,action) => {
        state.token = localStorage.getItem("token")
      },
      logout: (state,action) => {
          state.token = null;
          localStorage.clear()
      }
    },
    extraReducers:{
      [register.pending]:(state,action) => {
        state.loading = true
      },
      [register.fulfilled]:(state,payload) => {
        state.loading = false
        // if (error) {
        //   state.error = error
        // }else{
        //   state.message = message
        // }
        console.log("payload = ",payload)
      },
      [register.rejected]:(state,action) => {
        state.loading = true
      },
      [login.pending]:(state,action) => {
        state.loading = true
      },
      [login.fulfilled]:(state,{payload:{error,message,token,user}}) => {
        state.loading = false
        if (error) {
          state.error = error
        }else{
          state.message = message
          state.token = token
          state.user = user
          localStorage.setItem("token",token)
        }
      },
      [login.rejected]:(state,action) => {
        state.loading = true
      }
    }
})

export default authSlice.reducer
