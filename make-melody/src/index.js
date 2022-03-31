import abc from "abcjs";
import "./style.css";
import "../node_modules/abcjs/abcjs-audio.css";


let str2 = "";
let str3 = "";
let example2 = ["C","D","E","F","G","A","B"];
//"C,","D,","E,","F,","G,","A,","B,","C","D","E","F","G","A","B","c","d","e","f","g","a","b","c'","d'","e'","f'","g'","a'","b'"
for(var i=0; i<4; ++i){
  str2+=example2[Math.floor(Math.random()*example2.length)];
}
str3 = example2[Math.floor(Math.random()*example2.length)];

// 여기서 함수를 만들어서 index.html에서 가져다가 쓸 수 있는건가?

var myText = document.getElementById('editor');
myText.value = ('X: 1 \n' + 'T: setting \n' + 
              'M: 4/4 \n' + 'L: 1/8 \n' + 'K: Emin \n' + '|:' + str3 + '|' + str2 + '|');



// 멜로디를 이미지로 바꾸는 건 라이브러리에서 해줌. 
// 그 이미지를 저장하는 것을 구현해야할 것 같고. 
// 멜로디를 저장하는 것도 라이브러리에서 해주는 거 같은데 찾아서 구현해야함.
// 결론은 abc.js를 더 파서 써봐야 한다는 것. 걍 자료형식으로 정리만 하면 될 것 같습니다. 명세서 정리하듯이.


//지금 읽히지 못해서 쓰이고 있지 못함. 쓰이는 식으로 바꿔야합니다.
const editor = new abc.Editor("editor", {
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

              
//스크립트가 위아래로 있으면 되나?
//외부 스크립트에서 불러오는 테스트 진행 중 
export function connectBack(){
        // 1. 동일길이의 문자열을 발급받아 저장한다. 
        // 2. 뒤에 더해준다. 
        // 3. 새로고침을 한다. 
        // window.location.reload();
        console.log("뒤로연결");
      }

      export function connectFront(){
        // 1. 동일길이의 문자열을 발급받아 저장한다. 
        // 2. 앞에 더해준다. 
        // 3. 새로고침을 한다. 
        // window.location.reload();
        console.log("앞으로연결");
      }