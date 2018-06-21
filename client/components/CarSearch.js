import React, {Component} from 'react';
import '../styles/CarSearch.scss';

var years = [ 1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012, 2013, 2014, 2015, 2016, 2017, 2018 ];
var makes = ["AM General","ASC Incorporated","Acura","Alfa Romeo","American Motors Corporation","Aston Martin","Audi","Aurora Cars Ltd","Autokraft Limited","Avanti Motor Corporation","Azure Dynamics","BMW","BMW Alpina","BYD","Bentley","Bertone","Bill Dovell Motor Car Company","Bitter Gmbh and Co. Kg","Bugatti","Buick","CCC Engineering","CODA Automotive","CX Automotive","Cadillac","Chevrolet","Chrysler","Consulier Industries Inc","Dabryan Coach Builders Inc","Dacia","Daewoo","Daihatsu","Dodge","E. P. Dutton, Inc.","Eagle","Environmental Rsch and Devp Corp","Evans Automobiles","Excalibur Autos","Federal Coach","Ferrari","Fiat","Fisker","Ford","GMC","General Motors","Genesis","Geo","Goldacre","Grumman Allied Industries","Grumman Olson","Honda","Hummer","Hyundai","Import Foreign Auto Sales Inc","Import Trade Services","Infiniti","Isis Imports Ltd","Isuzu","J.K. Motors","JBA Motorcars, Inc.","Jaguar","Jeep","Karma","Kenyon Corporation Of America","Kia","Koenigsegg","Laforza Automobile Inc","Lambda Control Systems","Lamborghini","Land Rover","Lexus","Lincoln","London Coach Co Inc","London Taxi","Lotus","MINI","Mahindra","Maserati","Maybach","Mazda","McLaren Automotive","Mcevoy Motors","Mercedes-Benz","Mercury","Merkur","Mitsubishi","Mobility Ventures LLC","Morgan","Nissan","Oldsmobile","PAS Inc - GMC","PAS, Inc","Pagani","Panos","Panoz Auto-Development","Panther Car Company Limited","Peugeot","Pininfarina","Plymouth","Pontiac","Porsche","Quantum Technologies","Qvale","Ram","Red Shift Ltd.","Renault","Rolls-Royce","Roush Performance","Ruf Automobile Gmbh","S and S Coach Company  E.p. Dutton","SRT","Saab","Saleen","Saleen Performance","Saturn","Scion","Shelby","Spyker","Sterling","Subaru","Superior Coaches Div E.p. Dutton","Suzuki","TVR Engineering Ltd","Tecstar, LP","Tesla","Texas Coach Company","Toyota","VPG","Vector","Vixen Motor Company","Volga Associated Automobile","Volkswagen","Volvo","Wallace Environmental","Yugo","smart"
]

class CarSearch extends Component {
    constructor(props){
        super(props);
        this.handleMakeChange = this.handleMakeChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.getCar = this.getCar.bind(this);
        this.getFuel = this.getFuel.bind(this);
        this.state = {
            "years": years,
            "makes": makes,
            "selectedYear": 1984,
            "selectedMake": "AM General",
            "models": [],
            "selectedModel": null
        }
    }

    handleMakeChange(e){
        this.setState({"selectedMake": e.target.value});
    }

    handleYearChange(e){
        this.setState({"selectedYear": e.target.value});
    }
    handleModelChange(e){
        this.setState({"selectedModel": e.target.value});
    }
    getCar(){
        //get value from map and year options in CarSearch, sent get request to server to get info for models
        //map models to array, set this.state.models to array
        //binding self to this because axios changing binding
        var self = this;
        this.props.submitCarSearch(this.state.selectedYear, this.state.selectedMake, function(response){
            const models = response.map(object => {
                return object.model;
            })
            console.log(models);
            self.setState({"models": models,
            "selectedModel": models[0]});
        });
    }

    getFuel(){
        this.props.submitFuelSearch(this.state.selectedYear, this.state.selectedMake, this.state.selectedModel);
    }

    render(){
        return (
            <div className="CarSearch">
                <h2 className="car-search-header">Select Car Model for MPG Info</h2>
                <div className="select-year-make">
                <select className="carsearch-select" onChange={this.handleYearChange}>{this.state.years.map(year => <option value={year.toString()}>{year.toString()}</option>)}</select>
                <select className="carsearch-select" onChange={this.handleMakeChange}>{this.state.makes.map(make => <option value={make}>{make}</option>)}</select>
                </div>
                <div className="select-model">
                <button className="carsearch-button" onClick={this.getCar}>Get Info</button>
                <select className="carsearch-select" onChange={this.handleModelChange}>{this.state.models.map(model => <option value={model}>{model}</option>)}</select>
                <button className="carsearch-button" onClick={this.getFuel}>Get MPG Info</button>
                </div>
            </div>
        )
    }
}

export default CarSearch