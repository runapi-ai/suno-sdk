CONTRACT = {
    "add-instrumental": {
        "models": ["suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model": {
            "suno-v4.5-plus": {
                "model": {
                    "required": True
                },
                "negative_tags": {
                    "required": True
                },
                "tags": {
                    "required": True
                },
                "title": {
                    "required": True
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            },
            "suno-v5": {
                "model": {
                    "required": True
                },
                "negative_tags": {
                    "required": True
                },
                "tags": {
                    "required": True
                },
                "title": {
                    "required": True
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            },
            "suno-v5.5": {
                "model": {
                    "required": True
                },
                "negative_tags": {
                    "required": True
                },
                "tags": {
                    "required": True
                },
                "title": {
                    "required": True
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            }
        }
    },
    "add-vocals": {
        "models": ["suno-v4.5-plus", "suno-v5"],
        "fields_by_model": {
            "suno-v4.5-plus": {
                "lyrics": {
                    "required": True
                },
                "model": {
                    "required": True
                },
                "negative_tags": {
                    "required": True
                },
                "style": {
                    "required": True
                },
                "title": {
                    "required": True
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            },
            "suno-v5": {
                "lyrics": {
                    "required": True
                },
                "model": {
                    "required": True
                },
                "negative_tags": {
                    "required": True
                },
                "style": {
                    "required": True
                },
                "title": {
                    "required": True
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            }
        }
    },
    "blend-lyrics": {
        "models": [],
        "fields_by_model": {
            "_": {
                "lyrics_a": {
                    "required": True
                },
                "lyrics_b": {
                    "required": True
                }
            }
        }
    },
    "boost-style": {
        "models": [],
        "fields_by_model": {
            "_": {
                "description": {
                    "required": True
                }
            }
        }
    },
    "check-voice": {
        "models": [],
        "fields_by_model": {
            "_": {
                "task_id": {
                    "required": True
                }
            }
        }
    },
    "convert-audio": {
        "models": [],
        "fields_by_model": {
            "_": {
                "audio_id": {
                    "required": True
                },
                "task_id": {
                    "required": True
                }
            }
        }
    },
    "cover-audio": {
        "models": ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model": {
            "suno-v4": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v4.5": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v4.5-all": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v4.5-plus": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v5": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v5.5": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url": {
                    "required": True
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            }
        },
        "rules": [{
            "when": {
                "vocal_mode": "auto_lyrics"
            },
            "required": ["prompt"],
            "forbidden": ["lyrics", "style", "title"]
        }, {
            "when": {
                "vocal_mode": "exact_lyrics"
            },
            "required": ["lyrics", "style", "title"],
            "forbidden": ["prompt"]
        }, {
            "when": {
                "vocal_mode": "instrumental"
            },
            "required": ["style", "title"],
            "forbidden": ["prompt", "lyrics"]
        }]
    },
    "create-mashup": {
        "models": ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model": {
            "suno-v4": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url_list": {
                    "required": True,
                    "min_items": 2,
                    "max_items": 2
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v4.5": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url_list": {
                    "required": True,
                    "min_items": 2,
                    "max_items": 2
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v4.5-all": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url_list": {
                    "required": True,
                    "min_items": 2,
                    "max_items": 2
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v4.5-plus": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url_list": {
                    "required": True,
                    "min_items": 2,
                    "max_items": 2
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v5": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url_list": {
                    "required": True,
                    "min_items": 2,
                    "max_items": 2
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v5.5": {
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "upload_url_list": {
                    "required": True,
                    "min_items": 2,
                    "max_items": 2
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            }
        },
        "rules": [{
            "when": {
                "vocal_mode": "auto_lyrics"
            },
            "required": ["prompt"],
            "forbidden": ["lyrics", "style", "title"]
        }, {
            "when": {
                "vocal_mode": "exact_lyrics"
            },
            "required": ["lyrics", "style", "title"],
            "forbidden": ["prompt"]
        }, {
            "when": {
                "vocal_mode": "instrumental"
            },
            "required": ["style", "title"],
            "forbidden": ["prompt", "lyrics"]
        }]
    },
    "extend-music": {
        "models": ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model": {
            "suno-v4": {
                "model": {
                    "required": True
                },
                "parameter_mode": {
                    "enum": ["source", "custom"],
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            },
            "suno-v4.5": {
                "model": {
                    "required": True
                },
                "parameter_mode": {
                    "enum": ["source", "custom"],
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            },
            "suno-v4.5-all": {
                "model": {
                    "required": True
                },
                "parameter_mode": {
                    "enum": ["source", "custom"],
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            },
            "suno-v4.5-plus": {
                "model": {
                    "required": True
                },
                "parameter_mode": {
                    "enum": ["source", "custom"],
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            },
            "suno-v5": {
                "model": {
                    "required": True
                },
                "parameter_mode": {
                    "enum": ["source", "custom"],
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            },
            "suno-v5.5": {
                "model": {
                    "required": True
                },
                "parameter_mode": {
                    "enum": ["source", "custom"],
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                }
            }
        }
    },
    "generate-artwork": {
        "models": [],
        "fields_by_model": {
            "_": {
                "task_id": {
                    "required": True
                }
            }
        }
    },
    "generate-lyrics": {
        "models": [],
        "fields_by_model": {
            "_": {
                "prompt": {
                    "required": True
                }
            }
        }
    },
    "generate-midi": {
        "models": [],
        "fields_by_model": {
            "_": {
                "task_id": {
                    "required": True
                }
            }
        }
    },
    "generate-persona": {
        "models": [],
        "fields_by_model": {
            "_": {
                "audio_id": {
                    "required": True
                },
                "description": {
                    "required": True
                },
                "name": {
                    "required": True
                },
                "task_id": {
                    "required": True
                }
            }
        }
    },
    "generate-voice": {
        "models": [],
        "fields_by_model": {
            "_": {
                "singer_skill_level": {
                    "enum": ["beginner", "intermediate", "advanced", "professional"]
                },
                "task_id": {
                    "required": True
                },
                "verify_url": {
                    "required": True
                }
            }
        }
    },
    "get-timestamped-lyrics": {
        "models": [],
        "fields_by_model": {
            "_": {
                "audio_id": {
                    "required": True
                },
                "task_id": {
                    "required": True
                }
            }
        }
    },
    "regenerate-validation-phrase": {
        "models": [],
        "fields_by_model": {
            "_": {
                "task_id": {
                    "required": True
                }
            }
        }
    },
    "replace-section": {
        "models": [],
        "fields_by_model": {
            "_": {
                "full_lyrics": {
                    "required": True
                },
                "infill_end_time": {
                    "required": True
                },
                "infill_start_time": {
                    "required": True
                },
                "lyrics": {
                    "required": True
                },
                "model": {
                    "enum": ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"]
                },
                "tags": {
                    "required": True
                },
                "title": {
                    "required": True
                }
            }
        }
    },
    "separate-audio-stems": {
        "models": [],
        "fields_by_model": {
            "_": {
                "audio_id": {
                    "required": True
                },
                "stem_name": {
                    "enum": ["Lead Vocal", "Drum Kit", "Kick", "Snare", "Risers", "Bass", "Backing Vocals", "Piano", "Electric Guitar", "Percussion", "String Section", "Synth", "Acoustic Guitar", "Sound Effects", "Synth Pad", "Synth Bass", "Guitar", "Brass Section", "Organ", "Electronic Drum Kit", "Lead Electric Guitar", "Synth Keys", "Rhythm Electric Guitar", "Electric Piano", "Upright Bass", "Keyboards", "Distorted Electric Guitar", "Synth Strings", "Synth Lead", "Woodwinds", "Rhythm Acoustic Guitar", "Flute", "Harp", "Tambourine", "Trumpet", "Arpeggiator", "Accordion", "Fiddle", "Pedal Steel Guitar", "Synth Voice", "Violin", "Digital Piano", "Synth Brass", "Mandolin", "Choir", "Banjo", "Bells", "Clarinet", "Tenor Saxophone", "Trombone", "Shaker", "French Horn", "Glockenspiel", "Electric Bass", "Cello", "Timpani", "Harmonica", "Marimba", "Vibraphone", "Lap Steel Guitar", "Saxophone", "Orchestra", "Horns", "Cymbals", "Hand Clap", "Oboe", "Celesta", "Congas", "Drone", "Alto Saxophone", "Double Bass", "Ukulele", "Harpsichord", "Baritone Saxophone", "Xylophone", "Tuba", "Bass Guitar", "Whistle", "Lead Guitar", "Rhodes", "808", "Bongos", "Bassoon", "Cowbell", "Viola", "Sitar", "Steel Drums", "Piccolo", "Theremin", "Bagpipes", "Hi-Hat", "Music Box", "Melodica", "Tabla", "Koto", "Djembe", "Taiko", "Didgeridoo"]
                },
                "task_id": {
                    "required": True
                },
                "type": {
                    "enum": ["separate_vocal", "split_stem", "split_stem_advanced"]
                }
            }
        },
        "rules": [{
            "when": {
                "type": "split_stem_advanced"
            },
            "required": ["stem_name"]
        }]
    },
    "text-to-music": {
        "models": ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model": {
            "suno-v4": {
                "duration_seconds": {
                    "type": "integer"
                },
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v4.5": {
                "duration_seconds": {
                    "type": "integer"
                },
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v4.5-all": {
                "duration_seconds": {
                    "type": "integer"
                },
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v4.5-plus": {
                "duration_seconds": {
                    "type": "integer"
                },
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v5": {
                "duration_seconds": {
                    "type": "integer"
                },
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            },
            "suno-v5.5": {
                "duration_seconds": {
                    "type": "integer"
                },
                "model": {
                    "required": True
                },
                "persona_type": {
                    "enum": ["style", "voice"]
                },
                "vocal_gender": {
                    "enum": ["male", "female"]
                },
                "vocal_mode": {
                    "enum": ["auto_lyrics", "exact_lyrics", "instrumental"],
                    "required": True
                }
            }
        },
        "rules": [{
            "when": {
                "vocal_mode": "auto_lyrics"
            },
            "required": ["prompt"],
            "forbidden": ["lyrics", "style", "title"]
        }, {
            "when": {
                "vocal_mode": "exact_lyrics"
            },
            "required": ["lyrics", "style", "title"],
            "forbidden": ["prompt"]
        }, {
            "when": {
                "vocal_mode": "instrumental"
            },
            "required": ["style", "title"],
            "forbidden": ["prompt", "lyrics"]
        }]
    },
    "text-to-sound": {
        "models": ["suno-v5", "suno-v5.5"],
        "fields_by_model": {
            "suno-v5": {
                "model": {
                    "required": True
                },
                "prompt": {
                    "required": True
                },
                "sound_key": {
                    "enum": ["Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "A#m", "Bm", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
                },
                "sound_tempo": {
                    "type": "integer"
                }
            },
            "suno-v5.5": {
                "model": {
                    "required": True
                },
                "prompt": {
                    "required": True
                },
                "sound_key": {
                    "enum": ["Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "A#m", "Bm", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
                },
                "sound_tempo": {
                    "type": "integer"
                }
            }
        }
    },
    "visualize-music": {
        "models": [],
        "fields_by_model": {
            "_": {
                "audio_id": {
                    "required": True
                },
                "task_id": {
                    "required": True
                }
            }
        }
    },
    "voice-to-validation-phrase": {
        "models": [],
        "fields_by_model": {
            "_": {
                "language": {
                    "enum": ["en", "zh", "es", "fr", "pt", "de", "ja", "ko", "hi", "ru"]
                },
                "vocal_end_seconds": {
                    "required": True,
                    "type": "integer"
                },
                "vocal_start_seconds": {
                    "required": True,
                    "type": "integer"
                },
                "voice_url": {
                    "required": True
                }
            }
        }
    }
}
