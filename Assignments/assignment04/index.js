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

    
}