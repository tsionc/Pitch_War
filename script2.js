
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

var Notes = ['A','A-Sharp', 'B', 'C','C-Sharp', 'D','D-Sharp', 'E', 'F','F-Sharp', 'G', 'G-Sharp'];
var playlist = ['Piano/noteA.wav','Piano/noteA_sharp.wav', 'Piano/noteB.wav', 'Piano/noteC.wav','Piano/noteC_sharp.wav', 'Piano/noteD.wav','Piano/noteD_sharp.wav', 'Piano/noteE.wav', 'Piano/noteF.wav','Piano/noteF_sharp.wav' ,'Piano/noteG.wav','Piano/noteG_sharp.wav'];
//var soundEffect=
console.log(Notes);

var Answers = "";
var SoundAnswer="";
let Target ="";

async function load2()
{
  var random= Math.floor(Math.random() * 12);
   Target  = Notes[random];
  console.log(Target);
  let SoundTarget = playlist[random];
   console.log(SoundTarget);
  Answers = Notes.filter(note => note != Target);
   console.log(SoundTarget, SoundAnswer);
  Answsers = shuffle(Answers);
   console.log(Answers);
  Answers = Answers.slice(0, 2);
  console.log(Answers);
  Answers.push(Target);
  Answers.sort();
  console.log('answers', Answers);
  AnswerList2();
await say("question" + count + ", What Note is this");
await  play(SoundTarget);


//  console.log( play(SoundTarget));

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
else if (Answers[c]=="A-Sharp")
{
  await play('Piano/noteA_sharp.wav');
}
else if (Answers[c]=="C-Sharp")
{
  await play('Piano/noteC_sharp.wav');
}
else if (Answers[c]=="D-Sharp")
{
  await play('Piano/noteD_sharp.wav');
}
else if (Answers[c]=="F-Sharp")
{
  await play('Piano/noteF_sharp.wav');
}
else if (Answers[c]=="G-Sharp")
{
  await play('Piano/noteG_sharp.wav');
}
}
function AnswerList2()
{
  document.getElementById("option1").innerHTML =Answers[0];
  document.getElementById("option2").innerHTML = Answers[1];
  document.getElementById("option3").innerHTML = Answers[2];;

}

async function nextQuestion()
{
 if(count <=5)
  {
    await load2();
  }
  else {
    await  say("Total score is" + score + ", out of 5");
    if (score == 5)
      {

        await  say("You are really on your way to having perfect pitch, Keep working on it.");
    }

    await  say("You have  reached the end of the Game, Press Enter to return to the start");
  //  await sound.end();
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
    window.location.href = "Pitch_War.html";
}
});
