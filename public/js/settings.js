$("#submit").click(() => {
    const heading = $('#heading').val();
    const subheading = $('#subheading').val();
    const about = $('#about').val();

    $.ajax({
        url: '/api/settings',
        type: 'PUT',
        data: {
            heading,
            subheading,
            about
        },
        success: () => {
            window.location = '/';
        },
        error: () => {
            $('#invalid').slideDown();
            setTimeout(() => {
                $('#invalid').slideUp();
            }, 3000);
        }
    });
});