import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { userReducer } from "../reducer/UserReducer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    users: [],
    editId: null,
    currentPage: 1,
    filters: {
      searchTerm: "",
      checkedItems: [],
    },
  };
  const [userState, userDispatch] = useReducer(userReducer, initialState);

  const getData = async () => {
    try {
      userDispatch({ type: "LOADING", payload: true });
      const { status, data } = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (status === 200) {
        userDispatch({ type: "SET_USERS", payload: data });
      }
    } catch (e) {
      console.error(e);
    } finally {
      userDispatch({ type: "LOADING", payload: false });
    }
  };

  let filteredData = userState?.users;

  filteredData = filteredData.filter(
    (data) =>
      data.name
        .trim()
        .toLowerCase()
        .includes(userState.filters.searchTerm.trim().toLowerCase()) ||
      data.email
        .trim()
        .toLowerCase()
        .includes(userState.filters.searchTerm.trim().toLowerCase()) ||
      data.role
        .trim()
        .toLowerCase()
        .includes(userState.filters.searchTerm.trim().toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userState, userDispatch, filteredData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
