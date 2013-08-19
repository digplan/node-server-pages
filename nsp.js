var cache = {};

module.exports = function(req, res){
		var fs = require('fs');
		try{
			res.writeHead(200, {'Content-Type': 'text/html'});
			var k = '.' + req.url;
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