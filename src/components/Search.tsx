

import React, { ChangeEvent } from 'react';

interface SearchProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ handleChange }) => {
    return (
        <input
            type="text"
            name='searchItem'
            placeholder="Search users..."
            className="w-full  border-[1.5px] rounded-lg border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            onChange={handleChange}
        />
    );
};

export default Search;

// import React, { useState } from 'react';

// interface SearchProps {
//     searchTerm: string;
//     setSearchTerm: (term: string) => void;
//     handleSearch: (term: string) => void;
// }

// const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
//     // State to manage the current search term
//     const [inputTerm, setInputTerm] = useState(searchTerm);

//     // Debounce function
//     const debounce = (func: Function, delay: number) => {
//         let timeoutId: ReturnType<typeof setTimeout>;
//         return (...args: any[]) => {
//             if (timeoutId) {
//                 clearTimeout(timeoutId);
//             }
//             timeoutId = setTimeout(() => {
//                 func(...args);
//             }, delay);
//         };
//     };

//     // Debounced setSearchTerm function
//     const debouncedSetSearchTerm = debounce(setSearchTerm, 300);

//     // Event handler for input change with debouncing
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { value } = e.target;
//         setInputTerm(value);
//         debouncedSetSearchTerm(value);
//         handleSearch(value); // Call handleSearch with debounced value
//     };

//     return (
//         <input
//             type="text"
//             placeholder="Search users..."
//             className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-primary"
//             value={inputTerm}
//             onChange={handleChange}
//         />
//     );
// };

// export default Search;
