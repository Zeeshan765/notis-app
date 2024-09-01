interface SearchTerm {
    name: string;
    email: string;
    type: any;
  }
  
  interface Props {
    search: SearchTerm;
    handleRoleChange: any;
    handleClear: () => void;
  }
  
  const ChildSelectBar: React.FC<Props> = ({
    search,
    handleRoleChange,
    handleClear,
  }) => {
    return (
      <div className="relative">
        <select
          className="w-40 border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          name="type"
          value={search?.type}
          onChange={handleRoleChange}
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Job">Job</option>
          <option value="Rental">Rental</option>
        </select>
        {search?.type && (
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
            onClick={handleClear}
          >
            {/* Add SVG for circular cross icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.95-11.05a.75.75 0 111.06 1.06L11.06 11l4.95 4.95a.75.75 0 11-1.06 1.06L10 12.06l-4.95 4.95a.75.75 0 11-1.06-1.06L8.94 11 4.99 6.05a.75.75 0 111.06-1.06L10 9.94l4.95-4.95a.75.75 0 111.06 1.06L11.06 11l4.95 4.95z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    );
  };
  
  export default ChildSelectBar;
  