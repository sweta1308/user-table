import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { useUser } from "../context/UserContext";
import { Delete, EditNote } from "@mui/icons-material";

export const UserTableBody = ({
  data,
  userValue,
  handleChange,
  setUserValue,
}) => {
  const { userState, userDispatch } = useUser();
  return (
    <>
      <TableBody>
        {data?.map((data) => (
          <TableRow
            style={{
              backgroundColor: userState.filters.checkedItems.includes(data.id)
                ? "#e2e8f0"
                : "",
            }}
            className="hover:bg-gray-100"
            key={data.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>
              <input
                type="checkbox"
                checked={userState.filters.checkedItems.includes(data.id)}
                onChange={() =>
                  userDispatch({ type: "CHECKED_ITEMS", payload: data.id })
                }
              />
            </TableCell>
            <TableCell component="th" scope="row">
              {userState.editId === data.id ? (
                <input
                  className="border border-gray-400 outline-none p-[4px] rounded"
                  name="name"
                  value={userValue.name}
                  onChange={handleChange}
                />
              ) : (
                data.name
              )}
            </TableCell>
            <TableCell align="left">
              {userState.editId === data.id ? (
                <input
                  className="border border-gray-400 outline-none p-[4px] rounded"
                  name="email"
                  value={userValue.email}
                  onChange={handleChange}
                />
              ) : (
                data.email
              )}
            </TableCell>
            <TableCell align="left">
              {userState.editId === data.id ? (
                <input
                  className="border border-gray-400 outline-none p-[4px] rounded"
                  name="role"
                  value={userValue.role}
                  onChange={handleChange}
                />
              ) : (
                data.role
              )}
            </TableCell>
            <TableCell align="left">
              {userState.editId === data.id ? (
                <button
                  className="save bg-gray-500 text-white py-[4px] px-[8px] rounded hover:bg-gray-600"
                  onClick={() => {
                    userDispatch({
                      type: "UPDATE_USER",
                      payload: userValue,
                    });
                    userDispatch({
                      type: "SET_EDIT_ID",
                      payload: null,
                    });
                  }}
                >
                  Save
                </button>
              ) : (
                <div>
                  <button
                    className="edit"
                    onClick={() => {
                      userDispatch({
                        type: "SET_EDIT_ID",
                        payload: data.id,
                      });
                      setUserValue(data);
                    }}
                  >
                    <Tooltip title="Edit">
                      <EditNote
                        sx={{
                          color: "gray",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </button>
                  <button
                    className="delete"
                    onClick={() =>
                      userDispatch({
                        type: "DELETE_USER",
                        payload: data.id,
                      })
                    }
                  >
                    <Tooltip title="Delete">
                      <Delete
                        sx={{
                          marginLeft: "20px",
                          color: "red",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};
