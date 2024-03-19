<script lang="ts">
    import {onDestroy, onMount} from 'svelte'
    import {Marker} from '@maptiler/sdk';
    import "@maptiler/sdk/dist/maptiler-sdk.css";
    import {features, geoJSON, geoLayer} from "../utils/GeoJSON";
    import Rest from "../services/Rest";
    import MapUtils from "../utils/MapUtils";
    import cityStart from "../stores/cityStart";
    import cityEnd from "../stores/cityEnd";
    import {setElectricStations} from "../stores/electric_stations";
    import {setRoad} from "../stores/road";
    import selectedStations from "../stores/selectedStations";

    let mapUtils: MapUtils;
    export let map: any;
    export let mapContainer: any;

    let cityStartMarker: any;
    let cityEndMarker: any;

    export function flyTo(coords: [number, number], type: "start" | "end" = "start") {
        map.flyTo({center: coords, essential: true, speed: 2.5});
        if (type === "start") {
            if (cityStartMarker) cityStartMarker.remove();
            cityStartMarker = new Marker().setLngLat(coords).addTo(map);
        } else {
            if (cityEndMarker) cityEndMarker.remove();
            cityEndMarker = new Marker().setLngLat(coords).addTo(map);
        }
        drawRoad();
    }

    async function drawRoad() {
        if ($cityStart === undefined || $cityEnd === undefined) return;

        const start = $cityStart.geometry.coordinates;
        const end = $cityEnd.geometry.coordinates;

        const road = await Rest.getRoad({start, end});
        setRoad(road)

        if (map.getSource('line')) {
            map.getSource('line').setData(features(road.road));
        } else {
            map.addSource('line', geoJSON(road.road));
            map.addLayer(geoLayer);
        }

        const electricStations = await Rest.getElectricStations({road: road.road});
        setElectricStations(electricStations)

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
        cityStart.subscribe((city) => {
            if (city) flyTo(city.geometry.coordinates, "start");
        });
        cityEnd.subscribe((city) => {
            if (city) flyTo(city.geometry.coordinates, "end");
        });
        selectedStations.subscribe(stations => {
            stations?.forEach(([lat, lng]: [number, number]) => {
                new Marker({
                    color: '#cb7512',
                })
                    .setLngLat([lng, lat])
                    .addTo(map);
            });

        })
    });

    onDestroy(() => map.remove());


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
