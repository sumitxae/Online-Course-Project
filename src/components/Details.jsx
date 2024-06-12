import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { getCourses } from "../store/actions/courseAction";
import ClipLoader from "react-spinners/ClipLoader";
import Nav from "./Nav";
import { TbLayoutNavbarExpand, TbLayoutBottombarExpand } from "react-icons/tb";

const Details = () => {
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const course = useSelector((state) => state.courseSlice.courses).find(
    (course) => course._id === id
  );
  const schedule = course ? course.schedule.split(",") : [];
  const [loader, setLoader] = useState(false);
  const likeStatus = localStorage.getItem(`like-${id}`);

  const likeHandler = async () => {
    if (!likeStatus) {
      setLoader(true);
      try {
        await axios.post(import.meta.env.VITE_BASE_URL + `/courses/${id}/like`);
        localStorage.setItem(`like-${id}`, true);
        toast.success("Liked");
        dispatch(getCourses());
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoader(false);
      }
    }
  };

  const dislikeHandler = async () => {
    if (likeStatus) {
      setLoader(true);
      try {
        await axios.post(import.meta.env.VITE_BASE_URL + `/courses/${id}/dislike`);
        localStorage.removeItem(`like-${id}`);
        toast.success("Disliked");
        dispatch(getCourses());
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoader(false);
      }
    }
  };

  return course ? (
    <div className="bg-[#19191A] h-auto min-h-[100vh] w-screen lg:overflow-hidden">
      <Nav />
      <div className="h-auto text-[#fefefedf] px-5 w-full mt-4 lg:w-3/4 lg:mx-auto overflow-hidden">
        <h1 className="font-semibold text-white tracking-wide text-4xl">{course.name}</h1>
        <img
          src={course.thumbnail}
          alt=""
          className="w-full h-[25vh] mt-6 mb-5 rounded-lg object-[0%] lg:w-3/4"
        />
        <div className="flex items-center justify-between">
          <p className="text-lg"><strong>Instructor :</strong> {course.instructor}</p>
          <p><strong>Status :</strong>
            <span className={`${course.enrollmentStatus === "Open" ? "text-green-600 font-semibold" : "text-yellow-400"}`}>
              {course.enrollmentStatus}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg"><strong>Duration :</strong> {course.duration}</p>
          <p><strong>Location :</strong> {course.location}</p>
        </div>
        <p className="text-lg"><strong>Schedule:</strong> {schedule[0]}</p>
        <p><strong>Time :</strong> {schedule[1]}</p>
        <p><strong>Pre-requisites</strong> : {course.prerequisites}</p>
        <div className="mt-5 text-xl flex items-center justify-between">
          <p>{course.likes} Likes</p>
          <button
            onClick={likeHandler}
            className={`${likeStatus ? "hidden" : "block"} bg-blue-600 py-1.5 px-3 rounded-xl`}
          >
            {loader ? <ClipLoader color="#e5eff3" /> : "Leave a Like"}
          </button>
          <button
            onClick={dislikeHandler}
            className={`${!likeStatus ? "hidden" : "block"} bg-blue-600 py-1.5 px-3 rounded-xl`}
          >
            {loader ? <ClipLoader color="#e5eff3" /> : "Dislike"}
          </button>
        </div>
        <h2 className="text-[#fff] font-bold text-2xl mt-4">About Course</h2>
        <p>{course.description}</p>
        <div>
          <p className="flex items-center gap-3">
            <strong className="text-lg">Syllabus :</strong>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 hover:underline focus:outline-none text-2xl"
            >
              {expanded ? <TbLayoutNavbarExpand /> : <TbLayoutBottombarExpand />}
            </button>
          </p>
          {expanded && course.syllabus.map((week) => (
            <div className="mt-3" key={week._id}>
              <h3 className="text-white font-semibold">Week {week.week}</h3>
              <p>{week.topic}</p>
              <p>{week.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen flex items-center justify-center">
      <h1 className="text-3xl font-semibold">Loading</h1>
    </div>
  );
};

export default Details;
