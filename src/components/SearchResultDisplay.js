import React from 'react';

const SearchResultDisplay = (props) => {

    return (
        <div className="row repository">
            <div className="col-4 link-reset">
                <a href={props.searchResult.link} target="_blank">
                    {props.searchResult.name}
                </a>
            </div>
             <div className="col-3"> {props.searchResult.language} </div>
             <div className="col-3"> {props.searchResult.description} </div>
        </div>
    );
};

export default SearchResultDisplay;
