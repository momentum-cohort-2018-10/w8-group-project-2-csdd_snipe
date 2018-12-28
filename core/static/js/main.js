let csrftoken = getCookie('csrftoken');


//  html for snippets in index
function snippetHtml(snippet) {
    return `   
    <div class="card-body">
    <h3 class="title">${snippet.title}</h3>
    <img src="https://secure.gravatar.com/avatar/${md5(snippet.author_email)}.jpg?s=150&d=mm&r=g">
    <p class="username">Author:${ snippet.author}</p>
        <h4 class="language">Language: ${snippet.language}</h4>
        <p><pre><code class=${snippet.language} class="card-text">${snippet.content}</code></pre></p>
        <button class="fa fa-copy copy-button" style="font-size:15px;color:darkmagenta" data-language=${snippet.language} data-id=${snippet.id} data-title=${snippet.title} data-author= ${snippet.author}" data-clipboard-target="#snippet - content - ${snippet.id}> Snip a Copy</button >
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted"></small>

            </div>
`
}

// html for snippets in profile
function profileHtml(snippet) {
    return `   
    <div class="card-body" data-pk="${snippet.pk}" data-title="${snippet.title}" data-content="${snippet.content}" data-language="${snippet.language}" data-author="${snippet.author}">
    <h3 class="title">${snippet.title}</h3>
    <p class="username">Author:${ snippet.author}</p>
        <h4 class="language">Language: ${snippet.language}</h4>
        <p><pre><code class="${snippet.language} card-text">${snippet.content}</code></pre></p>
    <button class="edit-snippet-button" class="button is-link">Edit Snippet</button>
    <button class="delete-snippet-button" class="button is-link">Delete Snippet</button>   
    </div>
`
}



$.get("/api/my_snippets/").then(function (snippets) {

    for (let snippet of snippets) {
        $('#user-snips').append(profileHtml(snippet))
    }
    $(".edit-snippet-button").on('click', function (event) {
        let data = $(event.target).parent().data();
        $("#edit-snippet-title").val(data.title);
        $("#edit-snippet-pk").val(data.pk);
        $("#edit-snippet-language").val(data.language);
        $("#edit-snippet-content").val(data.content);
        $("#edit-snippet-modal").addClass('is-active')
    })

    $(".delete-snippet-button").on('click', function (event) {
        let data = $(event.target).parent().data();
        $.ajax({
            url: "/api/snippets/" + data.pk + "/",
            method: 'DELETE',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', csrftoken)
            },
        }).then(function () {
            let card = $(`.card-body[data-pk="${data.pk}"]`);
            card.remove();
        })
    });
})



//search for snippets 
function searchSnippets() {
    $("#search-button").on("click", function (event) {

        $.get('/api/snippets/', { search: $("#query").val() }).then(function (snippets) {
            console.log(snippets);
            $('#search-results').empty();
            for (let snippet of snippets) {
                $('#search-results').append(snippetHtml(snippet))

            }
        })
    })
}


//get CSRF token cookie
function getCookie(name) {
    let cookieValue = null;
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




//to copy snippets
function copySnippet() {
    let clipboard = new ClipboardJS('.copy-button');
    clipboard.on("success", function (e) {
        let snippet = $(e.trigger).data();
        snippet.content = e.text;
        $.ajax({
            type: "POST",
            url: "/api/snippets/",
            dataType: "json",
            data: {
                content: `${snippet.content} `,
                author: `${snippet.author}`,
                language: `${snippet.language} `,
                title: `${snippet.title} `,
                "is_copy": true,
                csrfmiddlewaretoken: csrftoken,
            }
        }).then(function (success) {
            console.log(success)
            $("#my-snips").append(snippetHtml(snippet));
        });
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    })
    // // redirects to profile page
    // location.href = "profile"
}




searchSnippets()
copySnippet()
