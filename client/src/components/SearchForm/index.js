import React, { useState } from 'react';
// import API from "../../utils/API";

function SearchForm() {
    const [search, setSearch] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
        console.log(e.target.value)
    }

    // function handleFormSubmit(event){
    //     event.preventDefault();

    // }

    // function handleSort(){

    // }
    function clearSearch(e) {
        e.preventDefault();
        setSearch("");
    }

    return (
        <form>
            <div className="input-group mb-4">
                <label htmlFor="search" className="sr-only">Search For Ideas:</label>
                <input
                    onChange={handleInputChange}
                    value={search}
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="Search for Ideas"
                    id="search"
                />
                <div className="input-group-append">
                    <button
                        // onClick={handleFormSubmit} 
                        className="btn"
                        style={{ background: 'hsl(239, 75%, 40%)', color: '#DDD' }}
                    >
                        Search
                        </button>
                    <button
                        onClick={clearSearch}
                        className="btn"
                        style={{ background: '#DDD', boxShadow: 'inset 0px 0px 3px #a1a1a1' }}
                    >
                        Clear
                        </button>
                </div>
            </div>
        </form>
    );
}

export default SearchForm;