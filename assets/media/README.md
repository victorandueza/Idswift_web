# Hero media

Place the hero media assets here:

- `hero-loop.mp4`: looping video (recommended 8-12 s, 1920x1080, no audio, moderate bitrate).
- `hero-poster.jpg`: static fallback image used as the video poster and for reduced-motion users.

Tips:

1. Compress the video with `ffmpeg -i input.mp4 -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 23 -an hero-loop.mp4` to keep the file lightweight.
2. Export the image as `.jpg` or `.webp` with high compression while avoiding visible artefacts.
3. Pick neutral scenes (front desk, lobby, guests) that match the cyan/violet palette.

After adding the files, test the autoplay behaviour and verify that the poster displays when `prefers-reduced-motion` is enabled.
