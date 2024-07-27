import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

// Array of utilities with names and routes
const utilities = [
  {
    name: "Digital Sigature Generator",
    route: "/digital-signature-generator",
    bgColor: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
];

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Shiv the Human Code Utils
        </h1>
        <p className="text-lg text-gray-600">
          Your go-to tool for amazing utilities.
        </p>
      </header>

      <nav className="flex flex-col space-y-4">
        {utilities.map((utility, index) => (
          <Link
            key={index}
            to={utility.route}
            className={`${utility.bgColor} text-white py-2 px-4 rounded-lg shadow-md ${utility.hoverColor} transition duration-300`}
          >
            {utility.name}
          </Link>
        ))}
      </nav>
    </div>
    </>
  );
};

export default HomePage;
