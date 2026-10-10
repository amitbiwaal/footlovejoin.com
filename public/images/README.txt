Foot Love — gallery images
===========================

The landing page (components/Gallery.tsx) shows these 6 files
from this folder (public/images/). Aspect ratio ~4:5 (portrait)
looks best; .jpg / .png / .webp all fine.

  profiles_113040_image.webp   (Mia)
  profiles_113141_image.webp   (Lena)
  profiles_113201_image.webp  (Aria)
  profiles_113290_image.webp   (Nova)
  profiles_113385_image.webp   (Zoe)
  profiles_113511_image.webp   (Ivy)

Notes
-----
- Images are shown blurred as a "locked preview" (matches the design).
- Until a file exists, that tile falls back to its brand-gradient
  placeholder — no broken-image icon.
- To rename a file or point a tile elsewhere, edit the `img` field in
  the TILES array in components/Gallery.tsx.
- These are served at /images/<name> on the site.
