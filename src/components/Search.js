import React, { Component } from 'react';
import '../css/Search.css';

class Search extends Component {
    state = {
        userInput: '',
    }

    userInputHandler = (event) => {
        if(event.target.value.length === 0){
            // update states in both here and in parent
            this.setState({userInput: ''});
            this.props.clearSearchResults();
        }
        else {
            this.setState({userInput: event.target.value});
        }
    }

    formSubmitHandler = (event) => {
        // prevent page refresh on submit
        event.preventDefault();

        // pass userInput up to App component for handling AJAX request
        this.props.searchSubmitHandler(this.state.userInput);
    }

    render() {
        const inputClass = ['search-input-box'];

        return (
            <div className="search">
                <form
                    className="search-form"
                    onSubmit={ this.formSubmitHandler }>
                    <input
                        className={inputClass.join(' ')}
                        placeholder="Please enter name of repo"
                        onChange={this.userInputHandler}>
                    </input>
                    <button type="submit" className="search-button"> Search </button>
                </form>
            </div>
        );
    }
}

export default Search;
