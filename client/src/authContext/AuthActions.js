//login
export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFail = () => ({
  type: "LOGIN_FAILURE",
});

//logout

export const logoutStart = () => ({
  type: "LOGOUT",
});
