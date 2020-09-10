const state = new Proxy(
  {
    red: 0,
    green: 0,
    blue: 0,
  },
  {
    set(target, property, value) {
      target[property] = value;
      grayscaleProcess(target);
      return true;
    },
  }
);

const sliderConfigurations = [
  {
    name: "red",
    selector: "#slider-red",
  },
  { name: "green", selector: "#slider-green" },
  { name: "blue", selector: "#slider-blue" },
];

document.addEventListener("DOMContentLoaded", () => {
  sliderConfigurations.forEach((conf) => {
    initSlider({
      minVal: 0,
      maxVal: 100,
      rootElementSelector: conf.selector,
      displayElementSelector: `${conf.selector}-value`,
      onChange: (value) => {
        state[conf.name] = value;
      },
    });
  });
});
