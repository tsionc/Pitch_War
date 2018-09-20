
// allow us to easily wait for speech

function say(s) {
  let msg = new SpeechSynthesisUtterance(s);
  return new Promise(resolve => {
    msg.lang = 'en-US';
    msg.onend = (event) => {
      console.log(3); resolve('done');}
    speechSynthesis.speak(msg);
  });
}

// easily wait for sounds
function play(path) {
  return new Promise(resolve => {
    let sound = new Howl({
      src: [path]
    });
    sound.once('end', resolve);
    sound.play();
  });
}
async function hello()
{
 await play('SoundEffect/introMusic.mp3');
 await say('Welcome to Pitch war, Press Space to Start');

}
async function intrsuction()
{
  await	say("Press Space to start");
}

document.addEventListener('keydown', event => {
  console.log('kd', event);
if (event.keyCode == '32')
  {
    	window.location.href = "Game Screen.html";
  }
  else
{
  intrsuction();

}
});
