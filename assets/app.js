let freqSlider = document.getElementById("freq-input-slider");
let freqValue = document.getElementById("freq-value");
let freqPlayToggle = document.getElementById("freq-play-toggle");
let wavetypeChecked = document.querySelectorAll('input[name="wave"]');
let wavetypeValue;
let waveType = "sine";
freqValue.innerHTML = freqSlider.value;

let noisePlayToggle = document.getElementById("noise-play-toggle");
let noisetypeChecked = document.querySelectorAll('input[name="noise"]');
let noisetypeValue;
let noiseType = "pink";

const vol = new Tone.Volume(-12);
const gainNode = new Tone.Gain(0);
const signal = new Tone.Signal(1);
const noise = new Tone.Noise(noiseType)
  .chain(gainNode, signal, vol)
  .toDestination();
const frequencyOfOscillator = new Tone.Oscillator(freqSlider.value, waveType)
  .chain(gainNode, signal, vol)
  .toDestination();

freqPlayToggle.addEventListener("click", function () {
  if (freqPlayToggle.innerText === "PLAY") {
    startTone();
  } else {
    stopTone();
  }
});

function startTone() {
  frequencyOfOscillator.start();
  signal.setValueAtTime(0, 0.01);
  signal.linearRampToValueAtTime(1, 0.01);
  console.log("Oscillator started");
  freqPlayToggle.innerHTML = "STOP";
}

function stopTone() {
  frequencyOfOscillator.stop();
  signal.setValueAtTime(1, 0.01);
  signal.linearRampToValueAtTime(0, 0.01);
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

noisePlayToggle.addEventListener("click", function () {
  if (noisePlayToggle.innerText === "PLAY") {
    startNoise();
  } else {
    stopNoise();
  }
});

function startNoise() {
  noise.start();
  console.log("Noise started");
  noisePlayToggle.innerHTML = "STOP";
}

function stopNoise() {
  noise.stop();
  console.log("Noise stopped");
  noisePlayToggle.innerHTML = "PLAY";
}

noisetypeChecked.forEach(function (noisetypeValue) {
  noisetypeValue.oninput = function () {
    noiseType = noisetypeValue.value;
    console.log("Noisetype: ", noiseType);
    console.log("Noisetype value: ", noisetypeValue.value);
    updateNoisetype();
  };
});

let updateNoisetype = function () {
  console.log("Noisetype updated to:", noiseType);
  noise.type = noiseType;
};
