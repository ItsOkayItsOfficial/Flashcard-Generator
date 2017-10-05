/*
 * Author: Alex P
 * Project Name: Flashcard-Generator entry
 * Version: 1
 * Date: 09/28/17
 * URL:  ./Flashcard-Generator
 */

// Variables -Import modules
let BasicCard = require('./BasicCard.js');
let ClozeCard = require('./ClozeCard.js');
let library = require('./Cards.json');
let inquirer = require('inquirer');
let fs = require('fs');

// Variables - Commands for cards
var drawnCard = "";
var playedCard = "";
var count = 0;


// Function - Initial menu options
let openMenu = function () {
    // Inquirer - Initial prompt
    inquirer.prompt([{
        type: "list",
        message: "\nPlease choose one",
        choices: ["Get Card", "Show All", "Exit"],
        name: "menuOptions"
    }]).then(function (answer) {
        var waitMsg;

        // Switch - Menu options for functions
        switch (answer.menuOptions) {
            case 'Get Card':
                console.log("Getting random card.");
                waitMsg = setTimeout(getCard, 1000);
                break;

            case 'Show All':
                console.log("Printing all cards");
                waitMsg = setTimeout(showCards, 1000);
                break;

            case 'Exit':
                console.log("Exiting Card Generator")
                return;
                break;

            default:
                console.log("");
                console.log("Input not understood");
                console.log("");
        }
    });
}

openMenu();


// Function - Get question from Cards.JSON
let getQuestion = function (card) {
    // If - Card is BasicCard
    if (card.type === "BasicCard") {
        drawnCard = BasicCard;
        return drawnCard.front;
        // Else - Card is ClozeCard
    } else if (card.type === "ClozeCard") {
        drawnCard = ClozeCard;
        return drawnCard.partial;
    }
};


//Function - Get random card from Cards.JSON
let getCard = function () {
    // Randomizes question
    var randomNumber = Math.floor(Math.random() * (library.length - 1));
    // Passes Randomized question
    playedCard = getQuestion(library[randomNumber]);
    inquirer.prompt([{
        type: "input",
        message: playedCard,
        name: "question"
    }]).then(function (answer) {
        // If - Checks to see if answer is correct
        if (answer.question === library[randomNumber].back || answer.question === library[randomNumber].cloze) {
            console.log(colors.green("You are correct."));
            setTimeout(openMenu, 1000);
            // Else - Answer is wrong
        } else {
            // If - BasicCard for answer
            if (drawnCard.front !== undefined) {
                console.log(colors.red("Sorry, the correct answer was ") + library[randomNumber].back + ".");
                setTimeout(openMenu, 1000);
                // Else - ClozeCard for answer
            } else {
                console.log(colors.red("Sorry, the correct answer was ") + library[randomNumber].cloze + ".");
                setTimeout(openMenu, 1000);
            }
        }
    });

};


// Function - Shows all questions and answers
let showCards = function () {
    // If - Card is BasicCard
    if (library[count].front !== undefined) {
        console.log("");
        console.log("++++++++++++++++++ Basic Card ++++++++++++++++++");
        console.log("Front: " + library[count].front);
        console.log("------------------------------------------------");
        console.log("Back: " + library[count].back + ".");
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("");
        // Else - Card  is ClozeCard
    } else {
        console.log("");
        console.log("++++++++++++++++++ Cloze Card ++++++++++++++++++");
        console.log("Text: " + library[count].text);
        console.log("------------------------------------------------");
        console.log("Cloze: " + library[count].cloze + ".");
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("");
    }
}