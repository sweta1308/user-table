import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { useUser } from "../context/UserContext";

export const PaginationButtons = ({ totalPages, handlePageChange }) => {
  const { userState, userDispatch, filteredData } = useUser();
  const { currentPage } = userState;
  return (
    <>
      <div className="mt-[30px] relative right-0 text-[16px] flex gap-2 justify-between sm:flex-col">
        <div>
          <h3 className="text-gray-400 text-[14px] font-bold">
            {userState.filters.checkedItems.length} of {filteredData.length}{" "}
            row(s) selected
          </h3>
        </div>
        <div className="flex items-center gap-1 sm:flex-col-reverse">
          <h3 className="text-[14px] font-bold mr-[20px]">
            Page {currentPage} of {totalPages}
          </h3>
          <div className="flex gap-1">
            <button
              disabled={currentPage === 1}
              className="first-page border border-slate-300 px-[4px] rounded hover:bg-slate-100 disabled:text-gray-400"
              onClick={() =>
                userDispatch({ type: "SET_CURRENT_PAGE", payload: 1 })
              }
            >
              <KeyboardDoubleArrowLeft
                sx={{ fontSize: "15px", marginBottom: "3px" }}
              />
            </button>
            <button
              disabled={currentPage === 1}
              className="previous-page border border-slate-300 px-[4px] rounded hover:bg-slate-100 disabled:text-gray-400"
              onClick={() =>
                userDispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: currentPage - 1,
                })
              }
            >
              <KeyboardArrowLeft
                sx={{ fontSize: "15px", marginBottom: "3px" }}
              />
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                className={`${
                  index + 1
                } border border-slate-300 px-[10px] rounded hover:bg-slate-100`}
                key={index}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              className="next-page border border-slate-300 px-[4px] rounded hover:bg-slate-100 disabled:text-gray-400"
              onClick={() =>
                userDispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: currentPage + 1,
                })
              }
            >
              <KeyboardArrowRight
                sx={{ fontSize: "15px", marginBottom: "3px" }}
              />
            </button>
            <button
              disabled={currentPage === totalPages}
              className="last-page border border-slate-300 px-[4px] rounded hover:bg-slate-100 disabled:text-gray-400"
              onClick={() =>
                userDispatch({ type: "SET_CURRENT_PAGE", payload: totalPages })
              }
            >
              <KeyboardDoubleArrowRight
                sx={{ fontSize: "15px", marginBottom: "3px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
