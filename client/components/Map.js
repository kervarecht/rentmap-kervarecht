import React, {Component} from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine'; //adding L.Routing.control
import axios from 'axios';
import '../styles/Map.scss';


class LeafletMap extends Component {
    constructor(props){
        super(props);
        this.updateView = this.updateView.bind(this);
        this.setRoute = this.setRoute.bind(this)
        this.state = {
            "route": null,
            "origin": null,
            "destination": null
        }
    }

    componentWillReceiveProps(newProps){
        if (newProps.coordinates == this.state.origin && newProps.destination == this.state.destination){
            console.log("Coordinates unchanged");
        }
        else if (newProps.coordinates.length > 0 && newProps.destination.length > 0){
            this.setRoute(newProps.coordinates, newProps.destination);
            var origin = newProps.coordinates
            var destination = newProps.destination;
            this.setState({"origin" : origin,
            "destination": destination})
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
        //console.log(newCoords, zoom);
        this.myMap.setView(newCoords, zoom);
        L.marker(newCoords).addTo(this.myMap);
    }

    setRoute(origin, destination){
        //Using state to track route variable across initializations
        //User can change waypoints dynamically and route will update
        //Check previous 
        if (this.state.route){
            this.myMap.removeControl(this.state.route);
        }
        let route;
        route = L.Routing.control({
            units: 'imperial',
            waypoints: [
              L.latLng(origin[0], origin[1]),
              L.latLng(destination[0], destination[1])
            ]
          }).addTo(this.myMap)
        
        this.setState({"route": route}) //sets route to state so next time function is called previous route can be removed

        //center map on route
        var center = [(origin[0] - destination[0])/2, (origin[1] + destination[1])/2]
        var routeZoom = Math.abs(center[0] - origin[0]);
        this.myMap.setView(center, routeZoom);  

        //console.log(route);
          var url = function(originLng, originLat, destLng, destLat){
              var base = 'http://router.project-osrm.org/route/v1/driving/'
              var end = '?overview=false';
              return base + originLat + ',' + originLng + ';' + destLat + ',' + destLng + end;
          }
        //grab distance
        console.log("Url: " + url(origin[0], origin[1], destination[0], destination[1]));
        axios.get(url(origin[0], origin[1], destination[0], destination[1])).then((response, err) => {
          if (err){
              console.log(err);
          }
          console.log(response);
          var settings = {
            "distance": response.data.routes[0].distance,
            "duration": response.data.routes[0].duration
          }

          this.props.setDistance(settings)
        })
    }
    
          

    componentDidMount(){
        //define map, to define specific area inject .setView([coordinates], zoom)
        this.myMap = L.map('mapid').setView([41.68, -72.545], 13);
        this.setState({
            "coordinates": [41.68, -72.545]
        })
        
        //adding the visual layer to see the map!
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