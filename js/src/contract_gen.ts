export const contract = {
  "add-instrumental": {
    "models": [
      "suno-v4.5-plus",
      "suno-v5",
      "suno-v5.5"
    ],
    "fields_by_model": {
      "suno-v4.5-plus": {
        "model": {
          "required": true
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      },
      "suno-v5": {
        "model": {
          "required": true
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      },
      "suno-v5.5": {
        "model": {
          "required": true
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      }
    }
  },
  "add-vocals": {
    "models": [
      "suno-v4.5-plus",
      "suno-v5"
    ],
    "fields_by_model": {
      "suno-v4.5-plus": {
        "lyrics": {
          "required": true
        },
        "model": {
          "required": true
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      },
      "suno-v5": {
        "lyrics": {
          "required": true
        },
        "model": {
          "required": true
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      }
    }
  },
  "boost-style": {
    "models": [],
    "fields_by_model": {
      "_": {}
    }
  },
  "check-voice": {
    "models": [],
    "fields_by_model": {
      "_": {
        "task_id": {
          "required": true
        }
      }
    }
  },
  "convert-audio": {
    "models": [],
    "fields_by_model": {
      "_": {}
    }
  },
  "cover-audio": {
    "models": [
      "suno-v4",
      "suno-v4.5",
      "suno-v4.5-all",
      "suno-v4.5-plus",
      "suno-v5",
      "suno-v5.5"
    ],
    "fields_by_model": {
      "suno-v4": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v4.5": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v4.5-all": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v4.5-plus": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v5": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v5.5": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      }
    },
    "rules": [
      {
        "when": {
          "vocal_mode": "auto_lyrics"
        },
        "required": [
          "prompt"
        ],
        "forbidden": [
          "lyrics",
          "style",
          "title"
        ]
      },
      {
        "when": {
          "vocal_mode": "exact_lyrics"
        },
        "required": [
          "lyrics",
          "style",
          "title"
        ],
        "forbidden": [
          "prompt"
        ]
      },
      {
        "when": {
          "vocal_mode": "instrumental"
        },
        "required": [
          "style",
          "title"
        ],
        "forbidden": [
          "prompt",
          "lyrics"
        ]
      }
    ]
  },
  "create-mashup": {
    "models": [
      "suno-v4",
      "suno-v4.5",
      "suno-v4.5-all",
      "suno-v4.5-plus",
      "suno-v5",
      "suno-v5.5"
    ],
    "fields_by_model": {
      "suno-v4": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url_list": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v4.5": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url_list": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v4.5-all": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url_list": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v4.5-plus": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url_list": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v5": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url_list": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v5.5": {
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "upload_url_list": {
          "required": true
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      }
    },
    "rules": [
      {
        "when": {
          "vocal_mode": "auto_lyrics"
        },
        "required": [
          "prompt"
        ],
        "forbidden": [
          "lyrics",
          "style",
          "title"
        ]
      },
      {
        "when": {
          "vocal_mode": "exact_lyrics"
        },
        "required": [
          "lyrics",
          "style",
          "title"
        ],
        "forbidden": [
          "prompt"
        ]
      },
      {
        "when": {
          "vocal_mode": "instrumental"
        },
        "required": [
          "style",
          "title"
        ],
        "forbidden": [
          "prompt",
          "lyrics"
        ]
      }
    ]
  },
  "extend-music": {
    "models": [
      "suno-v4",
      "suno-v4.5",
      "suno-v4.5-all",
      "suno-v4.5-plus",
      "suno-v5",
      "suno-v5.5"
    ],
    "fields_by_model": {
      "suno-v4": {
        "model": {
          "required": true
        },
        "parameter_mode": {
          "enum": [
            "source",
            "custom"
          ]
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      },
      "suno-v4.5": {
        "model": {
          "required": true
        },
        "parameter_mode": {
          "enum": [
            "source",
            "custom"
          ]
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      },
      "suno-v4.5-all": {
        "model": {
          "required": true
        },
        "parameter_mode": {
          "enum": [
            "source",
            "custom"
          ]
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      },
      "suno-v4.5-plus": {
        "model": {
          "required": true
        },
        "parameter_mode": {
          "enum": [
            "source",
            "custom"
          ]
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      },
      "suno-v5": {
        "model": {
          "required": true
        },
        "parameter_mode": {
          "enum": [
            "source",
            "custom"
          ]
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      },
      "suno-v5.5": {
        "model": {
          "required": true
        },
        "parameter_mode": {
          "enum": [
            "source",
            "custom"
          ]
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        }
      }
    }
  },
  "generate-artwork": {
    "models": [],
    "fields_by_model": {
      "_": {
        "task_id": {
          "required": true
        }
      }
    }
  },
  "generate-lyrics": {
    "models": [],
    "fields_by_model": {
      "_": {}
    }
  },
  "generate-midi": {
    "models": [],
    "fields_by_model": {
      "_": {}
    }
  },
  "generate-persona": {
    "models": [],
    "fields_by_model": {
      "_": {}
    }
  },
  "generate-voice": {
    "models": [],
    "fields_by_model": {
      "_": {
        "singer_skill_level": {
          "enum": [
            "beginner",
            "intermediate",
            "advanced",
            "professional"
          ]
        },
        "task_id": {
          "required": true
        },
        "verify_url": {
          "required": true
        }
      }
    }
  },
  "get-timestamped-lyrics": {
    "models": [],
    "fields_by_model": {
      "_": {}
    }
  },
  "regenerate-validation-phrase": {
    "models": [],
    "fields_by_model": {
      "_": {
        "task_id": {
          "required": true
        }
      }
    }
  },
  "replace-section": {
    "models": [],
    "fields_by_model": {
      "_": {
        "audio_id": {
          "required": true
        },
        "task_id": {
          "required": true
        }
      }
    }
  },
  "separate-audio-stems": {
    "models": [],
    "fields_by_model": {
      "_": {
        "audio_id": {
          "required": true
        },
        "task_id": {
          "required": true
        }
      }
    }
  },
  "text-to-music": {
    "models": [
      "suno-v4",
      "suno-v4.5",
      "suno-v4.5-all",
      "suno-v4.5-plus",
      "suno-v5",
      "suno-v5.5"
    ],
    "fields_by_model": {
      "suno-v4": {
        "duration_seconds": {
          "type": "integer"
        },
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v4.5": {
        "duration_seconds": {
          "type": "integer"
        },
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v4.5-all": {
        "duration_seconds": {
          "type": "integer"
        },
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v4.5-plus": {
        "duration_seconds": {
          "type": "integer"
        },
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v5": {
        "duration_seconds": {
          "type": "integer"
        },
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      },
      "suno-v5.5": {
        "duration_seconds": {
          "type": "integer"
        },
        "model": {
          "required": true
        },
        "persona_type": {
          "enum": [
            "style",
            "voice"
          ]
        },
        "vocal_gender": {
          "enum": [
            "male",
            "female"
          ]
        },
        "vocal_mode": {
          "enum": [
            "auto_lyrics",
            "exact_lyrics",
            "instrumental"
          ],
          "required": true
        }
      }
    },
    "rules": [
      {
        "when": {
          "vocal_mode": "auto_lyrics"
        },
        "required": [
          "prompt"
        ],
        "forbidden": [
          "lyrics",
          "style",
          "title"
        ]
      },
      {
        "when": {
          "vocal_mode": "exact_lyrics"
        },
        "required": [
          "lyrics",
          "style",
          "title"
        ],
        "forbidden": [
          "prompt"
        ]
      },
      {
        "when": {
          "vocal_mode": "instrumental"
        },
        "required": [
          "style",
          "title"
        ],
        "forbidden": [
          "prompt",
          "lyrics"
        ]
      }
    ]
  },
  "text-to-sound": {
    "models": [
      "suno-v5",
      "suno-v5.5"
    ],
    "fields_by_model": {
      "suno-v5": {
        "model": {
          "required": true
        },
        "prompt": {
          "required": true
        },
        "sound_key": {
          "enum": [
            "Cm",
            "C#m",
            "Dm",
            "D#m",
            "Em",
            "Fm",
            "F#m",
            "Gm",
            "G#m",
            "Am",
            "A#m",
            "Bm",
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B"
          ]
        },
        "sound_tempo": {
          "type": "integer"
        }
      },
      "suno-v5.5": {
        "model": {
          "required": true
        },
        "prompt": {
          "required": true
        },
        "sound_key": {
          "enum": [
            "Cm",
            "C#m",
            "Dm",
            "D#m",
            "Em",
            "Fm",
            "F#m",
            "Gm",
            "G#m",
            "Am",
            "A#m",
            "Bm",
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B"
          ]
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
      "_": {}
    }
  },
  "voice-to-validation-phrase": {
    "models": [],
    "fields_by_model": {
      "_": {
        "language": {
          "enum": [
            "en",
            "zh",
            "es",
            "fr",
            "pt",
            "de",
            "ja",
            "ko",
            "hi",
            "ru"
          ]
        },
        "vocal_end_seconds": {
          "required": true,
          "type": "integer"
        },
        "vocal_start_seconds": {
          "required": true,
          "type": "integer"
        }
      }
    }
  }
} as const;
