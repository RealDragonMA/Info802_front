<script lang="ts">

    import Map from "./components/Map.svelte";
    import Sidebar from "./components/Sidebar.svelte";
    import axios from "axios";
    import {onMount} from "svelte";
    import cityStart, {setCityStart} from "./stores/cityStart";
    import cityEnd, {setCityEnd} from "./stores/cityEnd";
    import vehicle from "./stores/vehicle";
    import vehicleId from "./stores/vehicleId";
    import {setTitle} from "./utils/setTitle";
    import roadDetails from "./stores/roadDetails";
    import RoadDetails from "./components/RoadDetails.svelte";
    import loading from "./stores/loading";

    let citiesStart: any[] = []
    let citiesEnd: any[] = []
    let map: any;

    const api_key: string = "5b3ce3597851110001cf6248c033c235cd58408988708d1c480a3049";

    async function search(event: any, point: "start" | "end") {
        const queryEnd: string = event.target.value
        const apiUrl = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${api_key}&text=${queryEnd}&boundary.country=FR;`
        const features = (await axios.get(apiUrl)).data.features
        if (point === "start") citiesStart = features
        else citiesEnd = features
    }

    localStorage.clear()

    onMount(() => {
        localStorage.clear()
        setTitle("VolteDrive - Accueil")
    })

</script>


<main class="flex flex-row w-screen h-screen relative z-10">
    <Map bind:this={map}/>
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
                <button on:click={() => map.calculateRoad()} class="btn btn-primary shadow">
                    {#if $loading}
                        <span class="loading loading-spinner loading-md"></span>
                    {:else}
                        Calculer mon itinéraire
                    {/if}
                </button>
            {/if}
        </div>
        {#if $roadDetails}
            <RoadDetails/>
        {/if}
    </div>
</main>