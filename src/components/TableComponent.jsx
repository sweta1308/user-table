import { useState } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useUser } from "../context/UserContext";
import { UserTableBody } from "./TableBody";

export const TableComponent = ({ data }) => {
  const { userState, userDispatch } = useUser();
  const [userValue, setUserValue] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValue({ ...userValue, [name]: value });
  };
  const handleAllSelected = () => {
    if (data.every(({ id }) => userState.filters.checkedItems.includes(id))) {
      userDispatch({ type: "UNSELECT_ALL", payload: data.map(({ id }) => id) });
    } else {
      userDispatch({
        type: "SELECT_ALL",
        payload: data.map((item) => item.id),
      });
    }
  };
  return (
    <>
      <div className="mt-[25px]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#cbd5e1" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <input
                    type="checkbox"
                    checked={
                      data.every(({ id }) =>
                        userState.filters.checkedItems.includes(id)
                      ) && userState.filters.checkedItems.length >= data.length
                    }
                    onChange={handleAllSelected}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <UserTableBody
              data={data}
              handleChange={handleChange}
              userValue={userValue}
              setUserValue={setUserValue}
            />
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
