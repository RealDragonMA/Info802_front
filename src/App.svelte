<script lang="ts">

    import {onMount} from "svelte";
    import Service, {type IVehicle} from "./services/Service";


    let vehicles: IVehicle[] = [];
    let copy: IVehicle[] = [];
    let searchInput: string = "";

    let vehicleSelected: IVehicle | null = null;

    function search(): void {
        vehicles = copy.filter(vehicle => vehicle.naming.make.toLowerCase().includes(searchInput.toLowerCase()) || vehicle.naming.chargetrip_version.toLowerCase().includes(searchInput.toLowerCase()))
    }

    onMount(async () => {
        vehicles = [
            ...await Service.getVehicles({size: 100, search: ''}),
            ...await Service.getVehicles({size: 100, search: '', page: 2}),
            ...await Service.getVehicles({size: 100, search: '', page: 3}),
            ...await Service.getVehicles({size: 100, search: '', page: 4}),
            ...await Service.getVehicles({size: 100, search: '', page: 5}),
        ]
        copy = vehicles

        const makesToKeep = ['BMW', 'Citroen', 'Chevrolet', 'CUPRA', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Mercedes']

        vehicles = vehicles.filter(vehicle => makesToKeep.includes(vehicle.naming.make))
        let makes = Array.from(new Set(vehicles.map(vehicle => vehicle.naming.make)).values())
        console.log(makes)
    })


</script>


<main class="w-screen h-screen bg-[url('bg.png')]">
    
    <div class="p-8 h-full">
        <div class="space-y-8 p-4 pt-6 w-3/12 h-full rounded-xl bg-gray-100 shadow-2xl overflow-auto">
            {#if vehicleSelected == null}
                <input bind:value={searchInput} on:input={search} type="text" placeholder="Rechercher un véhicule" class="input shadow w-full sticky top-0"/>
                <div class="w-full border"></div>
                <div class="flex flex-col">
                    {#each vehicles as vehicle}
                        <div on:click={() => vehicleSelected = vehicle}
                             class="flex flex-row space-x-4 items-center hover:scale-[1.01] transition cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                            <img class="w-32 bg-blue-100 rounded-xl" src="{vehicle.media.image.thumbnail_url}"
                                 alt="{vehicle.naming.make}"/>
                            <div class="flex flex-col">
                                <p class="text-sm font-semibold">{vehicle.naming.chargetrip_version}</p>
                                <p class="text-xs">{vehicle.naming.make}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div transition:hori>
                    <p>ok</p>
                </div>
            {/if}
        </div>
    </div>

</main>