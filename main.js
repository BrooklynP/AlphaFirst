var TreeWalker = require("./treewalker");

const treeWalker = new TreeWalker();
treeWalker.changeDirectory('/');
treeWalker.changeDirectory('users/brooklyn/alphafirst-test/test-folder-to-walk');
treeWalker.print();