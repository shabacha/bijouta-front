import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
const initialState = {
  message: "",
  user:"",
  token:"",
  loading:false,
  error:""
}
export const register = createAsyncThunk('register',async(body)=>{
   try {
    const res = await axios.post("https://malahbecha-tunnel-8008.webtv-solution.dev/auth/register", body);
    console.log("res", res?.data);
  } catch (error) {
    console.log("error is: ", error);
  }
})
export const login = createAsyncThunk('login',async(body)=>{
   try {
    const res = await axios.post("https://malahbecha-tunnel-8008.webtv-solution.dev/auth/login", body);
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
      [register.fulfilled]:(state,{payload:{error,message}}) => {
        state.loading = false
        if (error) {
          state.error = error
        }else{
          state.message = message
        }
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