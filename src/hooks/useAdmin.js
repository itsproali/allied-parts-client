import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase-init";

const useAdmin = () => {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const uid = user?.uid;
  useEffect(() => {
    if (user) {
      fetch(`https://allied-parts-manufacturing.herokuapp.com/admin/${uid}`)
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.admin);
          setAdminLoading(false);
        });
    } else {
      setAdminLoading(false);
    }
  }, [user, uid]);
  return [admin, adminLoading];
};

export default useAdmin;
