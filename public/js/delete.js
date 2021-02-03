$(document).delegate('#delete', 'click', function() {
    const id = $(this).data('post');
    $.ajax({
        url: '/api/posts/' + id,
        type: 'DELETE'
    });
    window.location = '/posts';
});