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