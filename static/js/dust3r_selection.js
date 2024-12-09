
compareDiv = document.querySelector("#dynadust3r_result")
activeScene_cameratime = "cow"

const methodPills_cameratime = compareDiv.querySelectorAll('.method-pill');
const scenePills_cameratime = compareDiv.querySelectorAll(".scene-pill")
const showVideo_cameratime = compareDiv.querySelector('#dynadust3r_prediction')
const showGif_cameratime = compareDiv.querySelector('#dynadust3r_input')

for (scenePill of scenePills_cameratime) {
    scenePill.addEventListener('click', function () {
        activeScene_cameratime = this.getAttribute('data-value');
        updateDisplayCameraTime();
    });
}

function updateDisplayCameraTime() {
    for (scenePill of scenePills_cameratime) {
        if (scenePill.getAttribute('data-value') == activeScene_cameratime) {
            scenePill.classList.add('active');
        } else {
            scenePill.classList.remove('active')
        }
    }
    showVideo_cameratime.src = `static/videos/dynadust3r/${activeScene_cameratime}/${activeScene_cameratime}_fixed_horizon-fix.mp4`
    showVideo_cameratime.playbackRate = 2.0;
    showGif_cameratime.src = `static/videos/dynadust3r/${activeScene_cameratime}/input.gif`
}
// Update initial display
updateDisplayCameraTime()