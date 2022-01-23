const clock = document.querySelector("#clock");
const nowDate = document.querySelector("#now_date");


function getClock () {
    const date = new Date();
    var hour = String(date.getHours()).padStart(2,"0");
    var minutes = String(date.getMinutes()).padStart(2,"0");
    var second = String(date.getSeconds()).padStart(2,"0");

    clock.innerText = `${hour}:${minutes}:${second}`;
    
}

function getDate() {
    const date = new Date();
    var year = String(date.getFullYear());
    var month = String(date.getMonth() + 1);
    var day = String(date.getDate());

    nowDate.innerText = `${year}.${month}.${day}`;
}

getClock();
getDate();
setInterval(getClock, 1000);



