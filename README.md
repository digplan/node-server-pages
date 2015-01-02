````
require('node-server-pages')(80, '127.0.0.1');
````

index.html
````
My url is <? req.url ?>

<?
   'user agent is ' + req.headers['user-agent'];
?>

````
