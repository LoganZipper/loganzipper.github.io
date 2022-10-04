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
    let first = document.getElementById("first").value + " ";
    let last = document.getElementById("last").value;
    let title = document.getElementById("title").value;
    
    if(suffix == "None")
        suffix = "";

    if(first.length > 0)
        first += " ";
    if(last.length > 0)
        last += " ";
    if(title == "None")
        title = "";
    else title += " ";

    document.getElementById("fullName").value = title + first + last + suffix;
}

turn = 0;
boxes = document.querySelectorAll("ticBox");
addGlobalEventListener("click", ".ticBox", e => {
    ticTac(e.target)
  })

function ticTac(userSelection) {
    //User Moves
    if(turn % 2 == 0) {	//Checks if turn count is even or odd for user
        switch(turn % 2) {
        	case 0 : xo = 'X';
        			 break;
        	case 1: xo = 'O';
        			
		} 
        input = 0
        for(entry in boxes) {
            if(entry = userSelection)
                break;
            input++;
        }
        turn++;
    
        }
        else {
        temporary = 0;
        xo = 'O';		//O placed on odd turns
        
            srand(time(0));
            
        	input = robotBrain('O');        //Possible wins checked first
       		temporary = robotBrain('X');    //Defensive moves checked if no wins present
       		
       		if(input == 0 && temporary > 0) input = temporary;
           
            if(input == 0) input = robotStrategy(); //Advacned strategy accessed if no drasic moves exist
            
            
            while(input == 0) {
            	input = rand() % 9;         //Last resort random #
			} 
    		
		   turn++;
        }
         
        if(input >= 1 && input <= 9)
            if (board[input] == 'X' || board[input] == 'O') // decides if spot is already taken
            {
                turn--;
            }
            board[1] = xo;		// If spot is not taken, X/O placed in position
    

        //Switch to check if a spot is open. Called whenever any player attempts a move
        
        winState();			//Check for possible win after each move

    ticTacBrain();
}
function ticTacBrain() {
    //Robot painfully checks every possible win/loss condition on the board
    //Called twice - once for X, once for O - hence 'spotlight' parameter
	if(((board[2] == board[3] && board[3] == spotlight) || (board[4] == board[7] && board[7] == spotlight) || (board[5] == board[9] && board[9] == spotlight)) && board[1] == '1') {
         return 1;
     }
      else if(((board[1] == board[3] && board[3] == spotlight) || (board[5] == board[8] && board[8] == spotlight)) && board[2] == '2') {
          return 2;
      }
      else if(((board[1] == board[2] && board[2] == spotlight) || (board[6] == board[9] && board[9] == spotlight) || (board[5] == board[7] && board[7] == spotlight)) && board[3] == '3') {
          return 3;
      }
      else if(((board[1] == board[7] && board[7] == spotlight) || (board[5] == board[6] && board[6] == spotlight)) && board[4] == '4') {
          return 4;
      }
      else if(((board[1] == board[9] && board[9] == spotlight) || (board[3] == board[7] && board[7] == spotlight) || 
              (board[4] == board[6] && board[6] == spotlight) || (board[2] == board[8] && board[8] == spotlight)) && board[5] == '5') {
          return 5;
      }
     else if(((board[3] == board[9] && board[9] == spotlight) || (board[4] == board[5] && board[5] == spotlight)) && board[6] == '6') {
         return 6;
     }
     else if(((board[1] == board[4] && board[4] == spotlight) || (board[8] ==  board[9] && board[9] == spotlight) || (board[3] == board[5] && board[5] == spotlight)) && board[7] == '7') {
         return 7;
     }
     else if(((board[2] == board[5] && board[5] == spotlight) || (board[7] == board[9] && board[9] == spotlight)) && board[8] == '8') {
         return 8;
     }
    else if(((board[3] == board[6] && board[6] == spotlight) || (board[7] == board[8] && board[8] == spotlight) || (board[1] == board[5] && board[5] == spotlight)) && board[9] == '9') {
    	return 9;
	}
     	else return 0;
}

function ticTacBackup() {
    if(board[1] == '1' && board[3] == '3' && board[7] == '7' && board[9] == '9') {
        return 1;
    }
    else if(board[1] == 'O' && board[9] == '9' && (board[3] == '3' || board[7] == '7')) {
        return 9;
    }
    else if((turn + 1)/2 - coinFlip == 2 && board[1] == 'X' && board[9] == 'X') {
        return 2;
    }
    else if((turn + 1)/2 - coinFlip == 2 && board[3] == 'X' && board[7] == 'X') {
        return 8;
    }
    else if(board[5] == '5') {
        return 5;
    }
    else return 0;
}

function winState() {	//Compares current inputs. All win conditions independently checked
    
    if((board[1] == board[4]) && (board[4] == board[7]))  		      //Win on Left Column
        declareWinner(board[7]);									  
    
    else if((board[2] == board[5]) && (board[5] == board[8])) 		  //Win on Middle Column
        declareWinner(board[8]);

    else if((board[3] == board[6]) && (board[6] == board[9])) 	      //Win on Right Column
        declareWinner(board[9]);
    
    else if((board[1] == board[2]) && (board[2] == board[3]))		  //Win on Top Row
        declareWinner(board[3]);
    
    else if((board[4] == board[5]) && (board[5] == board[6]))         //Win on Middle Row
        declareWinner(board[6]);

    else if((board[7] == board[8]) && (board[8] == board[9])) 	      //Win on Bottom row
        declareWinner(board[9]);
    
    else if((board[1] == board[5]) && (board[5] == board[9])) 	 	//Win On '\' Diagonal
        declareWinner(board[1]);
    
    else if((board[3] == board[5]) && (board[5] == board[7])){		//Win on '/' Diagonal
        declareWinner(board[7]);
    }
    else if(turn == (9 + coinFlip)) {											//Tie game declared when all spaces filled without full row/column/diagonal
    	boardDisplay();
    	cout << endl << "Tie Game!" << endl;
    	input = 0;													//end game
    	
	}

}

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
      if (e.target.matches(selector)) callback(e)
    })
  }