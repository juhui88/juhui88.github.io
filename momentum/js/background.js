const colors = [
    "#f7b4be", 
    "#f7b4be", 
    "#f6a88a", 
    "#b2dbba", 
    "#c3e2df", 
    "#d3afd5"
];

const chosenColor1 = colors[Math.floor(Math.random() * colors.length)];
var chosenColor2 = colors[Math.floor(Math.random() * colors.length)];

while (chosenColor2 === chosenColor1) {
    chosenColor2 = colors[Math.floor(Math.random() * colors.length)];
}
document.body.style.background = `linear-gradient(${chosenColor1}, ${chosenColor2})`;

loginForm.style.borderColor = chosenColor1;

