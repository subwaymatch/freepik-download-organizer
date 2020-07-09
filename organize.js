const glob = require("glob");
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

async function readFiles(targetDir) {
    const resolvedTargetPath = path.resolve(targetDir);

    try {
        // Find all license files
        const licenseFiles = glob.sync(
            path.join(resolvedTargetPath, "**/License*.txt")
        );

        licenseFiles.forEach(async (p) => {
            await fsPromises.unlink(p);
        });

        // Get a list of all directories in the target directory
        const dirsList = fs
            .readdirSync(targetDir)
            .filter((f) =>
                fs.lstatSync(path.join(resolvedTargetPath, f)).isDirectory()
            );

        // Create organized directory if not exists
        fsPromises.mkdir(organized);

        dirsList.forEach((itemName) => {
            //console.log(itemName);
        });
    } catch (err) {
        console.log(err);
    }
}

readFiles("../test");
