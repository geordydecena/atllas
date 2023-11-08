import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, setShowSpinner }) => {

    const changeSearch = async (search) => {
        setShowSpinner(true);
        setSearchQuery({
            ...searchQuery,
            search,
        });
    };

    return (
        <input
            type="text"
            placeholder="Search Users"
            value={searchQuery.search}
            onChange={(e) => changeSearch(e.target.value)}
            className="border rounded p-2 ml-0.5 h-8 w-40 inline-block"
        />
    );
};

export default SearchBar;