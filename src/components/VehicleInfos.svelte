<script lang="ts">

    import Icon from "@iconify/svelte";
    import {fade} from "svelte/transition";
    import {onMount} from "svelte";
    import Service from "../services/Service";

    export let vehicleSelected;

    let vehicle;

    onMount(async () => {
        vehicle = await Service.getVehicleInformation({id: vehicleSelected.id});
    });

</script>

<div in:fade class="flex flex-col space-y-4">
    <div class="relative bg-gradient-to-l from-[#59798A] to-[#89A9BB]">
        <div class="flex flex-row space-x-2 items-center absolute p-4 text-white">
            <button on:click={() => vehicleSelected = null}>
                <Icon class="w-8 h-8" icon="material-symbols-light:arrow-left-alt-rounded"/>
            </button>
            <h2 class="text-xl font-semibold">Votre véhicule</h2>
        </div>
        <div class="py-4">
            <img src="{vehicle?.media?.image?.url}" alt="{vehicle?.naming?.make}"/>
            <img src="{vehicle?.media?.brand?.thumbnail_url}" alt="{vehicle?.naming?.make}">
        </div>
    </div>
    <div class="flex flex-col space-y-4">

        <!-- Title -->
        <div class="flex flex-col px-4 pb-4 space-y-2 border-b">
            <h2 class="text-xl font-semibold">{vehicle?.naming?.make} {vehicle?.naming?.model}</h2>
            <h3>{vehicle?.naming?.chargetrip_version}</h3>
        </div>

        <!-- Informations -->
        <div class="flex flex-col space-y-4">

            <!-- Globales -->
            <div class="flex flex-col px-4 pb-4 border-b space-y-2">
                <h3 class="text-xl font-semibold">Informations générales</h3>
                <div class="flex flex-row justify-between">
                    <p>Autonomie du véhicule</p>
                    <p class="font-semibold">{vehicle?.range?.worst?.combined} - {vehicle?.range?.best?.combined} km</p>
                </div>
            </div>

            <!-- Performances -->
            <div class="flex flex-col px-4 pb-4 border-b space-y-2">
                <h3 class="text-xl font-semibold">Performances</h3>
                <div class="flex flex-row justify-between">
                    <p>Accélération (de 0 à 100 km/h)</p>
                    <p class="font-semibold">{vehicle?.performance?.acceleration}s</p>
                </div>
                <div class="flex flex-row justify-between">
                    <p>Vitesse maximale</p>
                    <p class="font-semibold">235 km/h</p>
                </div>
            </div>

            <!-- Batterie -->
            <div class="flex flex-col px-4 pb-4 border-b space-y-2">
                <h3 class="text-xl font-semibold">Connecteurs de charge</h3>
                <table class="table table-sm">
                    <thead>
                            <tr>
                                <th>Type</th>
                                <th>Puissance / Max (kW)</th>
                                <th>Temps (min)</th>
                            </tr>
                        </thead>
                    <tbody>
                        {#each vehicle?.connectors ?? [] as connector}
                            <tr>
                                <th class="truncate">{connector?.standard}</th>
                                <td>{connector?.power} / {connector?.max_electric_power}</td>
                                <td>{connector?.time}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</div>