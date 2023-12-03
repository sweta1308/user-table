import { DeleteForever } from "@mui/icons-material";
import { useUser } from "../context/UserContext";
import { Tooltip } from "@mui/material";

export const SearchInput = () => {
  const { userDispatch, userState } = useUser();
  return (
    <>
      <div className="flex items-center">
        <input
          value={userState.filters.searchTerm}
          onChange={(e) =>
            userDispatch({ type: "SEARCH_USERS", payload: e.target.value })
          }
          placeholder="Search by name, email or role..."
          className="search-icon mr-[10px] border border-gray-400 w-full p-[8px] text-[12px] outline-none rounded-md"
        />
        <Tooltip title="Delete Selected">
          <button
            onClick={() => userDispatch({ type: "DELETE_ALL" })}
            className="bg-gray-200 p-[5px] rounded text-red-600 hover:text-red-700"
          >
            <DeleteForever />
          </button>
        </Tooltip>
      </div>
    </>
  );
};
