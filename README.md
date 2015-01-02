````
require('node-server-pages')(80, '127.0.0.1');
````

index.html
````
My url is <?= req.url ?>

<?
	var loc = req.headers['user-agent']; 
	res.write('Hey there ' + loc); 
?>

More of this at the bottom of the page..
````