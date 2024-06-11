import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Course from "./Course";
import { useSelector } from "react-redux";
import { set } from "firebase/database";

const List = () => {
  const cluster = useSelector((state) => state.courseSlice.courses);
  const [courses, setCourses] = useState(cluster);
  const [input, setinput] = useState("");

  const changeHandler = (event) => {
    const inputValue = event.target.value;
    setinput(inputValue);
    if (inputValue === "") {
      setCourses(cluster);
    }
  };

  const searchHandler = () => {
    const lowercasedInput = input.toLowerCase();
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(lowercasedInput) ||
        course.instructor.toLowerCase().includes(lowercasedInput)
    );
    setCourses(filtered);
  };

  useEffect(() => {
    setCourses(cluster);
  }, [cluster]);
  return (
    <div className="bg-[#000000] min-h-screen">
      <Nav />
      <div className="w-3/4 mx-auto lg:w-3/4">
        <h1 className="text-3xl text-center mt-10 mb-8 text-[#F7F9FA] font-semibold lg:text-5xl">
          What would You like to{" "}
          <span className="text-[#6E96CF]"> Learn ?</span>
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
          {courses.map((course, index) => (
            <Course
              key={index}
              id={course._id}
              page="list"
              title={course.name}
              instructor={course.instructor}
              thumbnail={course.thumbnail}
              dueDate={course.duration}
              progress={course.progress || 0} // Assuming progress is a field in your data
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
