var cache = {}, fs = require('fs'), debug = process.env.debug;

function handle(req, res){
	req.url = req.url.replace(/\.\./g,'.');
	
	if(req.url === '/') req.url = '/index.html'; 
	
	debug && console.log(req.url);
	
	//if(!req.url.match(/\.html$/) && fs.existsSync(req.url))
	//  return res.sendFile(req.url);

	try{
		res.writeHead(200, {'Content-Type': 'text/html'});
	var k = process.cwd() + req.url;
	if(!cache[k]) cache[k] = fs.readFileSync(k).toString();
	var t = cache[k].replace(/<\?\=?([\s\S]*?)\?>/g, function(m, p){
		var x = eval(p);
	return m.match(/<\?\=/) ? x : '';
		})
		res.end(t);
    } catch(e){
		res.statusCode = 404;
		res.end();
	}
}

module.exports = function(port, ip){
  require('http').createServer(handle).listen(port||80, ip);
  //.listen(port||80, ip);
  debug && console.log('started');
}