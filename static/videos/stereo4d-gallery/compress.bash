for file in composite/*.mp4; do
  ffmpeg -i "$file" -vcodec libx264 -crf 15 "${file%.mp4}-compressed.mp4"
done