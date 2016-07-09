var playhead = 0;
var laskuri = 0;
var a = 0;
var d = 1;
var soita = 0;
var tef = 0;
var raita = "audio0";
var audio;
// variable for the current playback speed
var speed = 1.0;
// variable for  the button used to play and pause the audio
var playButton;

// the following is called when the document has been loaded i.e. we can start manipulating it
$( function () {
    audio = document.getElementById(raita);
    audio.src = bookcliptimesmp3[a];
    // get button used to play and pause audio
    playButton = $( '#playButton' );
    // set the play / pause button to play audio when clicked
    playButton.on( 'click', myFunction );
    // set event handler for when a audio file is finished.
    // the handler will make the audio element to play the next file
    $( audio ).on( 'ended', myFunctionstopped );
    // set event handler for when audio starts playing
    $( audio ).on( 'playing', onPlaying );
    // set event handlers for the radio buttons used to change playback speed
    $( '.speedselector' ).on( 'click', changeSpeed );
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

function myFunctionstopped (){
 tef++;
 // start playing the file indicated by tef
 changeFile();
}

// starts playing the file indicated by the global variable tef
// this is used in event handlers when changing files based on user request (previous or next section)
// or when current file ends
function changeFile() {
    a = jakso[tef];
    audio.src = bookcliptimesmp3[a];
    var currentClipStart = bookcliptimes[a];
    try {
        // try setting the currenttime for audio right away
        // this doesn't work with Internet Explorer instead it throws an exception which 
        // we will catch and deal with later
        audio.currentTime = currentClipStart;
        myFunction();
    }
    
    catch (err) {
        // did not manage to set the currenttime 
        // set the currenttime and start playing when the browser is ready to play
        // the canplay event doesn't work as we want on IoS so we cannot just use it in every case
        $( audio ).one( 'canplay', function () {
            audio.currentTime = currentClipStart;
            myFunction();
        });
    }
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
 
 // remove this method as the play button handler
 // also possibly removes the pause event handler method which may be added otherwise multiple times when
 // this mehod is called when a new section is started
 playButton.off( 'click' );
 // add the method that pauses playback as the handler for play / pause button
 playButton.on( 'click', pause );
 // and change the button text
 playButton.html( buttonTexts.pause );
}


// called when the stop button is pressed. Stops the book playback and returns to the beginning of the book
function stop(){	
 // pause audio and change the play / pause button to play button
 pause();
 soita = 0;
 //raita = "audio"+soita;
 tef = 0;
 a = 0;
 audio.src = bookcliptimesmp3[a];
 audio.currentTime = 0;
 tekstiotsikko();
}

// pauses the audio playback. Called when pause pressed.
function pause(){
 audio.pause();
 // remove  all click event handlers  from play pause button
 // this includes this method and possibly the play method which we want to make sure gets called only once when
 // we next add it as the click event handler
 playButton.off( 'click' );
 // add the method that starts playback as the event handler for the button
 playButton.on( 'click', myFunction );
 // change button text
 playButton.html( buttonTexts.play );
}

function playNext() {

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

// play previous audio clip.
function playPrev() {
	
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

	

function playNextSect(){
//audio = document.getElementById(raita);
	playhead = audio.currentTime;
	

	raita = "audio"+0;
	playhead = a;

	tef++;
    // start playing the file indicated by tef
    changeFile();
}

// plays the previous  book section
function playPrevSect(){
	if (tef !== 0){
	//audio = document.getElementById(raita);
	playhead = audio.currentTime;
	
	raita = "audio"+0;
	playhead = a;
	tef--;
    // start playing the file indicated by tef
    changeFile();
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

// event handler when user changes playback speed with the radio buttons
function changeSpeed() {
    // get the speed from the radio button currently checked and convert to number to make sure
    // it is used here and in the play event handler to ensure that the speed the user chose stays
    speed = Number( $( '.speedselector:checked' ).val() );
    audio.playbackRate = speed;
}

// event hanler for when audio starts playing
function onPlaying() {
    // set playback speed always  when starting to play since it is otherwise forgotten
    // at least on Safari when a new file starts playing
    audio.playbackRate = speed;
}