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
    const date = moment().format('DD-MM-YYYY');
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