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

function profileHtml(snippet) {
    return `   
    <div class="card-body">
    <h3 class="title">${snippet.title}</h3>
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
$.get("/api/my_snippets/").then(function (snippets){

    for (let snippet of snippets) {
        $('#my-snips').append(profileHtml(snippet))
}})

$("#search-button").on("click", function (event) {

    $.get('/api/snippets/', { search: $("#query").val() }).then(function (snippets) {
        console.log(snippets);
        $('#search-results').empty();
        for (let snippet of snippets) {
            $('#search-results').append(snippetHtml(snippet))

        }
    })
})


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

let csrftoken = getCookie('csrftoken');
let clipboard = new ClipboardJS('.copy-button');
console.log("hi")
console.log(csrftoken)


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

//gets all the ids 
function qs(selector) {
    return document.querySelectorAll(selector)
}

//Get the modal element
let modal = document.getElementById('simpleModal');

//Get open model button
let modalBtn = document.getElementById('modalBtn');

// --Modal Window Controls-- //


// opens modal when 'view' is clicked
function openModal() {
    let openBtns = document.querySelectorAll('.button')
    openBtns.forEach(button => {
        button.addEventListener('click', event => {
            let modals = document.querySelectorAll('.modal')
            modals.forEach(modal =>{
                if (event.target.getAttribute("data-type") === modal.id) {
                    modal.style.display = 'block'
                }
            })
        })
    })
}


// closes modal when 'x' is clicked
function closeModal() {
    let closeBtns = document.querySelectorAll('.closeBtn')
    closeBtns.forEach(button => {
        button.addEventListener('click', event => {
            let modals = document.querySelectorAll('.modal')
            modals.forEach(modal => {
                if (event.target.getAttribute("data-type") === modal.id) {
                    modal.style.display = 'none'
                }
            })
        })
    })
}


// clicking outside modal closes modal
function outsideClick() {
    document.addEventListener('click', event => {
        let modals = document.querySelectorAll('.modal')
        modals.forEach(modal => {
            if (event.target.id === modal.id) {
                modal.style.display = 'none'
            }
        })
    })
}


openModal()
closeModal()
outsideClick()


function setupNewSnippetModal() {
    $("#add-snippet-button").on('click', function () {
        $("#add-snippet-modal").addClass('is-active')
    })
    $(".modal-background,.modal-close, #cancel-button").on('click', function (event) {
        event.preventDefault()
        $("#add-snippet-modal").removeClass('is-active')
    })
    $('#new-snippet-form').on('submit', function (event) {
        event.preventDefault()
        console.log("hi")
        let snippet = {
            title: $('#new-snippet-title').val(),
            language: $('.new-snippet-language').val(),
            content: $('#new-snippet-content').val(),
        }
        $.ajax({
            url: '/api/snippets/',
            method: 'POST',
            data: JSON.stringify(snippet),
            contentType: 'application/json',
            "is_copy": false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', csrftoken)
            },
        }).then(function (snippet) {
            $("#my-snips").append(snippetHtml(snippet))
            $("#add-snippet-modal").removeClass('is-active')


        })
    })
}
setupNewSnippetModal()
