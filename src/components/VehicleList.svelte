<script lang="ts">

    import {onMount} from "svelte";
    import {data} from "../data";
    import type {IVehicle} from "../services/Rest";
    import Rest from "../services/Rest";
    import store, {setVehicle} from "../stores/vehicle";

    let vehicles: IVehicle[] = [];
    let copy: IVehicle[] = [];
    let searchInput: string = "";

    function search(): void {
        vehicles = copy.filter(vehicle => vehicle.naming.make.toLowerCase().includes(searchInput.toLowerCase()) || vehicle.naming.chargetrip_version.toLowerCase().includes(searchInput.toLowerCase()))
    }

    onMount(async () => {
        vehicles = [
            ...await Rest.getVehicles({size: 100}),
        ]
        const makesToKeep = ['BMW', 'Citroen', 'Chevrolet', 'CUPRA', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Mercedes']
        vehicles = vehicles.filter(vehicle => makesToKeep.includes(vehicle.naming.make))
        // vehicles = data
        copy = vehicles
    })

</script>

<div class="flex flex-col p-4 space-y-4">
    <input bind:value={searchInput} on:input={search} type="text" placeholder="Rechercher un véhicule" class="input shadow w-full sticky top-0"/>
    <div class="w-full border"></div>
    <div class="flex flex-col">
        {#each vehicles as vehicle}
            <button on:click={() => setVehicle(vehicle)} class="flex flex-row space-x-4 items-center hover:scale-[1.01] transition cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                <img class="w-32 bg-blue-100 rounded-xl" src="{vehicle.media.image.thumbnail_url}" alt="{vehicle.naming.make}"/>
                <span class="flex flex-col text-left">
                    <span class="text-sm font-semibold">{vehicle.naming.chargetrip_version}</span>
                    <span class="text-xs">{vehicle.naming.make}</span>
                </span>
            </button>
        {/each}
    </div>
</div>
