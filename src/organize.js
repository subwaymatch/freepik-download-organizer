const glob = require("glob");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const { orderBy } = require("natural-orderby");
const {
    listFiles,
    listDirectories,
    extractItemNameFromDirName,
    generateItemOutputFileName,
} = require("./helper");

async function organizeAssets(sourcePath, outputPath) {
    const resolvedSourcePath = path.resolve(sourcePath);

    try {
        // Find and delete all license files
        glob.sync(path.join(resolvedSourcePath, "**/License*.txt")).forEach(
            (f) => {
                fs.unlinkSync(f);
            }
        );

        let itemDirs = await listDirectories(resolvedSourcePath);

        for (const itemDir of orderBy(itemDirs)) {
            const itemName = extractItemNameFromDirName(itemDir);
            const itemOutputDirPath = path.join(outputPath, itemName);

            // Create item output directory if it doesn't exist
            if (!fs.existsSync(itemOutputDirPath)) {
                await mkdirp(itemOutputDirPath);
            }

            // Get asset files within a directory
            let assetFiles = await listFiles(
                path.join(resolvedSourcePath, itemDir)
            );

            // Rename and move all asset files within an item directory
            for (assetFile of orderBy(assetFiles)) {
                let assetFileInfo = path.parse(assetFile);
                let assetFileExtension = assetFileInfo.ext;

                let fileSuffixNumber = 1;

                // Increment file suffix number (e.g. 0001, 0002, 0003)
                // if the file exists
                while (
                    fs.existsSync(
                        path.join(
                            itemOutputDirPath,
                            generateItemOutputFileName(
                                itemName,
                                fileSuffixNumber,
                                assetFileExtension
                            )
                        )
                    )
                ) {
                    fileSuffixNumber++;
                }

                let assetOutputFileName = generateItemOutputFileName(
                    itemName,
                    fileSuffixNumber,
                    assetFileExtension
                );

                // If a preview image, first copy the image to output dir
                if (assetFileExtension === ".jpg") {
                    await fsPromises.copyFile(
                        path.join(resolvedSourcePath, itemDir, assetFile),
                        path.join(outputPath, assetOutputFileName)
                    );
                }

                await fsPromises.rename(
                    path.join(resolvedSourcePath, itemDir, assetFile),
                    path.join(itemOutputDirPath, assetOutputFileName)
                );

                console.log(`${assetFile} --> ${assetOutputFileName}`);
            }

            // Delete the item directory
            rimraf.sync(path.join(resolvedSourcePath, itemDir));
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    organizeAssets,
};
