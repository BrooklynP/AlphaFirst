const fs = require("fs");

class TreeWalker {
  maximumPrintDepth = 2;
  hasFinishedSearching = false;

  constructor(filePath = null) {
    if (filePath) {
      this.load(filePath);
    }
    this.data = {}
    this.currentFolder = {}
  }


  /**Takes path to change to as string. e.g. /users/brooklyn/desktop and recursively checks if child exists before moving in */
  changeDirectory(folderName) {
    if (!folderName) {
      console.error("Hey, Give me something to work with")
      return
    }

    if (typeof folderName != 'string') {
      console.error("Hey, That's not a string!");
      return
    }

    if (folderName === '/') {
      this.currentFolder = '/';
      console.log("cd", this.currentFolder);
      return
    }

    if (folderName.startsWith('/')) {
      this.currentFolder = '/';
      this.folderName = this.currentFolder.substring(1);
    }

    let folderNameAsArray = folderName.split('/');

    this.checkIfChildDirectoryExists(folderNameAsArray);
  }

  checkIfChildDirectoryExists(childrenDirectories) {
    if (childrenDirectories.length === 0) {
      console.log("cd", this.currentFolder);
      return;
    }
    let currentDirectoryChildren = fs.readdirSync(this.currentFolder);
    currentDirectoryChildren = currentDirectoryChildren.map(element => element.toLowerCase());

    if (currentDirectoryChildren.includes(childrenDirectories[0].toLowerCase())) {
      this.currentFolder += childrenDirectories[0] + '/';
      childrenDirectories.shift();

      this.checkIfChildDirectoryExists(childrenDirectories);
    }
    else {
      console.error("There is no child /" + childrenDirectories[0] + "/ In " + this.currentFolder);
      console.log(this.currentFolder);
      return
    }
  }

  walk(directory, currentDepth) {
    if (currentDepth > this.maximumPrintDepth + 1) {
      return;
    }
    currentDepth++;

    let organisedDirectory = this.organiseIntoFilesAndFolders(fs.readdirSync(directory), directory);

    organisedDirectory.folders.forEach((folder) => {
      console.log(this.produceStringToPrint('*' + folder, currentDepth))
      this.walk(organisedDirectory.absolutePath + '/' + folder, currentDepth);
    });
    organisedDirectory.files.forEach((file) => {
      console.log(this.produceStringToPrint(file, currentDepth))
    });
  }

  produceStringToPrint(name, depth) {
    let stringToPrint = '';
    for (let i = 0; i < depth; i++) {
      stringToPrint = '  ' + stringToPrint;
    }
    stringToPrint += name;
    return stringToPrint;
  }

  organiseIntoFilesAndFolders(directory, directoryPath) {
    let newObject = {
      absolutePath: directoryPath,
      folders: [],
      files: []
    }

    directory.forEach((child) => {
      let stats = fs.statSync(directoryPath + '/' + child);
      if (stats.isDirectory()) {
        newObject.folders.push(child);
      }
      else {
        newObject.files.push(child);
      }
    })

    newObject.folders = newObject.folders.sort();
    newObject.files = newObject.files.sort();

    return newObject;
  }

  print() {
    this.walk(this.currentFolder, 1);
  }

  searchTree(directory, query, currentDepth){
    if(this.hasFinishedSearching){
      return;
    }
    if (currentDepth > this.maximumPrintDepth) {
      console.log("file not found :(");
      this.hasFinishedSearching = true;
      return
    }

    currentDepth++;

    let organisedDirectory = this.organiseIntoFilesAndFolders(fs.readdirSync(directory), directory);

    organisedDirectory.files.forEach((fileName)=>{
      if(fileName.indexOf(query)!= -1){
        console.log("File found at", directory + fileName);
        this.hasFinishedSearching = true;
        return;
      }
    })
    organisedDirectory.folders.forEach((folder) => {
      if(folder.indexOf(query)!= -1){
        console.log("Folder found at", directory + '/' + folder);
        this.hasFinishedSearching = true;
        return;
      }
      this.searchTree(organisedDirectory.absolutePath + '/' + folder, query, currentDepth);
    });  
  }

  search(name) {
    this.hasFinishedSearching = false;
    if(this.currentFolder.match(/\/$/)){
      this.currentFolder = this.currentFolder.slice(0, -1);
    }
    this.searchTree(this.currentFolder, name, 0);
  }

  //Loads folder tree data from a json file
  load(filePath) {
    var contents = fs.readFileSync(filePath);
    var jsonContent = JSON.parse(contents);
    this.data = jsonContent;
    return jsonContent;
  }
}

module.exports = TreeWalker;