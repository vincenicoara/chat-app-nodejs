const socket = io()

// socket.on('welcome', (message) => {
//     document.querySelector('#welcome').textContent = message
// })

const $messageForm = document.querySelector('#textBoxForm')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $shareLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-template').innerHTML
const $sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const autoscroll = () => {
    const $newMessage = $messages.lastElementChild

    //Height of newMessage
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    
    //Visible Height
    const visibleHeight = $messages.offsetHeight

    //Height of messages container
    const containerHeight = $messages.scrollHeight

    //How far have I scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }

}

socket.on('location-message', (location) => {
    console.log(location)
    const html = Mustache.render($locationTemplate, {
        username: location.username,
        url: location.url,
        createdAt: moment(location.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render($messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a') 
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render($sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = $messageFormInput.value

    $messageFormButton.setAttribute('disabled', 'disabled')

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if (error){
            return console.log(error)
        }
        console.log('The message was delivered')
    })

})

$shareLocationButton.addEventListener('click', (e) => {
    $shareLocationButton.setAttribute('disabled', 'disabled')
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (ack) => {
            $shareLocationButton.removeAttribute('disabled')
            console.log(ack)
        })
    });
})

socket.emit('join', {username, room}, (error) => {
    if (error){
        alert(error)
        location.href = '/'
    }
})

