export const features = (response: any) => ({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                'type': 'LineString',
                'coordinates': response
            }
        }
    ]
})

export const geoJSON = (response: any) => ({
    type: 'geojson',
    data: features(response)
})

export const geoLayer = {
    'id': 'line',
    'type': 'line',
    'source': 'line',
    'layout': {
        'line-cap': 'round',
        'line-join': 'round'
    },
    'paint': {
        'line-color': '#ed6498',
        'line-width': 5,
        'line-opacity': 0.8
    }
}
