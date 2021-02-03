$("#logout").click(() => {
    $.ajax({
        url: '/auth',
        type: 'DELETE'
    });
    window.location = '/';
});