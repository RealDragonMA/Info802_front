<script lang="ts">
    import Icon from "@iconify/svelte";
    import type {IVehicle} from "../services/Service";
    import {onMount} from "svelte";
    import {data} from "../data";
    import {fade} from "svelte/transition";

    let vehicles: IVehicle[] = [];
    let copy: IVehicle[] = [];
    let searchInput: string = "";

    let vehicleSelected: IVehicle | null = null;

    function search(): void {
        vehicles = copy.filter(vehicle => vehicle.naming.make.toLowerCase().includes(searchInput.toLowerCase()) || vehicle.naming.chargetrip_version.toLowerCase().includes(searchInput.toLowerCase()))
    }

    onMount(async () => {
        // vehicles = [
        //     ...await Service.getVehicles({size: 100}),
        // ]
        // const makesToKeep = ['BMW', 'Citroen', 'Chevrolet', 'CUPRA', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Mercedes']
        // vehicles = vehicles.filter(vehicle => makesToKeep.includes(vehicle.naming.make))
        // copy = vehicles
        // console.log(vehicles);
        vehicles = data
        copy = vehicles
    })
</script>

<div class="p-3 h-full w-3/12">
    <div class="space-y-8 p-4 pt-6 h-full rounded-xl bg-gray-100 shadow-2xl overflow-auto">
        {#if vehicleSelected == null}
            <input bind:value={searchInput} on:input={search} type="text" placeholder="Rechercher un véhicule"
                   class="input shadow w-full sticky top-0"/>
            <div class="w-full border"></div>
            <div class="flex flex-col">
                {#each vehicles as vehicle}
                    <button on:click={() => vehicleSelected = vehicle}
                            class="flex flex-row space-x-4 items-center hover:scale-[1.01] transition cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                        <img class="w-32 bg-blue-100 rounded-xl" src="{vehicle.media.image.thumbnail_url}"
                             alt="{vehicle.naming.make}"/>
                        <span class="flex flex-col text-left">
                                <span class="text-sm font-semibold">{vehicle.naming.chargetrip_version}</span>
                                <span class="text-xs">{vehicle.naming.make}</span>
                            </span>
                    </button>
                {/each}
            </div>
        {:else}
            <div in:fade class="flex flex-col space-y-4">
                <div class="flex flex-row space-x-2 items-center">
                    <button on:click={() => vehicleSelected = null}>
                        <Icon class="w-8 h-8" icon="material-symbols-light:arrow-left-alt-rounded"/>
                    </button>
                    <h2 class="text-xl font-semibold">Votre véhicule</h2>
                </div>
                <div class="flex flex-row space-x-4 items-center rounded-lg">
                    <img class="w-32 bg-blue-100 rounded-xl" src="{vehicleSelected.media.image.thumbnail_url}"
                         alt="{vehicleSelected.naming.make}"/>
                    <span class="flex flex-col text-left">
                            <span class="text-sm font-semibold">{vehicleSelected.naming.chargetrip_version}</span>
                            <span class="text-xs">{vehicleSelected.naming.make}</span>
                        </span>
                </div>
                <h3 class="text-lg font-semibold">Caractéristiques: </h3>
                {#each vehicleSelected.connectors as connector}
                    <div class="border-t"></div>
                    <div class="flex flex-col space-y-1">
                        <p>Type de connecteur: {connector.standard}</p>
                        <p>Puissance: {connector.power}kW</p>
                        <p>Puissance électrique maximale: {connector.max_electric_power}kW</p>
                        <p>Temps de charge: {connector.time}min</p>
                        <p>Vitesse de charge: {connector.speed}km/h</p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>