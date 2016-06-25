var playhead = 0;
var laskuri = 0;
var a = 0;
var d = 1;
var soita = 0;
var tef = 0;
var raita = "audio0";
var audio;
// variable for  the button used to play and pause the audio
var playButton;

$( function () {
    audio = document.getElementById(raita);
    audio.src = bookcliptimesmp3[a];
    // get button used to play and pause audio
    playButton = $( '#playButton' );
    // set the play / pause button to play audio when clicked
    playButton.on( 'click', myFunction );
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
 
 // remove this method as the play button handler
 playButton.off( 'click', myFunction  );
 // add the method that pauses playback as the handler for play / pause button
 playButton.on( 'click', myFunction3 );
 // and change the button text
 playButton.html( buttonTexts.pause );
}


function myFunction2(){
	
//audio = document.getElementById(raita);
	
 // pause audio and change the play / pause button to play button
 myFunction3();
 soita = 0;
 //raita = "audio"+soita;
 tef = 0;
 a = 0;
 audio.src = bookcliptimesmp3[a];
 audio.currentTime = 0;
 tekstiotsikko();
}

function myFunction3(){
 audio.pause();
 // remove this method as the event handler for the play / pause utton
 playButton.off( 'click', myFunction3 );
 // add the method that starts playback as the event handler for the button
 playButton.on( 'click', myFunction );
 // change button text
 playButton.html( buttonTexts.play );
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