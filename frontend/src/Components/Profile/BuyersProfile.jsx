import React, { useEffect, useState } from "react";
import "./BuyersProfile.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { IoFileTrayFullSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function BuyersProfile() {
  const navigate = useNavigate()
  

  let [photoToggle, setPhotoToggle] = useState(false);
  let [imageToggle, setImageToggle] = useState(false);
  let [photo, setPhoto] = useState();
  let [editnameToggle, seteditnameToggle] = useState(false);

  let [readonly, setReadonly] = useState({
    phoneNumber: true,
    email: true,
    street: true,
    city: true,
    pin: true,
    state: true,
  });

  let [userdet, setUserdet] = useState({});

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userDetailes"));
    setUserdet(user);
    console.log(user)
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserdet((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = (name) => {
    console.log(userdet);
    setReadonly((prev) => ({ ...prev, [name]: true }));
  };
  const refresh = (name) => {
    console.log(name);
    if (readonly[name] == false) window.location.reload();
  };

  const logout = async () => {
    try {
      let response = await axios.get("/api/v1/user/logout")
      localStorage.setItem("userDetailes", "{}")
      navigate("/login")      
    } catch (error) {
      console.log("error on logout function in buyers profile",error)
      alert(`${error.response.data.statusCode}, ${error.response.data.message}`)
    }
  }

  return (
    <>
      <div className="w-full h-screen bg-[#2C2638] relative">
        <div className="w-full h-[8%]"></div>

        <div
          className={`imageEditBox ${
            photoToggle ? "flex" : "hidden"
          } absolute top-0 left-0 w-full h-screen bg-[#000000ab] z-[100] justify-center items-center`}
        >
          <div className="w-[600px] h-[600px] rounded-[10px]  bg-[#2C2638] px-3 py-3 flex flex-col justify-between items-center">
            <div
              onClick={() => setPhotoToggle(!photoToggle)}
              className="w-full h-[40px] bg-amber-40 flex justify-end items-center cursor-pointer"
            >
              <div className="w-[30px] h-[30px] rounded-full bg-[#453d55] flex justify-center items-center">
                <RxCross2 className="text-[17px] font-bold text-[#fff]" />
              </div>
            </div>

            <form
              action=""
              className="w-full h-[530px] bg-amber-80 flex justify-center items-center flex-col"
            >
              <div className="w-full h-[92%] relative flex justify-center items-center bg-red-80 py-2">
                <label
                  htmlFor="photoUpload"
                  className={`w-full h-full border-2 border-[#534f4f] rounded-[10px] ${
                    imageToggle ? "hidden" : "flex"
                  } justify-center items-center cursor-pointer`}
                >
                  <FaCamera className="text-[50px] text-[#534f4f]" />
                </label>
                <input
                  onChange={(e) => (
                    setPhoto(URL.createObjectURL(e.target.files[0])),
                    setImageToggle(true)
                  )}
                  type="file"
                  id="photoUpload"
                  className="hidden"
                />

                <div
                  className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[10px] w-full h-[96%] ${
                    imageToggle ? "visible" : "hidden"
                  }`}
                >
                  <img
                    src={photo}
                    className="w-full h-full rounded-[10px] object-fit"
                    alt=""
                  />
                </div>
              </div>

              <div className="w-full h-[8%] bg-amber-60 flex justify-end items-center">
                <button
                  onClick={(e) => (setImageToggle(false), e.preventDefault())}
                  className="bg-[#d40e0e] px-3 py-1 rounded-[5px] text-[#fff] text-[17px] mr-[10px] cursor-pointer"
                >
                  Cancle
                </button>
                <button className="bg-[#991da7] px-3 py-1 rounded-[5px] text-[#fff] text-[17px] cursor-pointer">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className={`usernameEditBox ${
            editnameToggle ? "flex" : "hidden"
          } absolute top-0 left-0 w-full h-screen bg-[#000000ab] z-[100] justify-center items-center`}
        >
          <div className="w-[600px] h-[120px] rounded-[10px]  bg-[#2C2638] px-3 py-3 flex flex-col justify-between items-center">
            <div
              onClick={() => seteditnameToggle(!editnameToggle)}
              className="w-full h-[40px] bg-amber-40 flex justify-end items-center cursor-pointer"
            >
              <div className="w-[30px] h-[30px] rounded-full bg-[#453d55] flex justify-center items-center">
                <RxCross2 className="text-[17px] font-bold text-[#fff]" />
              </div>
            </div>

            <form
              action=""
              className="w-full h-[50px] bg-amber-90 flex justify-between items-center gap-3"
            >
              <input
                type="text"
                className="w-[410px] h-[45px] outline-none text-[#fff] bg-[#453d55] rounded-[10px] px-5 py-3"
                placeholder="username"
              />
              <input
                type="reset"
                value="Refresh"
                className="bg-yellow-600 rounded-[5px] px-[10px] py-[10px] cursor-pointer text-[#fff] font-semibold   outline-none"
              />
              <input
                type="submit"
                value="Upload"
                className="bg-[#8E51FF] rounded-[5px] px-[10px] py-[10px] cursor-pointer text-[#fff] font-semibold  outline-none"
              />
            </form>
          </div>
        </div>

        <div className="w-full h-[92%] bg-[#2C2638] relative flex justify-center items-center">
          <div className="leftside h-full w-[20%] bg-lime-70 px-5 py-5 flex flex-col justify-between items-center relative">
            <div className="upper w-full min-h-[180px] flex flex-col justify-start items-center bg-amber-60">
              <div className="image&name relative w-[100%] min-h-[20%] bg-amber-60 mb-4  border-b-2 border-[#fff] flex flex-col justify-between items-center">
                <div className="innerImage&name w-full min-h-[80px] bg-amber-20 flex justify-between items-center">
                  <div className="imgdiv relative rounded-full h-[80px] w-[80px] bg-gradient-to-r from-teal-400 to-yellow-200 flex justify-center items-center">
                    <img
                      src={`./public/${userdet.avatar}`}
                      alt=""
                      className="w-[95%] h-[95%] rounded-full object-cover"
                    />
                    <div
                      onClick={() => setPhotoToggle(!photoToggle)}
                      className="cameraIcon w-[20px] h-[20px] cursor-pointer absolute bottom-0 right-0 bg-[#fff] rounded-full flex justify-center items-center"
                    >
                      <FaCamera className="text-[#000] text-[11px]" />
                    </div>
                  </div>

                  <div className="textdiv min-h-[80px] w-[60%] flex justify-start items-center bg-lime-40">
                    <h2 className="text-[22px] font-bold text-white leading-[20px]">
                      Hello,
                      <br /> {userdet.userName}
                    </h2>
                  </div>
                </div>

                <div className="editName w-full h-[30px] flex justify-end items-center bg-amber-90">
                  <div
                    onClick={() => seteditnameToggle(!editnameToggle)}
                    className="editUsername cursor-pointer min-w-[50px] min-h-[10px] px-[5px] py-[3px] bg-red-500 rounded-[5px] flex  justify-center items-center"
                  >
                    <h2 className="text-[#fff] font-semibold text-[10px]">
                      Edit Username
                    </h2>
                  </div>
                </div>
              </div>

              <div
                onClick={() => console.log("hello")}
                className="myorders mb-4 w-[100%] h-[45px] bg-[#3C364C] rounded-[5px] flex justify-between items-center px-3 cursor-pointer group hover:bg-[#5a5177]  transition-all duration-300"
              >
                <div className="h-full w-[80%] flex justify-start items-center gap-3">
                  <IoFileTrayFullSharp className="text-[#ffffff6d] text-[20px] group-hover:text-[#fff]  transition-all duration-300" />
                  <h2 className="text-[15px] font-semibold text-[#ffffff6d] group-hover:text-[#fff]  transition-all duration-300">
                    My Orders
                  </h2>
                </div>

                <div className="w-[20%] h-full flex justify-center items-center">
                  <IoIosArrowForward className="text-[#ffffff6d] text-[20px] group-hover:text-[#fff] transition-all duration-300  group-hover:translate-x-2" />
                </div>
              </div>
            </div>

            <div onClick={logout} className="lowerLogout w-full h-[50px] bg-red-600 rounded-[5px] flex justify-center items-center text-[20px] text-[#fff] font-bold cursor-pointer">
              LogOut
            </div>
          </div>

          <div className="rightside h-full w-[80%] px-5 py-5">
            <div className="w-full h-[25%] flex flex-col justify-start items-center">
              <div className="w-full h-[30%] flex justify-start items-center">
                <h1 className="text-[25px] font-bold text-[#fff]">
                  Personal Detailes
                </h1>
              </div>

              <div className="PersonalDetailes w-full h-[70%] flex justify-center items-center">
                {/* yaha se */}

                <div className="h-full w-[50%] flex flex-col justify-center items-start gap-2">
                  <div className="flex justify-between items-center w-[300px]">
                    <h2 className="text-[#fff] font-semibold text-[17px]">
                      Phone Number
                    </h2>
                    <h2
                      onClick={() => (
                        setReadonly((prev) => ({
                          ...prev,
                          phoneNumber: !readonly.phoneNumber,
                        })),
                        refresh("phoneNumber")
                      )}
                      className="text-[#991da7] font-semibold text-[17px] cursor-pointer"
                    >
                      {readonly.phoneNumber ? "Edit" : "Cancle"}
                    </h2>
                  </div>
                  <form className="flex justify-start items-center gap-[20px]">
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="phone number"
                      readOnly={readonly.phoneNumber}
                      value={userdet.phoneNumber}
                      onChange={handleChange}
                      className="text-[#fff] bg-[#3C364C] rounded-[5px] outline-none py-[10px] px-[20px] w-[300px]"
                    />
                    <button
                      onClick={(e) => (
                        e.preventDefault(), handleSave("phoneNumber")
                      )}
                      className={`px-[25px] py-[10px] ${
                        readonly.phoneNumber ? "hidden" : "visible"
                      } rounded-[10px] bg-violet-500 font-semibold text-white cursor-pointer`}
                    >
                      SAVE
                    </button>
                  </form>
                </div>

                <div className="h-full w-[50%] flex flex-col justify-center items-start gap-2">
                  <div className="flex justify-between items-center w-[300px]">
                    <h2 className="text-[#fff] font-semibold text-[17px]">
                      Email
                    </h2>
                    <h2
                      onClick={() => (
                        setReadonly((prev) => ({
                          ...prev,
                          email: !readonly.email,
                        })),
                        refresh("email")
                      )}
                      className="text-[#991da7] font-semibold text-[17px] cursor-pointer"
                    >
                      {readonly.email ? "Edit" : "Cancle"}
                    </h2>
                  </div>
                  <div className="flex justify-start items-center gap-[20px]">
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      readOnly={readonly.email}
                      value={userdet.email}
                      onChange={handleChange}
                      className="text-[#fff] bg-[#3C364C] rounded-[5px] outline-none py-[10px] px-[20px] w-[300px]"
                    />
                    <button
                      onClick={(e) => (e.preventDefault(), handleSave("email"))}
                      className={`px-[25px] py-[10px] ${
                        readonly.email ? "hidden" : "visible"
                      } rounded-[10px] bg-violet-500 font-semibold text-white cursor-pointer`}
                    >
                      SAVE
                    </button>
                  </div>
                </div>

                {/* yahatak */}
              </div>
            </div>

            <div className="w-full h-[75%] flex flex-col justify-center items-center">
              <div className="w-full h-[15%] flex justify-start items-center">
                <h1 className="text-[25px] font-bold text-[#fff]">Address</h1>
              </div>

              <div className="w-full h-[85%] flex flex-col justify-between items-center">
                {/* yaha se */}

                <div className="w-full h-[23%] flex flex-col justify-center items-start gap-2">
                  <div className="flex justify-between items-center w-[300px]">
                    <h2 className="text-[#fff] font-semibold text-[17px]">
                      Street
                    </h2>
                    <h2
                      onClick={() => (
                        setReadonly((prev) => ({
                          ...prev,
                          street: !readonly.street,
                        })),
                        refresh("street")
                      )}
                      className="text-[#991da7] font-semibold text-[17px] cursor-pointer"
                    >
                      {readonly.street ? "Edit" : "Cancle"}
                    </h2>
                  </div>
                  <div className="flex justify-start items-center gap-[20px]">
                    <input
                      type="text"
                      name="street"
                      placeholder="street"
                      readOnly={readonly.street}
                      value={userdet.street}
                      onChange={handleChange}
                      className="text-[#fff] bg-[#3C364C] rounded-[5px] outline-none py-[10px] px-[20px] w-[300px]"
                    />
                    <button
                      onClick={(e) => (
                        e.preventDefault(), handleSave("street")
                      )}
                      className={`px-[25px] py-[10px] ${
                        readonly.street ? "hidden" : "visible"
                      } rounded-[10px] bg-violet-500 font-semibold text-white cursor-pointer`}
                    >
                      SAVE
                    </button>
                  </div>
                </div>

                <div className="w-full h-[23%] flex flex-col justify-center items-start gap-2">
                  <div className="flex justify-between items-center w-[300px]">
                    <h2 className="text-[#fff] font-semibold text-[17px]">
                      City
                    </h2>
                    <h2
                      onClick={() => (
                        setReadonly((prev) => ({
                          ...prev,
                          city: !readonly.city,
                        })),
                        refresh("city")
                      )}
                      className="text-[#991da7] font-semibold text-[17px] cursor-pointer"
                    >
                      {readonly.city ? "Edit" : "Cancle"}
                    </h2>
                  </div>
                  <div className="flex justify-start items-center gap-[20px]">
                    <input
                      type="text"
                      name="city"
                      placeholder="city"
                      readOnly={readonly.city}
                      value={userdet.city}
                      onChange={handleChange}
                      className="text-[#fff] bg-[#3C364C] rounded-[5px] outline-none py-[10px] px-[20px] w-[300px]"
                    />
                    <button
                      onClick={(e) => (e.preventDefault(), handleSave("city"))}
                      className={`px-[25px] py-[10px] ${
                        readonly.city ? "hidden" : "visible"
                      } rounded-[10px] bg-violet-500 font-semibold text-white cursor-pointer`}
                    >
                      SAVE
                    </button>
                  </div>
                </div>

                <div className="w-full h-[23%] flex flex-col justify-center items-start gap-2">
                  <div className="flex justify-between items-center w-[300px]">
                    <h2 className="text-[#fff] font-semibold text-[17px]">
                      Pin
                    </h2>
                    <h2
                      onClick={() => (
                        setReadonly((prev) => ({
                          ...prev,
                          pin: !readonly.pin,
                        })),
                        refresh("pin")
                      )}
                      className="text-[#991da7] font-semibold text-[17px] cursor-pointer"
                    >
                      {readonly.pin ? "Edit" : "Cancle"}
                    </h2>
                  </div>
                  <div className="flex justify-start items-center gap-[20px]">
                    <input
                      type="number"
                      name="pin"
                      placeholder="pin"
                      readOnly={readonly.pin}
                      value={userdet.pin}
                      onChange={handleChange}
                      className="text-[#fff] bg-[#3C364C] rounded-[5px] outline-none py-[10px] px-[20px] w-[300px]"
                    />
                    <button
                      onClick={(e) => (e.preventDefault(), handleSave("pin"))}
                      className={`px-[25px] py-[10px] ${
                        readonly.pin ? "hidden" : "visible"
                      } rounded-[10px] bg-violet-500 font-semibold text-white cursor-pointer`}
                    >
                      SAVE
                    </button>
                  </div>
                </div>

                <div className="w-full h-[23%] flex flex-col justify-center items-start gap-2">
                  <div className="flex justify-between items-center w-[300px]">
                    <h2 className="text-[#fff] font-semibold text-[17px]">
                      State
                    </h2>
                    <h2
                      onClick={() => (
                        setReadonly((prev) => ({
                          ...prev,
                          state: !readonly.state,
                        })),
                        refresh("state")
                      )}
                      className="text-[#991da7] font-semibold text-[17px] cursor-pointer"
                    >
                      {readonly.state ? "Edit" : "Cancle"}
                    </h2>
                  </div>
                  <div className="flex justify-start items-center gap-[20px]">
                    <input
                      type="text"
                      name="state"
                      placeholder="state"
                      readOnly={readonly.state}
                      value={userdet.state}
                      onChange={handleChange}
                      className="text-[#fff] bg-[#3C364C] rounded-[5px] outline-none py-[10px] px-[20px] w-[300px]"
                    />
                    <button
                      onClick={(e) => (e.preventDefault(), handleSave("state"))}
                      className={`px-[25px] py-[10px] ${
                        readonly.state ? "hidden" : "visible"
                      } rounded-[10px] bg-violet-500 font-semibold text-white cursor-pointer`}
                    >
                      SAVE
                    </button>
                  </div>
                </div>

                {/* yaha tak */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyersProfile;
