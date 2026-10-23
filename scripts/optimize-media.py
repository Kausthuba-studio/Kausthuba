import os
import shutil
import subprocess
import sys
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image

FFMPEG_PATH = r'C:\Users\Vijay Karthik\AppData\Local\Programs\Python\Python314\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe'

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_DIR = os.path.join(ROOT_DIR, 'assets')
BACKUP_DIR = os.path.join(ROOT_DIR, 'assets-backup')

def backup_originals():
    print("=== STEP 1: BACKING UP ORIGINAL ASSETS ===")
    if not os.path.exists(BACKUP_DIR):
        os.makedirs(BACKUP_DIR, exist_ok=True)
    
    for sub in ['images', 'videos']:
        src_sub = os.path.join(ASSETS_DIR, sub)
        dst_sub = os.path.join(BACKUP_DIR, sub)
        if os.path.exists(src_sub):
            shutil.copytree(src_sub, dst_sub, dirs_exist_ok=True)
            print(f"[OK] Backed up {sub} to {dst_sub}")

def optimize_images():
    print("\n=== STEP 2: OPTIMIZING IMAGES ===")
    img_dir = os.path.join(ASSETS_DIR, 'images')
    
    total_orig_bytes = 0
    total_opt_bytes = 0

    # 1. Logo
    logo_path = os.path.join(img_dir, 'kausthuba-logo.png')
    if os.path.exists(logo_path):
        orig_size = os.path.getsize(logo_path)
        total_orig_bytes += orig_size
        with Image.open(logo_path) as im:
            # Resize 5016x5016 down to 512x512
            im_resized = im.resize((512, 512), Image.Resampling.LANCZOS)
            # Save WebP version
            webp_path = os.path.join(img_dir, 'kausthuba-logo.webp')
            im_resized.save(webp_path, 'WEBP', quality=92, method=6)
            # Save optimized PNG version as well
            im_resized.save(logo_path, 'PNG', optimize=True)
            new_webp_size = os.path.getsize(webp_path)
            new_png_size = os.path.getsize(logo_path)
            total_opt_bytes += new_webp_size
            print(f"kausthuba-logo: {orig_size:,} bytes -> WebP {new_webp_size:,} bytes (PNG {new_png_size:,} bytes) [{(1 - new_webp_size/orig_size)*100:.1f}% reduction]")

    # 2. QR Codes
    for qr in ['qr-facebook.png', 'qr-instagram.png', 'qr-linkedin.png', 'qr-youtube.png']:
        qr_path = os.path.join(img_dir, qr)
        if os.path.exists(qr_path):
            orig_size = os.path.getsize(qr_path)
            total_orig_bytes += orig_size
            with Image.open(qr_path) as im:
                w, h = im.size
                if w > 512 or h > 512:
                    im_resized = im.resize((min(w, 512), min(h, 512)), Image.Resampling.LANCZOS)
                else:
                    im_resized = im
                base_name = os.path.splitext(qr)[0]
                webp_path = os.path.join(img_dir, f"{base_name}.webp")
                im_resized.save(webp_path, 'WEBP', quality=90, method=6)
                im_resized.save(qr_path, 'PNG', optimize=True)
                new_size = os.path.getsize(webp_path)
                total_opt_bytes += new_size
                print(f"{qr}: {orig_size:,} bytes -> WebP {new_size:,} bytes [{(1 - new_size/orig_size)*100:.1f}% reduction]")

    # 3. Cutout images (cutout-1 to cutout-5)
    for i in range(1, 6):
        png_file = f"cutout-{i}.png"
        png_path = os.path.join(img_dir, png_file)
        if os.path.exists(png_path):
            orig_size = os.path.getsize(png_path)
            total_orig_bytes += orig_size
            with Image.open(png_path) as im:
                # Ensure RGBA for transparent cutouts
                if im.mode != 'RGBA':
                    im = im.convert('RGBA')
                w, h = im.size
                # Max height 1200px (original is 2400px), display height is max ~450px
                target_h = min(h, 1200)
                target_w = int(w * (target_h / h))
                im_resized = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
                webp_path = os.path.join(img_dir, f"cutout-{i}.webp")
                im_resized.save(webp_path, 'WEBP', quality=88, method=6)
                # Also optimize the png file in place
                im_resized.save(png_path, 'PNG', optimize=True)
                new_size = os.path.getsize(webp_path)
                total_opt_bytes += new_size
                print(f"cutout-{i}: {orig_size:,} bytes -> WebP {new_size:,} bytes [{(1 - new_size/orig_size)*100:.1f}% reduction]")

        # Also optimize cutout-*.jpg if exists
        jpg_file = f"cutout-{i}.jpg"
        jpg_path = os.path.join(img_dir, jpg_file)
        if os.path.exists(jpg_path):
            with Image.open(jpg_path) as im:
                w, h = im.size
                target_h = min(h, 1200)
                target_w = int(w * (target_h / h))
                im_resized = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
                im_resized.save(jpg_path, 'JPEG', quality=85, optimize=True)

    # 4. Work images (work-1 to work-36 in assets/images/work/)
    work_dir = os.path.join(img_dir, 'work')
    for i in range(1, 37):
        jpg_file = f"work-{i}.jpg"
        jpg_path = os.path.join(work_dir, jpg_file)
        if os.path.exists(jpg_path):
            orig_size = os.path.getsize(jpg_path)
            total_orig_bytes += orig_size
            with Image.open(jpg_path) as im:
                if im.mode != 'RGB':
                    im = im.convert('RGB')
                w, h = im.size
                # Max dimension 1000px (original is 2400px)
                scale = min(1000 / max(w, h), 1.0)
                target_w = int(w * scale)
                target_h = int(h * scale)
                im_resized = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
                webp_path = os.path.join(work_dir, f"work-{i}.webp")
                im_resized.save(webp_path, 'WEBP', quality=82, method=6)
                # Also save optimized JPG
                im_resized.save(jpg_path, 'JPEG', quality=80, optimize=True)
                new_size = os.path.getsize(webp_path)
                total_opt_bytes += new_size
                print(f"work-{i}: {orig_size:,} bytes -> WebP {new_size:,} bytes [{(1 - new_size/orig_size)*100:.1f}% reduction]")

    print(f"\nImages Summary: {total_orig_bytes:,} bytes -> {total_opt_bytes:,} bytes (Total Saved: {(1 - total_opt_bytes/total_orig_bytes)*100:.1f}%)")

