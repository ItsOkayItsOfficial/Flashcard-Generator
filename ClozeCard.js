/*
 * Author: Alex P
 * Project Name: Flashcard-Generator ClozeCard.js
 * Version: 1
 * Date: 09/28/17
 * URL:  ./Flashcard-Generator
 */

// Constructor - Takes BasicCard and removes cloze from text
let ClozeCard = function (text, cloze) {
    if (this instanceof ClozeCard) {
        this.cloze = cloze;
        this.text = fullText;
        partial = text.replace(cloze, '...');
        if (!fullText == /close/gi) {
            throw new Error('The text does not support the answer provided');
            console.log('The text does not support the answer provided')
        }
    } else {
        return new ClozeCard;
    }
};

module.exports = {
    ClozeCard
};