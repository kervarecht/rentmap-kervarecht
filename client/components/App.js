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
    submitLocationSearch(value){
        //axios function has different scope 'this,' setting component 'this' to 'self'
        var self = this;
        axios.get('http://localhost:3000/search', 
        {params: {
            value: value
        }})
        .then(response => {
            const newCoords = [response.latitude, response.longitude];
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