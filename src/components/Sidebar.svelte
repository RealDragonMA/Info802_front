<script lang="ts">
    import VehicleList from "./VehicleList.svelte";
    import VehicleInfos from "./VehicleInfos.svelte";
    import vehicleId from "../stores/vehicleId";
</script>

<div class="p-3 h-full w-3/12">
    <div class="space-y-8 h-full rounded-xl bg-gray-100 shadow-2xl overflow-auto">
        {#if $vehicleId === undefined && $vehicleId === undefined}
            <VehicleList/>
        {:else if $vehicleId !== undefined && $vehicleId !== undefined}
            <VehicleInfos/>
        {/if}
    </div>
</div>
