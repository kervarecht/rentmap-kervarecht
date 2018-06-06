import React, {Component} from 'react';

class ZillowInfo extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="ZillowInfo">
                <p className="HomeFullAddress">Address: {this.props.address}</p>
                <p className="Zestimate">Estimated Price: {this.props.zestimate}</p>
                <p className="DestinationFullAddress">Destination: {this.props.destination}</p>
                <p className="Distance">Distance: {this.props.distance}</p>
                <p className="Duration">Trip Time: {this.props.duration} </p>
                </div>
        )
    }
}

export default ZillowInfo;