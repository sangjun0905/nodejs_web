var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var template ={
  html:function (list, title, description, control){
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
              ${control  //<a href="/create">create</a>  <a href="/update">update</a>
              }
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
  },
 
  list:function (filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i].slice(0,-4)}">${filelist[i].slice(0,-4)}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
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
          var list = template.list(filelist);
          var html = template.html(list, title,  description,
          `<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);
        })
 
 
 
      } else {
        fs.readdir('./data', function(error, filelist){
          var list = template.list(filelist);
          fs.readFile(`data/${queryData.id}.txt`, 'utf8', function(err, description){
            var title = queryData.id;
            var html = template.html(list, title, description,`
              <a href="/create">create</a>  
              <a href="/update?id=${title}">update</a>
              <form action="delete_process" method="post">
              <input type = "hidden", name="id" value="${title}">
              <input type = "submit" value="delete">
              </form>`
            );
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } else if(pathname === "/create"){
      fs.readdir('./data', function(error, filelist){
        var title = 'Web - create';
        var list = template.list(filelist);
        var html = template.html(list, title,  
          `
          <form action="/create_process" method = "post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
          </form>
          `,``
        );
        response.writeHead(200);
        response.end(html);
      });
    } else if(pathname==='/create_process'){
      var body = ``;
      request.on('data',function(data){ 
        body += data; //정보가 들어올 때마다 정보 수신
      });
      console.log(body);
      request.on('end',function(){ //정보 들어올 때마다 정보 수신 끝
        var post = qs.parse(body); //post.title, post.body
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8',function(err){
          response.writeHead(302, {Location: `/?id=${title}`});  // 페이지 이동시키기 : 리다이렉션
          response.end('success');
        })
      })
    } else if(pathname ==="/update"){
      fs.readdir('./data', function(error, filelist){
        var list = makelist(filelist);
        fs.readFile(`data/${queryData.id}.txt`, 'utf8', function(err, description){
          var title = queryData.id;
          var html = template.html(list, title, 
            ` 
            <form action="/update_process" method = "post">
            <input type="hidden", name="id", value="${title}">
            <p><input type="text" name="title" value="${title}" placeholder="title"></p>
            <p>
                <textarea name="description" " placeholder="description">"${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
          </form>
            `,`<a href="/create">create</a>  <a href="/update?id=${title}">update</a>`
          );

          response.writeHead(200);
          response.end(html);
        });
      });
     } else if(pathname === "/update_process"){
      var body = ``; 
      request.on('data',function(data){ 
        body += data; //정보가 들어올 때마다 정보 수신
      });
      request.on('end',function(){ //정보 들어올 때마다 정보 수신 끝
        var post = qs.parse(body); //post.title, post.body]
        var id = post.id;
        var title = post.title;
        var description = post.description;
        
        fs.rename(`data/${id}.txt`, `data/${title}.txt`,function(error){
          fs.writeFile(`data/${title}.txt`, description,'utf8',function(error){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end('Not found');
          })
        })
        console.log(post);
        // fs.writeFile(`data/${title}`, description, 'utf8',function(err){
        //   response.writeHead(302, {Location: `/?id=${title}`});  // 페이지 이동시키기 : 리다이렉션
        //   response.end('success');
        // })
      })
     } 
     else if(pathname==="/delete_process"){
      var body = ``; 
      request.on('data',function(data){ 
        body += data; //정보가 들어올 때마다 정보 수신
      });

      console.log(body);
      request.on('end',function(){ //정보 들어올 때마다 정보 수신 끝
        var post = qs.parse(body); //post.title, post.body]
        var id = post.id;
        
        fs.unlink(`data/${id}.txt`, (err) => {
          if (err) {
            console.error(`Error deleting the file: ${err}`);
            return;
          }
          console.log('File has been deleted');
        });
        
      
   
       
      })

     }
     else {
      response.writeHead(404);
      response.end('Not found');
    }
 
 
 
});
app.listen(3000);