import React, {Component} from 'react';
import L from 'leaflet';

class LeafletMap extends Component {
    constructor(props){
        super(props);
        this.updateView = this.updateView.bind(this);
    }

    componentWillReceiveProps(newProps){
        console.log(newProps.coordinates);
        this.updateView(newProps.coordinates, 14)
    }

    updateView(newCoords, zoom){
        console.log(newCoords, zoom);
        this.myMap.setView(newCoords, zoom);
        L.marker(newCoords).addTo(this.myMap);
    }

    componentDidMount(){
        //define map, to define specific area inject .setView([coordinates], zoom)
        
        this.myMap = L.map('mapid').setView(this.props.coordinates, 13);
        
        //adding the visual layer so see the map!
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2VydmFyZWNodCIsImEiOiJjamhiYnFxYjMwMGl1MzBwZHZ2ZXR4c25mIn0.i_iS5UIuo8hoc16_Cboamg', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoia2VydmFyZWNodCIsImEiOiJjamhiYnFxYjMwMGl1MzBwZHZ2ZXR4c25mIn0.i_iS5UIuo8hoc16_Cboamg'
        }).addTo(this.myMap);

        //to add a marker
        // var marker = L.marker([51.5, -0.09]).addTo(myMap);
    }

    render(){
        return (
            <div id="mapid"></div>
        )
    }
}

export default LeafletMap;