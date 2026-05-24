#!/usr/bin/env python3
"""
Image to WebP Conversion Script
Converts all PNG/JPG images to modern WebP format with optimized compression.
"""

import os
from pathlib import Path
from PIL import Image
import sys

# Configuration for different image types
COMPRESSION_SETTINGS = {
    'sections': {'quality': 80, 'method': 6},  # 300-700KB target
    'intro': {'quality': 80, 'method': 6},     # Hero/loader images
    'team': {'quality': 85, 'method': 6},      # Leadership team: <150KB
    'logos': {'quality': 90, 'method': 6},     # High quality for logos
}

def get_compression_config(file_path):
    """Determine compression settings based on file location."""
    if 'sections' in file_path:
        return COMPRESSION_SETTINGS['sections']
    elif 'intro' in file_path:
        return COMPRESSION_SETTINGS['intro']
    elif 'logos' in file_path:
        return COMPRESSION_SETTINGS['logos']
    else:
        return COMPRESSION_SETTINGS['team']

def convert_image(input_path, output_path):
    """Convert a single image to WebP format."""
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert RGBA to RGB if necessary (for better WebP compression)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            rgb_img = Image.new('RGB', img.size, (8, 8, 8))  # Dark background matching site
            if img.mode == 'P':
                img = img.convert('RGBA')
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Get compression settings
        config = get_compression_config(str(input_path))
        
        # Save as WebP
        img.save(output_path, 'WEBP', quality=config['quality'], method=config['method'])
        
        # Get file sizes for reporting
        input_size = os.path.getsize(input_path) / 1024  # KB
        output_size = os.path.getsize(output_path) / 1024  # KB
        compression = ((input_size - output_size) / input_size) * 100
        
        print(f"✓ {Path(input_path).name}")
        print(f"  {input_size:.0f}KB → {output_size:.0f}KB (saved {compression:.1f}%)")
        
        return True
    except Exception as e:
        print(f"✗ {Path(input_path).name}: {str(e)}")
        return False

def main():
    """Main conversion process."""
    base_path = Path(__file__).parent / 'public' / 'Images'
    
    if not base_path.exists():
        print(f"Error: {base_path} not found")
        sys.exit(1)
    
    converted = 0
    failed = 0
    
    # Directories to process
    directories = [
        base_path / 'sections',
        base_path / 'intro',
    ]
    
    # Also check for logos directory
    logos_path = Path(__file__).parent / 'public' / 'logos'
    if logos_path.exists():
        directories.append(logos_path)
    
    print("🖼️  Converting images to WebP format...\n")
    
    for directory in directories:
        if not directory.exists():
            continue
        
        print(f"\n📁 Processing {directory.name}/")
        print("-" * 50)
        
        # Find all PNG and JPG files
        for file_ext in ['*.png', '*.PNG', '*.jpg', '*.JPG', '*.jpeg', '*.JPEG']:
            for input_file in directory.glob(file_ext):
                output_file = input_file.with_suffix('.webp')
                
                if convert_image(input_file, output_file):
                    converted += 1
                else:
                    failed += 1
    
    print("\n" + "=" * 50)
    print(f"Conversion complete!")
    print(f"✓ Converted: {converted}")
    if failed > 0:
        print(f"✗ Failed: {failed}")
    print("=" * 50)
    
    return 0 if failed == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
