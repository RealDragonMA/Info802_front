import {writable} from 'svelte/store';
import {createLocalStorage, persist} from '@macfja/svelte-persistent-store';

const electric_stations = persist(
    writable<any>(undefined),
    createLocalStorage(),
    'electric_stations',
);

export function setElectricStations(electricStations: any) {
    electric_stations.set(electricStations);
}

export default electric_stations;
