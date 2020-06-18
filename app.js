// création de l'environement du chrono dans un article
var main = document.querySelector('main');
var cadreChrono = document.getElementById('cadreChrono');
var display = document.createElement('section');
var partieBtn = document.createElement('section');
var partieBtnUn = document.getElementById('partieBtnUn')
var partieBtnDeux = document.getElementById('partieBtnDeux')
var flashText = document.getElementById('flashText')

cadreChrono.appendChild(display);
display.id = "display";
cadreChrono.appendChild(partieBtn);
partieBtn.id = "partieBtn";
partieBtn.appendChild(partieBtnUn)
partieBtnUn.id = "partieBtnUn"
partieBtn.appendChild(partieBtnDeux)
partieBtnDeux.id = "partieBtnDeux"

// récupération des données du formulaire
var tempsActif;
var TempsRepos;
var temps;
var repos;
var chrono;



// creer un bouton remise à zeo du formulaire
var refresh = document.createElement('button')
refresh.textContent = "Rafraichir"

// Quand on clique sur le bouton validation du formulaire
var validation = document.getElementById('validation')
validation.addEventListener('click', function () {
    tempsActif = document.form.inputActif.value;
    tempsRepos = document.form.inputRepos.value;
    if (tempsActif || tempsRepos) {
        repos = tempsRepos;
        temps = tempsActif;
        chrono = temps;
        display.textContent = chrono;
        // main.style.backgroundColor = "red"
        partieBtnDeux.appendChild(btnStart)
        partieBtnUn.style.visibility = "hidden"
        partieBtnDeux.style.visibility = "visible"
    } else {
        flashText.textContent = "Veuillez remplir au moins un des deux champs"
        flashText.style.backgroundColor = 'blue';
        flashText.style.color = 'white';
        setTimeout(function () {
            flashText.style.textAlign = "center";
            flashText.textContent = "";
            flashText.style.backgroundColor = 'white';
            flashText.style.color = 'black';
        }, 3000)

    }
})

// refresh.addEventListener('click', function(){
//     partieBtnUn.replaceChild(validation, refresh)
//     clearInterval(timer)
//     display.textContent = 'Timer'
//     display.backgroundColor='#11ffee00;'
// })


// création du chrono
var vitesseChrono = 1000;
// Audio des 2 BIP
var prevention = new Audio()
prevention.src = "Audio/prevention.mp3"
var changement = new Audio()
changement.src = "Audio/changement.mp3"
display.textContent = chrono;

// bouton image lecture/pause/stop
var btnStart = new Image(75, 75)
btnStart.src = "images/start.png"
var btnPause = new Image(75, 75)
btnPause.src = "images/pause.png"


//  création bouton start/pause ,stop, reinitialiser
var btnStart = document.createElement('button');
btnStart.textContent = "Start";
btnStart.classList = "btnAction"
var btnPause = document.createElement('button');
btnPause.textContent = "Pause";
btnPause.classList = "btnAction"
// partieBtnDeux.appendChild(btnStart);



// quand on clique sur "Start", "Start" et remplacer par "Stop" 
var btnAct = 0;
var mode = 1;
btnStart.addEventListener('click', btnStartAct)
function btnStartAct() {
    // partieBtnUn.removeChild(validation)
    if (mode == 1) {
        main.style.backgroundColor = "green"
    } else if (mode == 2) {
        main.style.backgroundColor = "blue"
    }

    function chronoTime() {
        if (mode == 1) {
            chrono--
            display.textContent = chrono;
            // quand j'arrive à 0 le chrono ce met en mode repos "bleu" {mode ="2"}
            switch (chrono) {
                case 3: prevention.play()

                    break;
                case 2: prevention.play()

                    break;
                case 1: prevention.play()

                    break;
                case 0:
                    prevention.pause()
                    prevention.currentTime = 0
                    changement.play();

                    break;
                case -1:
                    mode = 2;
                    chrono = repos;
                    display.textContent = chrono;
                    main.style.backgroundColor = "blue";
                    break;
                default:
                    break;
            }
        } else if (mode == 2) {
            chrono--
            display.textContent = chrono;
            // quand j'arrive à 0 le chrono ce met en mode action "vert" {mode ="1"}
            switch (chrono) {
                case 3: prevention.play();

                    break;
                case 2: prevention.play()

                    break;
                case 1: prevention.play()

                    break;
                case 0:
                    prevention.pause()
                    prevention.currentTime = 0
                    changement.play();

                    break;
                case -1:
                    mode = 1;
                    chrono = temps;
                    display.textContent = chrono;
                    main.style.backgroundColor = "green";
                    break;
                default:
                    break;
            }
        }
    }
    timer = setInterval(chronoTime, vitesseChrono)

    partieBtnDeux.replaceChild(btnPause, btnStart);
    if (btnAct === 0) {
        btnAct = 2;
    } else if (btnAct == 1) {
        btnAct = 2;
        partieBtnDeux.removeChild(btnStop);
    }
    cadreChrono.style.border = "none"
}



// var btnStop = new Image(75, 75)
// btnStop.src ="images/stop.png"
var btnStop = document.createElement('button');
btnStop.textContent = "Stop";
btnStop.classList = "btnAction"

// quand on clique sur "Stop", "Stop" et remplacer par "Start"
btnPause.addEventListener('click', btnPauseAct)
function btnPauseAct() {
    partieBtnUn.appendChild(validation)
    if (prevention.play() || changement.play()) {
        prevention.pause()
        prevention.currentTime = 0;
        changement.pause()
        changement.currentTime = 0;
    }
    if (btnAct == 2) {
        btnAct = 1;
        partieBtnDeux.replaceChild(btnStart, btnPause);
        partieBtnDeux.appendChild(btnStop);
    }
    main.style.backgroundColor = "red";
    clearInterval(timer);
}

// quand j'appuie sur "reinitialiser" "btnStop" disparait, "chrono" reviens à 30 et "btnAct" à 0 
btnStop.addEventListener('click', btnStopAct)
function btnStopAct() {
    partieBtnUn.style.visibility = "visible"
    partieBtnDeux.style.visibility = "hidden"
    document.form.inputActif.value = '';
    document.form.inputRepos.value = '';
    partieBtnDeux.removeChild(btnStop);
    btnAct = 0;
    mode = 1;
    chrono = ""
    display.textContent = "Timer";
    main.style.backgroundColor = "white"
    cadreChrono.style.border = "solid purple"
}


display.textContent = "Timer"