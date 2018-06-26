import React, {Component} from 'react';
import '../styles/ZillowInfoComponent.scss';

class ZillowInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            "imperial": true
        }
        this.inMinutes = this.inMinutes.bind(this);
        this.inDistance = this.inDistance.bind(this);
        this.perWeek = this.perWeek.bind(this);
    }

    componentWillReceiveProps(newProps){
        console.log(newProps);
    }

    inMinutes(time){
        var minutes = Math.round(time / 60);
        if (minutes > 60){
            return Math.floor(minutes / 60) + " hour, " + Math.round(minutes % 60);
        }
        else {
            return minutes + "-minute journey."
        }
    }

    inDistanceUnits(units){
        if (this.state.imperial == true){
            return (Math.round(units / 160) / 10) + " miles"; //allow 1 decimal point to distance
        }
        else {
            return (Math.round(units / 100) / 10) + " km";
        }
    }

    inDistance(units){
        //like above but no string to allow calc on component
        if (this.state.imperial == true){
            return (Math.round(units / 160) / 10);
        }
        else {
            return (Math.round(units / 100) / 10);
        }
    }

    perWeek(distance, price){
        return "$" + Math.round(this.inDistance(distance) * price * 100) / 100;
    }

    render(){
        return (
            <div className="ZillowInfo app-block">
                <p className="HomeFullAddress">Address: {this.props.address}</p>
                <p className="Zestimate">Estimated Price: {this.props.zestimate}</p>
                <p className="DestinationFullAddress">Destination: {this.props.destination}</p>
                <p className="Distance">Distance: {this.inDistanceUnits(this.props.distance)}</p>
                <p className="Duration">Trip Time: {this.inMinutes(this.props.duration)} </p>
                <p className="CombMPG">MPG/Gallons per week: {this.props.comb_mpg} / {(this.inDistance(this.props.distance) * 10) / this.props.comb_mpg}</p>
                <p className="FuelType">Fuel Type: {this.props.fuel_type}</p>
                <p className="FuelPrice">Fuel Price per gallon/per week: {this.props.fuel_price} / {this.perWeek(this.props.distance, this.props.fuel_price)}</p>
                </div>
        )
    }
}

export default ZillowInfo;