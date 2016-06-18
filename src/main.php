<?php



//Directory chechker
function Daisykansiotarkistus ($tarkistettavakansio){

//Open and load structure to variable

 $dir = $tarkistettavakansio;
 $contents = file_get_contents($dir);
 $lines = explode("\n", $contents);
 foreach($lines as $line) {
 if($line[1] == "l") { // matches the <li> tag and skips 'Parent Directory'
 $line = preg_replace('/<[^<]+?>/', '', $line); // removes tags
 //echo trim($line) . "\n";
 $tulosta = trim($line) . "\n";
 if (strpos($tulosta, 'master.smil') !== false){
//echo "Master.smil tiedosto on kansiossa ".$dir." "; 
  }

 }
}



	}

include "./ini.php";
include "./".$langfile;

// Main variables for script runtime

// if for query string used or not to configure daisy book directory
if (($querystring == "1") & ($_GET['bookdir'] != "")){

$bookdir = $_GET['bookdir'];
$kirjakansio = $bookdir;
$kirjahttpkansio = $bookdir;
} 
else
{
// if query string was empty or null 
$kirjakansio = $bookdir;
$kirjahttpkansio = $bookdir;
}
$ncctiedosto = "master.smil";
$kokopuu = $kirjakansio.$ncctiedosto;
$audiotagnum = 0;

// audio tag html tekofuntio
function makeaudiotag($audioid ,$mp3file){

 echo "<audio id=\"audio".$audioid."\">"; 
 echo "<source src=\"".$mp3file."\" type=\"audio/mpeg\">";
 echo "y";
 echo "</audio>";
 echo "\n"; 
}


// function to parse the master.smil xml and others
function parsedaisy($ncc) {

 //invalid xml file
 $xmlfile = $ncc;
 $xmlparser = xml_parser_create();

// open a file and read data
 $fp = fopen($xmlfile, 'r');
 $xmldata = fread($fp, 4096);

 xml_parse_into_struct($xmlparser,$xmldata,$values);

 xml_parser_free($xmlparser);

 return $values;
}

// Start the xml sturcture parsing 
// master.smil and from others found on that xml file
// Grab things to variables

 $rows = parsedaisy($kokopuu); 
 // lasketaan tiedoston row määrä muuttujatalukossa
 $maxgo = count($rows);
 $go = 0; // while määritteen alustus
 while ($go !== $maxgo+1){
  $link[$go] = $rows[$go]['attributes']['SRC'];
  $titlesrow = $rows[$go]['attributes']['TITLE'];	
  if ($titlesrow != ''){
   $wholetitles = $wholetitles."#".$rows[$go]['attributes']['TITLE'];
  }	

 $go++;
}


// aloitetaan saatujen smil tiedostojen lukeminen
$edellinenluku = 10000;
$jaksolaskuri = 0;
$bl = 0;
$go = 0;
while ($go !== $maxgo+1) {
 $smil = parsedaisy($kirjakansio.$link[$go]);
 $maxgosmil = count($smil); 
 $sm = 0;
 while ($sm !== $maxgosmil){
 $audiomp3 = $smil[$sm]['attributes']['SRC'];
 if (strpos($audiomp3, 'mp3') !== false){
   $clipstart = $smil[$sm]['attributes']['CLIP-BEGIN'];
   $clipend = $smil[$sm]['attributes']['CLIP-END'];
   $audiomp3 = $smil[$sm]['attributes']['SRC'];
   $wholeclipstart = $wholeclipstart."#".$clipstart;
   $wholeclipend = $wholeclipend."#".$clipend;
   $wholemp3 = $wholemp3."#".$audiomp3;
   $jaksolaskuri++;
  }
 $sm++;
}

if ($jaksolaskuri !== $edellinenluku ){
 $jakso[$bl] = $jaksolaskuri;
 $edellinenluku = $jaksolaskuri;
 $bl++;
}
$go++;
	}


// Print Javascript Array of all Daisy book Clip Startpoints
$wholeclipstart = str_replace("\"", "" , $wholeclipstart); // poistetaan hakaset
$wholeclipstart = str_replace("npt=", "" , $wholeclipstart);
$wholeclipstart = str_replace(",", "." , $wholeclipstart);
$wholeclipstart = str_replace("s", "" , $wholeclipstart);
$javascriptarray = explode ("#",$wholeclipstart); 
$maxgo = count($javascriptarray);
$maxgo = $maxgo - 1 ;
$javascriptcount = 0;
echo "var bookcliptimes = ";
echo "[";
while ($javascriptcount !== $maxgo){
 echo " ".$javascriptarray[$javascriptcount+1];
if ($javascriptcount+1 !== $maxgo ){
echo ",";
}
 echo "\r\n";
 $javascriptcount++; 
}
echo "];";



echo "\r\n";

// Print Javascript array of all Daisy Book clip endpoints
$wholeclipend = str_replace("\"", "" , $wholeclipend); // poistetaan hakaset
$wholeclipend = str_replace("npt=", "" , $wholeclipend);
$wholeclipend = str_replace(",", "." , $wholeclipend);
$wholeclipend = str_replace("s", "" , $wholeclipend);
$javascriptarrayend = explode ("#",$wholeclipend); 
$maxgoend = count($javascriptarrayend);
$maxgoend = $maxgoend - 1 ;
$javascriptcountend = 0;
echo "var bookcliptimesend = ";
echo "[";
while ($javascriptcountend !== $maxgoend){
echo " ".$javascriptarrayend[$javascriptcountend+1];
 if ($javascriptcountend !== $maxgoend-1){
  echo ",";
 }
echo "\r\n";

$javascriptcountend++; 
}
echo "];";



echo "\r\n";


// Print Javascript array of all Daisy book Clips mp3 Filenames
$wholemp3 = str_replace("\"", "" , $wholemp3); // poistetaan hakaset
$wholemp3 = str_replace("=", "" , $wholemp3);
//$wholemp3 = str_replace("s", "" , $wholemp3);
$javascriptarraymp3 = explode ("#",$wholemp3); 
$maxgomp3 = count($javascriptarraymp3);
$javascriptcountmp3 = 0;
echo "var bookcliptimesmp3 = ";
echo "[";
while ($javascriptcountmp3 !== $maxgomp3-1){
echo "\"".$kirjahttpkansio.$javascriptarraymp3[$javascriptcountmp3+1]."\"";
if ($javascriptcountmp3 !== $maxgomp3-2){
 echo ",";
}
echo"\r\n";
$javascriptcountmp3++; 
}
echo "];";
echo "\r\n";

// Print chapter satart points in book
echo "var jakso = [0,";
while ($ab !== $go+1){
echo $jakso[$ab+1];
if ($ab !== $go+1){
echo ",";
}

$ab++;
}
echo "];";
echo "\r\n";
$titles = explode ("#",$wholetitles); 
echo "var titles = [";
$maxtitle = count($titles);
$titlecount = 0;
while ($titlecount !== $maxtitle){
echo "\"".$titles[$titlecount]."\"";
if ($titlecount !== $maxtitle-1){
echo ",";
}

echo "\r\n";
$titlecount++;
}
echo "];";


echo "var maxtitles = ".$maxtitle.";";





?>