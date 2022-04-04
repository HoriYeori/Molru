import abcjs from "abcjs";
import "./style.css";
import 'abcjs/abcjs-audio.css';

// let str1 = "";
// let str2 = "";
// let str3 = "";
// let example2 = ["C","D","E","F","G","A","B","C,","D,"];
// //"E,","F,","G,","A,","B,","C","D","E","F","G","A","B","c","d","e","f","g","a","b","c'","d'","e'","f'","g'","a'","b'"
// var myText = document.getElementById('editor');
// myText.value = ('X: 1 \n' + 'T: setting \n' + 'M: 4/4 \n' + 'L: 1/8 \n' + 'K: Emin \n' + '|:' + str3 + '|' + str2 + '|'); 

// var mkmd = document.getElementById('gacha');
// mkmd.addEventListener('click', function(){
//     for(var i=0; i<4; ++i){
//       str2+=example2[Math.floor(Math.random()*example2.length)];
//     }
//     str3 = example2[Math.floor(Math.random()*example2.length)];
// });

// //지금 읽히지 못해서 쓰이고 있지 못 하는듯? 쓰이는 식으로 바꿔야합니다.
// let editor = new abcjs.Editor(editArea, editorParams);
// window.onload = function(){
//   abc_editor = new abcjs.Editor("editor", {
//     canvas_id: "paper",
//     warnings_id: "warning",
//     synth: {
//       el: "#controls",
//       options: {
//         displayLoop: true,
//         displayRestart: true,
//         displayPlay: true,
//         displayProgress: true,
//         displayWarp: true
//       }
//     }
//   });
// }
            
// var cb = document.getElementById('connect_back');
// cb.addEventListener('click', function(){
//   str2+=str1;
//       });

// var cf = document.getElementById('connect_front');
// cf.addEventListener('click', function(){
//   str2=str1+str2;
//       });

// var fm = document.getElementById('flush_melody');
// fm.addEventListener('click', function(){
//         str3="";
//         str2="";
//       });=

// var cm = document.getElementById('check_melody');
// cm.addEventListener('click', function(){
//         alert('Hello check_melody');
//         //배열 선언해서 그 배열안에 있는 것들 확인하기 
//       });
                 




// 잘 안되는 코드. 왜 안되는지 모르겠음. 연구중 : https://paulrosen.github.io/abcjs/visual/overview.html#multiple-tunes
// 4/4 되""는데? 한번에 되네..
let example2 = ["C","D","E","F","G","A","B","C,","D,"];
// "E,","F,","G,","A,","B,","C","D","E","F","G","A","B","c","d","e","f","g","a","b","c'","d'","e'","f'","g'","a'","b'"



// var str = "a";
// var abcString = "X:1\nT:Example\nK:Bb\nBcff"+str+"|\n";
var abcString="";

var mkmd = document.getElementById('gacha');
mkmd.addEventListener('click', function(){
    for(var i=0; i<4; ++i){
      abcString+=example2[Math.floor(Math.random()*example2.length)];
    }
    // str3 = example2[Math.floor(Math.random()*example2.length)];
    abcjs.renderAbc("paper", abcString);

});

var cb = document.getElementById('connect_back');
cb.addEventListener('click', function(){
  alert("뒤에 연결");
      });

var cf = document.getElementById('connect_front');
cf.addEventListener('click', function(){
  alert("앞에 연결");
      });

var fm = document.getElementById('flush_melody');
fm.addEventListener('click', function(){
  alert("보관 비우기");
  abcString="";
  abcjs.renderAbc("paper", abcString);
      });

var cm = document.getElementById('check_melody');
cm.addEventListener('click', function(){
        alert('Hello check_melody');
        //배열 선언해서 그 배열안에 있는 것들 확인하기 
      });

var dm = document.getElementById('download_melody');
dm.addEventListener('click', function(){
      alert('file download');
      });

var am = document.getElementById('all_melody');
am.addEventListener('click', function(){
  alert('all download');
});