import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Course from "./Course";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getCourses } from "../store/actions/courseAction";

const List = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const cluster = useSelector((state) => state.courseSlice.courses);
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cluster.length > 0) {
      setCourses(cluster);
      setLoading(false);
    }
  }, [cluster]);

  const changeHandler = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
    if (inputValue === "") {
      setCourses(cluster);
    }
  };

  const searchHandler = () => {
    const lowercasedInput = input.toLowerCase();
    const filtered = cluster.filter(
      (course) =>
        course.name.toLowerCase().includes(lowercasedInput) ||
        course.instructor.toLowerCase().includes(lowercasedInput)
    );
    setCourses(filtered);
  };

  return (
    <div className="bg-[#000000] min-h-screen">
      <Nav />
      <div className="w-3/4 mx-auto lg:w-3/4">
        <h1 className="text-3xl text-center mt-10 mb-8 text-[#F7F9FA] font-semibold lg:text-5xl">
          What would You like to{" "}
          <span className="text-[#6E96CF]">Learn?</span>
        </h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={input}
            onChange={changeHandler}
            placeholder="Search..."
            className="px-4 py-2 rounded-md bg-[#F7F9FA] text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#6E96CF] focus:border-transparent"
          />
          <button
            onClick={searchHandler}
            className="ml-2 px-4 py-2 rounded-md bg-[#6E96CF] text-[#F7F9FA] hover:bg-[#4C7DAE] focus:outline-none focus:ring-2 focus:ring-[#6E96CF] focus:border-transparent"
          >
            Search
          </button>
        </div>
        <div className="w-full overflow-x-hidden gap-4 flex flex-wrap justify-center">
          {loading ? (
            <div className="h-[20vh] text-white w-screen flex items-center justify-center">
              <h1 className="text-3xl font-semibold">
                <ClipLoader color="#e5eff3" />
              </h1>
            </div>
          ) : courses.length > 0 ? (
            courses.map((course, index) => (
              <Course
                key={index}
                id={course._id}
                page="list"
                title={course.name}
                instructor={course.instructor}
                thumbnail={course.thumbnail}
                dueDate={course.duration}
                progress={course.progress || 0}
              />
            ))
          ) : (
            <div className="h-[20vh] text-white w-screen flex items-center justify-center">
              <h1 className="text-3xl font-semibold">No courses found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
