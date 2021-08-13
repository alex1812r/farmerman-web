import moment from 'moment';

export function objectToUrlParams(data) {
    const params = [];
    Object.keys(data)
        .forEach(k => {
            const v = data[k];
            if(v !== null && v !== undefined) params.push(`${k}=${v}`)
        });
    return params.join('&');
}

export function timeToUtcNumber(time) {
    const date = moment().format('YYYY-MM-DD');
    const utcTime = moment(`${date} ${time}`).utc().format('HH:mm:ss');
    const timeNumber = parseInt(utcTime
        .split(':')
        .join('')
    );
    return timeNumber;
}

export function truncateText(str, max) {
    return str.substring(0, str.length - max) + '...';
}

export function createPlantData(p) {
    return {
        _id: p._id,
        ownerId: p.ownerId,
        startTime: p.startTime, 
        plantId: p.plantId, 
        plantUnitId: p.plantUnitId, 
        plantElement: p.plantElement, 
        land: {
            landId: p.land.landId,
            x: p.land.x,
            y: p.land.y
        },
        plant: {
            iconUrl: p.plant.iconUrl
        },
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
    };
}

export function validAndParsedDataJSON(data) {
    const result = JSON.parse(data);
    if(!Array.isArray(result)) {
        throw new Error('Data invalida')
    }
    return result;
}