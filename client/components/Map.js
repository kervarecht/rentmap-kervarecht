import React, {Component} from 'react';
import L from 'leaflet';
//MapBox token pk.eyJ1Ijoia2VydmFyZWNodCIsImEiOiJjamhiYnFxYjMwMGl1MzBwZHZ2ZXR4c25mIn0.i_iS5UIuo8hoc16_Cboamg

class LeafletMap extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        //define map, to define specific area inject .setView([coordinates], zoom)
        var myMap = L.map('mapid').setView([51.5, -0.09], 13);
        
        //adding the visual layer so see the map!
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2VydmFyZWNodCIsImEiOiJjamhiYnFxYjMwMGl1MzBwZHZ2ZXR4c25mIn0.i_iS5UIuo8hoc16_Cboamg', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoia2VydmFyZWNodCIsImEiOiJjamhiYnFxYjMwMGl1MzBwZHZ2ZXR4c25mIn0.i_iS5UIuo8hoc16_Cboamg'
        }).addTo(myMap);

        //to add a marker
        var marker = L.marker([51.5, -0.09]).addTo(myMap);
    }

    render(){
        return (
            <div id="mapid"></div>
        )
    }
}

export default LeafletMap;