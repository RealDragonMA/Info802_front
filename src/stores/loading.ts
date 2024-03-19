import {writable} from 'svelte/store';
import {createLocalStorage, persist} from '@macfja/svelte-persistent-store';

// Check if the road is loading
const loading = persist(
    writable<boolean>(false),
    createLocalStorage(),
    'loading',
);


export function setLoading(l: boolean) {
    loading.set(l);
}


export default loading;
