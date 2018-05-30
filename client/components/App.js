import React, {Component} from 'react';
import Search from "./Search";
import LeafletMap from './Map'
import ZillowInfoComponent from './ZillowInfoComponent';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            "coordinates" : [],
            "destination": [],
            "address": "",
            "zipcode": "",
            "destinationAddress": "",
            "distance": ""
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
            self.setState({"destination": destCoords,
                    "destinationAddress": response.data["0"].address});
        })
    }
    
    submitLocationSearch(address){
        //axios function has different scope 'this,' setting component 'this' to 'self'
        var self = this;
        axios.get('http://localhost:3000/search', 
        {params: {
            address: address
        }})
        .then(response => {
            console.log(response.data);
            const newCoords = [response.data.latitude, response.data.longitude];
            self.setState({"coordinates": newCoords,
                            "address": response.data.address,
                            "zestimate": response.data.zestimate});
        })
        .catch(err => console.log(err));
    }

    setDistance(distance){
        this.setState({"distance": distance});
    }

    render(){
        
        return(
            <div className="App">
                <Search submitLocationSearch={this.submitLocationSearch} submitDestinationSearch={this.submitDestinationSearch} />
                <LeafletMap coordinates={this.state.coordinates} destination={this.state.destination} setDistance={this.setDistance}/>
                <ZillowInfoComponent 
                    address={this.state.address}
                    zipcode={this.state.zipcode}
                    destination={this.state.destinationAddress}
                    distance={this.state.distance}
                    />
            </div>
        )    
    }
}

export default App;