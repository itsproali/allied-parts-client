import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const displayName = user?.user?.displayName;

  useEffect(() => {
    if (displayName) {
      const uid = user?.user?.uid;
      const email = user?.user?.email;
      const photoURL = user?.user?.photoURL;
      let loggedUser;
      loggedUser = { uid, email, displayName, photoURL };
      fetch(`http://localhost:5000/user/${uid}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loggedUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          setToken(accessToken);
          localStorage.setItem("accessToken", accessToken);
        });
    }
  }, [user, displayName]);
  return [token];
};

export default useToken;
