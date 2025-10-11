# App Icons

Place your app icons in the respective mipmap directories:

## Required Files

### Standard Icons
- `ic_launcher.png` - Square icon (72x72 for hdpi)
- `ic_launcher_round.png` - Round icon (72x72 for hdpi)
- `ic_launcher_foreground.png` - Foreground layer for adaptive icon (108x108 for hdpi)

## Icon Sizes by Density

| Density | Directory | Size |
|---------|-----------|------|
| mdpi | mipmap-mdpi | 48x48 |
| hdpi | mipmap-hdpi | 72x72 |
| xhdpi | mipmap-xhdpi | 96x96 |
| xxhdpi | mipmap-xxhdpi | 144x144 |
| xxxhdpi | mipmap-xxxhdpi | 192x192 |

## Foreground Icon Sizes

| Density | Size |
|---------|------|
| mdpi | 108x108 |
| hdpi | 162x162 |
| xhdpi | 216x216 |
| xxhdpi | 324x324 |
| xxxhdpi | 432x432 |

## How to Generate

See `scripts/generate-icons.md` for instructions on generating icons.

### Quick Method
Use an online tool:
- [Icon Kitchen](https://icon.kitchen/)
- [App Icon Generator](https://www.appicon.co/)

### Manual Method
```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt install imagemagick  # Linux

# From res/ directory with your source icon.png (1024x1024)
convert icon.png -resize 72x72 mipmap-hdpi/ic_launcher.png
convert icon.png -resize 72x72 mipmap-hdpi/ic_launcher_round.png
convert icon.png -resize 162x162 mipmap-hdpi/ic_launcher_foreground.png
```

## Design Guidelines

1. Keep important content in center safe zone
2. Use transparent background for foreground layer
3. Background color defined in `values/colors.xml`
4. Follow [Material Design Guidelines](https://material.io/design/iconography/product-icons.html)

## Current Setup

The app currently uses:
- Vector drawable for foreground (`drawable/ic_launcher_foreground.xml`)
- Blue background color (`#2196F3`)
- Adaptive icon support for Android 8.0+

Replace with PNG files for better visual appearance.

