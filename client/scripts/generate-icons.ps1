# Derive browser icons from the existing portfolio artwork, preserving its colors.
Add-Type -AssemblyName System.Drawing
$publicDir = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../public'))
$source = [System.Drawing.Image]::FromFile((Join-Path $publicDir 'assets/portfolio-logo.png'))
try {
  foreach ($size in @(32, 180, 192)) {
    $bitmap = [System.Drawing.Bitmap]::new($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.Clear([System.Drawing.Color]::FromArgb(242, 237, 228))
      $crop = [int]($source.Width * 0.76)
      $offset = [int](($source.Width - $crop) / 2)
      $graphics.DrawImage($source, [System.Drawing.Rectangle]::new(0, 0, $size, $size), $offset, $offset, $crop, $crop, [System.Drawing.GraphicsUnit]::Pixel)
      $name = if ($size -eq 180) { 'apple-touch-icon.png' } else { "favicon-$size.png" }
      $bitmap.Save((Join-Path $publicDir $name), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally { $graphics.Dispose(); $bitmap.Dispose() }
  }
} finally { $source.Dispose() }
$png = [System.IO.File]::ReadAllBytes((Join-Path $publicDir 'favicon-32.png'))
$stream = [System.IO.File]::Create((Join-Path $publicDir 'favicon.ico'))
$writer = [System.IO.BinaryWriter]::new($stream)
try {
  $writer.Write([uint16]0); $writer.Write([uint16]1); $writer.Write([uint16]1)
  $writer.Write([byte]32); $writer.Write([byte]32); $writer.Write([byte]0); $writer.Write([byte]0)
  $writer.Write([uint16]1); $writer.Write([uint16]32); $writer.Write([uint32]$png.Length); $writer.Write([uint32]22)
  $writer.Write($png)
} finally { $writer.Dispose() }
$base64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Join-Path $publicDir 'favicon-192.png')))
$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><image width="192" height="192" href="data:image/png;base64,' + $base64 + '"/></svg>'
[System.IO.File]::WriteAllText((Join-Path $publicDir 'favicon.svg'), $svg, [System.Text.UTF8Encoding]::new($false))
