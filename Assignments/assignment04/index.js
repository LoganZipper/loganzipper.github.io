document
  .getElementById("loadjson")
  .addEventListener("click", loadJson);
document
  .getElementById("loadpriorcountry")
  .addEventListener("click", loadPriorCountry);
document
  .getElementById("loadnextcountry")
  .addEventListener("click", loadNextCountry);

let country = 0
let json
function loadJson() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange 
    = function() {
        if (this.readyState == 4 && this.status == 200) {
          json = JSON.parse(this.responseText);
        }
      };
  xhttp.open("GET", "https://api.covid19api.com/summary", true);
  xhttp.send();
}

function loadPriorCountry () {
  country--
  if (country < 0) 
    country = 0
  document.getElementById("coviddata").innerHTML 
            = json.Countries[country].Country
            + ", " 
            + json.Countries[country].TotalDeaths
}
function loadNextCountry () {
  country++
if (country > json.Countries.length - 1) 
    country = json.Countries.length - 1
document.getElementById("ID").value 
            = json.Countries[country].ID
document.getElementById("Country").value 
            = json.Countries[country].Country
document.getElementById("CountryCode").value 
            = json.Countries[country].CountryCode
document.getElementById("Slug").value 
            = json.Countries[country].Slug
document.getElementById("NewConfirmed").value 
            = json.Countries[country].NewConfirmed
document.getElementById("TotalConfirmed").value 
            = json.Countries[country].TotalConfirmed
document.getElementById("NewDeaths").value 
            = json.Countries[country].NewDeaths
document.getElementById("TotalDeaths").value 
            = json.Countries[country].TotalDeaths
document.getElementById("NewRecovered").value 
            = json.Countries[country].NewRecovered
document.getElementById("TotalRecovered").value 
            = json.Countries[country].TotalRecovered
document.getElementById("Date").value 
            = json.Countries[country].Date
}

let arr1 = []
for(let i = 0;i<10;i++)
    arr1.push(Math.floor((Math.random() * 900) + 100))

let arr2 = []
for(let i = 0;i<10;i++)
    arr2.push(Math.floor((Math.random() * 400) - 200))

let arr3 = [
    {fname: "Jane", lname: "Doe", title: "Dr.", suffix: "IV", age: 22}, 
    {fname: "John", lname: "Doe", title: "Mr.", suffix: "Jr.", age: 18}, 
    {fname: "Sally", lname: "Jenkins", title: "Mrs.", suffix: "", age: 20}, 
    {fname: "Gino", lname: "Vitteri", title: "", suffix: "", age: 16}, 
    {fname: "Lisa", lname: "Simpson", title: "", suffix: "", age: 12}, 
]

let years = [-100, 0, 100, 1900, 1904, 2000];
let r = [1, 4, 5, 7]
let distances = [2, 4, 6, 8, 10]


let pythagorean = (a, b) => Math.sqrt(a**2 + b**2)

let quadratic = (a, b, c) => {
    if(b - 4*a*c < 0)
        return "No Zeroes"

    else {
        let zero1 = (b + Math.sqrt(b - 4*a*c < 0))/(2*a)
        let zero2 = (b - Math.sqrt(b - 4*a*c < 0))/(2*a)
        if(zero1 == zero2)
            return "One Zero at x = " + zero1
        else
            return "Two Zeroes at x = " + zero1 + " and x = " + zero2
    }
}

let sphereVolume = (r) => Math.PI * r**3

let FtoK = (f) => (f - 32) * 5/9 + 273.15

let arcTan = (x) => Math.atan(Math.PI + x)

let numPlusSquare = (n) => n + n*n

let isLeapYear = (year) => {
    let february = new Date(year, 2)
    if(february.getDay > 28)
        return true
    else return false
}    

let simplifiedTimeFallen = (d) => sqrt(d)/16

console.log(
    years.filter(e => {isLeapYear(e)})
)