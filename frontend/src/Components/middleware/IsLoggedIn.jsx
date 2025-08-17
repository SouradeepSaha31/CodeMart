import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function IsLoggedIn({ Page }) {
  const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [tempUser, setTempUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetailes");

    if (!storedUser || storedUser === "{}") {
      navigate("/login"); // not logged in → go to login
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    // setTempUser(parsedUser);

    // ✅ Redirect logic
    if (parsedUser.shopName) {
      // user is seller → only SellerProfile allowed
      if (Page.name !== "SellerProfile") {
        navigate("/sellersprofile");
        // return;
      }
    } else {
      // user is buyer → only BuyerProfile allowed
      if (Page.name !== "BuyerProfile") {
        navigate("/buyersprofile");
        // return;
      }
    }

    // setLoading(false);
  }, [navigate, Page]);

//   if (loading) return null;

  return <Page />;
}

export default IsLoggedIn;
