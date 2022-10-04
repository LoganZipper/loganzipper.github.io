function findGCD() {

    let x = parseInt(document.getElementById("num1").value);
    let y = parseInt(document.getElementById("num2").value);

    if(typeof(x) != "number" || typeof(y) != "number") {
        document.getElementById("gcd").value = "Please enter two numbers";
        return;
    }
        
    
        while(y) {
            let t = y;
            y = x % y;
            x = t;
          }
          
          document.getElementById("gcd").value = x;
}

function sumDigits() {
    let initNum = parseInt(document.getElementById("digits").value);
    document.getElementById("finalSum").value = sumDigitsRecursive(initNum);
}

function sumDigitsRecursive(curNum) {
    if(curNum < 1)
        return 0;
    
    return curNum % 10 + sumDigitsRecursive(parseInt(curNum / 10));
}

function generateName() {
    let suffix = document.getElementById("suffix").value;
    let first = document.getElementById("first").value;
    let last = document.getElementById("last").value;
    let title = document.getElementById("title").value;
    
    if(suffix == "none")
        suffix = "";

    if(first.length > 0)
        first += " ";
    if(last.length > 0)
        last += " ";
    if(title == "none")
        title = "";
    else title += " ";

    document.getElementById("fullName").value = title + first + last + suffix;
}

let turn = 0;
var boxes;
function doSomething() {
    boxes = document.getElementsByClassName("ticBox");
    //console.log(boxes[0].innerHTML);
    //console.log(boxes.length);
}
setTimeout( () => {
    doSomething();
}, 2);




addGlobalEventListener("click", ".ticBox", e => {
    ticTac(e.target)
  })



function ticTac(userSelection) {
    if(winState())
        return;
    //User Moves
    let xo = 'X';
    let input = 0;
    if(turn % 2 == 0) {	//Checks if turn count is even or odd for user
        xo = 'X';
        			
		 

        for(i = 0;i < 9;i++) {
            console.log(boxes[i]);
            console.log(userSelection)
            if(boxes[i] == userSelection)
                break;
            input++;
        }

        console.log("input =" + input)
        if(input >= 0 && input <= 8) {
            if (boxes[input].innerHTML == 'X' || boxes[input].innerHTML == 'O') // decides if spot is already taken
                 turn--;
            else
                boxes[input].innerHTML = xo;		// If spot is not taken, X/O placed in position
           
            //userSelection.innerHTML = "X"
            console.log(userSelection)
        }
        turn++;
        console.log("Turn = " + turn);
        console.log();
        console.log();
        console.log();
        if(winState() || turn == 9)
            return;
        }
        if(turn % 2 == 1) {
            console.log("Robot is Making its move");
        let temporary = -1;
            xo = 'O';		//O placed on odd turns
            input = -1;
        	input = ticTacBrain('O');        //Possible wins checked first
            console.log("Robot input is " + input);
       		temporary = ticTacBrain('X');    //Defensive moves checked if no wins present
            console.log("Robot temp is " + temporary);
       		
       		if(input == -1 && temporary > -1) input = temporary;
           
            if(input == -1) input = ticTacBackup(); //Advacned strategy accessed if no drasic moves exist
            
            
            while(input == -1) {
            	input = Math.floor(Math.random() * 9);         //Last resort random #
                if(boxes[input].innerHTML != '') input = -1;
			} 
    		
        boxes[input].innerHTML = xo;
        boxes[input].style.color = "blue";
		turn++;
        }
         
            
    

        //Switch to check if a spot is open. Called whenever any player attempts a move
        
        winState();			//Check for possible win after each move

}
function ticTacBrain(spotlight) {
    //Robot painfully checks every possible win/loss condition on the board
    //Called twice - once for X, once for O - hence 'spotlight' parameter
	if(((boxes[1].innerHTML.innerHTML == boxes[2].innerHTML && boxes[2].innerHTML == spotlight) || (boxes[3].innerHTML == boxes[6].innerHTML && boxes[6].innerHTML == spotlight) || (boxes[4].innerHTML == boxes[8].innerHTML && boxes[8].innerHTML == spotlight)) && boxes[0].innerHTML == '') {
         return 0;
     }
      else if(((boxes[0].innerHTML == boxes[2].innerHTML && boxes[2].innerHTML == spotlight) || (boxes[4].innerHTML == boxes[7].innerHTML && boxes[7].innerHTML == spotlight)) && boxes[1].innerHTML == '') {
          return 1;
      }
      else if(((boxes[0].innerHTML == boxes[1].innerHTML && boxes[1].innerHTML == spotlight) || (boxes[5].innerHTML == boxes[8].innerHTML && boxes[8].innerHTML == spotlight) || (boxes[4].innerHTML == boxes[6].innerHTML && boxes[6].innerHTML == spotlight)) && boxes[2].innerHTML == '') {
          return 2;
      }
      else if(((boxes[0].innerHTML == boxes[6].innerHTML && boxes[6].innerHTML == spotlight) || (boxes[4].innerHTML == boxes[5].innerHTML && boxes[5].innerHTML == spotlight)) && boxes[3].innerHTML == '') {
          return 3;
      }
      else if(((boxes[0].innerHTML == boxes[8].innerHTML && boxes[8].innerHTML == spotlight) || (boxes[2].innerHTML == boxes[6].innerHTML && boxes[6].innerHTML == spotlight) || 
              (boxes[3].innerHTML == boxes[5].innerHTML && boxes[5].innerHTML == spotlight) || (boxes[1].innerHTML == boxes[7].innerHTML && boxes[7].innerHTML == spotlight)) && boxes[4].innerHTML == '') {
          return 4;
      }
     else if(((boxes[2].innerHTML == boxes[8].innerHTML && boxes[8].innerHTML == spotlight) || (boxes[3].innerHTML == boxes[4].innerHTML && boxes[4].innerHTML == spotlight)) && boxes[5].innerHTML == '') {
         return 5;
     }
     else if(((boxes[0].innerHTML == boxes[3].innerHTML && boxes[3].innerHTML == spotlight) || (boxes[7].innerHTML ==  boxes[8].innerHTML && boxes[8].innerHTML == spotlight) || (boxes[2].innerHTML == boxes[4].innerHTML && boxes[4].innerHTML == spotlight)) && boxes[6].innerHTML == '') {
         return 6;
     }
     else if(((boxes[1].innerHTML == boxes[4].innerHTML && boxes[4].innerHTML == spotlight) || (boxes[6].innerHTML == boxes[8].innerHTML && boxes[8].innerHTML == spotlight)) && boxes[7].innerHTML == '') {
         return 7;
     }
    else if(((boxes[2].innerHTML == boxes[5].innerHTML && boxes[5].innerHTML == spotlight) || (boxes[6].innerHTML == boxes[7].innerHTML && boxes[7].innerHTML == spotlight) || (boxes[0].innerHTML == boxes[4].innerHTML && boxes[4].innerHTML == spotlight)) && boxes[8].innerHTML == '') {
    	return 8;
	}
     	else return -1;
}

