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
        activeTools: p.activeTools,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
    };
}

function validPlantData(item) {
    return (
      Boolean(item._id) 
      && Boolean(item.ownerId)
      && Boolean(item.plantId)
      && Boolean(item.plantUnitId)
      && Boolean(item.plantElement)
      && Boolean(item.land)
      && typeof item.land.x === 'number'
      && typeof item.land.y === 'number'
      && Array.isArray(item.activeTools)
      && item.activeTools.find((tool) => tool.type === 'WATER')
  );
} 

export function validAndParsedDataJSON(data) {
    let result = JSON.parse(data);
    if(
        !Array.isArray(result) 
        && typeof result !== "object"
        && validPlantData(data)
    ) {
        throw new Error('Data invalida')
    }

    if(!Array.isArray(result)) {
        result = [result];
    }
    return result;
}

