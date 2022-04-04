import abcjs from "abcjs";
import "./style.css";
import 'abcjs/abcjs-audio.css';

let example2 = ["C","D","E","F","G","A","B","C,","D,","E,","F,","G,","A,","B,","C","D","E","F","G","A","B","c","d","e","f","g","a","b","c'","d'","e'","f'","g'","a'","b'"];
var abcString="";

var synth = new abcjs.synth.CreateSynth();
// var synthControl = new ABCJS.synth.SynthController();

var mkmd = document.getElementById('gacha');

var audioParams = { chordsOff: true };
var CursorControl = function () {
  this.beatSubdivisions = 2;
  this.onStart = function () {
    console.log("The tune has started playing.");
  };
  this.onFinished = function () {
    console.log("The tune has stopped playing.");
  };
  this.onBeat = function (beatNumber) {
    console.log("Beat " + beatNumber + " is happening.");
  };
  this.onEvent = function (event) {
    console.log("An event is happening", event);
  };
};
var cursorControl = new CursorControl();
mkmd.addEventListener("click", function () {
  abcString = "";
  for (var i = 0; i < 16; ++i) {
    abcString += example2[Math.floor(Math.random() * example2.length)];
  }

  if (abcjs.synth.supportsAudio()) {
    var synthControl = new abcjs.synth.SynthController();
    synthControl.load("#audio", cursorControl, {
      displayLoop: true,
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
      displayWarp: true,
    });

    var visualObj = abcjs.renderAbc("paper", abcString);
    var synth = new abcjs.synth.CreateSynth();

    synth
      .init({
        visualObj: visualObj[0],
      })
      .then(function () {
        synthControl
          .setTune(visualObj[0], false, audioParams)
          .then(function () {
            console.log("audio successfully loaded");
            synth.prime().then(function () {
              var a = document.createElement("a");
              document.body.appendChild(a);
              a.style = "display: none";

              var url = synth.download();
              a.href = url;
              a.download = abcString + "-fwr-recording.wav";
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            });
          })
          .catch(function (error) {
            console.warn("Audio problem: ", error);
          });
      })
      .catch(function (reason) {
        console.log(reason);
      });
  }
});

//뒤에 연결
var cb = document.getElementById('connect_back');
cb.addEventListener('click', function(){
  for(var i=0; i<16; ++i){
    abcString+=example2[Math.floor(Math.random()*example2.length)];
  }
  abcjs.renderAbc("paper", abcString);
});

//앞에 연결
var cf = document.getElementById('connect_front');
cf.addEventListener('click', function(){
  for(var i=0; i<4; ++i){
    abcString=example2[Math.floor(Math.random()*example2.length)]+abcString;
  }
  abcjs.renderAbc("paper", abcString);
});

//보관함 비우기
var fm = document.getElementById('flush_melody');
fm.addEventListener('click', function(){
  alert("보관 비우기");
  abcString="";
  abcjs.renderAbc("paper", abcString);
});

//보관함 확인
var cm = document.getElementById('check_melody');
cm.addEventListener('click', function(){
  //보유 멜로디 확인, abcString에 현재 누른 상황에서 갖고 있는 멜로디가 저장됨을 알 수 있음. 
  alert(abcString);
});

//다운로드 -> 자동화 완료
var dm = document.getElementById('download_melody');
dm.addEventListener('click', function(){
  //다운로드 멜로디
  alert('file download');
});

//전체 멜로디 확인
var am = document.getElementById('all_melody');
am.addEventListener('click', function(){
  //순열로 만들어진 전체 멜로디 확인하기
  //순열이 아직 안됨. 다운로드 구현하고 빨리 만들 것. 
  alert('all melody chk');
});