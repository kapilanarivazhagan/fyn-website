#!/usr/bin/env python3
"""
Fyn Website Image Optimization Script
Converts all PNG/JPG images to WebP format with production-grade compression
"""

import os
import sys
from pathlib import Path
from PIL import Image
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration
PROJECT_ROOT = Path(__file__).parent
PUBLIC_IMAGES = PROJECT_ROOT / "public" / "Images"
INTRO_DIR = PUBLIC_IMAGES / "intro"
SECTIONS_DIR = PUBLIC_IMAGES / "sections"

# Quality settings by category
QUALITY_SETTINGS = {
    "intro": {
        "desktop": 75,      # Desktop backgrounds: 300-700KB (high quality)
        "mobile": 70,       # Mobile backgrounds: 120-350KB (balanced)
        "team": 78,         # Team images: <150KB (high quality for faces)
        "default": 75
    },
    "sections": {
        "desktop": 75,
        "mobile": 70,
        "default": 75
    }
}

def get_quality_for_image(image_path: str, category: str) -> int:
    """Determine WebP quality based on image type and category."""
    filename = image_path.lower()
    
    if "desktop" in filename:
        return QUALITY_SETTINGS[category].get("desktop", 75)
    elif "mobile" in filename:
        return QUALITY_SETTINGS[category].get("mobile", 70)
    elif any(name in filename for name in ["visakh", "niroop", "deeksha", "swagata", "manu", "vishnu"]):
        return QUALITY_SETTINGS[category].get("team", 78)
    else:
        return QUALITY_SETTINGS[category].get("default", 75)

def convert_image(source_path: Path, output_path: Path, quality: int) -> bool:
    """Convert a single image to WebP format."""
    try:
        # Open image
        img = Image.open(source_path)
        
        # Convert RGBA to RGB if necessary (WebP handles both)
        if img.mode in ("RGBA", "LA", "P"):
            # Create white background
            background = Image.new("RGB", img.size, (8, 8, 8))  # Dark background matching site theme
            if img.mode == "P":
                img = img.convert("RGBA")
            background.paste(img, mask=img.split()[-1] if img.mode in ("RGBA", "LA") else None)
            img = background
        elif img.mode != "RGB":
            img = img.convert("RGB")
        
        # Save as WebP
        img.save(
            output_path,
            "WEBP",
            quality=quality,
            method=6  # Slowest/best compression
        )
        
        # Log file sizes
        original_size = source_path.stat().st_size / 1024
        new_size = output_path.stat().st_size / 1024
        savings = ((original_size - new_size) / original_size) * 100
        
        logger.info(
            f"✓ {source_path.name} → {output_path.name} "
            f"({original_size:.1f}KB → {new_size:.1f}KB, {savings:.1f}% reduction)"
        )
        return True
        
    except Exception as e:
        logger.error(f"✗ Failed to convert {source_path.name}: {e}")
        return False

def process_directory(directory: Path, category: str) -> dict:
    """Process all images in a directory."""
    if not directory.exists():
        logger.warning(f"Directory not found: {directory}")
        return {"total": 0, "converted": 0, "failed": 0}
    
    results = {"total": 0, "converted": 0, "failed": 0}
    
    logger.info(f"\nProcessing {category} directory: {directory}")
    logger.info("=" * 70)
    
    # Process PNG files
    for source_path in sorted(directory.glob("*.png")):
        output_path = source_path.with_suffix(".webp")
        quality = get_quality_for_image(source_path.name, category)
        
        results["total"] += 1
        if convert_image(source_path, output_path, quality):
            results["converted"] += 1
        else:
            results["failed"] += 1
    
    # Process JPG files
    for source_path in sorted(directory.glob("*.jpg")) + sorted(directory.glob("*.jpeg")):
        output_path = source_path.with_suffix(".webp")
        quality = get_quality_for_image(source_path.name, category)
        
        results["total"] += 1
        if convert_image(source_path, output_path, quality):
            results["converted"] += 1
        else:
            results["failed"] += 1
    
    return results

def main():
    """Main conversion process."""
    logger.info("=" * 70)
    logger.info("FYN WEBSITE IMAGE OPTIMIZATION - WebP CONVERSION")
    logger.info("=" * 70)
    
    total_results = {"total": 0, "converted": 0, "failed": 0}
    
    # Process intro directory
    intro_results = process_directory(INTRO_DIR, "intro")
    for key in total_results:
        total_results[key] += intro_results[key]
    
    # Process sections directory
    sections_results = process_directory(SECTIONS_DIR, "sections")
    for key in total_results:
        total_results[key] += sections_results[key]
    
    # Summary
    logger.info("\n" + "=" * 70)
    logger.info("CONVERSION SUMMARY")
    logger.info("=" * 70)
    logger.info(f"Total images found: {total_results['total']}")
    logger.info(f"Successfully converted: {total_results['converted']}")
    logger.info(f"Failed: {total_results['failed']}")
    logger.info("=" * 70)
    
    if total_results['failed'] == 0 and total_results['converted'] > 0:
        logger.info("\n✓ All images converted successfully!")
        logger.info("\nNext steps:")
        logger.info("1. Update image references in source code")
        logger.info("2. Test all sections for proper rendering")
        logger.info("3. Run 'npm run build' to verify compilation")
        logger.info("4. Test on mobile Safari for performance")
        return 0
    else:
        logger.error(f"\n✗ Conversion incomplete. {total_results['failed']} files failed.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
