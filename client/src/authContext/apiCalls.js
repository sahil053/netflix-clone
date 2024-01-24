import axios from "axios";
import { loginStart, loginSuccess, loginFail } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(loginFail());
    throw error;
  }
};