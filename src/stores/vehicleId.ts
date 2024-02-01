import {writable} from 'svelte/store';
import {createLocalStorage, persist} from '@macfja/svelte-persistent-store';

const vehicleId = persist(
    writable<string | undefined>(undefined),
    createLocalStorage(),
    'vehicleId',
);

export function setVehicleId(id: string) {
    vehicleId.set(id);
}

export default vehicleId;
