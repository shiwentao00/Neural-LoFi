TWINKLE_TWINKLE = {
    notes: [
        { pitch: 60, startTime: 0.0, endTime: 0.5 },
        { pitch: 60, startTime: 0.5, endTime: 1.0 },
        { pitch: 67, startTime: 1.0, endTime: 1.5 },
        { pitch: 67, startTime: 1.5, endTime: 2.0 },
        { pitch: 69, startTime: 2.0, endTime: 2.5 },
        { pitch: 69, startTime: 2.5, endTime: 3.0 },
        { pitch: 67, startTime: 3.0, endTime: 4.0 },
        { pitch: 65, startTime: 4.0, endTime: 4.5 },
        { pitch: 65, startTime: 4.5, endTime: 5.0 },
        { pitch: 64, startTime: 5.0, endTime: 5.5 },
        { pitch: 64, startTime: 5.5, endTime: 6.0 },
        { pitch: 62, startTime: 6.0, endTime: 6.5 },
        { pitch: 62, startTime: 6.5, endTime: 7.0 },
        { pitch: 60, startTime: 7.0, endTime: 8.0 },
    ],
    totalTime: 8
};

// Initialize the model.
music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
music_rnn.initialize();

// Create a player to play the sequence we'll get from the model.
// rnnPlayer = new mm.Player();
rnnPlayer = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
rnnPlayer.setTempo(64);

function play() {    
    if (rnnPlayer.isPlaying()) {
        rnnPlayer.stop();
        return;
    }

    rnn_steps = 100;
    rnn_temperature = 2;
    
    // The model expects a quantized sequence, and ours was unquantized:
    const qns = mm.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
    music_rnn
        .continueSequence(qns, rnn_steps, rnn_temperature)
        .then((sample) => rnnPlayer.start(sample));
}


// Play button logic
const playButton = document.querySelector('#playButton');
playButton.addEventListener('click', play);