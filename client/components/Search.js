import React, {Component} from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            "search": "",
            "zip": ""
        }
        this.onKeyUp = this.onKeyUp.bind(this);
        this.zipOnKeyUp = this.zipOnKeyUp.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.submitLocationSearch = this.submitLocationSearch.bind(this);
    }
    onKeyUp(){
        this.setState({"search": event.target.value});
        console.log(this.state.search);
    }

    zipOnKeyUp(){
        console.log(event.target.value);
        this.setState({"zip": event.target.value});
    }

    onKeyPress(e){
        if (e.which === 13){
            this.submitLocationSearch;
        }
    }

    submitLocationSearch(){
        this.props.submitLocationSearch(this.state.search, this.state.zip);
        this.setState({
            "search": "",
            "zip": ""
        });

    }

    render(){
        return (
        <div className="Search">
            <div className="search-title"><h2 className="search-title-header">Full Address (Include the Town)</h2></div>
            <input className="LocationSearch" onKeyUp={this.onKeyUp} onKeyPress={this.onKeyPress} />
            <input className="Zip" onKeyUp={this.zipOnKeyUp} onKeyPress={this.onKeyPress} />
            <button className="SubmitLocationSearch" onClick={this.submitLocationSearch}>Submit</button>
            </div>
            )
    }
}

export default Search;