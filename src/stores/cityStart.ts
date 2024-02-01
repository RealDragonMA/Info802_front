import {writable} from 'svelte/store';
import {createLocalStorage, persist} from '@macfja/svelte-persistent-store';

const cityStart = persist(
    writable<any>(undefined),
    createLocalStorage(),
    'cityStart',
);

export function setCityStart(city: any) {
    cityStart.set(city);
    const input: HTMLInputElement | null = document.getElementById("input-start") as HTMLInputElement;
    if (input) input.value = city.properties.name;
}

export default cityStart;
