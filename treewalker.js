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


//--Main--//
var fs = require("fs");
class TreeWalker{
  constructor(filePath=null){
    //initialization
    if(filePath){
      this.load(filePath);
    }
    this.data = {}
    this.currentFolder = {}
  }

  changeDirectory(folderName){
    //write code here
    // this.currentFolder = ???;
    /*
      Change the current folder to either
        -a sub folder of the currently selected folder
        -if a "/" is provided, select the root directory

    */

  }

  print(maxDepth=2){
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