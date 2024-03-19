import {writable} from 'svelte/store';
import {createLocalStorage, persist} from '@macfja/svelte-persistent-store';

const roadDetails = persist(
    writable<{
        hours: number,
        minutes: number,
        seconds: number,
        nb_charge: number,
        time_per_charge: number,
        total_hours: number,
        total_minutes: number,
        total_seconds: number,
        total_time_charging: number,
    }>(undefined),
    createLocalStorage(),
    'roadDetails',
);

export default roadDetails;
