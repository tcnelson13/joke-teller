const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const voiceRssKey = "";

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Pass Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: voiceRssKey,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// Event Listeners
button.addEventListener("click", () => {
  toggleButton();
  getJokes();
});

audioElement.addEventListener("ended", () => {
  toggleButton();
});
