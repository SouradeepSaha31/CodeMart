import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

function IsLoggedIn({Page}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);

  useEffect(() => {
      const storedUser = localStorage.getItem("userDetailes");
      if (storedUser === null || storedUser === "{}") {
          navigate("/login");
      } else {
        setUser(false);
    }
}, [navigate]);

if (user) {
    return null; 
}
return <Page />;

}

export default IsLoggedIn