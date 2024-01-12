<script lang="ts">
    import {onMount, onDestroy} from 'svelte'
    import {Map, MapStyle, config, Marker} from '@maptiler/sdk';
    import "@maptiler/sdk/dist/maptiler-sdk.css";
    import axios from "axios";

    let map: any;
    let mapContainer: any;

    config.apiKey = '5mNoMIGOh5QaLuGhP3Ti';

    onMount(() => {
        const initialState = {lat: 45.64800435857976, lng: 5.863382871781049, zoom: 14};
        map = new Map({
            container: mapContainer,
            style: MapStyle.STREETS,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });

        setTimeout(() => {
            drawRoad([45.5950804160354, 5.27163039163753], [45.44481267528699, 6.647837957576314])
        },2000)

    });

    export function flyTo(coords: [number, number]) {
        map.flyTo({
            center: coords,
            essential: true,
            speed: 2.5
        });
        let marker = new Marker()
            .setLngLat(coords)
            .addTo(map);
    }

    export async function drawRoad(start: [number, number], end: [number, number]) {

        const response = (await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
            params: {
                api_key: '5b3ce3597851110001cf6248c033c235cd58408988708d1c480a3049',
                start: `${start[1]},${start[0]}`,
                end: `${end[1]},${end[0]}`
            }
        })).data.features.flatMap(feature => feature.geometry.coordinates)

        const geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        'type': 'LineString',
                        'coordinates': response
                    }
                }
            ]
        };

        map.addSource('line', {
            'type': 'geojson',
            'data': geojson
        });

        // add the line which will be modified in the animation
        map.addLayer({
            'id': 'line-animation',
            'type': 'line',
            'source': 'line',
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#ed6498',
                'line-width': 5,
                'line-opacity': 0.8
            }
        });


    }

    onDestroy(() => {
        map.remove();
    });

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
