var TreeWalker = require("./treewalker");

const treeWalker = new TreeWalker();
treeWalker.changeDirectory("/");
treeWalker.changeDirectory("users/brooklyn/alphafirst-test/test-folder-to-walk");
console.log("\n");
treeWalker.print();
console.log("\n");
console.log("Going to search for DDD Sub Folder  (Expected : Finds)")
treeWalker.search("DDD Sub folder");
console.log("\n");
console.log("Going to search for TOO DEEP DONT SHOW ME (Expected : doesn't find, too deep)")
treeWalker.search('TOO DEEP DONT SHOW ME');
console.log("\n");
console.log("Going to search for I dont exist (Expected : doesn't find, doesn't exist)")
treeWalker.search('I dont exist');
