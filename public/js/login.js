$("#login").click(() => {
    const username = $('#username').val();
    const password = $('#password').val();

    $.post('/auth', {
        username,
        password
    }).done(() => {
        window.location = '/';
    }).fail(() => {
        $('#login-invalid').slideDown();
        setTimeout(() => {
            $('#login-invalid').slideUp();
        }, 3000);
    });
});

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        $('#login').click();
    }
});