/*
* Author: Alex P
* Project Name: Flashcard-Generator BasicCard.js
* Version: 1
* Date: 09/28/17
* URL:  ./Flashcard-Generator
*/

// Constructor - Takes from and back of card
let BasicCard = function(front, back) {
    if (this instanceof BasicCard) {
    this.front = front;
    this.back = back;
    } else {
        return new BasicCard;
    }
};

module.exports = {
    BasicCard
};