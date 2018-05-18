import React, {Component} from 'react';
import Search from "./Search";
import LeafletMap from './Map'

class App extends Component {
    constructor(props){
        super(props)
    }
    submitLocationSearch(value){
        console.log("Parent submitLocationSearch function called for " + value);
    }
    render(){
        return(
            <div className="App">
                <Search submitLocationSearch={this.submitLocationSearch}/>
                <LeafletMap />
            </div>
        )
    }
}

export default App;