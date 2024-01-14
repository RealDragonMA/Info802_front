<script lang="ts">
    import type {IVehicle} from "../services/Service";
    import VehicleList from "./VehicleList.svelte";
    import VehicleInfos from "./VehicleInfos.svelte";

    let vehicleSelected: IVehicle | null = null;

</script>

<div class="p-3 h-full w-3/12">
    <div class="space-y-8 h-full rounded-xl bg-gray-100 shadow-2xl overflow-auto">
        {#if vehicleSelected == null}
            <VehicleList bind:vehicleSelected={vehicleSelected}/>
        {:else}
            <VehicleInfos bind:vehicleSelected={vehicleSelected}/>
        {/if}
    </div>
</div>