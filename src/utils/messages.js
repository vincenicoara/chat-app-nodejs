const generateMessage = (username = 'Username', text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}
// const generateMessage = (text) => {
//     return {
//         text,
//         createdAt: new Date().getTime()
//     }
// }

const generateLocationMessage = (username = 'Username', url) => {
    return {
        username, 
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}