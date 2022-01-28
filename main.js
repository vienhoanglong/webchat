const button = document.querySelector('#btn-emoji');

const picker = new EmojiButton();
picker.on('emoji', emoji => {
    document.querySelector('#textarea').value += emoji;
  });
button.addEventListener('click', () => {
  picker.togglePicker(button);
});
$('#search_chats').click(function(){
  $('#search-chats').hasClass('d-none') ? $('#search-chats').removeClass('d-none') : $('#search-chats').addClass('d-none');
})
$('#close-search').click(function(){
  $('#search-chats').addClass('d-none');
})
$('.btn-information').on('click', function(){
  $('#more-option-area').toggleClass('col-3');
  $('#more-option-area').toggleClass('d-none');
});