'use strict';

exports.getDistance = (coord1, coord2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(coord2[1] - coord1[1]);  // deg2rad below
    const dLon = deg2rad(coord2[0] - coord1[0]);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(coord1[1])) * Math.cos(deg2rad(coord2[1]))
            * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
