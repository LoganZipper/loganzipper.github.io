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
  
  function loadDoc() {
    //$("#recalculate").on("click", function() {processForm()});

    $("#save").on("click", function() {
      localStorage.setItem("persistent_loan_data", JSON.stringify(loans));
    });

    $("#load").on("click", function() {
      loanData = localStorage.getItem("persistent_loan_data")
      loans = JSON.parse(loanData);
      for(let i=1; i<6; i++) {
        $("#loan_year0"+ i).val(loans[i-1].loan_year);
        $("#loan_amt0"+ i).val(loans[i-1].loan_amount.toFixed(2));
        $("#loan_int0"+ i).val(loans[i-1].loan_int_rate);
      }
    });

    // update loans array when exiting "year" input field (jquery)
    $("#loan_year01").blur( function() {
      updateLoansArray();
    });

    $("#loan_int01").blur(function() {
      updateInterest()
    });
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
  
  
  function toComma(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function updateLoansArray() {
    let yearRegex = /20[\d][\d]/;
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

  function updateInterest() {
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

  function updateAmount(idx) {
    let amtRegex = /\d*$|\d*\.\d*?/
    if(!amtRegex.test($("#loan_amt0" + idx).val())) 
      $("#loan_amt0" + idx).val(10000.00);
    loans[idx - 1].loan_amount = parseFloat($("#loan_amt0" + idx).val());
    $("#loan_amt0" + idx).val(loans[idx - 1].loan_amount.toFixed(2));
  }

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
 
  function verifyForm() {
    let yearRegex = /20[\d][\d]/;
    let amtRegex = /\d*(\.?)\d*/
    let intRegex = /(0?)\.\d*/

    //for()
  }

  var app = angular.module('myApp', []);

  app.controller('myCtrl', function($scope) {
    $scope.payments = [];
    $scope.populate = function () {
      processForm();
      
      let total = loanTotal;
      let iRate = loans[0].loan_int_rate;
      let r = iRate / 12;
      let n = 11;
      //loan payment formula
      //https://www.thebalance.com/loan-payment-calculations-315564
      let pay = 12 * (total / ((((1+r)**(n*12))-1)/(r *(1+r)**(n*12))));
      for (let i = 0; i < 10; i++) {
        total -= pay 
        let int = total * (iRate); 
        $scope.payments[i] = {
          "year":loans[4].loan_year + i + 1,
          "payment": "$" + pay.toFixed(2), 
          "amt": "$" + int.toFixed(2),
          "ye": "$" + (total += int).toFixed(2)
        }
      }
      $scope.payments[10] = {
        "year":loans[4].loan_year + 11,
        "payment": "$" + total.toFixed(2),
        "amt": "$" + 0,
        "ye": "$" + 0
      }
    }
  });