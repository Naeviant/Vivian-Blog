$("#submit").click(() => {
    const title = $('#title').val();
    const summary = $('#summary').val();
    const body = $('#body').val();

    $.post('/api/posts', {
        title,
        summary,
        body
    }).done(() => {
        window.location = '/posts';
    }).fail(() => {
        $('#invalid').slideDown();
        setTimeout(() => {
            $('#invalid').slideUp();
        }, 3000);
    });
});