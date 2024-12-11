import mediapy as media
import numpy as np
import os
import os.path as osp
import cv2


class VideoProcessor:
  def __init__(self, video_path):
    self.video_path = video_path

  def retrieve_frame_cv2(self, timestamps):
    """Retrieve frames from video at specified timestamps."""
    vidcap = cv2.VideoCapture(self.video_path)
    video = []
    for timestamp in timestamps:
      # Set video position to the given timestamp
      vidcap.set(cv2.CAP_PROP_POS_MSEC, timestamp)
      success, image = vidcap.read()
      if not success:
        break
        # raise Exception(f"Error retrieving frame at timestamp {timestamp}")
      # Convert BGR to RGB and append the frame
      video.append(image[..., ::-1])
    vidcap.release()
    return np.stack(video, axis=0)

  def read_video_at_30fps(self):
    """Read video at 30 FPS and return frames as a numpy array."""
    n_img = len(media.read_video(self.video_path)) 
    with media.VideoReader(self.video_path) as reader:
      print(
          f'Video has {n_img} images with shape={reader.shape}, at'
          f' {reader.fps} frames/sec and {reader.bps} bits/sec.'
      )
      fps = reader.fps
      bps = reader.bps
    # Get video duration using mediapy
    duration_sec = n_img / reader.fps

    # Generate timestamps for 30 FPS
    timestamps = np.arange(0, duration_sec * 1000, 1000 / 30)  # In milliseconds
    timestamps = timestamps.astype(int)
    # Retrieve frames at the calculated timestamps
    frames = self.retrieve_frame_cv2(timestamps)
    return frames

def composite_videos(square_video_path, rect_video_path, output_path):
    if 1:
      # Initialize processors for each video
      square_processor = VideoProcessor(square_video_path)
      rect_processor = VideoProcessor(rect_video_path)

      # Read both videos at 30 FPS
      square_video = square_processor.read_video_at_30fps()
      rect_video = rect_processor.read_video_at_30fps()

      print(f"Square video frames: {square_video.shape}")
      print(f"Rectangular video frames: {rect_video.shape}")



    
    # Resize the square video to 480x480
    square_resized = [media.resize_image(frame, (550, 550)) for frame in square_video]

    # Add a white border of size 6pt (6 pixels)
    border_size = 6
    square_with_border = [
        cv2.copyMakeBorder(
            frame,
            border_size, border_size, border_size, border_size,
            cv2.BORDER_CONSTANT,
            value=(255, 255, 255)
        ) for frame in square_resized
    ]

    # Ensure both videos have the same frame count
    min_frames = min(len(square_with_border), len(rect_video))
    square_with_border = square_with_border[:min_frames]
    rect_video = rect_video[:min_frames]

    # Composite the videos
    composite_frames = []
    for rect_frame, square_frame in zip(rect_video, square_with_border):
        # Place the square video on top of the rectangle video at (50, 50)
        rect_frame[50:50+square_frame.shape[0], 50:50+square_frame.shape[1]] = square_frame
        composite_frames.append(rect_frame)

    # Save the output video
    media.write_video(output_path, composite_frames, fps=30)

mp4s = [f for f in os.listdir('.') if '-2d.mp4' in f]
os.makedirs('composite', exist_ok=True)
for mp4_f in mp4s:
  vid = mp4_f.split('-2d.mp4')[0]
  # print(vid)
  # Paths to your videos
  square_video_path = vid + "-2d.mp4"
  rect_video_path = vid + ".mp4"
  output_path = osp.join('composite',  vid + "-composited.mp4")

  # Call the function
  composite_videos(square_video_path, rect_video_path, output_path)

  print(f"""<div class="item item-fullbody">
  <!-- {vid} -->
  <div class="item">
    <video autoplay muted loop playsinline>
      <source src="static/videos/stereo4d-gallery/composite/{vid}-composited.mp4" type="video/mp4">
    </video>
  </div>
</div>""")