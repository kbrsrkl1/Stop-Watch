const timerEl = document.getElementById('timer');
const startButtonEl = document.getElementById("start");
const stopButtonEl = document.getElementById("stop");
const resetButtonEl = document.getElementById("reset");


let startTime = 0 //Kronometrenin başladığı zamanı tutmak için bir değişken tanımlandı.
let elapsedTime = 0 //Kronometrenin başlangıcından itibaren geçen süreyi saklamak için bir değişken tanımlandı.
let timerInterval; //Zamanlayıcı fonksiyonunu (setInterval) saklamak için bir değişken tanımlanmış.


function startTimer(){ //Kronometreyi başlatan bir fonksiyon tanımlandı.
    startTime = Date.now() - elapsedTime //Eğer kronometre daha önce durdurulmuş ve tekrar başlatılıyorsa, geçen zamanı (elapsedTime) çıkararak doğru başlangıç zamanı bulunur.Bu sayede kronometre kaldığı yerden devam eder
    timerInterval = setInterval(() => {  //setInterval():Belirli bir süre boyunca tekrar eden bir işlemi çalıştırır.Burada her 10 milisaniyede bir fonksiyon çağrılır.
        elapsedTime = Date.now() - startTime //Şu anki zamanı (Date.now()) başlangıç zamanından (startTime) çıkarır ve geçen süreyi (elapsedTime) hesaplar.
        timerEl.textContent = formatTime(elapsedTime); //timerEl.textContent = elapsedTime;:elapsedTime değerini bir HTML elementine (timerEl) yazdırır.timerEl: DOM elementine referans olduğu anlaşılan bir değişken.
    },10) //10 (milisaniye): Güncelleme sıklığını belirler.Geçen süre hesaplanır ve ekrana yazdırılır.
    startButtonEl.disabled = true;
    stopButtonEl.disabled = false;
    resetButtonEl.disabled = false;
}


function formatTime(elapsedTime) {
    const miliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime % ( 1000 * 60)) / 1000);
    const minutes =  Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)));
    return (
    (hours ? (hours > 9 ? hours : "0" + hours) : "00")
    + "." + 
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
    + "." + 
    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") 
    + "." +
    (miliseconds > 9 ? miliseconds : "0" + miliseconds)
    );
}




function stopTimer(){
    clearInterval(timerInterval);
    stopButtonEl.disabled = true;
    startButtonEl.disabled = false;
    resetButtonEl.disabled = false;
}

function resetTimer(){
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerEl.textContent = "00:00:00:00"
    resetButtonEl.disabled = true;
    startButtonEl.disabled = false;
    stopButtonEl.disabled = false;
}


startButtonEl.addEventListener("click", startTimer)
stopButtonEl.addEventListener("click", stopTimer)
resetButtonEl.addEventListener("click", resetTimer)


