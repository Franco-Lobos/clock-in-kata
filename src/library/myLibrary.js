export function getTimeTrack(){
    let milisec= Math.floor(Math.random(0,1)*1000);
    console.log(milisec)
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            return new Date();
        },milisec)
        resolve();
      });
}