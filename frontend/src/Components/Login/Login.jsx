import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";


function Login() {

  let navigate = useNavigate()

  let [email, setemail] = useState();
  let [password, setpassword] = useState();
  let [flag, setFlag] = useState(true);

  const login = async (e) => {
    try {
      e.preventDefault();
      let user = {email, password};
      console.log(user);
      let response = await axios.post("/api/v1/user/login", user);
      console.log(response);
      localStorage.setItem("userDetailes", JSON.stringify(response.data.status))
      if (response.data.status.hasOwnProperty("shopName")) {
        navigate("/sellersprofile")
      } else {
        navigate("/buyersprofile")
      }
    } catch (error) {
      console.log("error in login function", error);
      alert(`${error.response.data.statusCode} not found, ${error.response.data.message}`)
    }
  };


  return (
    <>
      <div class="main bg-[#66637B] w-full h-screen flex justify-center items-center">
        <div
          id="box"
          class="h-[90%] w-[85%] flex justify-center items-center bg-[#2C2638] realtive rounded-2xl overflow-hidden"
        >
          <div class="w-[50%] h-full flex justify-center items-center">
            <div class="w-[95%] h-[95%] relative rounded-2xl">
              <img
                class="rounded-2xl w-full h-full object-cover overflow-hidden"
                src="./public/loginPage.jpg"
                alt="image not uploaded"
              />
            </div>
          </div>
          <div class="w-[50%] h-full flex justify-center items-center">
            <div className="w-[80%] h-[45%] relative flex flex-col justify-center items-center">
              <div class="w-full h-[35%] flex flex-col items-start justify-center">
                <h1 class="text-[45px] font-bold text-white tracking-tight">
                  Login
                </h1>
                <p class="text-[#6F697B] text-[12px]">
                  Don't have an account{" "}
                  <Link to="/" class="text-blue-500 underline">
                    Sign Up
                  </Link>
                </p>
              </div>
              <div class="w-full h-[65%] flex justify-start items-end">
                <form
                  action=""
                  onSubmit={login}
                  class="flex flex-col justify-center items-center gap-3 w-full"
                >
                  {/* <div class="relative flex justify-between items-center w-full">
                    <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setusername(e.target.value)}
                    class="w-[48%] text-white bg-[#3C364C] rounded-[5px] outline-none px-5 py-3 font-[20px]"
                    name="username"
                    />

                    <input
                      type="text"
                      placeholder="phone number"
                      onChange={(e) => setphnumber(e.target.value)}
                      class="w-[48%] text-white bg-[#3C364C] rounded-[5px] outline-none px-5 py-3 font-[20px]"
                      name="phnumber"
                    />
                  </div> */}

                  <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => setemail(e.target.value)}
                    class="text-white bg-[#3C364C] w-full rounded-[5px] outline-none px-5 py-3 font-[20px]"
                    name="email"
                  />

                  <div className="w-full relative flex justify-center items-center">
                    <input
                    type={flag ? "password" : "text"}
                    placeholder="password"
                    onChange={(e) => setpassword(e.target.value)}
                    class="text-white bg-[#3C364C] w-full rounded-[5px] outline-none px-5 py-3 font-[20px]"
                    name="password"
                   />
                   <div className="h-full w-[50px] bg-[#3C364C] absolute right-0 rounded-r-[5px] flex justify-center items-center">
                    <LuEyeClosed onClick={() => setFlag(!flag)} className={`absolute text-[#fff] text-[25px] cursor-pointer ${flag ? "visible" : "hidden" }`}/>
                    <LuEye onClick={() => setFlag(!flag)} className={`absolute text-[#fff] text-[25px] cursor-pointer ${flag ? "hidden" : "visible" }`}/>
                   </div>
                  </div>

                  <input
                    type="submit"
                    class="text-white bg-[#6D54B5] w-full px-5 py-3 rounded-[5px] cursor-pointer"
                    value="Log In"
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

export default Login;
