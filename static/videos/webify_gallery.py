import os
videos = os.listdir('stereo4d-gallery')
videos = [v for v in videos if '-2d.mp4' in v]
print(videos)
print(len(videos))
for i in range(len(videos)):
  if i % 2 == 1:
    continue
  vid1 = videos[i].split('-2d.mp4')[0]
  vid2 = videos[i+1].split('-2d.mp4')[0]
  print(f"""
<div class="item item-fullbody">
  <!-- {vid1} -->
  <div class="item videostack">
    <video class="video-shadow" autoplay muted loop playsinline>
      <source src="static/videos/stereo4d-gallery/{vid1}-2d.mp4" type="video/mp4">
    </video>
    <video class="video-main" autoplay muted loop playsinline>
      <source src="static/videos/stereo4d-gallery/{vid1}.mp4" type="video/mp4">
    </video>
  </div>
  <br>
  <!-- {vid2} -->
  <div class="item videostack">
    <video class="video-shadow" autoplay muted loop playsinline>
      <source src="static/videos/stereo4d-gallery/{vid2}-2d.mp4" type="video/mp4">
    </video>
    <video class="video-main" autoplay muted loop playsinline>
      <source src="static/videos/stereo4d-gallery/{vid2}.mp4" type="video/mp4">
    </video>
  </div>
</div>
""")