def optimize_videos_and_posters():
    print("\n=== STEP 3: OPTIMIZING VIDEOS & GENERATING POSTERS ===")
    vid_dir = os.path.join(ASSETS_DIR, 'videos')
    poster_dir = os.path.join(vid_dir, 'posters')
    os.makedirs(poster_dir, exist_ok=True)

    videos = [f"work-{i}.mp4" for i in range(1, 15)] + ["work.mp4"]
    
    total_orig_vid_bytes = 0
    total_opt_vid_bytes = 0

    for vid in videos:
        src_path = os.path.join(vid_dir, vid)
        if not os.path.exists(src_path):
            continue

        orig_size = os.path.getsize(src_path)
        total_orig_vid_bytes += orig_size
        base_name = os.path.splitext(vid)[0]
        poster_path = os.path.join(poster_dir, f"{base_name}.webp")

        # 1. Generate WebP Poster Frame
        poster_cmd = [
            FFMPEG_PATH, '-y',
            '-ss', '00:00:00.500',
            '-i', src_path,
            '-vframes', '1',
            '-vf', 'scale=1280:-2',
            '-c:v', 'libwebp',
            '-quality', '85',
            poster_path
        ]
        res = subprocess.run(poster_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if os.path.exists(poster_path):
            print(f"[OK] Generated poster for {vid} ({os.path.getsize(poster_path):,} bytes)")

        # 2. Compress Video using H.264 CRF 23, slow preset, faststart
        temp_out = os.path.join(vid_dir, f"temp_{vid}")
        comp_cmd = [
            FFMPEG_PATH, '-y',
            '-i', src_path,
            '-c:v', 'libx264',
            '-crf', '23',
            '-preset', 'slow',
            '-pix_fmt', 'yuv420p',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-movflags', '+faststart',
            temp_out
        ]
        res = subprocess.run(comp_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0 and os.path.exists(temp_out):
            opt_size = os.path.getsize(temp_out)
            if opt_size < orig_size:
                shutil.move(temp_out, src_path)
                total_opt_vid_bytes += opt_size
                print(f"[OK] Compressed {vid}: {orig_size:,} bytes -> {opt_size:,} bytes [{(1 - opt_size/orig_size)*100:.1f}% reduction]")
            else:
                os.remove(temp_out)
                total_opt_vid_bytes += orig_size
                print(f"- Kept original for {vid} (compression was not smaller)")
        else:
            if os.path.exists(temp_out):
                os.remove(temp_out)
            total_opt_vid_bytes += orig_size
            print(f"[FAIL] Compression failed for {vid}, kept original")

    print(f"\nVideos Summary: {total_orig_vid_bytes:,} bytes -> {total_opt_vid_bytes:,} bytes (Total Saved: {(1 - total_opt_vid_bytes/total_orig_vid_bytes)*100:.1f}%)")

if __name__ == '__main__':
    backup_originals()
    optimize_images()
    optimize_videos_and_posters()
