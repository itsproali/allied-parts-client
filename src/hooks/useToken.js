import { useEffect, useState } from "react";
import axios from "axios";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const displayName = user?.user?.displayName;

  useEffect(() => {
    const getToken = async () => {
      if (displayName) {
        const uid = user?.user?.uid;
        const email = user?.user?.email;
        const photoURL = user?.user?.photoURL;
        let loggedUser;
        loggedUser = { uid, email, displayName, photoURL };
        const { data } = await axios.put(
          `https://allied-parts-server.vercel.app/user/${uid}`,
          {
            loggedUser,
          }
        );

        const accessToken = data?.token;
        setToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
      }
    };
    getToken();
  }, [user, displayName]);
  return [token];
};

export default useToken;
