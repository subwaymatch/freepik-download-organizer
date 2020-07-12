# Freepik Downloaded Assets Organizer
A node.js script to organize downloded files from Freepik

## Usage

Command Line
```
$ node index.js ../freepik/downloads ../freepik/organized
```

Output
```
   ___                        _            _
  / _ \ _ __ __ _  __ _ _ __ (_)_______   (_)___
 | | | | '__/ _` |/ _` | '_ \| |_  / _ \  | / __|
 | |_| | | | (_| | (_| | | | | |/ /  __/_ | \__ \
  \___/|_|  \__, |\__,_|_| |_|_/___\___(_)/ |___/
            |___/                       |__/
Source Directory: /Users/myuser/freepik/downloads
Output Directory: /Users/myuser/freepik/organized

```

## Directory structure

Input directory structore
```
- downloads
  - person-illustration
    * 1.eps
    * 1.jpg
  - city-sketch
    * 401.ai
    * 401.jpg
    * 404.eps
    * 404.jpg
```

Output directory structore
```
- organized
  - person-illustration
    * person-illustration-001.eps
    * person-illustration-001.jpg
  - city-sketch
    * city-sketch-001.ai
    * city-sketch-001.jpg
    * city-sketch-001.eps
    * city-sketch-002.jpg
  * person-illustration-001.jpg
  * city-sketch-001.jpg
  * city-sketch-002.jpg
```

## Usage

1. Configure the `srcPath` and `outputPath` variables in `index.js`.

```javascript
const srcPath = "e:/Freepik/downloads";
const outputPath = "e:/Freepik/organized";
```

2. Run the `.index.js` file.

```
$ node index.js
```
