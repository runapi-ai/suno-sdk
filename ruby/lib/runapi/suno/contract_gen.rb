# frozen_string_literal: true

module RunApi
  module Suno
    CONTRACT = {
      "add-instrumental" => {
        "models" => ["suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model" => {
          "suno-v4.5-plus" => {
            "model" => {
              "required" => true
            },
            "negative_tags" => {
              "required" => true
            },
            "tags" => {
              "required" => true
            },
            "title" => {
              "required" => true
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          },
          "suno-v5" => {
            "model" => {
              "required" => true
            },
            "negative_tags" => {
              "required" => true
            },
            "tags" => {
              "required" => true
            },
            "title" => {
              "required" => true
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          },
          "suno-v5.5" => {
            "model" => {
              "required" => true
            },
            "negative_tags" => {
              "required" => true
            },
            "tags" => {
              "required" => true
            },
            "title" => {
              "required" => true
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          }
        }
      },
      "add-samples" => {
        "models" => ["suno-v4", "suno-v4.5", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model" => {
          "suno-v4" => {
            "audio_url" => {
              "required" => true
            },
            "end_seconds" => {
              "required" => true,
              "min" => 0
            },
            "model" => {
              "required" => true
            },
            "start_seconds" => {
              "required" => true,
              "min" => 0
            }
          },
          "suno-v4.5" => {
            "audio_url" => {
              "required" => true
            },
            "end_seconds" => {
              "required" => true,
              "min" => 0
            },
            "model" => {
              "required" => true
            },
            "start_seconds" => {
              "required" => true,
              "min" => 0
            }
          },
          "suno-v4.5-plus" => {
            "audio_url" => {
              "required" => true
            },
            "end_seconds" => {
              "required" => true,
              "min" => 0
            },
            "model" => {
              "required" => true
            },
            "start_seconds" => {
              "required" => true,
              "min" => 0
            }
          },
          "suno-v5" => {
            "audio_url" => {
              "required" => true
            },
            "end_seconds" => {
              "required" => true,
              "min" => 0
            },
            "model" => {
              "required" => true
            },
            "start_seconds" => {
              "required" => true,
              "min" => 0
            }
          },
          "suno-v5.5" => {
            "audio_url" => {
              "required" => true
            },
            "end_seconds" => {
              "required" => true,
              "min" => 0
            },
            "model" => {
              "required" => true
            },
            "start_seconds" => {
              "required" => true,
              "min" => 0
            }
          }
        }
      },
      "add-vocals" => {
        "models" => ["suno-v4.5-plus", "suno-v5"],
        "fields_by_model" => {
          "suno-v4.5-plus" => {
            "lyrics" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "negative_tags" => {
              "required" => true
            },
            "style" => {
              "required" => true
            },
            "title" => {
              "required" => true
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          },
          "suno-v5" => {
            "lyrics" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "negative_tags" => {
              "required" => true
            },
            "style" => {
              "required" => true
            },
            "title" => {
              "required" => true
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          }
        }
      },
      "blend-lyrics" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "lyrics_a" => {
              "required" => true
            },
            "lyrics_b" => {
              "required" => true
            }
          }
        }
      },
      "boost-style" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "description" => {
              "required" => true
            }
          }
        }
      },
      "check-voice" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "task_id" => {
              "required" => true
            }
          }
        }
      },
      "convert-audio" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "audio_id" => {
              "required" => true
            },
            "task_id" => {
              "required" => true
            }
          }
        }
      },
      "cover-audio" => {
        "models" => ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model" => {
          "suno-v4" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v4.5" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v4.5-all" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v4.5-plus" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v5" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v5.5" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url" => {
              "required" => true
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          }
        },
        "rules" => [{
          "when" => {
            "vocal_mode" => "auto_lyrics"
          },
          "required" => ["prompt"],
          "forbidden" => ["lyrics", "style", "title"]
        }, {
          "when" => {
            "vocal_mode" => "exact_lyrics"
          },
          "required" => ["lyrics", "style", "title"],
          "forbidden" => ["prompt"]
        }, {
          "when" => {
            "vocal_mode" => "instrumental"
          },
          "required" => ["style", "title"],
          "forbidden" => ["prompt", "lyrics"]
        }]
      },
      "create-mashup" => {
        "models" => ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model" => {
          "suno-v4" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url_list" => {
              "required" => true,
              "min_items" => 2,
              "max_items" => 2
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v4.5" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url_list" => {
              "required" => true,
              "min_items" => 2,
              "max_items" => 2
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v4.5-all" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url_list" => {
              "required" => true,
              "min_items" => 2,
              "max_items" => 2
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v4.5-plus" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url_list" => {
              "required" => true,
              "min_items" => 2,
              "max_items" => 2
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v5" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url_list" => {
              "required" => true,
              "min_items" => 2,
              "max_items" => 2
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v5.5" => {
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "upload_url_list" => {
              "required" => true,
              "min_items" => 2,
              "max_items" => 2
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          }
        },
        "rules" => [{
          "when" => {
            "vocal_mode" => "auto_lyrics"
          },
          "required" => ["prompt"],
          "forbidden" => ["lyrics", "style", "title"]
        }, {
          "when" => {
            "vocal_mode" => "exact_lyrics"
          },
          "required" => ["lyrics", "style", "title"],
          "forbidden" => ["prompt"]
        }, {
          "when" => {
            "vocal_mode" => "instrumental"
          },
          "required" => ["style", "title"],
          "forbidden" => ["prompt", "lyrics"]
        }]
      },
      "extend-music" => {
        "models" => ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model" => {
          "suno-v4" => {
            "model" => {
              "required" => true
            },
            "parameter_mode" => {
              "enum" => ["source", "custom"],
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          },
          "suno-v4.5" => {
            "model" => {
              "required" => true
            },
            "parameter_mode" => {
              "enum" => ["source", "custom"],
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          },
          "suno-v4.5-all" => {
            "model" => {
              "required" => true
            },
            "parameter_mode" => {
              "enum" => ["source", "custom"],
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          },
          "suno-v4.5-plus" => {
            "model" => {
              "required" => true
            },
            "parameter_mode" => {
              "enum" => ["source", "custom"],
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          },
          "suno-v5" => {
            "model" => {
              "required" => true
            },
            "parameter_mode" => {
              "enum" => ["source", "custom"],
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          },
          "suno-v5.5" => {
            "model" => {
              "required" => true
            },
            "parameter_mode" => {
              "enum" => ["source", "custom"],
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            }
          }
        }
      },
      "generate-artwork" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "task_id" => {
              "required" => true
            }
          }
        }
      },
      "generate-lyrics" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "prompt" => {
              "required" => true
            }
          }
        }
      },
      "generate-midi" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "task_id" => {
              "required" => true
            }
          }
        }
      },
      "generate-persona" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "audio_id" => {
              "required" => true
            },
            "description" => {
              "required" => true
            },
            "name" => {
              "required" => true
            },
            "task_id" => {
              "required" => true
            }
          }
        }
      },
      "generate-voice" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "singer_skill_level" => {
              "enum" => ["beginner", "intermediate", "advanced", "professional"]
            },
            "task_id" => {
              "required" => true
            },
            "verify_url" => {
              "required" => true
            }
          }
        }
      },
      "get-timestamped-lyrics" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "audio_id" => {
              "required" => true
            },
            "task_id" => {
              "required" => true
            }
          }
        }
      },
      "regenerate-validation-phrase" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "task_id" => {
              "required" => true
            }
          }
        }
      },
      "remaster-audio" => {
        "models" => ["suno-v4", "suno-v4.5", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model" => {
          "suno-v4" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          },
          "suno-v4.5" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          },
          "suno-v4.5-plus" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          },
          "suno-v5" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          },
          "suno-v5.5" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          }
        }
      },
      "replace-section" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "full_lyrics" => {
              "required" => true
            },
            "infill_end_time" => {
              "required" => true
            },
            "infill_start_time" => {
              "required" => true
            },
            "lyrics" => {
              "required" => true
            },
            "model" => {
              "enum" => ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"]
            },
            "tags" => {
              "required" => true
            },
            "title" => {
              "required" => true
            }
          }
        }
      },
      "separate-audio-stems" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "audio_id" => {
              "required" => true
            },
            "stem_name" => {
              "enum" => ["Lead Vocal", "Drum Kit", "Kick", "Snare", "Risers", "Bass", "Backing Vocals", "Piano", "Electric Guitar", "Percussion", "String Section", "Synth", "Acoustic Guitar", "Sound Effects", "Synth Pad", "Synth Bass", "Guitar", "Brass Section", "Organ", "Electronic Drum Kit", "Lead Electric Guitar", "Synth Keys", "Rhythm Electric Guitar", "Electric Piano", "Upright Bass", "Keyboards", "Distorted Electric Guitar", "Synth Strings", "Synth Lead", "Woodwinds", "Rhythm Acoustic Guitar", "Flute", "Harp", "Tambourine", "Trumpet", "Arpeggiator", "Accordion", "Fiddle", "Pedal Steel Guitar", "Synth Voice", "Violin", "Digital Piano", "Synth Brass", "Mandolin", "Choir", "Banjo", "Bells", "Clarinet", "Tenor Saxophone", "Trombone", "Shaker", "French Horn", "Glockenspiel", "Electric Bass", "Cello", "Timpani", "Harmonica", "Marimba", "Vibraphone", "Lap Steel Guitar", "Saxophone", "Orchestra", "Horns", "Cymbals", "Hand Clap", "Oboe", "Celesta", "Congas", "Drone", "Alto Saxophone", "Double Bass", "Ukulele", "Harpsichord", "Baritone Saxophone", "Xylophone", "Tuba", "Bass Guitar", "Whistle", "Lead Guitar", "Rhodes", "808", "Bongos", "Bassoon", "Cowbell", "Viola", "Sitar", "Steel Drums", "Piccolo", "Theremin", "Bagpipes", "Hi-Hat", "Music Box", "Melodica", "Tabla", "Koto", "Djembe", "Taiko", "Didgeridoo"]
            },
            "task_id" => {
              "required" => true
            },
            "type" => {
              "enum" => ["separate_vocal", "split_stem", "split_stem_advanced"]
            }
          }
        },
        "rules" => [{
          "when" => {
            "type" => "split_stem_advanced"
          },
          "required" => ["stem_name"]
        }]
      },
      "stitch-audio" => {
        "models" => ["suno-v4", "suno-v4.5", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model" => {
          "suno-v4" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          },
          "suno-v4.5" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          },
          "suno-v4.5-plus" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          },
          "suno-v5" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          },
          "suno-v5.5" => {
            "audio_id" => {
              "required" => true
            },
            "model" => {
              "required" => true
            },
            "source_task_id" => {
              "required" => true
            }
          }
        }
      },
      "text-to-music" => {
        "models" => ["suno-v4", "suno-v4.5", "suno-v4.5-all", "suno-v4.5-plus", "suno-v5", "suno-v5.5"],
        "fields_by_model" => {
          "suno-v4" => {
            "duration_seconds" => {
              "min" => 10,
              "max" => 360,
              "type" => "integer"
            },
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v4.5" => {
            "duration_seconds" => {
              "min" => 10,
              "max" => 360,
              "type" => "integer"
            },
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v4.5-all" => {
            "duration_seconds" => {
              "min" => 10,
              "max" => 360,
              "type" => "integer"
            },
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v4.5-plus" => {
            "duration_seconds" => {
              "min" => 10,
              "max" => 360,
              "type" => "integer"
            },
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v5" => {
            "duration_seconds" => {
              "min" => 10,
              "max" => 360,
              "type" => "integer"
            },
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          },
          "suno-v5.5" => {
            "duration_seconds" => {
              "min" => 10,
              "max" => 360,
              "type" => "integer"
            },
            "model" => {
              "required" => true
            },
            "persona_type" => {
              "enum" => ["style", "voice"]
            },
            "vocal_gender" => {
              "enum" => ["male", "female"]
            },
            "vocal_mode" => {
              "enum" => ["auto_lyrics", "exact_lyrics", "instrumental"],
              "required" => true
            }
          }
        },
        "rules" => [{
          "when" => {
            "vocal_mode" => "auto_lyrics"
          },
          "required" => ["prompt"],
          "forbidden" => ["lyrics", "style", "title", "negative_tags", "vocal_gender", "duration_seconds"]
        }, {
          "when" => {
            "vocal_mode" => "exact_lyrics"
          },
          "required" => ["lyrics", "style", "title"],
          "forbidden" => ["prompt"]
        }, {
          "when" => {
            "vocal_mode" => "instrumental"
          },
          "required" => ["style", "title"],
          "forbidden" => ["prompt", "lyrics", "vocal_gender"]
        }, {
          "when" => {
            "model" => "suno-v4"
          },
          "forbidden" => ["duration_seconds"]
        }, {
          "when" => {
            "model" => "suno-v4.5"
          },
          "forbidden" => ["duration_seconds"]
        }, {
          "when" => {
            "model" => "suno-v4.5-all"
          },
          "forbidden" => ["duration_seconds"]
        }, {
          "when" => {
            "model" => "suno-v4.5-plus"
          },
          "forbidden" => ["duration_seconds"]
        }, {
          "when" => {
            "model" => "suno-v5"
          },
          "forbidden" => ["duration_seconds"]
        }]
      },
      "text-to-sound" => {
        "models" => ["suno-v5", "suno-v5.5"],
        "fields_by_model" => {
          "suno-v5" => {
            "model" => {
              "required" => true
            },
            "prompt" => {
              "required" => true
            },
            "sound_key" => {
              "enum" => ["Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "A#m", "Bm", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
            },
            "sound_tempo" => {
              "type" => "integer"
            }
          },
          "suno-v5.5" => {
            "model" => {
              "required" => true
            },
            "prompt" => {
              "required" => true
            },
            "sound_key" => {
              "enum" => ["Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "A#m", "Bm", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
            },
            "sound_tempo" => {
              "type" => "integer"
            }
          }
        }
      },
      "visualize-music" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "audio_id" => {
              "required" => true
            },
            "task_id" => {
              "required" => true
            }
          }
        }
      },
      "voice-to-validation-phrase" => {
        "models" => [],
        "fields_by_model" => {
          "_" => {
            "language" => {
              "enum" => ["en", "zh", "es", "fr", "pt", "de", "ja", "ko", "hi", "ru"]
            },
            "vocal_end_seconds" => {
              "required" => true,
              "type" => "integer"
            },
            "vocal_start_seconds" => {
              "required" => true,
              "type" => "integer"
            },
            "voice_url" => {
              "required" => true
            }
          }
        }
      }
    }.freeze
  end
end
