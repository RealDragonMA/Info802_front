<script lang="ts">
    import {onDestroy, onMount} from 'svelte'
    import {Marker} from '@maptiler/sdk';
    import "@maptiler/sdk/dist/maptiler-sdk.css";
    import {features, geoJSON, geoLayer} from "../utils/GeoJSON";
    import Rest from "../services/Rest";
    import MapUtils from "../utils/MapUtils";
    import cityStart from "../stores/cityStart";
    import cityEnd from "../stores/cityEnd";
    import electric_stations, {setElectricStations} from "../stores/electric_stations";
    import road, {setRoad} from "../stores/road";
    import selectedStations from "../stores/selectedStations";
    import {setLoading} from "../stores/loading";
    import vehicle from "../stores/vehicle";
    import Soap from "../services/Soap";

    let mapUtils: MapUtils;
    export let map: any;
    export let mapContainer: any;

    let cityStartMarker: any;
    let cityEndMarker: any;

    /**
     * Fly to the given coordinates
     * @param coords {Array<number>} - [lng, lat]
     * @param type {"start" | "end"} - The type of the city
     */
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


    export function calculateRoad() {
        Soap.road($electric_stations, $road, $vehicle)


        const vehicleRangeMeters = $vehicle.range.chargetrip_range.best * 1000; // Converti en mètres
        const routeCoordinates = $road.road;

        let remainingRange = vehicleRangeMeters;
        const s = [];
        let lastPosition = routeCoordinates[0];

        for (const station of $electric_stations) {
            const distance = calculateDistance(lastPosition, station);

            if (distance > remainingRange) {
                // Si la distance à la prochaine station est supérieure à l'autonomie restante,
                // on s'arrête à la station précédente (si elle existe)
                s.push(station);
                remainingRange = vehicleRangeMeters - distance;
                lastPosition = station;
            } else {
                // Sinon, on continue et on soustrait la distance parcourue à l'autonomie restante
                remainingRange -= distance;
                lastPosition = station;
            }
        }

        selectedStations.set(s)

    }

    function calculateDistance(from: any, to: any): number {
        // Approximation simple, considère chaque degré de latitude/longitude comme 111km
        const latDistance = Math.abs(from[0] - to[0]) * 111000;
        const lonDistance = Math.abs(from[1] - to[1]) * 111000;
        return Math.sqrt(latDistance ** 2 + lonDistance ** 2);
    }

    /**
     * Draw the road between the start and end cities,
     * it will draws many lines between the cities, then we search for electric stations
     * and set a marker
     */
    async function drawRoad() {
        if ($cityStart === undefined || $cityEnd === undefined) return;

        setLoading(true)

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

        setLoading(false)
    }

    /**
     * When the component is mounted, we create the map and subscribe to the cityStart and cityEnd stores
     * to fly to the cities when they are set
     */
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
