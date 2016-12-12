// Simple browser check if incompatible
var ua = navigator.userAgent.toLowerCase();
 if (ua.indexOf('safari')!=-1){
   if(ua.indexOf('chrome')  > -1){
   }else{
    window.location.href = "saf.html" // saf
   }
  }

// Initialize and declare global variables
var wrongsound = new Audio('wrong.mp3');
var c2;
var db2;
var d2;
var eb2;
var e2;
var f2;
var gb2;
var g2;
var ab2;
var a2;
var bb2;
var b2;
var c3;
var db3;
var d3;
var eb3;
var e3;
var f3;
var gb3;
var g3;
var ab3;
var a3;
var bb3;
var b3;
var c4;
var db4;
var d4;
var eb4;
var e4;
var f4;
var gb4;
var g4;
var ab4;
var a4;
var bb4;
var b4;
var c5;
var folderName = "acoustic_grand_piano-mp3";
var fileType = "mp3";

initialize(folderName, fileType);

/**
 * Method to change instrument from dropdown menu
 */
function changeInstrument(element) {
    switch(element.value) {
        case "piano":
            folderName = "acoustic_grand_piano-mp3";
            fileType = "mp3";
            break;
        case "guitar":
            folderName = "acousticGuitar-wav";
            fileType = "wav";
            break;
        case "synth":
            folderName = "moog-wav";
            fileType = "wav";
            break;
    }

    initialize(folderName, fileType);
}

// More initialization and declaration
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source = audioCtx.createMediaElementSource(c5);

var chordProgression;
var chordProgressionIndex = 0;

var notes = [c2,db2,d2,eb2,e2,f2,gb2,g2,ab2,a2,bb2,b2,c3,db3,d3,
    eb3,e3,f3,gb3,g3,ab3,a3,bb3,b3,c4,db4,d4,eb4,e4,f4,gb4,g4,
    ab4,a4,bb4,b4,c5];
