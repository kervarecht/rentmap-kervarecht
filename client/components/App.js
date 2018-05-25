import React, {Component} from 'react';
import Search from "./Search";
import LeafletMap from './Map'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            "coordinates" : [],
            "destination": []
        }
        this.submitLocationSearch = this.submitLocationSearch.bind(this);
        this.submitDestinationSearch = this.submitDestinationSearch.bind(this);
    }

    submitDestinationSearch(destination){
        var self = this;
        axios.get('http://localhost:3000/destination', 
        {params:
            {destination: destination}})
        .then(response => {
            const destCoords = [response.data["0"].latitude, response.data["0"].longitude];
            console.log(response.data);
            console.log(destCoords);
            self.setState({"destination": destCoords});
        })
    }
    
    submitLocationSearch(address, zip){
        //axios function has different scope 'this,' setting component 'this' to 'self'
        var self = this;
        axios.get('http://localhost:3000/search', 
        {params: {
            address: address,
            zip: zip
        }})
        .then(response => {
            console.log(response.data);
            const newCoords = [response.data.latitude, response.data.longitude];
            self.setState({"coordinates": newCoords});
        })
        .catch(err => console.log(err));
    }

    render(){
        
        return(
            <div className="App">
                <Search submitLocationSearch={this.submitLocationSearch} submitDestinationSearch={this.submitDestinationSearch}/>
                <LeafletMap coordinates={this.state.coordinates} destination={this.state.destination}/>
            </div>
        )    
    }
}

export default App;