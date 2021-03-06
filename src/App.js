import React from 'react';
import './App.css';
import { useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";

const HSL_KYSELY = gql`
{
  stops(ids: "HSL:2111210") {
    name
    desc
    id
    stoptimesWithoutPatterns (numberOfDepartures: 10) {
      headsign
      realtimeArrival
      serviceDay
      trip {
        routeShortName
      }
    }
  }
}
`;


function muunnos(a, b) {
  var d = new Date();
  var aika = d.getTime();
  var myDate = new Date((a + b) * 1000);
  var saapuu = myDate - aika;
  return millisToMinutes(saapuu);
}

function millisToMinutes(millis) {
  var minutes = Math.floor(millis / 60000);
  if (minutes < 1) {
    return ' ' + minutes + ' min ';
  }else  {
    return ' ' + minutes + ' min';
  }
}


function App() {
const { data , loading, error} = useQuery(HSL_KYSELY);



if (loading) return <p>LOADING</p>;
if (error) return <p>ERROR {error.message}</p>


  return (
    <React.Fragment>
      {data && data.stops && data.stops.map((stops, index) => (
      <div key={index} className="container-fluid dösäri">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center">{stops.name}: {stops.desc}</h2>
          </div>
        </div>
        <div class="row otsikot">
          <div class="col-3 text-center">
            <h4>Bus</h4>
          </div>
          <div class="col-6 text-center">
            <h4>Destination</h4>
          </div>
          <div class="col-3 text-center">
            <h4>Arrives</h4>
          </div>
        </div>
        <div class="row laatikko">
          <div class="col-3 text-center">
            {stops.stoptimesWithoutPatterns.map((p, ind) => {
            return <p key={ind} className="tiedot">{p.trip.routeShortName}</p>
            })}
          </div>
          <div class="col-6 text-center">
            {stops.stoptimesWithoutPatterns.map((st, indx) => {
            return <p key={indx} className="tiedot">{st.headsign}</p>
            })}
          </div>
          <div class="col-3 text-center">
            {stops.stoptimesWithoutPatterns.map((aika, indx) => {
            return <p key={indx} className="tiedot">{muunnos(aika.serviceDay, aika.realtimeArrival)}</p>
            })}
          </div>
        </div>
      </div>
      ))}
    </React.Fragment>
    
  );
}
export default App;
