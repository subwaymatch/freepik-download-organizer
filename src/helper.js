const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

async function listFiles(path) {
    return (
        await fsPromises.readdir(path, {
            withFileTypes: true,
        })
    )
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name);
}

async function listDirectories(path) {
    return (
        await fsPromises.readdir(path, {
            withFileTypes: true,
        })
    )
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
}

function extractItemNameFromDirName(itemDirPath) {
    let dir = path.parse(itemDirPath).name;

    let matchesArr = dir.match(/(.*) \((\d+)\)$/);
    let itemName = matchesArr && matchesArr.length >= 3 ? matchesArr[1] : dir;

    return itemName;
}

function generateItemOutputFileName(itemName, suffixNumber, fileExtension) {
    return (
        itemName +
        `-${suffixNumber.toString().padStart(3, "0")}` +
        fileExtension
    );
}

module.exports = {
    listFiles,
    listDirectories,
    extractItemNameFromDirName,
    generateItemOutputFileName,
};
