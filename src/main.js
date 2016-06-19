var playhead = 0;
var laskuri = 0;
var a = 0;
var d = 1;
var soita = 0;
var tef = 0;
var raita = "audio0";
var audio;

$( function () {
    audio = document.getElementById(raita);
    audio.src = bookcliptimesmp3[a];
    tekstiotsikko();
});

function tekstiotsikko (){

 document.getElementById("daisytitle").textContent = titles[tef+1] ;

}


function teksti (){

 document.getElementById("tekstia").textContent = a ;

}



function tekstitef (){

 document.getElementById("tekstitef").textContent = jakso[tef] ;

}



function myFunctiontimechange (){
 playhead = audio.currentTime;
}




function myFunctionstopped (){

 tef++;
 a = jakso[tef]; 
 audio.src = bookcliptimesmp3[a];
 audio.currentTime = bookcliptimes[a];
	
 myFunction();

}




function myFunction(){
 if (a < jakso[tef] ){
  a = jakso[tef];
  tef--;
  a--	;
 }
//alert ("javascript toimii");
 audio = document.getElementById("audio0");
 tekstiotsikko();
 teksti();
 tekstitef();
 audio.play();
 audio.onended = function() {

 myFunctionstopped();
 };

}


function myFunction2(){
	
//audio = document.getElementById(raita);
	
 audio.pause();
 soita = 0;
 //raita = "audio"+soita;
 tef = 0;
 a = 0;
 audio.src = bookcliptimesmp3[a];
 audio.currentTime = 0;
 tekstiotsikko();
}

function myFunction3(){
 audio = document.getElementById(raita);
 audio.pause();
}

function myFunctionseuraava() {

 if (soita !== 1000) {
	
  audio.pause();
  //waitSeconds(250);
  audio = document.getElementById(raita);
  audio.currentTime = playhead
  playhead = audio.currentTime;
  a++;	
  while (playhead > bookcliptimes[a]){
  a++;
  }
//a = a+1;
//soita = a;
  raita = "audio"+0;
  audio = document.getElementById("audio0");
  playhead = bookcliptimes[a];
  //audio.src = bookcliptimesmp3[a];
  audio.currentTime = bookcliptimes[a];
  //audio.play();	


  if (a < jakso[tef+1]){
  myFunction();
  } else {myFunctionstopped();}
  			}
	

	
}

function myFunctionedellinen() {
	
 if (a !== 0){
 audio.pause();
 playhead = audio.currentTime;
 a = jakso[tef];	;
 a--;
  while (playhead > bookcliptimes[a]){
  a++;
  }


 a = a - 2;
		
 audio.src = bookcliptimesmp3[a];
 audio.currentTime = bookcliptimes[a]; 
 myFunction();

  }
}

	

function myFunctionseuraavaosio(){
//audio = document.getElementById(raita);
	playhead = audio.currentTime;
	

	raita = "audio"+0;
	playhead = a;

	tef++;
	a = jakso[tef]; 
	audio.src = bookcliptimesmp3[a];
	audio.currentTime = bookcliptimes[a];
	
	myFunction();


}

function myFunctionedellinenosio(){

	if (tef !== 0){
	//audio = document.getElementById(raita);
	playhead = audio.currentTime;
	
	raita = "audio"+0;
	playhead = a;
	tef--;
	a = jakso[tef]; 
	audio.src = bookcliptimesmp3[a];
	audio.currentTime = bookcliptimes[a];
	
	myFunction();
}

}

function waitSeconds(iMilliSeconds) {
    var counter= 0
        , start = new Date().getTime()
        , end = 0;
    while (counter < iMilliSeconds) {
        end = new Date().getTime();
        counter = end - start;
    }
}