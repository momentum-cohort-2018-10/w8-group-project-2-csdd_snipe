function snippetHtml(snippet) {
    return `   
    <div class="card-body">
    <h3 class="title">${snippet.title}</h3>
    <img src="https://secure.gravatar.com/avatar/${md5(snippet.author_email)}.jpg?s=150&d=mm&r=g">
<p class="username">Author: ${snippet.author}</p>
<h4 class="language">Language: ${snippet.language}</h4>
<p><pre><code class=${snippet.language} class="card-text">${snippet.content}</code></pre></p>
</div>
    `
}

$("#search-button").on("click", function (event) {

    $.get('/api/snippets/', { search: $("#query").val() }).then(function (snippets) {
        console.log(snippets);
        $('#search-results').empty();
        for (let snippet of snippets) {
            $('#search-results').append(snippetHtml(snippet))

        }
    })
})
// var clipboard = new ClipboardJS('.btn'); 
// clipboard.on('success', function(e) { 
//     console.info('Action:', e.action); 
//     console.info('Text:', e.text); 
//     console.info('Trigger:', e.trigger); e.clearSelection(); }); 
//     clipboard.on('error', function(e) { 
//         console.error('Action:', e.action); 
//     console.error('Trigger:', e.trigger); 
// });

// let clipboard = new ClipboardJS('.copy-button');

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

let clipboard = new ClipboardJS('.copy-button');
console.log(clipboard)

$(".copy-button").on("click", function (clipboard){
   console.log("hi") 
    $.ajax({
        type: "POST",
        url: "/api/my_snippets/",
        dataType: "json",
        data: {
            content: clipboard,
            language: '${snippet.language}',
            title: '${snippet.title}',
            csrfmiddlewaretoken: csrftoken
        }
    })
})
// $('api/my_snippets').append $(clipboard);
