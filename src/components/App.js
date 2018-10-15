import React, { Component } from 'react';
import Aux from '../helper/Hoc';
import Search from './Search';
import SearchResults from './SearchResults';
import axios from 'axios';
import '../css/App.css';

class App extends Component {
  state = {
    searchResults: new Map(),
  }

  // use gitHub Search via input to perform search
  getDataHandler = (userInput) =>{
    const baseUrl = 'https://api.github.com/search/repositories?';
    const updatedSearchResults = new Map();

    axios.get(baseUrl, {
      params: {
        q: userInput,
      }
    })
      .then( response => {

        let results = [];
          results = response.data.items;

        // updatedSearchResults' key-value pairs
        results.forEach(result => {
          updatedSearchResults.set( result.id, {
            name: result.name,
            description: result.description,
            language: result.language,
            link: result.html_url,
          })
        })

        // returns array which holds n responses
        return axios.all(
          results.map( result => {
            // returns references to object holding JSON data from response
            return axios.get(result.tags_url)
              .then( response => response )
              .catch( searchError => this.setState({searchError: true}))
          })
        )

      })
      .then( response => {

        const searchResulsIds = [];
        // get ids from search Results Map
        for (let repoId of updatedSearchResults.keys()) {
          searchResulsIds.push(repoId);
        };
        response.forEach( (result, index) => {
          // tags_url can return an empty data array
          if ( result.data.length !== 0 ){
            const updatedMapValue = { ...updatedSearchResults.get(searchResulsIds[index]) };
            updatedSearchResults.set(searchResulsIds[index], updatedMapValue);
          }
        })

        // update state
        this.setState({
          searchResults: updatedSearchResults,
        });

      })
  }

  // handling onChange event where input is empty
  formInputEmptyHandler = () => {
    // re-initialize state
    this.setState({searchResults: new Map()});
  }

  render() {
    return (
      <Aux>
        <header className="app-header">
          <h1> Github Repository Search </h1>
        </header>

        <div className="main-container">
          <div className="search-content-container">

            <Search
              searchSubmitHandler ={this.getDataHandler}
              clearSearchResults = {this.formInputEmptyHandler} />

                <SearchResults
                  searchResults={this.state.searchResults}

                />
          </div>

        </div>
      </Aux>
    );
  }
}

export default App;
