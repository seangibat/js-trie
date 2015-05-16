/*
  WeightedTrie
  A simple Trie in JS.
  Best suited for searches.
  
  -addOrWeightString adds and/or increases the weight of a string.
   You should use it everytime a user presses enter on a search.
  -getBestMatch will return the best possible match.
*/

var WeightedTrie = function(){
  this.root = this._makeNode();
  this.root.parent = false;
};

/*
  -weight represents the number of times a word has been added.
  -word is false if the node is a stepping stone in another
   word, i.e. 'n' in monitor.
  -highestWeighted is the highest weighted node in this branch of the tree;
   that is, children of the current or the current node.
  -children is a dictionary with one letter keys, each containing
   another branch of the trie.
*/
WeightedTrie.prototype._makeNode = function(){
  var self = {
    weight: 0,
    word: false,
    children: {}
  };
  self.highestWeighted = self;
  return self;
};

/* 
  Let w = a word. Increase a w's weight by 1. If the word doesn't exist 
  in the system, create it.

  After increasing a w's weight, traverse up the tree, setting w to highestWeight
  until you find a parent whose highestWeight is weightier.
*/
WeightedTrie.prototype.addOrWeightString = function(word){
  var node = this.root, foundNode;

  for (var i = 0; i < word.length; i++){
    var char = word[i];
    if (node.children[char]) {
      node = node.children[char];
    }
    else {
      node.children[char] = this._makeNode();
      node.children[char].parent = node;
      node = node.children[char];
    }
  }

  var foundNode = node;
  node.weight++;
  node.word = word;

  if (node.weight > node.highestWeighted.weight) node.highestWeighted = node;

  while (node.parent && node.highestWeighted.weight > node.parent.highestWeighted.weight) {
    node.parent.highestWeighted = node.highestWeighted;
    node = node.parent;
  }

  return foundNode;
};

/*
  Get highestWeighted of the node found at 'word'.
  If there is no node for 'word', return false.
*/
WeightedTrie.prototype.getBestMatch = function(word){
  var node = this.root;

  for (var i = 0; i < word.length; i++){
    var char = word[i];
    if (node.children[char]) node = node.children[char];
    else return false;
  }

  return node.highestWeighted.word;
};