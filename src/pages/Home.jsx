import { Pagination } from "../components/Pagination";
import { SearchInput } from "../components/SearchInput";

export const Home = () => {
  return (
    <>
      <div>
        <SearchInput />
        <Pagination itemsPerPage={10} />
      </div>
    </>
  );
};
