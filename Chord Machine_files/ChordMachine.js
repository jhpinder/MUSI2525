var c2 = new Audio('acoustic_grand_piano-mp3/C2.mp3');
var db2 = new Audio('acoustic_grand_piano-mp3/Db2.mp3');
var d2 = new Audio('acoustic_grand_piano-mp3/D2.mp3');
var eb2 = new Audio('acoustic_grand_piano-mp3/Eb2.mp3');
var e2 = new Audio('acoustic_grand_piano-mp3/E2.mp3');
var f2 = new Audio('acoustic_grand_piano-mp3/F2.mp3');
var gb2 = new Audio('acoustic_grand_piano-mp3/Gb2.mp3');
var g2 = new Audio('acoustic_grand_piano-mp3/G2.mp3');
var ab2 = new Audio('acoustic_grand_piano-mp3/Ab2.mp3');
var a2 = new Audio('acoustic_grand_piano-mp3/A2.mp3');
var bb2 = new Audio('acoustic_grand_piano-mp3/Bb2.mp3');
var b2 = new Audio('acoustic_grand_piano-mp3/B2.mp3');

var c3 = new Audio('acoustic_grand_piano-mp3/C3.mp3');
var db3 = new Audio('acoustic_grand_piano-mp3/Db3.mp3');
var d3 = new Audio('acoustic_grand_piano-mp3/D3.mp3');
var eb3 = new Audio('acoustic_grand_piano-mp3/Eb3.mp3');
var e3 = new Audio('acoustic_grand_piano-mp3/E3.mp3');
var f3 = new Audio('acoustic_grand_piano-mp3/F3.mp3');
var gb3 = new Audio('acoustic_grand_piano-mp3/Gb3.mp3');
var g3 = new Audio('acoustic_grand_piano-mp3/G3.mp3');
var ab3 = new Audio('acoustic_grand_piano-mp3/Ab3.mp3');
var a3 = new Audio('acoustic_grand_piano-mp3/A3.mp3');
var bb3 = new Audio('acoustic_grand_piano-mp3/Bb3.mp3');
var b3 = new Audio('acoustic_grand_piano-mp3/B3.mp3');

var c4 = new Audio('acoustic_grand_piano-mp3/C4.mp3');
var db4 = new Audio('acoustic_grand_piano-mp3/Db4.mp3');
var d4 = new Audio('acoustic_grand_piano-mp3/D4.mp3');
var eb4 = new Audio('acoustic_grand_piano-mp3/Eb4.mp3');
var e4 = new Audio('acoustic_grand_piano-mp3/E4.mp3');
var f4 = new Audio('acoustic_grand_piano-mp3/F4.mp3');
var gb4 = new Audio('acoustic_grand_piano-mp3/Gb4.mp3');
var g4 = new Audio('acoustic_grand_piano-mp3/G4.mp3');
var ab4 = new Audio('acoustic_grand_piano-mp3/Ab4.mp3');
var a4 = new Audio('acoustic_grand_piano-mp3/A4.mp3');
var bb4 = new Audio('acoustic_grand_piano-mp3/Bb4.mp3');
var b4 = new Audio('acoustic_grand_piano-mp3/B4.mp3');

var c5 = new Audio('acoustic_grand_piano-mp3/C5.mp3');

var notes = [c2,db2,d2,eb2,e2,f2,gb2,g2,ab2,a2,bb2,b2,c3,db3,d3,
    eb3,e3,f3,gb3,g3,ab3,a3,bb3,b3,c4,db4,d4,eb4,e4,f4,gb4,g4,
    ab4,a4,bb4,b4,c5];

var started = false;
var ans = "C";
var diff = "Easy";
var correct = 0;
var wrong = 0;
var percentage = 0;

