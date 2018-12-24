
// function snippetHtml(snippet) {
//     return `   
//     <div class="card-body">
//     <h3 class="title">${snippet.title}</h3>
//     <img src="https://secure.gravatar.com/avatar/${md5(snippet.author_email)}.jpg?s=150&d=mm&r=g">
//     <p class="username">Author: ${snippet.author}</p>
//     <h4 class="language">Language: ${snippet.language}</h4>
//     <p><pre><code class=${snippet.language} class="card-text">${snippet.content}</code></pre></p>
//     <button  class="fa fa-copy copy-button" style="font-size:15px;color:darkmagenta" data-language=${snippet.language} data-id=${snippet.id} data-title=${snippet.title} data-author= ${snippet.author}" data-clipboard-target="#snippet-content-${snippet.id}> Snip a Copy</button>      
//     <div class="d-flex justify-content-between align-items-center">
//     <div class="btn-group">
//         <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
//         <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
//     </div>
//     <small class="text-muted"></small>

// </div>
//     `
// }




// $.get('/api/my_snippets/').then(function (snippets) {

//     for (let snippet of snippets) {
//         $('#mysnippets').append(snippetHtml(snippet))
//     }