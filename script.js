// Initialize the model.
// music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
// Instantiate the model by specifying the desired checkpoint.
const model = new mm.MusicVAE(
    'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/trio_4bar');
model.initialize();

//const player = new mm.Player();
const player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus')

let stopSignal = false;
let tempo = 80;

const playAndPause = () => {
    if (player.isPlaying()) {
        player.stop();
        return;
    }

    return model.sample(8)
        .then((samples) => player.start(samples[0], tempo))
        .then(stopSignal ? undefined : playAndPause)
};

// Play button logic
const playButton = document.querySelector('#playButton');
playButton.addEventListener('click', playAndPause);