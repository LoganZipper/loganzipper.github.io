// --- global variables ---

var loans = [
    { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
  ]; 
  
  
  // --- function: loadDoc() ---
  
  function loadDoc() {
    $("#recalculate").on("click", function() {processForm()});
    for(let i = 1; i < 6; i++)
        $("#loan_amt0" + i).on("click", function() {updateAmount(i)})
    
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
    
    // set focus to first year: messes up codepen
    // $("#loan_year01").focus();
    // update loans array when exiting "year" input field (jquery)
    $("#loan_year01").blur( function() {
      updateLoansArray();
    });

    $("#loan_int01").blur(function() {updateInterest()});
    
  } // end: function loadDoc()
  
  
  function toComma(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function updateLoansArray() {
    // update the loans array
    loans[0].loan_year = parseInt($("#loan_year01").val()); // jquery
    // update all the years in the "year" column
    for(let i=2; i<6; i++) {
      loans[i-1].loan_year = loans[0].loan_year + i;
      $("#loan_year0"+ i ).val(loans[i-1].loan_year); // jquery
    }
  }

  function updateInterest() {
    loans[0].loan_int_rate = parseFloat($("#loan_int01").val());

    for(let i=2; i<6; i++) {
        loans[i-1].loan_year = loans[0].loan_year;
         $("#loan_int0"+ i).val(loans[0].loan_int_rate); // jquery
    }
  }

  function updateAmount(idx) {
    loans[idx - 1].loan_amount = parseFloat($("#loan_amt0" + idx).val());
    $("#loan_amt0" + idx).val(loans[idx - 1].loan_amount.toFixed(2));
  }

  function processForm() {
    let balance = 0;
    let loanTotal = 0;
    for(let i = 1; i < 6; i++) {
        loanTotal += loans[i-1].loan_amount;
        balance += loans[i-1].loan_amount;
        balance *= (1 + loans[i-1].loan_int_rate);
        $("#loan_bal0" + i).html("$" + toComma(balance.toFixed(2)));
    }
    $("#loan_int_accrued").html("$" + toComma((balance - loanTotal).toFixed(2)));
    
  }
