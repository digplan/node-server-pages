module.exports = function(req, res){
		var fs = require('fs');
		try{
			var scp = fs.readFileSync('.' + req.url).toString();
			var t = scp.replace(/<\?\=?([\s\S]*?)\?>/g, function(m, p){
				var x = eval(p);
				return m.match(/<\?\=/) ? x : '';
			})
			res.end(t);
		} catch(e){
			res.statusCode = 404;
			res.end();
		}
}