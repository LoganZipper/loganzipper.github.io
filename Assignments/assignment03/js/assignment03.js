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