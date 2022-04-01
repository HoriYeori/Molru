import abc, { renderAbc } from "abcjs";
import "./style.css";
import "../node_modules/abcjs/abcjs-audio.css";


let str2 = "";
let str3 = "";
let example2 = ["C","D","E","F","G","A","B","C,","D,"];
//"E,","F,","G,","A,","B,","C","D","E","F","G","A","B","c","d","e","f","g","a","b","c'","d'","e'","f'","g'","a'","b'"
for(var i=0; i<4; ++i){
  str2+=example2[Math.floor(Math.random()*example2.length)];
}
str3 = example2[Math.floor(Math.random()*example2.length)];

var myText = document.getElementById('editor');
myText.value = ('X: 1 \n' + 'T: setting \n' + 
              'M: 4/4 \n' + 'L: 1/8 \n' + 'K: Emin \n' + '|:' + str3 + '|' + str2 + '|'); 
              


// 잘 안되는 코드. 왜 안되는지 모르겠음. 연구중 : https://paulrosen.github.io/abcjs/visual/overview.html#multiple-tunes
// var abcString = "X:1\nT:Example\nK:Bb\nBcde|\n";
// // renderAbc("editor", abcString);
// var el = document.getElementById("editor");
// renderAbc(el. abcString);


//지금 읽히지 못해서 쓰이고 있지 못함. 쓰이는 식으로 바꿔야합니다.
let editor = new abcjs.Editor(editArea, editorParams);
window.onload = function(){
  abc_editor = new abcjs.Editor("editor", {
    canvas_id: "paper",
    warnings_id: "warning",
    synth: {
      el: "#controls",
      options: {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true
      }
    }
  });
}

// const editor = new abc.Editor("editor", {
//   canvas_id: "paper",
//   warnings_id: "warning",
//   synth: {
//     el: "#controls",
//     options: {
//       displayLoop: true,
//       displayRestart: true,
//       displayPlay: true,
//       displayProgress: true,
//       displayWarp: true
//     }
//   }
// });

              
var cb = document.getElementById('connect_back');
cb.addEventListener('click', function(){
        alert('Hello connect_back');
      });

var cf = document.getElementById('connect_front');
cf.addEventListener('click', function(){
        alert('Hello connect_front');
      });

var fm = document.getElementById('flush_melody');
fm.addEventListener('click', function(){
        alert('Hello flush_melody');
      });

var cm = document.getElementById('check_melody');
cm.addEventListener('click', function(){
        alert('Hello check_melody');
      });
                 