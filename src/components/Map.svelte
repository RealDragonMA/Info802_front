<script lang="ts">
    import {onMount, onDestroy} from 'svelte'
    import {Map, MapStyle, config, Marker} from '@maptiler/sdk';
    import "@maptiler/sdk/dist/maptiler-sdk.css";
    import axios from "axios";
    import {features, geoJSON, geoLayer} from "../resources/GeoJSON";

    export let cityStart: any;
    export let cityEnd: any;

    let map: any;
    let mapContainer: any;

    let cityStartMarker: any;
    let cityEndMarker: any;

    config.apiKey = '5mNoMIGOh5QaLuGhP3Ti';

    export function flyTo(coords: [number, number], type: "start" | "end" = "start") {
        map.flyTo({center: coords, essential: true, speed: 2.5});
        if(type === "start"){
            if(cityStartMarker) cityStartMarker.remove();
            cityStartMarker = new Marker().setLngLat(coords).addTo(map);
        }else{
            if(cityEndMarker) cityEndMarker.remove();
            cityEndMarker = new Marker().setLngLat(coords).addTo(map);
        }
        drawRoad();
    }

    export async function drawRoad() {
        if(cityStart === undefined || cityEnd === undefined) return;
        const start = cityStart.geometry.coordinates;
        const end = cityEnd.geometry.coordinates;
        const response = (await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
            params: {
                api_key: '5b3ce3597851110001cf6248c033c235cd58408988708d1c480a3049',
                start: `${start[0]},${start[1]}`,
                end: `${end[0]},${end[1]}`
            }
        })).data.features.flatMap((feature: any) => feature.geometry.coordinates)
        if(map.getSource('line')){
            map.getSource('line').setData(features(response));
        }else{
            map.addSource('line', geoJSON(response));
            map.addLayer(geoLayer);
        }
    }

    onMount(() => {
        const initialState = {lat: 45.64800435857976, lng: 5.863382871781049, zoom: 14};
        map = new Map({
            container: mapContainer,
            style: MapStyle.STREETS,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });
    });

    onDestroy(() => map.remove());

    $: cityStart && flyTo(cityStart.geometry.coordinates, "start");
    $: cityEnd && flyTo(cityEnd.geometry.coordinates, "end");

</script>

<div class="map-container" bind:this={mapContainer}></div>


<style>
    .map-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>
