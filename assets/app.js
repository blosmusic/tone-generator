let freqSlider = document.getElementById("freq-input-slider");
let freqValue = document.getElementById("freq-value");
let freqPlayToggle = document.getElementById("freq-play-toggle");
let wavetypeChecked = document.querySelectorAll('input[name="wave"]');
let wavetypeValue;
let waveType = "sine";
freqValue.innerHTML = freqSlider.value;

let frequencyOfOscillator = new Tone.Oscillator(
  freqSlider.value,
  waveType);

freqPlayToggle.addEventListener("click", function () {
  if (freqPlayToggle.innerText === "PLAY") {
    startTone();
  } else {
    stopTone();
  }
});

function startTone() {
  frequencyOfOscillator.toDestination().start();
  console.log("Oscillator started");
  freqPlayToggle.innerHTML = "STOP";
}

function stopTone() {
  frequencyOfOscillator.stop();
  console.log("Oscillator stopped");
  freqPlayToggle.innerHTML = "PLAY";
}

// get oscillator value
freqSlider.oninput = function () {
  freqValue.innerHTML = this.value;
  console.log("Slider value: ", freqValue.innerHTML, "Hz");
  updateOscillator();
};

let updateOscillator = function () {
  freqValue.innerHTML = freqSlider.value;
  console.log("Oscillator value: ", freqSlider.value, "Hz");
  frequencyOfOscillator.frequency.value = freqSlider.value;
};

// get wavetype value
wavetypeChecked.forEach(function (wavetypeValue) {
  wavetypeValue.oninput = function () {
    waveType = wavetypeValue.value;
    console.log("Wavetype: ", waveType);
    console.log("Wavetype value: ", wavetypeValue.value);
    updateWavetype();
  };
});

let updateWavetype = function () {
  console.log("Wavetype updated to:", waveType);
  frequencyOfOscillator.type = waveType;
};
