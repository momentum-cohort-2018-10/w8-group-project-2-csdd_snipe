function snippetHtml(snippet) {
    return `   
    <div class="snippet-div">
    <h2 class="title">${ snippet.title}</h2>
    <h3 class="username">${ snippet.author}</h3>
    <h4 class="language">${ snippet.language}</h4>
    <p><pre><code class="${snippet.language}">${snippet.content}</code></pre></p>
    </div>
    `
}


$.get('/api/snippets/').then(function (snippets) {

    for (let snippet of snippets) {
        $('#snippet-list').append(snippetHtml(snippet))
    }

})

