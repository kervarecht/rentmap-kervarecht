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
            "fuel_type": null,
            "fuel_price": null
        }
        this.submitLocationSearch = this.submitLocationSearch.bind(this);
        this.submitDestinationSearch = this.submitDestinationSearch.bind(this);
        this.setCar = this.setCar.bind(this);
        this.setDistance = this.setDistance.bind(this);
        this.getFuelPrice = this.getFuelPrice.bind(this);
    }

    getFuelPrice(coordinates, fuelType){
        console.log("getFuelPrice called.")
        console.log(fuelType);
        var self=this;
        if (this.state.fuel_type == null || this.state.coordinates == null){
          console.log("Some value null");
        }
        else {
        axios.get('http://localhost:3000/fuelprice', {
            params : {
            coordinates: coordinates,
            fuel_type: fuelType
        }})
        .then(response => {
            if (response.data == false){
                console.log(response.data);
                console.log("Breaking");
            }
            else{
            console.log(response.data);
            self.setState({"fuel_price": response.data.fuel_price})
        }
        })
        .catch(error => {
            console.log(error);
        })
        }
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
            console.log(response.data);
            const newCoords = [response.data.latitude, response.data.longitude];
            self.setState({"coordinates": newCoords,
                            "address": response.data.street_address,
                            "zestimate": response.data.zestimate},
                            () => {
                                self.getFuelPrice(this.state.coordinates, this.state.fuel_type);
                            });
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
        },
        () => {
            this.getFuelPrice(this.state.coordinates, this.state.fuel_type);
        })
    }

    render(){
        
        return (
            <div className="App">
                <Search submitLocationSearch={this.submitLocationSearch} submitDestinationSearch={this.submitDestinationSearch} />
                <CarHUD setCar={this.setCar}/>
                <LeafletMap coordinates={this.state.coordinates} destination={this.state.destination} setDistance={this.setDistance}/>
                <ZillowInfo fuel_price={this.state.fuel_price} comb_mpg={this.state.comb_mpg} fuel_type={this.state.fuel_type} address={this.state.address} destination={this.state.destinationAddress} distance={this.state.distance} duration={this.state.duration} zestimate={this.state.zestimate}/>
            </div>
        )    
    }
}

export default App;