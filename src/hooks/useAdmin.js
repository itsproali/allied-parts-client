import { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const uid = user?.uid;
  useEffect(() => {
    if (uid) {
      fetch(`http://localhost:5000/admin/${uid}`)
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.admin);
          setAdminLoading(false);
        });
    }
  }, [uid]);
  return [admin, adminLoading];
};

export default useAdmin;