var started = false;
var guessed = false;
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
    "Chigh": [c3,c4,e4,g4,c5],
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
    "Bm": [b2,b3,d4,gb4,b4],
    "Cmhigh": [c3,c4,eb4,g4,c5],
    "C7": [c2,c3,e3,g3,bb3,c4], // Seventh
    "C#7": [db2,db3,f3,ab3,b3,db4],
    "D7": [d2,d3,gb3,a3,c4,d4],
    "D#7": [eb2,eb3,g3,bb3,db4,eb4],
    "E7": [e2,e3,ab3,b3,d4,e4],
    "F7": [f2,f3,a3,c4,eb4,f4],
    "F#7": [gb2,gb3,bb3,db4,e4,gb4],
    "G7": [g2,g3,b3,d4,f4,g4],
    "G#7": [ab2,ab3,c4,eb4,gb4,ab4],
    "A7": [a2,a3,db4,e4,g4,a4],
    "A#7": [bb2,bb3,d4,f4,ab4,bb4],
    "B7": [b2,b3,eb4,gb4,a4,b4],
    "C7high": [c3,c4,e4,g4,bb4,c5],
    "CM7": [c2,c3,e3,g3,b3,c4], // Maj Seventh
    "C#M7": [db2,db3,f3,ab3,c4,db4],
    "DM7": [d2,d3,gb3,a3,db4,d4],
    "D#M7": [eb2,eb3,g3,bb3,d4,eb4],
    "EM7": [e2,e3,ab3,b3,eb4,e4],
    "FM7": [f2,f3,a3,c4,e4,f4],
    "F#M7": [gb2,gb3,bb3,db4,f4,gb4],
    "GM7": [g2,g3,b3,d4,gb4,g4],
    "G#M7": [ab2,ab3,c4,eb4,g4,ab4],
    "AM7": [a2,a3,db4,e4,g4,ab4],
    "A#M7": [bb2,bb3,d4,f4,a4,bb4],
    "BM7": [b2,b3,eb4,gb4,bb4,b4],
    "CM7high": [c3,c4,e4,g4,b4,c5],
    "Cm7": [c2,c3,eb3,g3,bb3,c4], // min Seventh
    "C#m7": [db2,db3,e3,ab3,b4,db4],
    "Dm7": [d2,d3,f3,a3,c4,d4],
    "D#m7": [eb2,eb3,gb3,bb3,db4,eb4],
    "Em7": [e2,e3,g3,b3,d4,e4],
    "Fm7": [f2,f3,ab3,c4,eb4,f4],
    "F#m7": [gb2,gb3,a3,db4,e4,gb4],
    "Gm7": [g2,g3,bb3,d4,f4,g4],
    "G#m7": [ab2,ab3,b3,eb4,gb4,ab4],
    "Am7": [a2,a3,c4,e4,g4,a4],
    "A#m7": [bb2,bb3,db4,f4,ab4,bb4],
    "Bm7": [b2,b3,d4,gb4,a4,b4],
    "Cm7high": [c3,c4,e4,g4,bb4,c5],
    "Caug": [c2,c3,e3,ab3,c4], // augmented
    "C#aug": [db2,db3,f3,a3,db4],
    "Daug": [d2,d3,gb3,bb3,d4],
    "D#aug": [eb2,eb3,g3,b3,eb4],
    "Eaug": [e2,e3,ab3,c4,e4],
    "Faug": [f2,f3,a3,db4,f4],
    "F#aug": [gb2,gb3,bb3,d4,gb4],
    "Gaug": [g2,g3,b3,eb4,g4],
    "G#aug": [ab2,ab3,c4,e4,ab4],
    "Aaug": [a2,a3,db4,f4,a4],
    "A#aug": [bb2,bb3,d4,gb4,bb4],
    "Baug": [b2,b3,eb4,g4,b4],
    "Caughigh": [c3,c4,e4,ab4,c5],
    "Cdim": [c2,c3,eb3,gb3,c4], // diminished
    "C#dim": [db2,db3,e3,g3,db4],
    "Ddim": [d2,d3,f3,ab3,d4],
    "D#dim": [eb2,eb3,gb3,a3,eb4],
    "Edim": [e2,e3,g3,bb3,e4],
    "Fdim": [f2,f3,ab3,b3,f4],
    "F#dim": [gb2,gb3,a3,c4,gb4],
    "Gdim": [g2,g3,bb3,db4,g4],
    "G#dim": [ab2,ab3,b3,d4,ab4],
    "Adim": [a2,a3,c4,eb4,a4],
    "A#dim": [bb2,bb3,db4,e4,bb4],
    "Bdim": [b2,b3,d4,f4,b4],
    "Cdimhigh": [c3,c4,eb4,gb4,c5]
};
var hardList = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B",
    "Cm","C#m","Dm","D#m","Em","Fm","F#m","Gm","G#m","Am","A#m","Bm",
    "C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7",
    "CM7","C#M7","DM7","D#M7","EM7","FM7","F#M7","GM7","G#M7","AM7","A#M7","BM7",
    "Cm7","C#m7","Dm7","D#m7","Em7","Fm7","F#m7","Gm7","G#m7","Am7","A#m7","Bm7",
    "Caug","C#aug","Daug","D#aug","Eaug","Faug","F#aug","Gaug","G#aug","Aaug","A#aug","Baug",
    "Cdim","C#dim","Ddim","D#dim","Edim","Fdim","F#dim","Gdim","G#dim","Adim","A#dim","Bdim"];
var easyList = ["C","F","G","Em","Am"];
var mediumList = ["C","D","E","F","G","A",
    "Cm","Dm","Em","Fm","Gm","Am",
    "C7","D7","E7","F7","G7","A7","B7"];
var chordList = easyList;

/**
 * Method to stop playing and to stop ear trainer
 */
