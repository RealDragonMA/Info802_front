<script lang="ts">

    import Map from "./components/Map.svelte";
    import Sidebar from "./components/Sidebar.svelte";
    import axios from "axios";
    import {onMount} from "svelte";
    import Soap from "./services/Soap";
    import cityStart, {setCityStart} from "./stores/cityStart";
    import cityEnd, {setCityEnd} from "./stores/cityEnd";
    import vehicle from "./stores/vehicle";
    import vehicleId from "./stores/vehicleId";
    import electric_stations from "./stores/electric_stations";
    import road from "./stores/road";
    import {setTitle} from "./utils/setTitle";
    import roadDetails from "./stores/roadDetails";
    import RoadDetails from "./components/RoadDetails.svelte";
    import {Marker} from "@maptiler/sdk";
    import selectedStations from "./stores/selectedStations";

    let citiesStart: any[] = []
    let citiesEnd: any[] = []

    const api_key: string = "5b3ce3597851110001cf6248c033c235cd58408988708d1c480a3049";

    async function search(event: any, point: "start" | "end") {
        const queryEnd: string = event.target.value
        const apiUrl = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${api_key}&text=${queryEnd}&boundary.country=FR;`
        const features = (await axios.get(apiUrl)).data.features
        if (point === "start") citiesStart = features
        else citiesEnd = features
    }

    function calculateRoad() {
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

    onMount(() => {
        localStorage.clear()
        setTitle("VolteDrive - Accueil")
    })

</script>


<main class="flex flex-row w-screen h-screen relative z-10">
    <Map/>
    <Sidebar/>
    <div class="flex flex-col w-[72%] h-min transition-all">
        <div class="flex flex-row space-x-4 p-3 h-min">
            <div class="{citiesStart.length === 0 ? '' : 'dropdown'} w-full transition-all">
                <input id="input-start" on:input={(e) => search(e, "start")} class="input shadow w-full transition-all" placeholder="Entrer une ville de départ"/>
                {#if citiesStart.length !== 0}
                    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-80 flex-nowrap overflow-auto">
                        {#each citiesStart as city}
                            <button on:click={() => setCityStart(city)}>
                                <li class="hover:bg-gray-100 rounded-lg transition"><a>{city.properties.name}</a></li>
                            </button>
                        {/each}
                    </ul>
                {/if}
            </div>
            <div class="{citiesEnd.length === 0 ? '' : 'dropdown'} w-full transition-all">
                <input id="input-end" on:input={(e) => search(e, "end")} class="input shadow w-full transition-all" placeholder="Entrer une ville d'arrivée"/>
                {#if citiesEnd.length !== 0}
                    <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-80 flex-nowrap overflow-auto">
                        {#each citiesEnd as city}
                            <button on:click={() => setCityEnd(city)}>
                                <li class="hover:bg-gray-100 rounded-lg transition"><a>{city.properties.name}</a></li>
                            </button>
                        {/each}
                    </ul>
                {/if}
            </div>
            {#if $cityStart !== undefined && $cityEnd !== undefined && $vehicle !== undefined && $vehicleId !== undefined}
                <button on:click={calculateRoad} class="btn btn-primary shadow">Calculer mon itinéraire</button>
            {/if}
        </div>
        {#if $roadDetails}
            <RoadDetails/>
        {/if}
    </div>
</main>