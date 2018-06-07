import React, {Component} from 'react';

class ZillowInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            "imperial": true
        }
        this.inMinutes = this.inMinutes.bind(this);
        this.inDistance = this.inDistance.bind(this);
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

    inDistance(units){
        if (this.state.imperial == true){
            return (Math.round(units / 160) / 10) + " miles"; //allow 1 decimal point to distance
        }
        else {
            return (Math.round(units / 100) / 10) + " km";
        }
    }

    render(){
        return (
            <div className="ZillowInfo">
                <p className="HomeFullAddress">Address: {this.props.address}</p>
                <p className="Zestimate">Estimated Price: {this.props.zestimate}</p>
                <p className="DestinationFullAddress">Destination: {this.props.destination}</p>
                <p className="Distance">Distance: {this.inDistance(this.props.distance)}</p>
                <p className="Duration">Trip Time: {this.inMinutes(this.props.duration)} </p>
                </div>
        )
    }
}

export default ZillowInfo;