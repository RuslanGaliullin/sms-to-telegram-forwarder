# Generate App Icons

This guide explains how to generate app icons for different resolutions.

## Quick Method - Using Online Tool

1. Visit [Icon Kitchen](https://icon.kitchen/) or [App Icon Generator](https://www.appicon.co/)
2. Upload your source image (1024x1024px PNG recommended)
3. Select Android platform
4. Download generated icons
5. Copy files to respective mipmap folders:
   - `mipmap-mdpi/` - 48x48
   - `mipmap-hdpi/` - 72x72
   - `mipmap-xhdpi/` - 96x96
   - `mipmap-xxhdpi/` - 144x144
   - `mipmap-xxxhdpi/` - 192x192

## Manual Method - Using ImageMagick

Install ImageMagick:
```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick
```

Generate icons:
```bash
# From project root
cd android/app/src/main/res

# Create base icon (1024x1024)
# Place your icon.png in this directory

# Generate all sizes
convert icon.png -resize 48x48 mipmap-mdpi/ic_launcher.png
convert icon.png -resize 72x72 mipmap-hdpi/ic_launcher.png
convert icon.png -resize 96x96 mipmap-xhdpi/ic_launcher.png
convert icon.png -resize 144x144 mipmap-xxhdpi/ic_launcher.png
convert icon.png -resize 192x192 mipmap-xxxhdpi/ic_launcher.png

# For round icons
convert icon.png -resize 48x48 mipmap-mdpi/ic_launcher_round.png
convert icon.png -resize 72x72 mipmap-hdpi/ic_launcher_round.png
convert icon.png -resize 96x96 mipmap-xhdpi/ic_launcher_round.png
convert icon.png -resize 144x144 mipmap-xxhdpi/ic_launcher_round.png
convert icon.png -resize 192x192 mipmap-xxxhdpi/ic_launcher_round.png

# For foreground (adaptive icon)
convert icon.png -resize 108x108 mipmap-mdpi/ic_launcher_foreground.png
convert icon.png -resize 162x162 mipmap-hdpi/ic_launcher_foreground.png
convert icon.png -resize 216x216 mipmap-xhdpi/ic_launcher_foreground.png
convert icon.png -resize 324x324 mipmap-xxhdpi/ic_launcher_foreground.png
convert icon.png -resize 432x432 mipmap-xxxhdpi/ic_launcher_foreground.png
```

## Design Guidelines

- Use 1024x1024px as source
- Keep important content in the center (safe zone: 768x768px)
- Use transparent background for foreground layer
- Test on different Android versions
- Follow [Material Design icon guidelines](https://material.io/design/iconography/product-icons.html)

## Recommended Tools

- **Figma** - Professional design tool
- **GIMP** - Free image editor
- **Inkscape** - Vector graphics editor
- **Android Studio Image Asset Studio** - Built-in tool

