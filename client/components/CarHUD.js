import React, {Component} from 'react';
import CarSearch from './CarSearch';
import CarDisplay from './CarDisplay';

class CarHUD extends Component {
    constructor(props){
        super(props)
        this.submitCarSearch = this.submitCarSearch.bind(this);
    }

    submitCarSearch(year, make){
        axios.get('http://localhost:3000/vehicle', {
            params: {
                year: year,
                make: make
            }
        }).then(response => {
            console.log(response.data);
        })
    }

    render(){
        return (
            <div className="CarHUD">
            <CarSearch submitCarSearch={this.submitCarSearch}/>
            <CarDisplay />
            </div>
        )
    }
}

export default CarHUD;