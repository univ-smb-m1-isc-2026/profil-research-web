import React from 'react';

const SearchBar = ({ searchTerm, onChange, inputRef, styleContainer, styleInput }) => {
    return (
        <div className="search-bar-container" style={styleContainer}>
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Rechercher une offre..." 
                value={searchTerm}
                onChange={onChange}
                style={styleInput}
            />
        </div>
    );
};

export default SearchBar;
