import React, {Component} from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            "search": ""
        }
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.submitLocationSearch = this.submitLocationSearch.bind(this);
    }
    onKeyUp(){
        this.setState({"search": event.target.value});
        console.log(this.state.search);
    }

    onKeyPress(e){
        if (e.which === 13){
            this.submitLocationSearch;
        }
    }

    submitLocationSearch(){
        this.props.submitLocationSearch(this.state.search);
        this.setState({
            "search": ""
        });

    }
    render(){
        return (
        <div className="Search">
            <input className="LocationSearch" onKeyUp={this.onKeyUp} onKeyPress={this.onKeyPress}/>
            <button className="SubmitLocationSearch" onClick={this.submitLocationSearch}>Submit</button>
            </div>
            )
    }
}

export default Search;