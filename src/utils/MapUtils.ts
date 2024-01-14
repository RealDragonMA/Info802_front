import {config, Map, MapStyle} from "@maptiler/sdk";

export default class MapUtils {

    private map: any;

    constructor(apiKey: string) {
        config.apiKey = apiKey;
    }

    public create(mapContainer: any){
        const initialState = {lat: 45.64800435857976, lng: 5.863382871781049, zoom: 14};
        this.map = new Map({
            container: mapContainer,
            style: MapStyle.STREETS,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });
        return this.map;
    }

    public get(){
        return this.map;
    }

}