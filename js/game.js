'use strict';
function Tile(title) {
  this.title = title;
  this.flipped = false;
}

Tile.prototype.flip = function() {
  this.flipped = !this.flipped;
}

function Game(tileNames) {
  var prizeAvl = {
    movieTickets: 10,
    mobilePhones: 3,
    bike: 1
  };
  this.allowReplay = false;
  this.earnedPrize = false;
  this.prizes = prizeAvl;
  var tileDeck = makeDeck(tileNames);
  this.grid = makeGrid(tileDeck);
  
  this.message = Game.MESSAGE_CLICK;
  //this.unmatchedPairs = tileNames.length;
  this.replay = function() {
    var tileDeck = makeDeck(tileNames);
    this.grid = makeGrid(tileDeck);
    this.message = Game.MESSAGE_CLICK;
    this.allowReplay = false;
    this.earnedPrize = false;
  }

  this.flipTile = function(tile) {
    if (tile.flipped) {
      return;
    }

    tile.flip();

    if (!this.firstPick || this.secondPick) {

      if (this.secondPick) {
        this.firstPick.flip();
        this.secondPick.flip();
        this.firstPick = this.secondPick = undefined;
      }

      this.firstPick = tile;
      this.message = Game.MESSAGE_ONE_MORE;

    } else {

      if (this.firstPick.title === tile.title) {
        if(this.prizes.movieTickets > 0) {
          this.prizes.movieTickets--;
          this.message = "Congratulations! You've won a Movie Ticket.";
          this.earnedPrize = true;
        } else if (this.prizes.mobilePhones > 0) {
            this.prizes.mobilePhones--;
            this.message = "Congratulations! You've won a Mobile Phone.";
            this.earnedPrize = true;
        } else if (this.prizes.bike > 0) {
            this.prizes.bike--;
            this.message = "Congratulations! You've won a Bike.";
            this.earnedPrize = true;
        } else {
          this.message = " Congratulations! You've won. But we're out of prizes. Try again later!";
        }
        this.allowReplay = true;
        this.firstPick = this.secondPick = undefined;
      } else {
        this.secondPick = tile;
        this.message = Game.MESSAGE_LOST;
        this.allowReplay = true;
      }
    }
  }
}

Game.MESSAGE_CLICK = 'Click on a tile.';
Game.MESSAGE_ONE_MORE = 'Pick another card.';
Game.MESSAGE_LOST = 'You Lost! Please try again';
function makeDeck(tileNames) {
  var tileDeck = [];
  tileNames.forEach(function(name) {
    tileDeck.push(new Tile(name));
    tileDeck.push(new Tile(name));
  });

  return tileDeck;
}

function makeGrid(tileDeck) {
  var gridDimension = 4,
      grid = [];

  for (var row = 0; row < (gridDimension/2); row++) {
    grid[row] = [];
    for (var col = 0; col < gridDimension; col++) {
        grid[row][col] = removeRandomTile(tileDeck);
    }
  }

  return grid;
}


function removeRandomTile(tileDeck) {
  var i = Math.floor(Math.random()*tileDeck.length);
  return tileDeck.splice(i, 1)[0];
}