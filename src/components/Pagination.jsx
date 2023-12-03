import { ClipLoader } from "react-spinners";
import { TableComponent } from "./TableComponent";
import { useUser } from "../context/UserContext";
import { PaginationButtons } from "./PaginationButtons";

export const Pagination = ({ itemsPerPage }) => {
  const { filteredData, userState, userDispatch } = useUser();
  const { currentPage } = userState;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (page) =>
    userDispatch({ type: "SET_CURRENT_PAGE", payload: page });

  return (
    <>
      <div className="relative">
        {userState.isLoading ? (
          <div className="flex justify-center">
            <ClipLoader size={70} />
          </div>
        ) : (
          <div>
            <TableComponent data={currentItems} />
            <PaginationButtons
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};
