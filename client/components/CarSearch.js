import React, {Component} from 'react';

var years = [ 1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012, 2013, 2014, 2015, 2016, 2017, 2018 ];
var makes = ["AM General","ASC Incorporated","Acura","Alfa Romeo","American Motors Corporation","Aston Martin","Audi","Aurora Cars Ltd","Autokraft Limited","Avanti Motor Corporation","Azure Dynamics","BMW","BMW Alpina","BYD","Bentley","Bertone","Bill Dovell Motor Car Company","Bitter Gmbh and Co. Kg","Bugatti","Buick","CCC Engineering","CODA Automotive","CX Automotive","Cadillac","Chevrolet","Chrysler","Consulier Industries Inc","Dabryan Coach Builders Inc","Dacia","Daewoo","Daihatsu","Dodge","E. P. Dutton, Inc.","Eagle","Environmental Rsch and Devp Corp","Evans Automobiles","Excalibur Autos","Federal Coach","Ferrari","Fiat","Fisker","Ford","GMC","General Motors","Genesis","Geo","Goldacre","Grumman Allied Industries","Grumman Olson","Honda","Hummer","Hyundai","Import Foreign Auto Sales Inc","Import Trade Services","Infiniti","Isis Imports Ltd","Isuzu","J.K. Motors","JBA Motorcars, Inc.","Jaguar","Jeep","Karma","Kenyon Corporation Of America","Kia","Koenigsegg","Laforza Automobile Inc","Lambda Control Systems","Lamborghini","Land Rover","Lexus","Lincoln","London Coach Co Inc","London Taxi","Lotus","MINI","Mahindra","Maserati","Maybach","Mazda","McLaren Automotive","Mcevoy Motors","Mercedes-Benz","Mercury","Merkur","Mitsubishi","Mobility Ventures LLC","Morgan","Nissan","Oldsmobile","PAS Inc - GMC","PAS, Inc","Pagani","Panos","Panoz Auto-Development","Panther Car Company Limited","Peugeot","Pininfarina","Plymouth","Pontiac","Porsche","Quantum Technologies","Qvale","Ram","Red Shift Ltd.","Renault","Rolls-Royce","Roush Performance","Ruf Automobile Gmbh","S and S Coach Company  E.p. Dutton","SRT","Saab","Saleen","Saleen Performance","Saturn","Scion","Shelby","Spyker","Sterling","Subaru","Superior Coaches Div E.p. Dutton","Suzuki","TVR Engineering Ltd","Tecstar, LP","Tesla","Texas Coach Company","Toyota","VPG","Vector","Vixen Motor Company","Volga Associated Automobile","Volkswagen","Volvo","Wallace Environmental","Yugo","smart"
]

class CarSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            "years": years,
            "makes": makes
        }
    }

    render(){
        return (
            <div className="CarSearch">
                <select>{this.state.years.map(year => <option value={year.toString()}>{year.toString()}</option>)}</select>
                <select>{this.state.makes.map(make => <option value={make}>{make}</option>)}</select>
            </div>
        )
    }
}

export default CarSearch