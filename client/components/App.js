import React, {Component} from 'react';
import Search from "./Search";
import LeafletMap from './Map'
import ZillowInfo from './ZillowInfoComponent';
import CarHUD from './CarHUD';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            "coordinates" : [],
            "destination": [],
            "address": null,
            "destinationAddress": null,
            "zestimate": null,
            "distance": null,
            "duration": null,
            "comb_mpg": null,
            "fuel_type": null
        }
        this.submitLocationSearch = this.submitLocationSearch.bind(this);
        this.submitDestinationSearch = this.submitDestinationSearch.bind(this);
        this.setCar = this.setCar.bind(this);
        this.setDistance = this.setDistance.bind(this);
    }

    submitDestinationSearch(destination){
        var self = this;
        axios.get('http://localhost:3000/destination', 
        {params:
            {destination: destination}})
        .then(response => {
            const destCoords = [response.data["0"].latitude, response.data["0"].longitude];
            //console.log(response.data);
            self.setState({"destination": destCoords,
                    "destinationAddress": response.data["0"].formattedAddress});
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
            //console.log(response.data);
            const newCoords = [response.data.latitude, response.data.longitude];
            self.setState({"coordinates": newCoords,
                            "address": response.data.street_address,
                            "zestimate": response.data.zestimate});
        })
        .catch(err => console.log(err));
    }

    setDistance(settings){
        this.setState(settings);
    }

    setCar(mpg, fuel){
        console.log("setCar function called");
        this.setState({
            "comb_mpg": mpg,
            "fuel_type": fuel
        })
    }

    render(){
        
        return (
            <div className="App">
                <Search submitLocationSearch={this.submitLocationSearch} submitDestinationSearch={this.submitDestinationSearch} />
                <LeafletMap coordinates={this.state.coordinates} destination={this.state.destination} setDistance={this.setDistance}/>
                <ZillowInfo comb_mpg={this.state.comb_mpg} fuel_type={this.state.fuel_type} address={this.state.address} destination={this.state.destinationAddress} distance={this.state.distance} duration={this.state.duration} zestimate={this.state.zestimate}/>
                <CarHUD setCar={this.setCar}/>
            </div>
        )    
    }
}

export default App;