import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiProgress2Line } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Course from "./Course";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const courses = useSelector((state) => state.courseSlice.courses);
  const studentCourses = courses.filter( course => course.students[0]);

  return (
    <div className="h-screen relative w-screen overflow-x-hidden bg-[#FFFFFF] lg:flex ">
      <div className="lg:hidden flex justify-between items-center p-4 bg-[#000A30] text-[#F7F9FA]">
        <h1 className="text-xl font-semibold">DashBoard</h1>
        <button onClick={toggleMenu}>
          {isOpen ? <IoMdClose size={30} /> : <GiHamburgerMenu size={30} />}
        </button>
      </div>

      <div
        className={`lg:block ${
          isOpen ? "block" : "hidden"
        } lg:fixed top-0 left-0 z-10 lg:w-2/12 bg-[#000A30] py-3 px-4 absolute h-full`}
      >
        <h1 className="hidden lg:block text-xl lg:text-2xl font-semibold text-[#F7F9FA] mb-4 lg:mb-8">
          DashBoard
        </h1>
        <p className="text-[#F7F9FA] bg-[#152561] flex items-center justify-start gap-3 mb-3 py-2 px-3 rounded-lg">
          <RiProgress2Line /> Enrolled
        </p>
        <Link
          className="text-[#F7F9FA] flex items-center justify-start gap-3 hover:bg-[#152561] py-2 px-3 rounded-lg"
          to={"/"}
        >
          <SiBookstack /> Courses
        </Link>
      </div>

      <div className=" flex flex-col overflow-y-auto m-auto py-6 lg:ml-[17.6667%]">
        <h2 className="text-4xl font-semibold mb-6 px-4">Your Courses</h2>
        <div className="flex flex-wrap ">
        {studentCourses.map((course,index) => (
            <Course
              key={index}
              id={course._id}
              title={course.name}
              instructor={course.instructor}
              thumbnail={course.thumbnail}
              dueDate={course.duration}
              progress={course.students[0].progress || 0} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
