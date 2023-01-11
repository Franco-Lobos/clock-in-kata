export default class Gps{
    constructor(data){
        this.date = data.date;
        this.coord = data.coord;
    }

    getCoord() {
        return this.coord;
    }
}