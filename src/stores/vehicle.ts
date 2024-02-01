import {writable} from 'svelte/store';
import {createLocalStorage, persist} from '@macfja/svelte-persistent-store';
import vehicleId, {setVehicleId} from "./vehicleId";

const vehicle = persist(
    writable<any>(undefined),
    createLocalStorage(),
    'vehicle',
);

export function setVehicle(v: any) {
    vehicle.set(v);
    setVehicleId(v.id)
}

export function resetVehicle() {
    vehicle.set(undefined);
    setVehicleId(undefined)
}

export default vehicle;
