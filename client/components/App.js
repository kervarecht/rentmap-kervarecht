import React, {Component} from 'react';
import Search from "./Search";
import LeafletMap from './Map'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            "coordinates" : [51.4, -0.09]
        }
        this.submitLocationSearch = this.submitLocationSearch.bind(this);
    }

    
    submitLocationSearch(address, zip){
        //axios function has different scope 'this,' setting component 'this' to 'self'
        var self = this;
        axios.get('http://localhost:3000/search', 
        {params: {
            address: address,
            zip: zip
        }})
        .then(response => {
            const newCoords = [response.data.latitude, response.data.longitude];
            self.setState({"coordinates": newCoords});
        })
        .catch(err => console.log(err));
    }

    render(){
        
        return(
            <div className="App">
                <Search submitLocationSearch={this.submitLocationSearch}/>
                <LeafletMap coordinates={this.state.coordinates} />
            </div>
        )    
    }
}

export default App;