function ticTacBackup() {
    if(boxes[4].innerHTML == '') {
        return 4;
    }
    else if(boxes[0].innerHTML == 'X' && boxes[8].innerHTML == 'X') {
        return 1;
    }
    else if(boxes[2].innerHTML == 'X' && boxes[6].innerHTML == 'X') {
        return 1;
    }
    else if(boxes[0].innerHTML == 'O' && boxes[8].innerHTML == '' && (boxes[2].innerHTML == '' || boxes[6].innerHTML == '')) {
        return 8;
    }
    
    else return -1;
}

function winState() {	//Compares current inputs. All win conditions independently checked
    
    if((boxes[0].innerHTML == boxes[3].innerHTML) && (boxes[3].innerHTML == boxes[6].innerHTML))  		      //Win on Left Column
        return declareWinner(boxes[6].innerHTML);									  
    
    else if((boxes[1].innerHTML == boxes[4].innerHTML) && (boxes[4].innerHTML == boxes[7].innerHTML)) 		  //Win on Middle Column
        return declareWinner(boxes[7].innerHTML);

    else if((boxes[2].innerHTML == boxes[5].innerHTML) && (boxes[5].innerHTML == boxes[8].innerHTML)) 	      //Win on Right Column
        return declareWinner(boxes[8].innerHTML);
    
    else if((boxes[0].innerHTML == boxes[1].innerHTML) && (boxes[1].innerHTML == boxes[2].innerHTML))		  //Win on Top Row
        return declareWinner(boxes[2].innerHTML);
    
    else if((boxes[3].innerHTML == boxes[4].innerHTML) && (boxes[4].innerHTML == boxes[5].innerHTML))         //Win on Middle Row
        return declareWinner(boxes[5].innerHTML);

    else if((boxes[6].innerHTML == boxes[7].innerHTML) && (boxes[7].innerHTML == boxes[8].innerHTML)) 	      //Win on Bottom row
        return declareWinner(boxes[8].innerHTML);
    
    else if((boxes[0].innerHTML == boxes[4].innerHTML) && (boxes[4].innerHTML == boxes[8].innerHTML)) 	 	//Win On '\' Diagonal
        return declareWinner(boxes[0].innerHTML);
    
    else if((boxes[2].innerHTML == boxes[4].innerHTML) && (boxes[4].innerHTML == boxes[6].innerHTML)){		//Win on '/' Diagonal
        return declareWinner(boxes[6].innerHTML);
        
    }
    else if(turn == (10)) {											//Tie game declared when all spaces filled without full row/column/diagonal
    	console.log("tie game")
    	input = 0;													//end game
    	return true;
	}
    return false;
}

function declareWinner(val) {		                              //Displays the Winner and the final board
    switch(val) 
    {
        case 'X': 
        	console.log("X wins!");
            break;
        case 'O': 
            console.log("O wins!");
            break;
        case '':
            return false;
    }
    document.removeEventListener("click", ".ticBox");
    input = 0;                              // end game
    return true;
}

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
      if (e.target.matches(selector)) callback(e)
    })
  }