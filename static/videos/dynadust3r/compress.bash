find . -type f -name "*.mp4" | while read file; do
  dir=$(dirname "$file")
  base=$(basename "$file" .mp4)
  ffmpeg -i "$file" -vcodec libx264 -crf 30 "$dir/compressed_${base}.mp4"
done
