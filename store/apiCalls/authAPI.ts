import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("auth/loginUser", async ({username,password,router}:any,{ rejectWithValue }) => {
  try {
    const res = await axios.post("https://malahbecha-tunnel-8008.webtv-solution.dev/auth/login", {username,password});
    console.log("res", res?.data);

    // Assuming the token is available in res.data.token
    // Redirect the user to "/" if the token exists
    if (res.data.token) {
      router.push('/');
    }
  } catch (error) {
    console.log("error is: ", error);
  }
});
export const registerUser = createAsyncThunk("auth/registerUser", async ({username,password,email,name,router}:any,{ rejectWithValue }) => {
  try {
    const res = await axios.post("https://malahbecha-tunnel-8008.webtv-solution.dev/auth/register", {username,password,email,name});
    console.log("res", res?.data);

    // Assuming the token is available in res.data.token
    // Redirect the user to "/" if the token exists
    if (res.data) {
      router.push('/products');
    }
  } catch (error) {
    console.log("error is: ", error);
  }
});
export const getProducts = createAsyncThunk("auth/registerUser", async ({ rejectWithValue }) => {
  try {
    const res = await axios.get("https://malahbecha-tunnel-8008.webtv-solution.dev/products");
    console.log("res", res?.data);
    return res.data
  } catch (error) {
    console.log("error is: ", error);
  }
});