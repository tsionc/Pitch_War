
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
//  shuffles the  answer choices
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var Notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var playlist = ['Piano/noteA.wav', 'Piano/noteB.wav', 'Piano/noteC.wav', 'Piano/noteD.wav', 'Piano/noteE.wav', 'Piano/noteF.wav', 'Piano/noteG.wav'];
//var soundEffect=
console.log(Notes);

var Answers = "";
var SoundAnswer="";
let Target ="";

async function load()
{
  var random= Math.floor(Math.random() *7);
   Target  = Notes[random];
  console.log(Target);
  let SoundTarget = playlist[random];
 console.log(SoundTarget);
  Answers = Notes.filter(note => note != Target);
  console.log(Target, Answers);
  Answsers = shuffle(Answers);
  console.log(SoundAnswer);
  Answers = Answers.slice(0, 2);
  console.log(Answers);
  Answers.push(Target);
console.log('answers', Answers);
AnswerList();
await say("question" + count + ", What Note is this");
await  play(SoundTarget);

}
// nextRound
let score = 0;
let count= 1;
var c = -1;
async function nextChoice()
 {
  c = (c + 1) % Answers.length;
console.log(c, Answers[c]);
await  say('Note ' + Answers[c]);
if (Answers[c]=="A")
{
  await play('Piano/noteA.wav');
}
else if (Answers[c]=="B")
{
  await play('Piano/noteB.wav');
}
else if (Answers[c]=="C")
{
  await play('Piano/noteC.wav');
}else if (Answers[c]=="D")
{
  await play('Piano/noteD.wav');
}else if (Answers[c]=="E")
{
  await play('Piano/noteE.wav');
}else if (Answers[c]=="F")
{
  await play('Piano/noteF.wav');
}else if (Answers[c]=="G")
{
  await play('Piano/noteG.wav');
}

}




async function AnswerSelected()
{

        count ++

        if (Answers[c] == Target) {
          await  play('SoundEffect/correct.wav');
            score++;

          await  say("Score is" + score);
          await nextQuestion();

          }
          else {

          score=score;

        await  play('SoundEffect/boo.wav');
       await say("The Correct score was " + Target);
      await say("Score is" + score);
      await nextQuestion();


    }
}
function AnswerList()
{
  document.getElementById("option1").innerHTML =Answers[0];
  document.getElementById("option2").innerHTML = Answers[1];
  document.getElementById("option3").innerHTML = Answers[2];;
  // document.getElementById("score").innerHTML = "Your score is: " + score;
}
async function nextQuestion()
{
 if(count <=5)
  {
    await load();
  }
  else {
      await  say("Total score is" + score + ", out of 5 ");
    if(score >=3){
        await  say("Since you did so well Total score is" + score *10);
        await  say("if you want to go to the next level press Space");
    }
    else {
          await  say("Thank you for playing,  to start over press Enter");
      }
    }
  }
async function ending()
{
  score=0;
  count=0;
  await say("Ok! You have restarted the game. Good luck");
  location.reload();

}


document.addEventListener('keydown', event => {
  console.log('kd', event);
  if (event.key == 'ArrowRight') {
    nextChoice();
  } else if (event.key == 'ArrowLeft')
  {
    AnswerSelected();
  }
  else if (event.key == 'Enter')
{
  window.location.href = "Pitch_War.html";

}
else if (event.keyCode == '32')
{
    window.location.href = "SecondLevel.html";
}
});
