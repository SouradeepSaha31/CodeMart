import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./SellersSignup.css";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { IoMdInformationCircleOutline } from "react-icons/io";

function SellersSignup() {
  const navigate = useNavigate()

  let [username, setusername] = useState();
  let [shopname, setshopname] = useState();
  let [email, setemail] = useState();
  let [phonenumber, setphonenumber] = useState();
  let [password, setpassword] = useState();
  let [flag, setFlag] = useState(true);
  let [disclaimer, setDisclaimer] = useState(false);

  const sellersignup = async (e) => {
    try {
      e.preventDefault();
      let user = { username, shopname, phonenumber, email, password };
      console.log(user);
      let response = await axios.post("/api/v1/user/sellersignup", user);
      console.log(response.data.status)
      localStorage.setItem("userDetailes", JSON.stringify(response.data.status))
      navigate("/sellersprofile")
    } catch (error) {
      console.log("error in sellers signup function", error);
      alert(`${error.response.data.statusCode} not found, ${error.response.data.message}`)
    }
  };

  return (
    <>
      <div className="main bg-[#66637B] w-full h-screen flex justify-center items-center">
        <div
          id="box"
          className="h-[90%] w-[85%] flex justify-center items-center bg-[#2C2638] realtive rounded-2xl overflow-hidden"
        >
          <div className="w-[50%] h-full flex justify-center items-center">
            <div className="w-[95%] h-[95%] relative rounded-2xl">
              <img
                className="rounded-2xl w-full h-full object-cover overflow-hidden"
                src="./public/sellersSignupImage.jpg"
                alt="image not uploaded"
              />
            </div>
          </div>
          <div className="w-[50%] h-full flex justify-center items-center">
            <div className="w-[80%] h-[80%] relative flex flex-col justify-center items-center">
              <div className="w-full h-[12.5%] flex justify-between items-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-[#6D54B5]" : "bg-[#352e48]"
                    } text-white h-[80%] w-[49%] flex justify-center items-center rounded-[5px]`
                  }
                >
                  Buyer
                </NavLink>
                <NavLink
                  to="/sellerssignup"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-[#6D54B5]" : "bg-[#352e48]"
                    } text-white h-[80%] w-[49%] flex justify-center items-center rounded-[5px]`
                  }
                >
                  Seller
                </NavLink>
              </div>
              <div className="w-full h-[20%] flex flex-col items-start justify-center">
                <h1 className="text-[45px] font-bold text-white tracking-tight">
                  Create an account
                </h1>
                <p className="text-[#6F697B] text-[12px]">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 underline">
                    Log in
                  </Link>
                </p>
              </div>
              <div className="w-full h-[50%] flex justify-start items-end">
                <form
                  action=""
                  onSubmit={sellersignup}
                  className="flex flex-col justify-center items-center gap-3 w-full"
                >
                  <div className="relative flex justify-between items-center w-full">
                    <input
                      type="text"
                      placeholder="username"
                      onChange={(e) => setusername(e.target.value)}
                      className="w-[48.5%] text-white bg-[#3C364C] rounded-[5px] outline-none px-5 py-3 font-[20px]"
                      name="username"
                    />

                    <div className="w-[48.5%] relative flex justify-center items-center">
                      <input
                        type="text"
                        placeholder="shop name"
                        onChange={(e) => setshopname(e.target.value)}
                        className="w-[100%] text-white bg-[#3C364C] rounded-[5px] outline-none px-5 py-3 font-[20px]"
                        name="shopname"
                      />
                      <div className="h-full w-[50px] bg-[#3C364C] absolute right-0 rounded-r-[5px] flex justify-center items-center">
                        <IoMdInformationCircleOutline
                          onMouseEnter={() => setDisclaimer(!disclaimer)}
                          onMouseLeave={() => setDisclaimer(!disclaimer)}
                          className="text-[#fff] text-[25px] cursor-arrow"
                        />
                        <div className={`absolute top-[0px] left-[0px] w-[75px] h-[55px] -translate-y-[110%] -translate-x-[12.5px] rounded-[5px] bg-red-500 justify-center items-center ${disclaimer ? "flex" : "hidden"}`}
                        >
                          <p className="text-[#fff] text-[12px] leading-[12px] text-center">
                            Shop name will not be changed !
                          </p>
                          <div className="w-[10px] h-[10px] bg-red-500 absolute bottom-[-5px] rotate-45 "></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex justify-between items-center w-full">
                    <input
                      type="email"
                      placeholder="email"
                      onChange={(e) => setemail(e.target.value)}
                      className="text-white bg-[#3C364C] w-[48.5%] rounded-[5px] outline-none px-5 py-3 font-[20px]"
                      name="email"
                    />
                    <input
                      type="text"
                      placeholder="phone number"
                      onChange={(e) => setphonenumber(e.target.value)}
                      className="text-white bg-[#3C364C] w-[48.5%] rounded-[5px] outline-none px-5 py-3 font-[20px]"
                      name="phonenumber"
                    />
                  </div>

                  <div className="w-full relative flex justify-center items-center">
                    <input
                      type={flag ? "password" : "text"}
                      placeholder="password"
                      onChange={(e) => setpassword(e.target.value)}
                      class="text-white bg-[#3C364C] w-full rounded-[5px] outline-none px-5 py-3 font-[20px]"
                      name="password"
                    />
                    <div className="h-full w-[50px] bg-[#3C364C] absolute right-0 rounded-r-[5px] flex justify-center items-center">
                      <LuEyeClosed
                        onClick={() => setFlag(!flag)}
                        className={`absolute text-[#fff] text-[25px] cursor-pointer ${
                          flag ? "visible" : "hidden"
                        }`}
                      />
                      <LuEye
                        onClick={() => setFlag(!flag)}
                        className={`absolute text-[#fff] text-[25px] cursor-pointer ${
                          flag ? "hidden" : "visible"
                        }`}
                      />
                    </div>
                  </div>

                  <input
                    type="submit"
                    className="text-white bg-[#6D54B5] w-full px-5 py-3 rounded-[5px] cursor-pointer"
                    value="Create Account"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellersSignup;
