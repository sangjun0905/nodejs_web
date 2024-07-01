var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
 
function templateHTML(list, title, description){
  return `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <a href="/create">create</a>  // pathname = /create
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
}

function makelist(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i].slice(0,-4)}">${filelist[i].slice(0,-4)}</a></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(pathname);
    if(pathname === '/'){
      if(queryData.id === undefined){
 
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = makelist(filelist);
          var template = templateHTML(list, title,  description);
          response.writeHead(200);
          response.end(template);
        })
 
 
 
      } else {
        fs.readdir('./data', function(error, filelist){
          var list = makelist(filelist);
          fs.readFile(`data/${queryData.id}.txt`, 'utf8', function(err, description){
            var title = queryData.id;
            var template = templateHTML(list, title, description);
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else if(pathname === "/create"){
      fs.readdir('./data', function(error, filelist){
        var title = 'Web - create';
        var list = makelist(filelist);
        var template = templateHTML(list, title,  
          `
          <form action="http://localhost:3000/create_process" method = "post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
          </form>
          `
        );
        response.writeHead(200);
        response.end(template);
      });
    } else if(pathname==='/create_process'){
      var body = ``;
      request.on('data',function(data){ 
        body += data; //정보가 들어올 때마다 정보 수신
      });
      request.on('end',function(){ //정보 들어올 때마다 정보 수신 끝
        var post = qs.parse(body); //post.title, post.body
        console.log(post);
      })
      response.writeHead(200);
      response.end('success');
    }else {
      response.writeHead(404);
      response.end('Not found');
    }
 
 
 
});
app.listen(3000);