from pathlib import Path
import boto3


def synthesize_label(label: str, output_path: Path) -> None:
    client = boto3.client("polly")
    template = f"<speak><p><prosody rate='slow'>{label}</prosody></p></speak>"
    response = client.synthesize_speech(
        OutputFormat="mp3",
        Engine="neural",
        LanguageCode="fr-FR",
        Text=template,
        TextType="ssml",
        VoiceId="Lea",
    )
    with (output_path / f"{label}.mp3").open("wb") as f:
        f.write(response["AudioStream"].read())


if __name__ == "__main__":
    synthesize_label("Salut beau gosse", Path("."))
