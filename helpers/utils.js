const fs = require('fs');
const path = require('path')
const axios = require('axios')

const getFilePathFromName = (name) => path.resolve('./public/static/images/', `${name}.jpg`);

const savePersonToFile = async (name) => {
    const thumbnailSrc = await getWikipediaImageFromName(name)
    if (thumbnailSrc !== null) {
        const filePath = getFilePathFromName(name)
        // imageStream
        const imageStreamResponse = await axios({
            method: 'GET',
            url: thumbnailSrc,
            responseType: 'stream',
        })
        if (imageStreamResponse.status < 200 || imageStreamResponse.status >= 400 || !imageStreamResponse.data) {
            return reject("Woah buddy, slow down.");
        }

        // const savedImage = saveImageData(imagestream, filepath)

        return saveImageStreamIntoFile(imageStreamResponse.data, filePath)

    }
}
async function getWikipediaImageFromName(name) {
    console.log("🚀 ~ file: utils.js ~ line 6 ~ getWikipediaImageFromName ~ name", name)
    const wikiRes = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=pageimages&format=json&pithumbsize=500`
    );
    return extractWikipediaThumbnailFromWikiResponse(wikiRes)
}

function extractWikipediaThumbnailFromWikiResponse(wikiRes) {
    const { data } = wikiRes
    const pagesKeys = Object.keys(data.query.pages)
    const { thumbnail } = data.query.pages[pagesKeys[0]]
    if (thumbnail) {
        return thumbnail.source
    }
    return null
}
// Returns a promise
const saveImageStreamIntoFile = async (imageStream, filePath) => {
    console.log("🚀 ~ file: utils.js ~ line 47 ~ saveImageStreamIntoFile ~ filePath", filePath)
    return new Promise((resolve, reject) => {
        const w = imageStream.pipe(fs.createWriteStream(filePath));
        w.on('error', error => reject(error))
            .on('finish', () => resolve(filePath));
    })
}

const transformString = (name) => {
    if (typeof (name) !== 'string') {
        throw new Error("Not a valid string")
    }
    return name.toString().toLowerCase().split(" ").map((name) => {
        return name[0].toUpperCase() + name.substring(1);
    }).join("+")
}


module.exports = {
    getFilePathFromName,
    saveImageStreamIntoFile,
    getWikipediaImageFromName,
    savePersonToFile,
    transformString
}