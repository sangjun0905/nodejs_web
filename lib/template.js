module.exports = {
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


