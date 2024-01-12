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

export class Service {

    public async getVehicles(options: { page?: number, size?: number, search?: string }): Promise<IVehicle[]> {
        return (await axios.get('http://localhost:80/vehicle', {
            params: options
        })).data;
    }

}

export default new Service();