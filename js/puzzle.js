/*
 *  Puzzle - Texas Hold'em Poker
 */

let output_players = document.getElementById('output1');
let output_cards = document.getElementById('output2');

// Create players
function Player(name) {
  this.name = name;
  this.cards = [];
  this.box = (function() {
    let box = document.createElement('div');
    let box_name = document.createTextNode(name);
    box.appendChild(box_name)
    output_players.appendChild(box)

    return box;
  })();
}

// Create boxes for players
let oliver = new Player('Oliver');
let comp1 = new Player('Computer #1');
let comp2 = new Player('Computer #2');
let comp3 = new Player('Computer #3');

// Create array for looping through players
let players = [oliver, comp1, comp2, comp3];

// Generate cards
let suits = ['♡', '♢', '♠', '♣'];
let numbers = [];

for(let n = 1; n <= 13; n++) {
  if(n == 13) numbers.push('King');
  else if(n == 12) numbers.push('Queen');
  else if(n == 11) numbers.push('Jack');
  else if(n == 1) numbers.push('Ace');
  else numbers.push(n);
}

// Create array for storing picked cards
let picked_cards = [];

// Create a picked card
function Card() {
  let suit = suits[Math.floor(Math.random() * suits.length)];
  let number = numbers[Math.floor(Math.random() * numbers.length)];
  let card = `${number} of ${suit}`;

  // Check card is not already picked
  let already_picked = picked_cards.includes(card);

  if(already_picked) {
    let pick_again = new Card();
    this.face = pick_again.card;
  }
  else {
    this.face = card;
  }
}

// Record the hand of a player
let record_hand = function(person) {
  let li = document.createElement('li');
  let text = document.createTextNode(`${person.name} has the ${person.cards[0].face} and the ${person.cards[1].face}`);
  li.appendChild(text);

  return li;
}

// Create a new round
let new_round = function() {
  // Clear picked cards
  picked_cards = [];

  // Clear existing hands
  output_cards.innerHTML = '';

  // For each player, pick 2 cards
  for(let player in players) {
    let person = players[player];

    person.cards = [];
    let card1 = new Card();
    let card2 = new Card();

    person.cards.push(card1, card2);

    output_cards.appendChild(record_hand(person));
  }

  let community_cards = 'The community cards are the ';

  // Generate 'community' cards
  for(let c = 0; c < 4; c++) {
    let card = new Card();
    community_cards += card.face;

    if(c == 2) {
      community_cards += ' and the ';
    }

    if(c < 2) {
      community_cards += ', ';
    }
  }

  let community_cards_output_text = document.createTextNode(community_cards);
  let community_cards_output_wrapper = document.createElement('li');
  community_cards_output_wrapper.appendChild(community_cards_output_text);
  output_cards.appendChild(community_cards_output_wrapper);
}
