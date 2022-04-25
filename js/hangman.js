/*********************************************************************
 *                   HANGMAN: A JavaScript Implementation            *
 * PLEASE DO NOT MODIFY THE CODE THE SECTION LABELED AS UNMODIFIABLE *
 * CIS 5620: Authoring Websites                                      *
 *********************************************************************/

/* 
  Avoid creating global variables by implementing all the application
  inside an Immediately Invoked Function Expression (IIFE).
*/
(() => {

  /******************************************
   *          UNMODIFIABLE SECTION          *
   * DO NOT MODIFY THE CODE IN THIS SECTION *
   ******************************************/

  // CONSTANTS

  // Steps used to draw the hangman
  const HANGMAN_STEPS = [
    'head',     // -> step: 0
    'body',     // -> step: 1
    'rightArm', // -> step: 2
    'leftArm',  // -> step: 3
    'rightLeg', // -> step: 4
    'leftLeg',  // -> step: 5
  ];

  // Rendering context for drawing the hangman using the <canvas> element
  const CONTEXT = document.querySelector('#hangman').getContext("2d");

  // END OF CONSTANTS

  /******************************************
   *       END OF UNMODIFIABLE SECTION      *
   ******************************************/  

  // Placeholder text to display undiscovered letters
  const SPACE = '&nbsp;&nbsp;&nbsp;';

  // Word to guess
  const WORD = "computer"; 

  // State of the game
  const GAME = {
    step: 0             // An integer used as an index of the HANGMAN_STEPS array
  };

  // FUNCTIONS

  /******************************************
   *          UNMODIFIABLE SECTION          *
   * DO NOT MODIFY THE CODE IN THIS SECTION *
   ******************************************/

  /**
  Draws the hangman figure.
  
  @param	{string} part A string representing the part of the hangman to draw
  
  @returns No value.
  */
  function drawHangman(part) {
    switch (part) {
      case 'gallows':
        CONTEXT.strokeStyle = '#444';
        CONTEXT.lineWidth = 10;
        CONTEXT.beginPath();
        CONTEXT.moveTo(175, 225);
        CONTEXT.lineTo(5, 225);
        CONTEXT.moveTo(40, 225);
        CONTEXT.lineTo(25, 5);
        CONTEXT.lineTo(100, 5);
        CONTEXT.lineTo(100, 25);
        CONTEXT.stroke();
        break;

      case 'head':
        CONTEXT.lineWidth = 5;
        CONTEXT.beginPath();
        CONTEXT.arc(100, 50, 25, 0, Math.PI * 2, true);
        CONTEXT.closePath();
        CONTEXT.stroke();
        break;

      case 'body':
        CONTEXT.beginPath();
        CONTEXT.moveTo(100, 75);
        CONTEXT.lineTo(100, 140);
        CONTEXT.stroke();
        break;

      case 'rightArm':
        CONTEXT.beginPath();
        CONTEXT.moveTo(100, 85);
        CONTEXT.lineTo(60, 100);
        CONTEXT.stroke();
        break;

      case 'leftArm':
        CONTEXT.beginPath();
        CONTEXT.moveTo(100, 85);
        CONTEXT.lineTo(140, 100);
        CONTEXT.stroke();
        break;

      case 'rightLeg':
        CONTEXT.beginPath();
        CONTEXT.moveTo(100, 140);
        CONTEXT.lineTo(80, 190);
        CONTEXT.stroke();
        break;

      case 'leftLeg':
        CONTEXT.moveTo(100, 140);
        CONTEXT.lineTo(125, 190);
        CONTEXT.stroke();
        break;
    }
  }

  /**
  Generates the HTML for displaying a single letter in the game interface.
  
  @param	{string} symbol A string representing the letter to display.
                          The symbol can be an empty string to display a blank
                          space, which would symbolize a letter that has not been 
                          guessed by the player.
  
  @returns No value.
  */
  function getLetterHTML(symbol) {
    return `<span class="fs-1 border-bottom border-dark mx-1">${symbol}</span>`;
  }

  /******************************************
   *       END OF UNMODIFIABLE SECTION      *
   ******************************************/  

  /**
  Event handler for clicking a letter on the letters board. 

  @param	{object} event An object representing the event. In this case, the event
                         should correspond to a click on a letter button on the board.
  
  @returns No value.
  */
  function chooseLetter(event) {
    // Get a reference to the DOM element that registered the event
    const letterBtn = event.currentTarget;

    // CSS rule used to indicate the letter has been chosen by the user
    letterBtn.classList.add("letter-chosen");

    /* YOU MAY CHANGE THE CODE IN THIS FUNCTION */

    // Draw the corresponding hangman part and
    // increment the GAME.step variable by one
    drawHangman(HANGMAN_STEPS[GAME.step++]);

    // Check if the hangman is completed to display the end-game message
    if (undefined === HANGMAN_STEPS[GAME.step]) {
      document.querySelector("#game-over-msg").classList.remove("hide");
    }

    /* As the GAME.step++ variable is always incremented by one, a way to check
      if the hangman has been completed is by comparing the value of the HANGMAN_STEPS
      at the index indicated by the GAME.step variable against undefined.
      If the value of HANGMAN_STEPS at GAME.step is undefined, it means there are no
      more parts to draw, and thus, the game should be over. */
  }

  // GAME START-OFF

  // Draw the gallows 
  drawHangman('gallows');

  let wordHTML = "";
  for (let i = 0; i < WORD.length; i++) {
    // Display an empty space for each letter of the word to guess
    wordHTML += getLetterHTML(SPACE);
  }
  document.querySelector('#word').innerHTML = wordHTML;

  // Add the chooseLetter function as an event handler for each
  // letter on the board
  for (let letterBtn of document.querySelectorAll(".letter")) {
    letterBtn.addEventListener('click', chooseLetter)
  }

})();