// --- global variables ---

var loans = [
    { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
  ]; 
  var loanTotal = 0;
  
  // --- function: loadDoc() ---
  /**
   * Code executed once page has loaded.
   * Contains majority of code responsible for work flow of
   * form execution and calculation
   */
  function loadDoc() {
    //$("#recalculate").on("click", function() {processForm()});

    //Event listener for save button
    $("#save").on("click", function() {
      localStorage.setItem("persistent_loan_data", JSON.stringify(loans));
    });
    //Event listener for load button
    $("#load").on("click", function() {
      loanData = localStorage.getItem("persistent_loan_data")
      loans = JSON.parse(loanData);
      for(let i=1; i<6; i++) {
        $("#loan_year0"+ i).val(loans[i-1].loan_year);
        $("#loan_amt0"+ i).val(loans[i-1].loan_amount.toFixed(2));
        $("#loan_int0"+ i).val(loans[i-1].loan_int_rate);
      }
    });

    // validate year input + update loans array when exiting "year" input field (jquery)
    $("#loan_year01").blur( function() {
      updateLoansArray();
    });

    // validateinterest field + update all interest fields + loans array
    $("#loan_int01").blur(function() {
      updateInterest()
    });

    //validate/update all amount fields + loans array
    for(let i = 1; i < 6; i++)
        $("#loan_amt0" + i).blur(function() {updateAmount(i)})
    
    // pre-fill defaults for first loan year
    let defaultYear = loans[0].loan_year;
    // console.log(defaultYear) // debug: defaultYear starts at 2020
    // document.getElementById("loan_year0" + 1).value = defaultYear++; // js
    $("#loan_year01").val(defaultYear++); // jquery
    // console.log(defaultYear) // debug: defaultYear increments
    let defaultLoanAmount = loans[0].loan_amount;
    $("#loan_amt01").val(defaultLoanAmount.toFixed(2));
    
    let defaultInterestRate = loans[0].loan_int_rate;
    $("#loan_int01").val(defaultInterestRate);

    let loanWithInterest 
    = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
    $("#loan_bal0" + 1).html(toComma(loanWithInterest.toFixed(2)));
    
    // pre-fill defaults for other loan years
    // (Element selection performed w/ jquery)
    for(let i=2; i<6; i++) {
        $("#loan_year0"+ i).val(defaultYear++)
        $("#loan_year0"+ i).css('background-color: "gray"; color: "white";')
        $("#loan_year0"+ i).prop( "disabled", true );

        $("#loan_amt0" + i).val(defaultLoanAmount.toFixed(2))
      
        $("#loan_int0" + i).val(defaultInterestRate);
        $("#loan_int0" + i).prop("disabled", true);
        $("#loan_int0" + i).css('background-color: "gray"; color: "white";')
      
     loanWithInterest 
       = (loanWithInterest + defaultLoanAmount) 
       * (1 + defaultInterestRate);
     $("#loan_bal0" + i).html(toComma(loanWithInterest.toFixed(2))) 
      } // end: "for" loop
    
    $("input[type=text]").focus(function() {
      $(this).select();
      $(this).css("background-color", "yellow");
    }); 
    $("input[type=text]").blur(function() {
      $(this).css("background-color", "white");
    });
    
  } // end: function loadDoc()
  
  /**
   * @param {*} value Number to be converted to comma notation
   * @returns A stringified number with commas every 3 digits
   */
  function toComma(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  /**
   * Validates entry in initial loan_year row.
   * Invalid entries will simply be replaced w/ default
   * value of [current_year]. This way, the entry is never really invalid
   */
  function updateLoansArray() {
    //Regex only allows 4 digit numbers starting w/ "20"
    let yearRegex = /20[\d]{2}/;
    if(!yearRegex.test($("#loan_year01").val())) 
      $("#loan_year01").val(new Date().getFullYear())
  
    // update the loans array
    loans[0].loan_year = parseInt($("#loan_year01").val()); // jquery
    // update all the years in the "year" column
    for(let i=2; i<6; i++) {
      loans[i-1].loan_year = loans[0].loan_year + i-1;
      $("#loan_year0"+ i ).val(loans[i-1].loan_year); // jquery
    }
  }

  /**
   * Validates entry in initial loan_int row.
   * Invalid entries will simply be replaced w/ default
   * value of 0.0453. This way, the entry is never really invalid
   */
  function updateInterest() {
    //Regex allows for an optional 0, followed by a decimal value.
    //Entries can ONLY be decimals
    let intRegex = /[0]?[\.]\d*/
    if(!intRegex.test($("#loan_int01").val())) 
      $("#loan_int01").val("0.0453")
    loans[0].loan_int_rate = parseFloat($("#loan_int01").val());
    //Takes care of 0 if user doesn't enter it ".123 instead of 0.123 for example"
    $("#loan_int01").val(loans[0].loan_int_rate);
    for(let i=2; i<6; i++) {
        loans[i-1].loan_year = loans[0].loan_year;
         $("#loan_int0"+ i).val(loans[0].loan_int_rate); // jquery
    }
  }

  /**
   * Validates entry in given loan_amt row.
   * Invalid entries will simply be replaced w/ default
   * value of 10,000. This way, the entry is never really invalid
   * @param {int} idx Index of loan_amt row accessed
   */
  function updateAmount(idx) {
    //Regex allows any amount of numeric digits, as well as an optional
    //addition of decimal values
    let amtRegex = /\d*$|\d*\.\d*?/
    if(!amtRegex.test($("#loan_amt0" + idx).val())) 
      $("#loan_amt0" + idx).val(10000.00);
    loans[idx - 1].loan_amount = parseFloat($("#loan_amt0" + idx).val());
    $("#loan_amt0" + idx).val(loans[idx - 1].loan_amount.toFixed(2));
  }

  /**
   * Update loans array with form data. 
   * Also updates global 'loanTotal' variable to store
   * amount of money user has borrowed overa all 4 years (w/out interest)
   */
  function processForm() {
    let balance = 0;
    loanTotal = 0;
    for(let i = 1; i < 6; i++) {
        loanTotal += loans[i-1].loan_amount;
        balance += loans[i-1].loan_amount;
        balance *= (1 + loans[i-1].loan_int_rate);
        $("#loan_bal0" + i).html("$" + toComma(balance.toFixed(2)));
    }
    $("#loan_int_accrued").html("$" + toComma((balance - loanTotal).toFixed(2)));
    
  }
  //Initialize Angular
  var app = angular.module('myApp', []);

  //Attach angular to ng-controller tab labeled "myCtrl"
  app.controller('myCtrl', function($scope) {
    //Create an array (used to store payment plan)
    $scope.payments = [];
    //Function activated when "recalculate is pressed"
    $scope.populate = function () {
      processForm();
      
      //Variables for loan payment calulation --
      let total = loanTotal;
      let iRate = loans[0].loan_int_rate;
      let r = iRate / 12;
      let n = 11;
      //--    --     --
      //loan payment formula
      //https://www.thebalance.com/loan-payment-calculations-315564
      let pay = 12 * (total / ((((1+r)**(n*12))-1)/(r *(1+r)**(n*12))));
      for (let i = 0; i < 10; i++) {
        total -= pay 
        let int = total * (iRate); 
        //Update first 9 positions (years 1 - 10) of payment plan array
        $scope.payments[i] = {
          "year":loans[4].loan_year + i + 1,
          "payment": "$" + pay.toFixed(2), 
          "amt": "$" + int.toFixed(2),
          "ye": "$" + (total += int).toFixed(2)
        }
      }
      //Update final position of payment plan array (last payment)
      $scope.payments[10] = {
        "year":loans[4].loan_year + 11,
        "payment": "$" + total.toFixed(2),
        "amt": "$" + 0,
        "ye": "$" + 0
      }
      /*
      Note that the values from payments[] will automatically be updated 
      in the - ng-repeat="x in payments" - rows of the table in the HTML section

      */
    }
  });