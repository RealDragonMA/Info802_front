import {writable} from 'svelte/store';
import {createLocalStorage, persist} from '@macfja/svelte-persistent-store';

const road = persist(
    writable<any>(undefined),
    createLocalStorage(),
    'road',
);

export function setRoad(r: any) {
    road.set(r);
}

export default road;
