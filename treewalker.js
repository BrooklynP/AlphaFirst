/*

Hello Brooklyn, this is a slightly difficult task. But much like
flex tape, here at AlphaFirst ltd. we expect you to fix a lotta damage!
https://www.youtube.com/watch?v=0xzN6FM5x_E

---Notes---
This is "open book", which means you're allowed to use the internet, and other
sources, to research solutions.

You are expected to come up with 3 functions
-changeDirectory
-print
-search

Explanations for these are provided in the class functions below.

--Suggested search terms--
-recursion / recursive functions
-treewalking
-JSON (JavaScript Object Notation)

You're welcome/encouraged to add any personal little touches/flares etc. As
long as you do what has been asked in the tasks. Also, feel free to delete my
comments and change this file as much as you want; there are a lot of comments.
*/

class Directory{
  constructor(setPath='/', setDepth = 0, setChildren = []){
    path =  setPath;
    depth = setDepth;
    children = setChildren;
  }

  path = '/';
  depth = 0;
  children = [];
}

//--Main--//
const fs = require("fs");
class TreeWalker{
  maximumPrintDepth = 2;

  constructor(filePath=null){
    //initialization
    if(filePath){
      this.load(filePath);
    }
    this.data = {}
    this.currentFolder = {}
  }


  /**Takes path to change to as string. e.g. /users/brooklyn/desktop and recursively checks if child exists before moving in */
  changeDirectory(folderName){
    if(!folderName){
      console.error("Hey, Give me something to work with")
      return
    }

    if(typeof folderName != 'string'){
      console.error("Hey, That's not a string!");
      return
    }

    if(folderName === '/'){
      console.log("You are now in the root");
      this.currentFolder = '/';
      return
    }

    if(folderName.startsWith('/')){
      this.currentFolder = '/';
      this.folderName = this.currentFolder.substring(1);
    }

    let folderNameAsArray = folderName.split('/');

    this.checkIfChildDirectoryExists(folderNameAsArray);
  }

  checkIfChildDirectoryExists(childrenDirectories){
    if(childrenDirectories.length === 0){
      console.log(this.currentFolder);
      return;
    }
    let currentDirectoryChildren = fs.readdirSync(this.currentFolder);
    currentDirectoryChildren = currentDirectoryChildren.map(element=>element.toLowerCase());

    if(currentDirectoryChildren.includes(childrenDirectories[0].toLowerCase())){
      this.currentFolder += childrenDirectories[0] + '/';
      childrenDirectories.shift();

      this.checkIfChildDirectoryExists(childrenDirectories);
    }
    else{
      console.error("There is no child /" + childrenDirectories[0] + "/ In " + this.currentFolder);
      console.log(this.currentFolder);
      return
    }
  }

  walk(directory, currentDepth){
    if(currentDepth > this.maximumPrintDepth){
      return;
    }

    let listOfDirectoryChildren = fs.readdirSync(directory);
    listOfDirectoryChildren.forEach((child)=>{
      let stats = fs.statSync(directory + '/' + child);
      if(stats.isDirectory()) {
        console.log('*' + child)
        this.walk(directory + '/' + child, currentDepth++);
      }
      else{
        console.log(child);
      }
    })

  }

  print(){
    this.walk(this.currentFolder, 0);

    //Write code here
    /*
      Print the current folder in alphabetical order (and its children) to the
      console.

      --Formatting Rules--
      -folders should be prefixed with a *
      -files should be shown after folders
      -files/folders should be sorted in alphabetical order
      -sub files/folders should be indented with two spaces

      See below for example console output:

      *folder
        *AAA Sub folder
          *DDD Sub folder
          b file.sql
        *BBB Sub folder
          a file.js
          z file.sql
        a file.js
        z file.sql
    */
  }

  search(name){
    //write code here
    /*
      return the filepath of the first file/folder found than matches "name"

      Example     Input:    name="2019-01-26 Marvin.zip"
                  Output:   "/Local Projects/Marvin/Backups/2019-01-26 Marvin.zip"
    */

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