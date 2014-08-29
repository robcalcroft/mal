<?php 

	$to      = 'malpeacock@yahoo.co.uk';
	$subject = 'Mal Peacock Site - User Message';
	$packet  = $_POST;

	$message = $packet ['body'];
	$name    = $packet ['name'];
	$email   = $packet ['email'];

	if(!isset($message) || !isset($name) || !isset($email)) {
		die('{"status":0,"message":"Mail sending failed; all or some parameters not given"}');
	}

	$message .= "\n\nThis is an auto generated message, do not reply";

	if(
		!mail( 	
			$to, 
			$subject, 
			wordwrap($message), 
			'From: MPCRC Mailing Service'
	)) 
	{
		echo '{"status":0,"message":"Mail sending failed"}';
	} 
	else {
		echo '{"status":1,"message":"Mail sent successfully"}';
	}

?>