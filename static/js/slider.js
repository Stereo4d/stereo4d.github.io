// const slider = document.querySelector(".image-comparison .slider");
// const beforeImage = document.querySelector(".image-comparison .before-image");
// const sliderLine = document.querySelector(".image-comparison .slider-line");
// const sliderIcon = document.querySelector(".image-comparison .slider-icon");

// slider.addEventListener("input", (e) => {
//   let sliderValue = e.target.value + "%";

//   beforeImage.style.width = sliderValue;
//   sliderLine.style.left = sliderValue;
//   sliderIcon.style.left = sliderValue;
// });

const slider = document.querySelector(".image-comparison .slider");
const afterImage = document.querySelector(".image-comparison .after-image");
const sliderLine = document.querySelector(".image-comparison .slider-line");
const sliderIcon = document.querySelector(".image-comparison .slider-icon");

// Listen for slider input changes
slider.addEventListener("input", (e) => {
  const sliderValue = e.target.value + "%";

  // Dynamically adjust the clip-path of the after-image
  afterImage.style.clipPath = `inset(0 0 0 ${e.target.value}%)`;

  // Update the position of the slider line and icon
  sliderLine.style.left = sliderValue;
  sliderIcon.style.left = sliderValue;
});