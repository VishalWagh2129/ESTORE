function generateId(type) {
    const genId = new Date().getTime().toString(36).toUpperCase();
    if (genId.length === 8) {
        return (type + '0' + genId).toUpperCase();
    } else if (genId.length === 9) {
        return (type + genId).toUpperCase();
    }
}

module.exports = generateId;
