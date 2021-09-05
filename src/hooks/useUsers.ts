import { useEffect, useState } from "react";

import api from "../api";
import { User } from "../types"

export const useUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .loadUsers()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, error, loading };
};
