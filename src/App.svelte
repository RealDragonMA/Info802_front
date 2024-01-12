<script lang="ts">

    import Map from "./components/Map.svelte";
    import Sidebar from "./components/Sidebar.svelte";
    import axios from "axios";

    let map: any;

    let queryStart: string;
    let queryEnd: string;

    let cityStart: any;
    let cityEnd: any;
    let citiesStart: string[] = []
    let citiesEnd: string[] = []

    const api_key : string = "5b3ce3597851110001cf6248c033c235cd58408988708d1c480a3049";

    async function searchStart(){
        const apiUrl = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${api_key}&text=${queryStart}&boundary.country=FR;`
        citiesStart = (await axios.get(apiUrl)).data.features
    }

    async function searchEnd(){
        const apiUrl = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${api_key}&text=${queryEnd}&boundary.country=FR;`
        citiesEnd = (await axios.get(apiUrl)).data.features
    }

    function selectStartCity(city: any){
        cityStart = city;
        queryStart = city.properties.name
    }

    function selectEndCity(city: any){
        cityEnd = city;
        queryEnd = city.properties.name
    }

</script>


<main class="flex flex-row w-screen h-screen relative z-10">
    <Map bind:this={map} {cityStart} {cityEnd}/>
    <Sidebar/>
    <div class="flex flex-row w-8/12 space-x-4 p-3 h-min">
        <div class="{citiesStart.length === 0 ? '' : 'dropdown'} w-full">
            <input bind:value={queryStart} on:input={searchStart} class="input shadow w-full" placeholder="Entrer une ville de départ"/>
            {#if citiesStart.length !== 0}
                <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-80 flex-nowrap overflow-auto">
                    {#each citiesStart as city}
                        <button on:click={() => selectStartCity(city)}>
                            <li class="hover:bg-gray-100 rounded-lg transition"><a>{city.properties.name}</a></li>
                        </button>
                    {/each}
                </ul>
            {/if}
        </div>
        <div class="{citiesEnd.length === 0 ? '' : 'dropdown'} w-full">
            <input bind:value={queryEnd} on:input={searchEnd} class="input shadow w-full" placeholder="Entrer une ville de départ"/>
            {#if citiesEnd.length !== 0}
                <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-80 flex-nowrap overflow-auto">
                    {#each citiesEnd as city}
                        <button on:click={() => selectEndCity(city)}>
                            <li class="hover:bg-gray-100 rounded-lg transition"><a>{city.properties.name}</a></li>
                        </button>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
</main>