import {writable} from 'svelte/store';
import {createLocalStorage, persist} from '@macfja/svelte-persistent-store';

const cityEnd = persist(
    writable<any>(undefined),
    createLocalStorage(),
    'cityEnd',
);

export function setCityEnd(city: any) {
    cityEnd.set(city);
    const input: HTMLInputElement | null = document.getElementById("input-end") as HTMLInputElement;
    if (input) input.value = city.properties.name;
}

export default cityEnd;
