# Derive browser icons from the existing portfolio artwork, preserving its colors.
# Load Windows System.Drawing for raster resize/encoding. Run this script on Windows with the original artwork available.
Add-Type -AssemblyName System.Drawing
# Resolve outputs relative to this script, not the current shell directory; generated icons belong in client/public.
$publicDir = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../public'))
# Open the original portfolio artwork. Replace that PNG to change the icon design, then rerun this script.
$source = [System.Drawing.Image]::FromFile((Join-Path $publicDir 'assets/portfolio-logo.png'))
# Guarantee drawing/file resources are released even if encoding or disk writes fail.
try {
  # Generate the browser PNG, Apple home-screen PNG, and larger embedded-SVG source; keep dimensions aligned with index.html/tests.
  foreach ($size in @(32, 180, 192)) {
    # Allocate a square output image at the current size; Dispose below releases native memory.
    $bitmap = [System.Drawing.Bitmap]::new($size, $size)
    # Create the drawing context for this output bitmap; it must be disposed before the bitmap.
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    # Guarantee drawing/file resources are released even if encoding or disk writes fail.
    try {
      # Use high-quality bicubic resampling to retain detail at small favicon dimensions.
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      # Paint the cream background; match the site palette if changing the brand colors.
      $graphics.Clear([System.Drawing.Color]::FromArgb(242, 237, 228))
      # Crop the centered 76% of source width so the mark stays legible; this assumes square source artwork.
      $crop = [int]($source.Width * 0.76)
      # Center that crop; if using nonsquare artwork, revise both crop and offsets deliberately.
      $offset = [int](($source.Width - $crop) / 2)
      # Scale the centered source crop into the full output square; source coordinates are pixels.
      $graphics.DrawImage($source, [System.Drawing.Rectangle]::new(0, 0, $size, $size), $offset, $offset, $crop, $crop, [System.Drawing.GraphicsUnit]::Pixel)
      # Map size 180 to the Apple filename and other sizes to favicon-N.png; HTML/test paths depend on these names.
      $name = if ($size -eq 180) { 'apple-touch-icon.png' } else { "favicon-$size.png" }
      # Allocate a square output image at the current size; Dispose below releases native memory.
      $bitmap.Save((Join-Path $publicDir $name), [System.Drawing.Imaging.ImageFormat]::Png)
    # Release the graphics context and bitmap for this size, including error paths.
    } finally { $graphics.Dispose(); $bitmap.Dispose() }
  }
# Release the original image after all output sizes are processed.
} finally { $source.Dispose() }
# Read the 32px PNG payload that will be stored inside the ICO container.
$png = [System.IO.File]::ReadAllBytes((Join-Path $publicDir 'favicon-32.png'))
# Create/overwrite the ICO output. This is a generated file, not hand-authored artwork.
$stream = [System.IO.File]::Create((Join-Path $publicDir 'favicon.ico'))
# Use BinaryWriter for little-endian ICO headers; disposing it also closes the stream.
$writer = [System.IO.BinaryWriter]::new($stream)
# Guarantee drawing/file resources are released even if encoding or disk writes fail.
try {
  # Use BinaryWriter for little-endian ICO headers; disposing it also closes the stream.
  $writer.Write([uint16]0); $writer.Write([uint16]1); $writer.Write([uint16]1)
  # Use BinaryWriter for little-endian ICO headers; disposing it also closes the stream.
  $writer.Write([byte]32); $writer.Write([byte]32); $writer.Write([byte]0); $writer.Write([byte]0)
  # Use BinaryWriter for little-endian ICO headers; disposing it also closes the stream.
  $writer.Write([uint16]1); $writer.Write([uint16]32); $writer.Write([uint32]$png.Length); $writer.Write([uint32]22)
  # Use BinaryWriter for little-endian ICO headers; disposing it also closes the stream.
  $writer.Write($png)
# Flush and close the writer/stream even when writing fails.
} finally { $writer.Dispose() }
# Encode the larger PNG inline so the SVG favicon does not depend on a second resource request.
$base64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Join-Path $publicDir 'favicon-192.png')))
# Build a self-contained 192px SVG wrapper; keep viewBox and image dimensions aligned with the embedded bitmap.
$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><image width="192" height="192" href="data:image/png;base64,' + $base64 + '"/></svg>'
# Write UTF-8 without a BOM. Run favicon tests and production build after regenerating assets.
[System.IO.File]::WriteAllText((Join-Path $publicDir 'favicon.svg'), $svg, [System.Text.UTF8Encoding]::new($false))
