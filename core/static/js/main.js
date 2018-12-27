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
        url: "/api/my_snippets/",
        dataType: "json",
        data: {
            content: `${snippet.content} `,
            language: `${snippet.language} `,
            title: `${snippet.title} `,
            "is_copy": true,
            csrfmiddlewaretoken: csrftoken,
        }
    }).then(function (success) {
        console.log(success);
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

//Get close button
let closeBtn = document.getElementsByClassName('closeBtn')[0];

//listen for open click
modalBtn.addEventListener('click', openModal);

//listen for close click
closeBtn.addEventListener('click', closeModal);

//listen for outside click
window.addEventListener('click', outsideClick);


//Function to open modal
function openModal() {
    console.log(123);
    modal.style.display = 'block';
}

//Function to close modal
function closeModal() {
    modal.style.display = 'none';
}

//Functio to close modal if outside click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

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
            $("#my-snippets").append(snippetHtml(snippet))
            $("#add-snippet-modal").removeClass('is-active')


        })
    })
}
setupNewSnippetModal()