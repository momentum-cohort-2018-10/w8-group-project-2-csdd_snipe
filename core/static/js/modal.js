

// --Modal Window Controls-- //


// opens modal when 'view' is clicked
function openModal() {
    let openBtns = document.querySelectorAll('.button')
    openBtns.forEach(button => {
        button.addEventListener('click', event => {
            let modals = document.querySelectorAll('.modal')
            modals.forEach(modal => {
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
        }

        )
    })
}


function editSnippetModal() {
    $("#edit-snippet-button").on('click', function () {



        $("#edit-snippet-modal").addClass('is-active')
    })
    $(".modal-background,.modal-close, .cancel-button").on('click', function (event) {
        event.preventDefault()
        $("#edit-snippet-modal").removeClass('is-active')
    })
    $('#edit-snippet-form').on('submit', function (event) {
        event.preventDefault()
        let pk = $('#edit-snippet-pk').val();
        let snippet = {
            title: $('#edit-snippet-title').val(),
            content: $('#edit-snippet-content').val(),
            language: $('#edit-snippet-language').val(),
        }
        $.ajax({
            url: "/api/snippets/" + pk + "/",
            method: 'PUT',
            data: JSON.stringify(snippet),
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', csrftoken)
            },
        }).then(function (snippet) {
            let card = $(`.card-body[data-pk="${snippet.pk}"]`);
            card.data("title", snippet.title);
            card.data("content", snippet.content);

            card.find(".card-text").text(snippet.content);
            card.find(".title").text(snippet.title);

            //            $("#user-snips").append(snippetHtml(snippet))
            $("#edit-snippet-modal").removeClass('is-active')
        }

        )
    })

}

openModal()
closeModal()
outsideClick()
setupNewSnippetModal()
editSnippetModal()

