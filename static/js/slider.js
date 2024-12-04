const sliderContainer = document.querySelector(".image-comparison");
const slider = document.querySelector(".image-comparison .slider");
const afterImage = document.querySelector(".image-comparison .after-image");
const beforeImage = document.querySelector(".image-comparison .before-image");
const sliderLine = document.querySelector(".image-comparison .slider-line");
const sliderIcon = document.querySelector(".image-comparison .slider-icon");



// // Function to update slider elements
function updateSlider(value) {
  const sliderValue = value + "%";

  // Dynamically adjust the clip-path of the after-image
  afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;

  // Update the position of the slider line and icon
  sliderLine.style.left = sliderValue;
  sliderIcon.style.left = sliderValue;
}

// Initialize the slider on page load
document.addEventListener("DOMContentLoaded", () => {
  updateSlider(slider.value); // Set positions based on the current slider value
});

// Function to update the slider position based on mouse hover
function updateSliderHover(event) {
  const rect = sliderContainer.getBoundingClientRect(); // Get the bounding box of the container
  const mouseX = event.clientX - rect.left; // Calculate the mouse X position relative to the container
  const percentage = Math.max(0, Math.min(100, (mouseX / rect.width) * 100)); // Ensure value is between 0 and 100
  updateSlider(percentage)
}

// Attach the mousemove event listener to the container
sliderContainer.addEventListener("mousemove", updateSliderHover);

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