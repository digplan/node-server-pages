var cache = {},
  fs = require('fs'),
  debug = process.env.debug;

function handle(req, res) {

  try {

  	var spa = process.cwd() + '/' + req.headers.host + '.html';
  	var file = '';
  	var path = process.cwd() + '/static' + (req.url !== '/' ? req.url : '/index.html');

    debug && console.log('checking', path, spa);

  	if(fs.existsSync(path))
  	  file = fs.readFileSync(path).toString();
    else
      file = fs.readFileSync(spa).toString();

  	if(!file) throw Error();

    debug && console.log('evaluating nsp');

    var t = file.replace(/<\?\=?([\s\S]*?)\?>/g, function(m, p) {
      debug && console.log('found script', p);
      var x = eval(p);
      debug && console.log('processed to', x);
      return x;  //m.match(/<\?\=/) ? x : '';
    })

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    debug && console.log('done', t);
    res.write(t);
    res.end();

  } catch (e) {
  	debug && console.log('error', e.message);
  	res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.end();
  }

}

module.exports = function(port, ip) {
  require('http').createServer(handle).listen(port || 80, ip);
  debug && console.log('started');
}
