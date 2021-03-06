const initSlider = ({
  rootElementSelector,
  displayElementSelector,
  minVal,
  maxVal,
  onChange,
}) => {
  const rootEl = document.querySelector(rootElementSelector);
  const container = rootEl.querySelector(".slider-container");
  const slider = rootEl.querySelector(".slider-bar");
  const handle = rootEl.querySelector(".slider-handle");
  const display = document.querySelector(displayElementSelector);

  const state = {
    isSliding: false,
    value: minVal,
  };

  const range = maxVal - minVal;

  const moveSlider = (e) => {
    if (!e) e = window.event;

    const mouseY = e.pageY ? e.pageY : 0;
    const containerTop = container.offsetTop;
    const nextHeight = mouseY - containerTop;
    const containerHeight = container.offsetHeight;

    let percentHeight = (nextHeight * 100) / containerHeight;
    if (percentHeight < 0) {
      percentHeight = 0;
    } else if (percentHeight > 100) {
      percentHeight = 100;
    }

    const y = 100 - percentHeight;
    const x = (y * range) / 100;

    const sliderValue = Math.round(x);
    state.value = sliderValue + minVal;

    onChange(state.value);

    display.textContent = state.value;
    slider.style.height = percentHeight + "%";
  };

  const addMovingListener = () => {
    state.isSliding = true;
    document.addEventListener("mousemove", moveSlider, false);
  };

  const removeMovingListener = () => {
    if (state.isSliding) {
      document.removeEventListener("mousemove", moveSlider, false);
    }
  };

  handle.addEventListener("mousedown", addMovingListener);
  handle.addEventListener("mouseup", removeMovingListener);
  slider.addEventListener("mouseup", removeMovingListener);
  slider.addEventListener("mousedown", moveSlider);
  container.addEventListener("mouseup", removeMovingListener);
  container.addEventListener("mousedown", moveSlider);
  document.addEventListener("mouseup", removeMovingListener);

  return state;
};
