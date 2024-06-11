import { toast } from "react-toastify";
import { updateCourse } from "../reducers/courseReducer";
import axios from "axios";

export const getCourses = () => async (dispatch, getState) => {
    try{
        let courses = await axios.get(import.meta.env.VITE_BASE_URL + "/courses");
        dispatch(updateCourse(courses.data));
    }
    catch(err){
        toast.error(err.message);
    }
}