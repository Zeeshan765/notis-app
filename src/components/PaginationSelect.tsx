// interface SearchTerm {
//   perPage: string;
// }

interface Props {
  perPage:any;
  setPerPage:any
}

const PaginationSelect: React.FC<Props> = ({
  perPage,setPerPage
}) => {
  return (
    <>
      <select
        className="w-20 border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        name="perPage"
        value={perPage}
        onChange={(e) => setPerPage(e.target.value)}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </>
  );
};

export default PaginationSelect;
