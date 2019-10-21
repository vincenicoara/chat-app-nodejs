const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// app.get('/', (req, res) => {
//     res.status(200).sendFile(publicDirectoryPath + '/index.html')
// })


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
