<script lang="ts">

    import {onMount} from "svelte";
    import Service, {type IVehicle} from "./services/Service";

    let vehicles: IVehicle[] = [];

    onMount(async () => vehicles = await Service.getVehicles())


</script>


<main class="w-screen h-screen bg-[url('bg.png')]">

    <div class="p-8 h-full">
        <div class="space-y-8 p-4 pt-6 w-3/12 h-full rounded-xl bg-gray-100 shadow-2xl overflow-auto">
            <input type="text" placeholder="Rechercher un véhicule" class="input shadow w-full max-w-xs" />
            <div class="w-full border"></div>
            <div class="flex flex-col space-y-4">
                {#each vehicles as vehicle}
                    <div class="flex flex-row space-x-4 items-center">
                        <img class="w-32 bg-blue-100 rounded-xl" src="{vehicle.media.image.thumbnail_url}" alt="{vehicle.naming.make}"/>
                        <div class="flex flex-col">
                            <p class="text-sm font-semibold">{vehicle.naming.chargetrip_version}</p>
                            <p class="text-xs">{vehicle.naming.make}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

</main>