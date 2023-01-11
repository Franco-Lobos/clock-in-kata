import assert from 'assert';
import "babel-polyfill";

const gpsIsAvailable = new Promise((resolve, reject) => {
  resolve();
  // resolve(availableGpsCoordinates);
});

const gpsIsNotAvailable = new Promise((resolve, reject) => {
  reject();
});


function sendClockIn(date, gps = false) {
  let dateRes = new Date().toISOString();
  return new Promise((resolve, reject)=>{
    if(dateRes){
      setTimeout(() => {
        return resolve(dateRes);
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
      let date = new Date().toISOString();
      let dateResponse = await sendClockIn(date);
      let comproveDate = new Date(dateResponse);
      let flag = comproveDate.getTime() ? 1 :0;
      assert(flag === 1);
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

  // context('GPS is optional', () => {
  //   it('does NOT send GPS data when no GPS is available', () => {

  //   });
  // });
});
