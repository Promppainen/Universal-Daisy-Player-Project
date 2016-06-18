<?php
#This is Universal daisy player configuration file*

#variable for daisybook directory
#remember that here should be nothing else than the book structure
#and mp3 named audiofiles and case-sensitive means. .mp3
#also remember that if you use same machine there is no 
#need for use http: connections that will use bandwith because
#this is useed for daisyplayer script and the bookstructure 
#not with client and server


$bookdir = "http://juurikone.fi/robottiohje/";

#Advanced bookdir variable for query string enable / Disable
#for using Universal Daisy Player like giving ability to select dir
# example: http://example.com?bookdir=http://example.com/testbook/
# Enable is "1"
# Disable is "0"

$querystring = "1";

#variable for language used in universal daisy player
# lang-eng for english 
# lang-fin for finnish %##

$langfile = "lang-eng.php";

#end of ini.php file

?>