import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { GrCart } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";



function Header() {
  return (
    <>
      <div className="w-full h-[8%] bg-transparent fixed top-0 left-0 z-[90] flex justify-center items-center">

        <div className="w-full h-[100%] bg-[#281f39] px-5 flex justify-between items-center">

          <div>
            <h1 className="text-[20px] font-bold text-[#fff] text-shadow-md hover:text-shadow-[#fff] transition-all duration-300 cursor-pointer">
              CODEMARTDOTCOM.
            </h1>
          </div>

          <div className="flex justify-center items-center w-[500px] h-full relative">
            <input
              type="search"
              onChange={(e) => console.log(e.target.value)}
              placeholder="search for products"
              className="w-full h-[85%] py-[10px] px-[20px] text-[#fff] rounded-[10px] bg-[#3C364C] outline-none"
            />
            <div className="h-[85%] w-[50px] bg-amber-700 group rounded-r-[10px] absolute right-0 cursor-pointer overflow-hidden">
              <IoSearchOutline className="text-[20px] text-[#fff] transition-all duration-400 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] group-hover:top-[-20%]"/>
              <IoSearchOutline className="text-[20px] text-[#fff] transition-all duration-400 absolute left-[50%] top-[120%] -translate-x-[50%] -translate-y-[50%] group-hover:top-[50%]"/>
            </div>
          </div>

          <div className="h-[100%] flex justify-center items-center gap-2">

            <NavLink to="/buyersprofile">
              {({ isActive }) => (
                <div className={`flex justify-center items-center gap-2 px-3 py-3 cursor-pointer group hover:bg-[#5a5177] transition-all duration-300 rounded-[10px] ${isActive ? "bg-[#5a5177]" : "bg-[#3C364C]"}`}>

                  <GrCart className={`text-[20px] transition-all duration-300 ${isActive ? "text-[#fff]" : "text-[#ffffff6d]"} group-hover:text-[#fff]`}/>

                  <h2 className={`text-[15px] font-semibold transition-all duration-300 ${isActive ? "text-[#fff]" : "text-[#ffffff6d]"} group-hover:text-[#fff]`}>PRODUCTS</h2>

                </div>
              )}
            </NavLink>


            <NavLink to="/sellersprofile">
              {({ isActive }) => (
                <div className={`flex justify-center items-center gap-2 px-3 py-3 cursor-pointer group hover:bg-[#5a5177] transition-all duration-300 rounded-[10px] ${isActive ? "bg-[#5a5177]" : "bg-[#3C364C]"}`}>

                  <GrCart className={`text-[20px] transition-all duration-300 ${isActive ? "text-[#fff]" : "text-[#ffffff6d]"} group-hover:text-[#fff]`}/>
                  
                  <h2 className={`text-[15px] font-semibold transition-all duration-300 ${isActive ? "text-[#fff]" : "text-[#ffffff6d]"} group-hover:text-[#fff]`}>CART</h2>

                </div>
              )}
            </NavLink>
          </div>


        </div>
        
      </div>
    </>
  );
}

export default Header;
