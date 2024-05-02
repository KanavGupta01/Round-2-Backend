const app = require('express')()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const fs = require('fs')
const { EOL } = require('os')


app.get('/', (req, res) => {
    res.json({ success: true})
})

function appendText(chunk) {
    chunk = appendR(chunk)
    chunk = append2(chunk)
    console.log(chunk)
    return chunk
}

function appendR(chunk) {
    return chunk.map(x => 'R' + x) // OR `R${}`
}

function append2(chunk) {
    return chunk.map(x => '2' + x) // OR `2${}`
}

app.post('/uploadFile', upload.single('textFile'), (req, res) => {
    let uploadedText = req.file.buffer.toString()
    let lines = uploadedText.split(/\r?\n/);
    let originalLength = lines.length
    let chunkSize = originalLength / 5
    let jobs = []

    while (lines.length > 0) {
        jobs.push(lines.splice(0, 8))
    }

    // jobs.map(job => appendText(job))
    let appended = []

    for (const job of jobs) {
        appended.push(appendText(job))
    }

    let finalFile = ''
    appended.forEach((chunk) => {
        finalFile += chunk.join(EOL)
    })

    fs.writeFileSync('./appended.txt', finalFile)
    

    res.json({ txt: finalFile})
})


app.listen(1337, () => {
    console.log('up on 1337')
})