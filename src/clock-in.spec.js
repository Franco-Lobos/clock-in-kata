import assert from 'assert';
import "babel-polyfill";

import Gps from './classes/Gps';

const gpsIsAvailable = new Promise((resolve, reject) => {
  const availableGpsCoordinates = "100.000, 200.000";
  resolve(availableGpsCoordinates);
});

const gpsIsNotAvailable = new Promise((resolve, reject) => {
  reject("Gps is not available");
});


function sendClockIn(gps = false) {
  let dateRes = new Date().toISOString();

  let data = {
    date : dateRes,
    coord : 0,
  }
  if(gps){
    data.coord = gps;
  }

  let gpsObj = new Gps(data);

  return new Promise((resolve, reject)=>{
    if(gpsObj.date && !gpsObj.coord){
      setTimeout(() => {
        return resolve(gpsObj.date);
     }, 1000);
    }

    else if(gpsObj.date && gpsObj.coord){
      setTimeout(() => {
        return resolve(gpsObj);
     }, 1000);
    }

    else{
      reject("Error, date could not be loaded");
    }
  });
}

//Time-tracking
describe('time tracking', () => {
  context('No GPS - simple clock-in', ()=>{
    it('XHttp testing', async ()=>{
      let dateResponse = await sendClockIn();
      let comproveDate = new Date(dateResponse);
      let flag = comproveDate.getTime() ? 1 :0;
      assert(flag === 1);
      });
  });

  context('GPS is optional', () => {
    it('does NOT send GPS data when no GPS is available && Send GPS when GPS is available ', async () => {
      // let ifGps = 0;
      let ifGps = 1;

      if(ifGps) {
        ifGps = await gpsIsAvailable;
      }
      else{
        await gpsIsNotAvailable.then(res=>{
        }).catch(err=>{
          ifGps = 0;
          console.log(err);
        })
      }
    
      let objResponse = await sendClockIn(ifGps);
      let coordResponse = objResponse.coord;
      if(ifGps){
        assert(coordResponse);
      } else{
        assert(coordResponse===undefined);
      }
    });
  });

  // context('GPS is required', () => {
  //   it('sends clock-in when GPS is available', () =>
  //     sendClockIn(gpsIsAvailable)
  //   );

  //   it('sends clock-in with coordinates when GPS is available', (done) => {
  //   });

  //   it('does NOT send clock-in when no GPS is available', (done) => {
  //     sendClockIn(gpsIsNotAvailable)
  //       .then(() => assert(false, 'Promise should have been rejected'))
  //       .catch(done);
  //   });

  //   it('warns the user when no GPS is available', () => {

  //   });
  // });

});
