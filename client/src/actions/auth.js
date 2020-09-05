import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../types";
import { setAlert } from "./alert";
//REGISTER
export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
