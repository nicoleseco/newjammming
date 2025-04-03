import React, {useState} from 'react';

function SearchBar({onSearch}) {
    const [search, setSearch] = useState('');

const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
        onSearch(search)
    }
};

return (
    <div className="SearchBar">
        <input 
        placeholder="Search" 
        value= {search}
        onChange={(e)=> setSearch(e.target.value)}
        />
        <button className="SearchButton" onClick={handleSearch}>Search</button>


    </div>
);

}
export default SearchBar;