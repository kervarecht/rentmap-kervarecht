import React, {Component} from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine'; //hopefully adding L.Routing.control

class LeafletMap extends Component {
    constructor(props){
        super(props);
        this.updateView = this.updateView.bind(this);
        this.setRoute = this.setRoute.bind(this)
    }

    componentWillReceiveProps(newProps){
        if (newProps.coordinates.length > 0 && newProps.destination.length > 0){
            this.setRoute(newProps.coordinates, newProps.destination);
        }
        else if (newProps.coordinates.length > 0 && newProps.destination.length == 0){
            this.updateView(newProps.coordinates);
        }
        else if (newProps.coordinates.length == 0 && newProps.destination.length > 0){
            this.updateView(newProps.destination);
        }
        else {
            console.log("No change");
        }
    }

    updateView(newCoords, zoom){
        console.log(newCoords, zoom);
        this.myMap.setView(newCoords, zoom);
        L.marker(newCoords).addTo(this.myMap);
    }

    setRoute(origin, destination){
        //Find a way to clear route IF route has been set, maybe using setWaypoints([]) or removeControl()
        if (route){
            this.myMap.removeControl(route);
        }
        //find a way to set switch between imperial and metric
        var route = L.Routing.control({
            units: 'imperial',
            waypoints: [
              L.latLng(origin[0], origin[1]),
              L.latLng(destination[0], destination[1])
            ]
          }).addTo(this.myMap);
    }

    componentDidMount(){
        //define map, to define specific area inject .setView([coordinates], zoom)
        this.myMap = L.map('mapid').setView([41.68, -72.545], 13);
        this.setState({
            "coordinates": [41.68, -72.545]
        })
        
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