import React, {Component} from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            "search": "",
            "zip": "",
            "destination": ""
        }
        this.destOnKeyUp = this.destOnKeyUp.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.zipOnKeyUp = this.zipOnKeyUp.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.submitLocationSearch = this.submitLocationSearch.bind(this);
        this.submitDestinationSearch = this.submitDestinationSearch.bind(this);
    }
    onKeyUp(){
        console.log(this.state.search);
        this.setState({"search": event.target.value});
    }

    zipOnKeyUp(){
        this.setState({"zip": event.target.value});
    }

    destOnKeyUp(){
        this.setState({"destination": event.target.value});
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
        this.locEntry.value = "";
        this.zipEntry.value = "";
    }

    submitDestinationSearch(){
        this.props.submitDestinationSearch(this.state.destination);
        this.setState({
            "destination": ""
        });
        this.destEntry.value = "";
    }

    render(){
        return (
        <div className="Search">
            <div className="search-title"><h2 className="search-title-header">Full Address (Include the Town)</h2></div>
            <input className="LocationSearch" onKeyUp={this.onKeyUp} onKeyPress={this.onKeyPress} ref={locEntry => this.locEntry = locEntry}/>
            <input className="Zip" onKeyUp={this.zipOnKeyUp} onKeyPress={this.onKeyPress} ref={zipEntry => this.zipEntry = zipEntry} />
            <button className="SubmitLocationSearch" onClick={this.submitLocationSearch}>Submit Home</button>
            <input className="DestinationSearch" onKeyUp={this.destOnKeyUp} />
            <button className="SubmitDestinationSearch" onClick={this.submitDestinationSearch} ref={destEntry => this.destEntry = destEntry}>Search Destination</button>
            </div>
            )
    }
}

export default Search;