import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCourses } from "../store/actions/courseAction";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const Course = ({
  id,
  title,
  instructor,
  thumbnail,
  dueDate,
  progress,
  page,
}) => {
  const dispatch = useDispatch();
  const [loader, setload] = useState(false);
  const completHandler = async (event) => {
    event.preventDefault();
    setload(true);
    try {
      await axios.post(
        import.meta.env.VITE_BASE_URL + `/courses/${id}/complete`
      );
      dispatch(getCourses());
    } catch (err) {
      toast.error(err.message);
    } finally {
      setload(false);
    }
  };
  return (
    <Link
      to={`/details/${id}`}
      className="no-underline w-11/12 lg:w-3/12 lg:mr-5"
    >
      <div
        className={`shadow-lg ${
          page === "list" ? "bg-[#181A1B] text-white" : "bg-slate-200"
        } w-full cursor-pointer rounded-lg overflow-hidden m-4 `}
      >
        <img
          src={thumbnail}
          alt={`${title} thumbnail`}
          className="w-full p-3 h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p
            className={`${
              page === "list" ? "text-white" : "text-gray-600"
            } mb-2`}
          >
            Instructor: {instructor}
          </p>
          <p
            className={`${
              page === "list" ? "text-white" : "text-gray-600"
            } mb-2`}
          >
            Due Date: {dueDate}
          </p>
          <div
            className={`${
              page === "list" ? "hidden" : "block"
            } h-2 w-full bg-gray-200 rounded-full mt-4 lg:h-1`}
          >
            <div
              className={`h-2 bg-blue-600 rounded-full lg:h-1`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p
              className={`text-gray-600 mt-2 ${
                page === "list" ? "hidden" : "block"
              }`}
            >
              {progress}% Completed
            </p>
            <button
              onClick={completHandler}
              className={`${
                page === "list" || progress === 100 ? "hidden" : "block"
              } bg-[#152561] text-slate-50 px-2 py-1.5 rounded-lg`}
            >
              {loader ? (
                <ClipLoader color="#e5eff3" /> // Add your loader here
              ) : (
                "Mark as Complete"
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course;