var chordDict = {
    "C": [c2,c3,e3,g3,c4], // Major
    "C#": [db2,db3,f3,ab3,db4],
    "D": [d2,d3,gb3,a3,d4],
    "D#": [eb2,eb3,g3,bb3,eb4],
    "E": [e2,e3,ab3,b3,e4],
    "F": [f2,f3,a3,c4,f4],
    "F#": [gb2,gb3,bb3,db4,gb4],
    "G": [g2,g3,b3,d4,g4],
    "G#": [ab2,ab3,c4,eb4,ab4],
    "A": [a2,a3,db4,e4,a4],
    "A#": [bb2,bb3,d4,f4,bb4],
    "B": [b2,b3,eb4,gb4,b4],
    "Cm": [c2,c3,eb3,g3,c4], // Minor
    "C#m": [db2,db3,e3,ab3,db4],
    "Dm": [d2,d3,f3,a3,d4],
    "D#m": [eb2,eb3,gb3,bb3,eb4],
    "Em": [e2,e3,g3,b3,e4],
    "Fm": [f2,f3,ab3,c4,f4],
    "F#m": [gb2,gb3,a3,db4,gb4],
    "Gm": [g2,g3,bb3,d4,g4],
    "G#m": [ab2,ab3,b4,eb4,ab4],
    "Am": [a2,a3,c4,e4,a4],
    "A#m": [bb2,bb3,db4,f4,bb4],
    "Bm": [b2,b3,d4,gb4,b4]
};

var chordList = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B",
    "Cm","C#m","Dm","D#m","Em","Fm","F#m","Gm","G#m","Am","A#m","Bm"];

function stop() {
    document.getElementById("start").style.color = "black";
    document.getElementById("stop").style.color = "white";
    document.getElementById("ind").style.visibility = "hidden";
    document.getElementById("diffDisplay").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("trainerTitle").innerHTML = "Ear Trainer";
    correct = 0;
    wrong = 0;
    started = false;
}
function start() {
    document.getElementById("start").style.color = "white";
    document.getElementById("stop").style.color = "black";

    diff = document.getElementById("difficulty").value;
    document.getElementById("diffDisplay").innerHTML = "Difficulty: " + diff;
    document.getElementById("diffDisplay").style.visibility = "visible";

    //started = true;
    updateScore();
    getNewChord();
    started = true;
}

function updateScore() {
    percentage = 100 * (correct / (correct + wrong));

    if (isNaN(percentage)) { 
        percentage = 0; 
    }

    document.getElementById("score").innerHTML = 
        "Score: " + correct + "/" + (correct + wrong) + " - " + percentage.toFixed(0) + "%";
    document.getElementById("score").style.visibility = "visible";
}

function getNewChord() {
    // Line below selects random- perhaps have different arrays
    // for different difficulties?
    var newChord = chordList[Math.floor(Math.random() * chordList.length)];
    ans = newChord;
    document.getElementById("trainerTitle").innerHTML = "Ear Trainer - " + newChord;
    //play(newChord);
}

/**
 * Instead of method to play each note, a dictionary stores an array
 * of all the notes for each string. This function plays all of those
 *
 * CURRENT DOESNT WORK! (my audio is broken so i cant really test this)
 */
function play(key) {
    for (var i = 0; i < dict[key].length; i++) {
        dict[key][i].play();
    }
}

function play6(n1,n2,n3,n4,n5,n6) {
    stopAllAudio();
    n1.play();
    n2.play();
    n3.play();
    n4.play();
    n5.play();
    n6.play();
}
function play5(n1,n2,n3,n4,n5) {
    stopAllAudio();
    n1.play();
    n2.play();
    n3.play();
    n4.play();
    n5.play();
}
function stopAllAudio() {
    for (var i = 0; i < notes.length; i++) {
        notes[i].pause();
        notes[i].currentTime = 0;
    }
}

function changeVol(n) {
    if (n < 0) {
        n = 0;
    } else if (n > 100) {
        n = 100;
    }
    for (var i = 0; i < notes.length; i++) {
        notes[i].volume = n / 100;
    }
}

function answer(guess) {
    if (started) {
        if (guess == ans) {
            document.getElementById("ind").style.color = "green";
            document.getElementById("ind").innerHTML = "Correct!"
            correct++;
        } else {
            document.getElementById("ind").style.color = "red"
            document.getElementById("ind").innerHTML = "Incorrect."
            wrong++;
        }
        document.getElementById("ind").style.visibility = "visible";

        updateScore();
        getNewChord();
    } else {
        document.getElementById("ind").style.visibility = "hidden";
    }
}