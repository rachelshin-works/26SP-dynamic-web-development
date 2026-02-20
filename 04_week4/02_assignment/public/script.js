let data = null;
let currentLanguage = "en";

window.onload = function () {
  const slider = document.getElementById("myRange");
  const stepValue = document.getElementById("steps");
  const toggle = document.getElementById("languageToggle");
  const output = document.getElementById("output");

  this.fetch("../info.json")
    .then((res) => res.json())
    .then((json) => {
      data = json;
      updateOutput();
    });

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function () {
    updateOutput();
  };

  toggle.onchange = function () {
    currentLanguage = this.checked ? "kr" : "en";
    updateOutput();
  };

  function updateOutput() {
    const stepID = "step" + slider.value;
    const step = data.steps.find((s) => s.id === stepID);
    stepValue.innerHTML = "step" + slider.value;
    output.innerHTML = step ? step[currentLanguage].replace(/\n/g, "<br>") : "not found";
  }
};
