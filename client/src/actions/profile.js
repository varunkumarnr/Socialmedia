import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_PROFILE,
} from "../types";
export const getCurrectProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await axios.post("/api/profile", formData);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      console.log(err.message);
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//add expirence
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/experience", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience added success", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      console.log(err.message);
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/education", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("education added success", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      console.log(err.message);
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//delete experience
export const deleteExperience = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ?")) {
    try {
      const res = await axios.delete(`api/profile/experience/${id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience is deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//delete education
export const deleteEducation = (id) => async (dispatch) => {
  if (window.confirm("Are you sure ?")) {
    try {
      const res = await axios.delete(`api/profile/education/${id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education  deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      const res = await axios.delete("api/profile");
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_PROFILE,
      });
      dispatch(setAlert("Account has been permantly deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