function stop() {
    stopAllAudio();
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

/**
 * Begin ear trainer
 */
function start() {
    stopAllAudio();
    document.getElementById("start").style.color = "white";
    document.getElementById("stop").style.color = "black";
    diff = document.getElementById("difficulty").value;
    document.getElementById("diffDisplay").innerHTML = "Difficulty: " + diff;
    document.getElementById("diffDisplay").style.visibility = "visible";
    switch (diff) {
        case "Easy":
            chordList = easyList;
            break;
        case "Medium":
            chordList = mediumList;
            break;
        case "Hard":
            chordList = hardList;
            break;
    }
    updateScore();
    // Wait 0.5 sec then get next chord
    sleep(500).then(() => {
        getNewChord();
    });
    started = true;
}

/**
 * Replay chord
 */
function replay() {
    if (started) { play(ans); }
}

/**
 * Update score. correct, wrong and percentage
 */
function updateScore() {
    percentage = 100 * (correct / (correct + wrong));
    if (isNaN(percentage)) {
        percentage = 0;
    }
    document.getElementById("score").innerHTML =
        "Score: " + correct + "/" + (correct + wrong) + " - " + percentage.toFixed(0) + "%";
    document.getElementById("score").style.visibility = "visible";
}

/**
 * Fetch new chord based on difficulty
 */
function getNewChord() {
    if (started) {
        // Line below selects random
        var newChord = chordList[Math.floor(Math.random() * chordList.length)];
        while (newChord == ans) {
            newChord = chordList[Math.floor(Math.random() * chordList.length)];
        }
        ans = newChord;
        guessed = false;
        changeTrainerTitle("Guess!");
        play(ans);
    }
}

/**
 * Instead of method to play each note, a dictionary stores an array
 * of all the notes for each string. This function plays all of those
 */
function play(key) {
    stopAllAudio();
    for (var i = 0; i < chordDict[key].length; i++) {
        chordDict[key][i].play();
    }
}

/**
 * Deprecated, use play(key)
 */
function play6(n1,n2,n3,n4,n5,n6) {
    stopAllAudio();
    n1.play();
    n2.play();
    n3.play();
    n4.play();
    n5.play();
    n6.play();
}

/**
 * Deprecated, use play(key)
 */
function play5(n1,n2,n3,n4,n5) {
    stopAllAudio();
    n1.play();
    n2.play();
    n3.play();
    n4.play();
    n5.play();
}

/**
 * Stop all audio, called when a new chord is played
 */
function stopAllAudio() {
    for (var i = 0; i < notes.length; i++) {
        notes[i].pause();
        notes[i].currentTime = 0;
    }

    wrongsound.pause();
    wrongsound.currentTime = 0;
}

/**
 * Change volume based on slider and update visual
 */
function changeVol(n) {
    if (n < 0) {
        n = 0;
    } else if (n > 100) {
        n = 100;
    }
    for (var i = 0; i < notes.length; i++) {
        notes[i].volume = n / 100;
    }
    document.getElementById("volumeText").innerHTML = n + "%";
}

/**
 * Primary method to play a note and enter an answer
 */
function answer(guess) {

    // If ear trainer has started, else simply play the note
    if (started) {
        if (guessed) { return; } // If already guessed, do nothing (to prevent spam)
        guessed = true;

        if (guess == ans) {
            document.getElementById("ind").style.color = "green";
            document.getElementById("ind").innerHTML = "Correct!"
            correct++;
            play(guess);
        } else {
            document.getElementById("ind").style.color = "red"
            document.getElementById("ind").innerHTML = "Incorrect. That was " + ans;
            wrong++;
            stopAllAudio();
            wrongsound.play();
        }
        document.getElementById("ind").style.visibility = "visible";
        updateScore();

        // Wait 1.75 sec then stop audio
        changeTrainerTitle("Okay.");
        sleep(1750).then(() => {
            stopAllAudio();
            changeTrainerTitle("Get Ready!");
        });

        // Wait 2.5 sec then get next chord
        sleep(2500).then(() => {
            getNewChord();
        });
    } else {
        document.getElementById("ind").style.visibility = "hidden";
        play(guess);
    }
}
/**
 * Method to alter ear trainer title appriately for ear trainer
 */
function changeTrainerTitle(message) {
    //document.getElementById("trainerTitle").innerHTML = "Ear Trainer - " + message;
}

/**
 * Method to start chord progression
 */
function startChords() {
    chordProgression = [document.getElementById("firstChord").value,
            document.getElementById("secondChord").value,
            document.getElementById("thirdChord").value,
            document.getElementById("fourthChord").value];
    play(chordProgression[chordProgressionIndex]);
    if (chordProgressionIndex >= chordProgression.length - 1) {
        chordProgressionIndex = 0;
    } else {
        chordProgressionIndex++;
    }
    
    sleep(1750).then(() => {
        stopAllAudio();
        startChords();
    });
}

/**
 * Function to simulate syncronous wait time.
 *
 * see http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Initialize audio files based on selected instrument
 */
function initialize(fn, ft) {
    c2 = new Audio(fn + "/C2." + ft);
    db2 = new Audio(fn + "/Db2." + ft);
    d2 = new Audio(fn + "/D2." + ft);
    eb2 = new Audio(fn + "/Eb2." + ft);
    e2 = new Audio(fn + "/E2." + ft);
    f2 = new Audio(fn + "/F2." + ft);
    gb2 = new Audio(fn + "/Gb2." + ft);
    g2 = new Audio(fn + "/G2." + ft);
    ab2 = new Audio(fn + "/Ab2." + ft);
    a2 = new Audio(fn + "/A2." + ft);
    bb2 = new Audio(fn + "/Bb2." + ft);
    b2 = new Audio(fn + "/B2." + ft);
    c3 = new Audio(fn + "/C3." + ft);
    db3 = new Audio(fn + "/Db3." + ft);
    d3 = new Audio(fn + "/D3." + ft);
    eb3 = new Audio(fn + "/Eb3." + ft);
    e3 = new Audio(fn + "/E3." + ft);
    f3 = new Audio(fn + "/F3." + ft);
    gb3 = new Audio(fn + "/Gb3." + ft);
    g3 = new Audio(fn + "/G3." + ft);
    ab3 = new Audio(fn + "/Ab3." + ft);
    a3 = new Audio(fn + "/A3." + ft);
    bb3 = new Audio(fn + "/Bb3." + ft);
    b3 = new Audio(fn + "/B3." + ft);
    c4 = new Audio(fn + "/C4." + ft);
    db4 = new Audio(fn + "/Db4." + ft);
    d4 = new Audio(fn + "/D4." + ft);
    eb4 = new Audio(fn + "/Eb4." + ft);
    e4 = new Audio(fn + "/E4." + ft);
    f4 = new Audio(fn + "/F4." + ft);
    gb4 = new Audio(fn + "/Gb4." + ft);
    g4 = new Audio(fn + "/G4." + ft);
    ab4 = new Audio(fn + "/Ab4." + ft);
    a4 = new Audio(fn + "/A4." + ft);
    bb4 = new Audio(fn + "/Bb4." + ft);
    b4 = new Audio(fn + "/B4." + ft);
    c5 = new Audio(fn + "/C5." + ft);

    notes = [c2,db2,d2,eb2,e2,f2,gb2,g2,ab2,a2,bb2,b2,c3,db3,d3,
    eb3,e3,f3,gb3,g3,ab3,a3,bb3,b3,c4,db4,d4,eb4,e4,f4,gb4,g4,
    ab4,a4,bb4,b4,c5];
    chordDict = {
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
        "Chigh": [c3,c4,e4,g4,c5],
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
        "Bm": [b2,b3,d4,gb4,b4],
        "Cmhigh": [c3,c4,eb4,g4,c5],
        "C7": [c2,c3,e3,g3,bb3,c4], // Seventh
        "C#7": [db2,db3,f3,ab3,b3,db4],
        "D7": [d2,d3,gb3,a3,c4,d4],
        "D#7": [eb2,eb3,g3,bb3,db4,eb4],
        "E7": [e2,e3,ab3,b3,d4,e4],
        "F7": [f2,f3,a3,c4,eb4,f4],
        "F#7": [gb2,gb3,bb3,db4,e4,gb4],
        "G7": [g2,g3,b3,d4,f4,g4],
        "G#7": [ab2,ab3,c4,eb4,gb4,ab4],
        "A7": [a2,a3,db4,e4,g4,a4],
        "A#7": [bb2,bb3,d4,f4,ab4,bb4],
        "B7": [b2,b3,eb4,gb4,a4,b4],
        "C7high": [c3,c4,e4,g4,bb4,c5],
        "CM7": [c2,c3,e3,g3,b3,c4], // Maj Seventh
        "C#M7": [db2,db3,f3,ab3,c4,db4],
        "DM7": [d2,d3,gb3,a3,db4,d4],
        "D#M7": [eb2,eb3,g3,bb3,d4,eb4],
        "EM7": [e2,e3,ab3,b3,eb4,e4],
        "FM7": [f2,f3,a3,c4,e4,f4],
        "F#M7": [gb2,gb3,bb3,db4,f4,gb4],
        "GM7": [g2,g3,b3,d4,gb4,g4],
        "G#M7": [ab2,ab3,c4,eb4,g4,ab4],
        "AM7": [a2,a3,db4,e4,g4,ab4],
        "A#M7": [bb2,bb3,d4,f4,a4,bb4],
        "BM7": [b2,b3,eb4,gb4,bb4,b4],
        "CM7high": [c3,c4,e4,g4,b4,c5],
        "Cm7": [c2,c3,eb3,g3,bb3,c4], // min Seventh
        "C#m7": [db2,db3,e3,ab3,b4,db4],
        "Dm7": [d2,d3,f3,a3,c4,d4],
        "D#m7": [eb2,eb3,gb3,bb3,db4,eb4],
        "Em7": [e2,e3,g3,b3,d4,e4],
        "Fm7": [f2,f3,ab3,c4,eb4,f4],
        "F#m7": [gb2,gb3,a3,db4,e4,gb4],
        "Gm7": [g2,g3,bb3,d4,f4,g4],
        "G#m7": [ab2,ab3,b3,eb4,gb4,ab4],
        "Am7": [a2,a3,c4,e4,g4,a4],
        "A#m7": [bb2,bb3,db4,f4,ab4,bb4],
        "Bm7": [b2,b3,d4,gb4,a4,b4],
        "Cm7high": [c3,c4,e4,g4,bb4,c5],
        "Caug": [c2,c3,e3,ab3,c4], // augmented
        "C#aug": [db2,db3,f3,a3,db4],
        "Daug": [d2,d3,gb3,bb3,d4],
        "D#aug": [eb2,eb3,g3,b3,eb4],
        "Eaug": [e2,e3,ab3,c4,e4],
        "Faug": [f2,f3,a3,db4,f4],
        "F#aug": [gb2,gb3,bb3,d4,gb4],
        "Gaug": [g2,g3,b3,eb4,g4],
        "G#aug": [ab2,ab3,c4,e4,ab4],
        "Aaug": [a2,a3,db4,f4,a4],
        "A#aug": [bb2,bb3,d4,gb4,bb4],
        "Baug": [b2,b3,eb4,g4,b4],
        "Caughigh": [c3,c4,e4,ab4,c5],
        "Cdim": [c2,c3,eb3,gb3,c4], // diminished
        "C#dim": [db2,db3,e3,g3,db4],
        "Ddim": [d2,d3,f3,ab3,d4],
        "D#dim": [eb2,eb3,gb3,a3,eb4],
        "Edim": [e2,e3,g3,bb3,e4],
        "Fdim": [f2,f3,ab3,b3,f4],
        "F#dim": [gb2,gb3,a3,c4,gb4],
        "Gdim": [g2,g3,bb3,db4,g4],
        "G#dim": [ab2,ab3,b3,d4,ab4],
        "Adim": [a2,a3,c4,eb4,a4],
        "A#dim": [bb2,bb3,db4,e4,bb4],
        "Bdim": [b2,b3,d4,f4,b4],
        "Cdimhigh": [c3,c4,eb4,gb4,c5]
    };
    console.log(fn + "." + ft);
    console.log("dunzo");
}