import axios from "axios";

export class Soap {

    public async road(electric_stations: any, road: any, vehicle: any): Promise<any> {
        const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:exa="spyne.examples.hello.soap">
      <soapenv:Header/>
      <soapenv:Body>
        <exa:road>
         <exa:electric_stations>${JSON.stringify(electric_stations)}</exa:electric_stations>
         <exa:road>${JSON.stringify(road)}</exa:road>
         <exa:vehicle>${JSON.stringify(vehicle)}</exa:vehicle>
        </exa:road>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
        try {
            const response = await axios.post('http://127.0.0.1:8001', soapEnvelope, {
                headers: {'Content-Type': 'text/xml'}
            });

            // Utiliser une expression régulière pour extraire le JSON de la réponse SOAP
            const regex = /<tns:string>(.*?)<\/tns:string>/;
            const matches = regex.exec(response.data);

            if (matches && matches[1]) {
                // Convertir la chaîne JSON en objet
                const jsonObject = JSON.parse(matches[1]);
                console.log(jsonObject); // Traitez l'objet JSON ici
            } else {
                console.log("Aucun JSON trouvé dans la réponse SOAP");
            }

        } catch (error) {
            console.error(error);
        }
    }

}

export default new Soap();