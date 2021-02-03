module.exports = function markdownToJSON(data) {
    return {
        id: data.split('---')[1],
        title: data.split('---')[0],
        timestamp: new Date(parseInt(data.split('---')[1])),
        summary: data.split('---')[2],
        body: data.split('---')[3]
    };
};