<script lang="ts">

    import roadDetails from "../stores/roadDetails";
    import road from "../stores/road";
    import cityStart from "../stores/cityStart";
    import {onMount} from "svelte";
    import cityEnd from "../stores/cityEnd";
    import Icon from "@iconify/svelte";

    function setDetails(): void {

    }

    $: roadDetails.subscribe((value) => {
        console.log(value);
    });

    onMount(() => {
        console.log($cityStart);
    })

</script>

<div class="flex flex-col justify-center px-5 py-4 absolute w-[72%] bottom-3 bg-white rounded shadow-2xl h-20">
    <div class="flex flex-row items-center space-x-3">
        <p>{$cityStart?.properties?.name}</p>
        <div class="flex flex-col relative items-center">
            <p class="text-xs absolute -top-3">{$road.distance}km</p>
            <div class="flex flex-row -space-x-2">
                <Icon icon="material-symbols:horizontal-rule"/>
                <Icon icon="material-symbols:horizontal-rule"/>
                <Icon icon="material-symbols:horizontal-rule"/>
                <Icon icon="material-symbols:horizontal-rule"/>
                <Icon icon="tabler:arrow-narrow-right"/>
            </div>
        </div>
        <p>{$cityEnd?.properties?.name}</p>
    </div>
    <p class="truncate">Temps de trajet total: {$roadDetails.total_hours}h{$roadDetails.total_minutes}m, Nombre de recharge: {$roadDetails.nb_charge}, Temps total de charge: {$roadDetails.total_time_charging}</p>
</div>