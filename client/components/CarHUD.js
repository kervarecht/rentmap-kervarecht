import React, {Component} from 'react';
import CarSearch from './CarSearch';
import CarDisplay from './CarDisplay';

class CarHUD extends Component {
    constructor(props){
        super(props)
        this.submitCarSearch = this.submitCarSearch.bind(this);
        this.submitFuelSearch = this.submitFuelSearch.bind(this);
        this.state = {
            "mpg": null
        }
    }

    submitCarSearch(year, make, cb){
        axios.get('http://localhost:3000/vehicle', {
            params: {
                year: year,
                make: make
            }
        }).then((response, err) => {
            if(err){
                console.log("Error: " + err);
            }
            console.log(response.data);
            cb(response.data)
        })
    }

    submitFuelSearch(year, make, model){
        var setCar = this.props.setCar;
        axios.get('http://localhost:3000/mpgdata', {
            params : {
                year: year,
                make: make,
                model: model
            }
        }).then(response => {
            setCar(response.data.comb_mpg, response.data.fuel_type);
        })
    }

    render(){
        return (
            <div className="CarHUD">
            <CarSearch submitCarSearch={this.submitCarSearch} submitFuelSearch={this.submitFuelSearch}/>
            <CarDisplay />
            </div>
        )
    }
}

export default CarHUD;