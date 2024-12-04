// const slider = document.querySelector(".image-comparison .slider");
// const afterImage = document.querySelector(".image-comparison .after-image");
// const sliderLine = document.querySelector(".image-comparison .slider-line");
// const sliderIcon = document.querySelector(".image-comparison .slider-icon");

// // Listen for slider input changes
// slider.addEventListener("input", (e) => {
//   const sliderValue = e.target.value + "%";

//   // Dynamically adjust the clip-path of the after-image
//   afterImage.style.clipPath = `inset(0 0 0 ${e.target.value}%)`;

//   // Update the position of the slider line and icon
//   sliderLine.style.left = sliderValue;
//   sliderIcon.style.left = sliderValue;
// });
const slider = document.querySelector(".image-comparison .slider");
const afterImage = document.querySelector(".image-comparison .after-image");
const sliderLine = document.querySelector(".image-comparison .slider-line");
const sliderIcon = document.querySelector(".image-comparison .slider-icon");


// Function to update slider elements
function updateSlider(value) {
  const sliderValue = value + "%";

  // Dynamically adjust the clip-path of the after-image
  afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;

  // Update the position of the slider line and icon
  sliderLine.style.left = sliderValue;
  sliderIcon.style.left = sliderValue;
}

// Listen for slider input changes
slider.addEventListener("input", (e) => {
  updateSlider(e.target.value);
});

// Initialize the slider on page load
document.addEventListener("DOMContentLoaded", () => {
  updateSlider(slider.value); // Set positions based on the current slider value
});
// Function to check if all videos are ready to play
function videoLoaded() {
  videosToLoad--;

  if (videosToLoad === 0) {
    // Set all videos to the same start time
    const startTime = Math.min(...Array.from(videos).map(video => video.currentTime));
    videos.forEach(video => (video.currentTime = startTime));

    // Play all videos
    videos.forEach(video => video.play());
  }
}

const videos = document.querySelectorAll(".syncstart");
let videosToLoad = videos.length; // Number of videos to wait for

// Function to synchronize playback
function syncVideos() {
  const currentTime = videos[0].currentTime;

  videos.forEach(video => {
    // Adjust time if videos drift
    if (Math.abs(video.currentTime - currentTime) > 0.1) {
      video.currentTime = currentTime;
    }

    // Synchronize playback rates
    video.playbackRate = videos[0].playbackRate;
  });
}

// Attach event listeners to ensure all videos are ready
videos.forEach(video => {
  video.addEventListener("canplaythrough", videoLoaded, { once: true });
  video.addEventListener("timeupdate", syncVideos);
});

// Optional: Pause all videos when one is paused
videos.forEach(video => {
  video.addEventListener("pause", () => {
    videos.forEach(v => v.pause());
  });
});