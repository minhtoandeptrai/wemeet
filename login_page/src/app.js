$(function () {
    $('#login').click(() => {
        $('.form_wrapper').addClass('appear');
    })
    $('.form_close').click(() =>
    {
        $('.form_wrapper').removeClass('appear');
    })
});