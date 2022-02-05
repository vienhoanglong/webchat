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
//check saved darkmode in localStorage
// let darkMode = localStorage.getItem('darkMode');

// const darkModeToggle = document.querySelector('#dark-mode');
// const enableDarkMode = ()=>{
//   document.body.classList.add('dark');
//   localStorage.setItem('dark', 'enabled');
// }
// const disableDarkMode = () =>{
//   document.body.classList.remove('dark');
//   localStorage.setItem('dark', null);
// }
// if(darkMode == 'enabled'){
//   enableDarkMode();
// }
// darkModeToggle.addEventListener('click', ()=>{
//   darkMode = localStorage.getItem('dark');
//   // darkMode !== 'enabled' ? enableDarkMode() : disableDarkMode();
//   if (darkMode !== 'enabled') {
//     enableDarkMode();
//   } else {  
//     disableDarkMode(); 
//   }
  
// });
let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('darkmode');
  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmode');
  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null);
}
 
// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('darkMode'); 
  
  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode();
  // if it has been enabled, turn it off  
  } else {  
    disableDarkMode(); 
  }
});