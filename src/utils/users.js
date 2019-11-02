const users = []

const addUser = ({id, username, room}) => {
    //Clean data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Valiate data
    if (!username || !room){
        return {
            error: 'Username and room are required!'
        }
    }
    //Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    //Validate username
    if (existingUser){
        return {
            error: 'Username is in use!'
        }
    }
    //Store user
    const user = {
        id,
        username,
        room
    }

    users.push(user)
    return {user}
}

const removeUser = (id) => {

    const index = users.findIndex((i) => {
        return i.id === id 
    })

    if (index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    const user = users.find((user) => {
        return user.id === id
    })
    return user
}

const getUsersInRoom = (room) => {
    const userList = users.filter((user) => {
        return user.room === room
    })
    return userList
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}


addUser({
    id: 23,
    username: 'Vince',
    room: 'bunny'
})
addUser({
    id: 200,
    username: 'Jack ',
    room: 'bunny'
})
addUser({
    id: 21,
    username: 'bones',
    room: 'boom'
})
// users.forEach((user) => {
//     console.log(user)
// })
console.log(getUsersInRoom('boom'))



const getUsers = {}