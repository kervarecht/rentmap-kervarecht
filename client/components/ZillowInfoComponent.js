import React, {Component} from 'react';

class ZillowInfoComponent extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="ZillowInfoComponent">
                <p className="HomeFullAddress">{this.props.address}, {this.props.zipcode}</p>
                <p className="Zestimate">{this.props.zestimate}</p>
                <p className="DestinationFullAddress"> {this.props.destination}</p>
                <p className="Distance">{this.props.distance}</p>
                </div>
        )
    }
}

export default ZillowInfoComponent;