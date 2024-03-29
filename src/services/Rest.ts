import axios from "axios";

export interface IVehicle {
    id: string
    connectors: {
        standard: string,
        power: number,
        max_electric_power: number,
        time: number,
        speed: number,
        __typename: string
    }[]
    naming: {
        make: string,
        model: string,
        chargetrip_version: string,
        __typename: string
    }
    media: {
        image: {
            thumbnail_url: string,
            __typename: string
        },
        __typename: string
    }
    __typename: string
}

export class Rest {

    private url: string = 'https://rapi-volte.mathis-mazoyer.fr';

    public async getVehicles(options: { page?: number, size?: number, search?: string, filter?: any }): Promise<IVehicle[]> {
        return (await axios.get(`${this.url}/vehicle`, {
            params: options
        })).data;
    }

    public async getRoad(options: { start: [number, number], end: [number, number] }): Promise<{road: [number, number][], distance: number, time: number}> {
        return (await axios.get(`${this.url}/map/road`, {
            params: {
                start: options.start.join(','),
                end: options.end.join(',')
            }
        })).data;
    }

    public async getElectricStations(options: { road: [number, number][] }): Promise<any> {
        return (await axios.post(`${this.url}/map/electric-stations`, {
            road: options.road
        })).data;
    }

    public async getVehicleInformation(options: { id: string }): Promise<any> {
        return (await axios.get(`${this.url}/vehicle/` + options.id)).data.vehicle;
    }

}

export default new Rest();