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
