exports.findCapsuleResponseDTO = (capsules) => {
    return capsules.map((capsule) => ({
        id: capsule.id,
        title: capsule.title,
        date: capsule.date,
        auth_time: capsule.auth_time,
        location: capsule.location,
        latitude: capsule.latitude,
        longitude: capsule.longitude,
        code: capsule.code,
    }));
};
