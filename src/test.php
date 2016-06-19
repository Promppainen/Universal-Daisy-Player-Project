﻿<?php
include "./smartread.php";
?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Universal Daisy Project - juurikone.fi</title>


<script>
/*

Universal Daisy Player software information 
This source and other included materials 
are under Copyleftt 

this notification has to be kept in all cases 

You may change or modify this code but you need 
to remain orginal information and put 
your info to kept this in opensource an 
the source available to others 
the orginal sources are 
available at www.juurikone.fi/universaldaisy/
and orginal author is Santtu Salminen 

Short info:
this is open source project 
to make Daisy talking books to readable 
by common web- browsers without any complex 
hardware or that kind systems

This project aims to gain access to Daisy books 
and by start point ver 2.02 daisy books 
using standars below 

html5 browser and markup 
Javascript 
PHP language 
ARIA 

And good practises like w3 accessibility 
guidelines 

-author 
Santtu Salminen 

*/




<?php
include "./main.php";
?>
</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
<script src="main.js"></script>

<link href="/style.css" rel="stylesheet" type="text/css">
<link href="style.css" rel="stylesheet" type="text/css">
<style type="text/css">
h1 {
	font-size: 20mm;
}
button {
	font-size: medium;
	font-style: normal;
	font-weight: bold;
	font-variant: normal;
}
</style>
</head>

<body>
    <p>


<?php


// alustavat muuttujat

$kirjakansio = $bookdir;
$ncctiedosto = "master.smil";
$kokopuu = $kirjakansio.$ncctiedosto;

$audiotagnum = 0;



// Aloitetaan smil tiedostojen etsiminen 
// master.smil etc tiedostosta 

// otetaan xml tiedosto muuttujaan
$rows = parsedaisy($kokopuu); 
// lasketaan tiedoston row määrä muuttujatalukossa
$maxgo = count($rows);
$go = 0; // while määritteen alustus
			$audiotagnum + 0;
while ($go !== $maxgo+1){
	$link = $rows[$go]['attributes']['SRC'];

		if ($link !== ""){			
		$link = str_replace("\"", "" , $link); // poistetaan hakaset
		// aloitetaan seuraavan smiltiedoston ajo
		$linked = parsedaisy($kirjakansio.$link); 
		$maxlinked = count($linked);
		$linkedgo = 0;
			while ($linkedgo !== $maxlinked+1) {
			$audiomp3 = $linked[$linkedgo]['attributes']['SRC'];
			$audiomp3 = str_replace("\"", "" , $audiomp3);
			//echo $audiomp3;
			if (strpos($audiomp3, 'mp3') !== false){
			
			$clipstart = $linked[$linkedgo]['attributes']['CLIP-BEGIN'];
			$clipend = $linked[$linkedgo]['attributes']['CLIP-END'];

			//echo $clipstart;
			//echo $clipend;
			$wholeclipstart = $wholeclipstart."#".$clipstart;

			if ($audiomp3 !== ""){

			$temp = str_replace(".mp3", "" , $audiomp3); // poistetaan hakaset			
			$temp = $temp.".mp3";
			//makeaudiotag($audiotagnum,$kirjakansio.$temp);
			$audiotagnum++;
}
			}
		$linkedgo++;
		}
		

	}

$go++; // lisätään yksi laskuriin 
}


//echo "osioita ";
//echo $audiotagnum; 


?>


<?php Daisykansiotarkistus ($kirjahttpkansio);
?>

    </p>
    <p>
      
      
      
      
      
      
      
      
      
      
      
      
    </p>
<h1 id="daisytitle"><?php echo $titles[1];?> </h1>
    <button id="button" onClick="myFunctionedellinenosio()"accesskey="d"><?php echo $langprewsection;?></button>
    <button id="button" onClick="myFunctionedellinen()" accesskey="r"><?php echo $langprew;?></button>
  <button id="playButton" onClick="myFunction(d)" accesskey="p"><?php echo $langplay;?></button>
  <button id="button" onClick="myFunction2()" accesskey="s"><?php echo $langstop;?> </button>
    <button id="button" onClick="myFunctionseuraava()"accesskey="f"><?php echo $langnext;?></button>
    <button id="button" onClick="myFunctionseuraavaosio()"accesskey="g"><?php echo $langnextsection;?></button>


</p>


<audio id="audio0" ><source src="<?php echo $bookdir.$javascriptarraymp3[1];?>" type="audio/mpeg">y</audio>

<hr>
<p id="osionumero" aria-live="polite" ><?php echo $langsectioninfo;?> </p>
<br>
<p id="timeelapsed">time: </p>
<br>
<p id="tekstia">nyt soitetaan </p>
<br>
<p id="tekstitef" > <?php echo $langsectioninfo;?> </p>
<br>


<p>Copyleft - Juurikone.fi </p>
	</body>
</html>

