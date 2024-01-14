<script lang="ts">
    import {onDestroy, onMount} from 'svelte'
    import {config, Map, MapStyle, Marker} from '@maptiler/sdk';
    import "@maptiler/sdk/dist/maptiler-sdk.css";
    import {features, geoJSON, geoLayer} from "../resources/GeoJSON";
    import Service from "../services/Service";
    import MapUtils from "../utils/MapUtils";

    export let cityStart: any;
    export let cityEnd: any;

    let mapUtils: MapUtils;
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

    async function drawRoad() {
        if(cityStart === undefined || cityEnd === undefined) return;

        const start = cityStart.geometry.coordinates;
        const end = cityEnd.geometry.coordinates;

        const response = await Service.getRoad({start, end});

        if(map.getSource('line')){
            map.getSource('line').setData(features(response.road));
        } else {
            map.addSource('line', geoJSON(response.road));
            map.addLayer(geoLayer);
        }

        console.log("La distance entre les deux villes est de " + response.distance + " km")

        const electricStations = await Service.getElectricStations({road: response.road});
        console.log(electricStations);
        electricStations.forEach(([lat, lng]: [number, number]) => {
            new Marker({
                color: '#73af13',
            })
            .setLngLat([lng, lat])
            .addTo(map);
        });
    }

    onMount(() => {
        mapUtils = new MapUtils("5mNoMIGOh5QaLuGhP3Ti");
        map = mapUtils.create(mapContainer)
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
