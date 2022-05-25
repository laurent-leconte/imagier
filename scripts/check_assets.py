import dataclasses
from dataclasses import dataclass
import json
from pathlib import Path
import sys
from typing import List

import boto3  # type: ignore

@dataclass
class Asset:
    label: str
    image: str
    sound: str = ""
    attribution: str = ""

def path_to_assets() -> Path:
    root = Path(__file__).parent.parent
    return root / "src" / "assets"

def synthesize_label(label: str, output_file: Path) -> None:
    client = boto3.session.Session(profile_name='perso').client('polly')
    template = f"<speak><prosody rate='slow'>{label}</prosody></speak>"
    response = client.synthesize_speech(
        OutputFormat="mp3",
        Engine="neural",
        LanguageCode="fr-FR",
        Text=template,
        TextType="ssml",
        VoiceId="Lea",
    )
    with (output_file).open("wb") as f:
        f.write(response["AudioStream"].read())


def make_alphabet() -> None:
    assets_dir = path_to_assets() / "letters"
    for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
        synthesize_label(letter, assets_dir / f"{letter}.mp3")


def is_valid_image(image_path: Path) -> bool:
    return image_path.is_file() and image_path.suffix in (".png", ".jpg")

def is_valid_sound(sound_path: Path) -> bool:
    return sound_path.is_file() and sound_path.suffix in (".mp3")

def check_assets(assets_dir: Path, asset_file: str) -> bool:
    fixed = 0  # tracks how many fixes were made

    # first, try to load the json file with the asset data
    images_db: List[dict[str, str]] = []
    try:
        with open(assets_dir / asset_file) as f:
            images_db = json.load(f)
    except FileNotFoundError:
        print(f"Asset file {assets_dir}/{asset_file} not found. Creating a new one.")
        fixed += 1
    except json.decoder.JSONDecodeError:
        print(f"{assets_dir}/{asset_file} is not valid JSON. Creating a new one.")
        fixed += 1
    
    # check and correct each asset
    assets: List[Asset] = []
    image_dir = assets_dir / "images" / "images"
    sound_dir = assets_dir / "images" / "sounds"

    for e in images_db:
        try:
            asset = Asset(**e)
        except TypeError as exc:
            print(f"Invalid asset declaration: {e}. Skipping.")
            fixed += 1
            continue
        if not is_valid_image(image_dir / asset.image):
            print(f"Missing image file: {image_dir / asset.image}. Skipping.")
            fixed += 1
            continue
        if asset.label == "":
            fixed += 1
            asset.label = asset.image.split(".")[0]
            print(f"Missing label. Using image name instead ({asset.label}).")
        if not is_valid_sound(sound_dir / asset.sound):
            print(f"Missing sound: {sound_dir / asset.sound}. Synthesizing using AWS Polly.")
            fixed += 1
            sound_file = asset.label + ".mp3"
            synthesize_label(asset.label, sound_dir / sound_file)
            asset.sound = sound_file
        assets.append(asset)

    # add any additional image found in the image directory
    known_image_files = [asset.image for asset in assets]
    for image in image_dir.glob("*"):
        if image.name not in known_image_files:
            print(f"Found unknown image. Adding {image.name}.")
            fixed += 1
            label = image.stem
            sound_file = label + ".mp3"
            if not is_valid_sound(sound_dir / sound_file):
                synthesize_label(label, sound_dir / sound_file)
            assets.append(Asset(label, image.name, sound_file))

    # write changes to disk
    if fixed > 0:
        with open(assets_dir / asset_file, "w") as f:
            json.dump([dataclasses.asdict(a) for a in assets], f, indent=2)
        print(f"{fixed} fix(es) made and saved to disk")

    return fixed > 0

if __name__ == "__main__":
    print(check_assets(path_to_assets(), "images.json"))
    # make_alphabet()
