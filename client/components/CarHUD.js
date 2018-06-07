import React, {Component} from 'react';
import CarSearch from './CarSearch';
import CarDisplay from './CarDisplay';

class CarHUD extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="CarHUD">
            <CarSearch />
            <CarDisplay />
            </div>
        )
    }
}

export default CarHUD;