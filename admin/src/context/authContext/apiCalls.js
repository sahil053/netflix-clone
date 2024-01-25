import React from "react";
import axios from "axios";
import { loginStart, loginSuccess, loginFail } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://netflix-clone-ces1.onrender.com/api/auth/login",
      user
    );
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFail());
  }
};
