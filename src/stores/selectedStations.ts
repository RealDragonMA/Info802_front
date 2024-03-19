import {writable} from 'svelte/store';
import {createLocalStorage, persist} from '@macfja/svelte-persistent-store';

const selectedStations = persist(
    writable<any>(undefined),
    createLocalStorage(),
    'selectedStations',
);

export default selectedStations;
