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
  $('#more-option-area').hasClass('d-none') ? $('#more-option-area').removeClass('d-none'): $('#more-option-area').addClass('d-none');
  // $('#more-option-area').toggleClass('d-none');
  // $('#more-option-area').toggleClass('col-3');
});
// Dark-mode
let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled');
}
const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', null);
}
if (darkMode === 'enabled') {
  enableDarkMode();
}
darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode'); 
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {  
    disableDarkMode(); 
  }
});
