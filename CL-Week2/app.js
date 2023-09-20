console.log("hello");

//steps
// 1. identify and select the button
let button;
let bgColours = ["#FFFFFF", "#000000"];
let choice = 1;
button = document.getElementById('button');
console.log(button);

// 2. listen to event click on the button
button.addEventListener("click", changeColor);
button.addEventListener("click", imageAppear);

// 3. define function
function changeColor(){
    console.log("change");
    document.body.style.background = bgColours[choice];
    choice = (choice+1)%2;
}

function imageAppear(){
    document.getElementById("image1").style.display="block";
    document.getElementById("button").style.display="none";
}