const buttonEmoji = document.querySelector('#btn-emoji');
let btnClose = document.querySelectorAll('.w-close')
let btnCloseE = document.querySelectorAll('.e-close')

const picker = new EmojiButton();
picker.on('emoji', emoji => {
    document.querySelector('#textarea').value += emoji;
  });
 if(buttonEmoji){
  buttonEmoji.addEventListener('click', () => {
    picker.togglePicker(buttonEmoji);
  
  });
 }
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
if(darkModeToggle){
  darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode'); 
    if (darkMode !== 'enabled') {
      enableDarkMode();
    } else {  
      disableDarkMode(); 
    }
  });
}
//Sign up
const signUpButton = document.querySelector('#signUp');
const signInButton = document.querySelector('#signIn');
const container = document.querySelector('#container-sign');

if(signUpButton){
  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });
}
if(signInButton){
  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });
}

// Using ajax jquery submit form signin, signup
$('#sign_in').click(function(e){
  e.preventDefault();
  let si_username = $('#si_username').val();
  let si_password = $('#si_password').val();
  let type_form = $('#typeFormSi').val();
  if(si_username == ''){
    $('#err_signin').html('Vui lòng nhập username');
  }else if(si_password ==''){
    $('#err_signin').html('Vui lòng nhập password');
  }else{
    $.ajax({
        type: 'POST',
        url: '/login',
        dataType:'JSON',
        data:{
            typeForm: type_form,
            username: si_username,
            password: si_password
        },
        success: function (result) {
          if(result.success == false){
            $('#err_signin').html(result.message);
          }else{
            $('#success_login').html(result.message);
            $('#alert_login').addClass('show');
            setTimeout(function(){
              $('#alert_login').removeClass('show');
              location.href ='/';
            }, 3000);
          }
        } 
    });
  }
});
function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(email)) {
    return false;
  }else{
    return true;
  }
}
$('#sign_up').click(function(e){
  e.preventDefault();
  let su_fullname = $('#su_fullname').val();
  let su_username = $('#su_username').val();
  let su_email = $('#su_email').val();
  let su_password = $('#su_password').val();
  let type_form = $('#typeFormSu').val();
  if(su_fullname == ''){
    $('#err_signup').html('Vui lòng nhập tên đầy đủ');
  }else if(su_username == ''){
    $('#err_signup').html('Vui lòng nhập username');
  }else if(su_email == ''){
    $('#err_signup').html('Vui lòng nhập email');
  }else if(IsEmail(su_email) == false){
    $('#err_signup').html('Email không hợp lệ! Vui lòng nhập lại');
  }else if(su_password == ''){
    $('#err_signup').html('Vui lòng nhập password');
  }else{
    $.ajax({
      type: 'POST',
      url: '/login',
      dataType:'JSON',
      data:{
          typeForm: type_form,
          fullname: su_fullname,
          username: su_username,
          email: su_email,
          password: su_password
      },
      success: function (result) {
        console.log(result)
        if(result.success == false){
          $('#err_signup').html(result.message);
        }else{
          $('#success_login').html(result.message);
          $('#alert_login').addClass('show');
          setTimeout(function(){
            $('#alert_login').removeClass('show');
            location.reload();
          }, 4000);
        }
      }
    })
  }
})
// Toggle hidden eye input new password
const toggleNewPassword = document.querySelector('#toggleNewPassword');
const newPassword = document.querySelector('#newpassword');
if(toggleNewPassword){
  toggleNewPassword.addEventListener('click', function() {
    const type = newPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    newPassword.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
  })
}
// Toggle hidden eye input reapeat password
const toggleReapeatPassword = document.querySelector('#toggleReapeatPassword');
const reapeatpassword = document.querySelector('#reapeatpassword');
if(toggleReapeatPassword){
  toggleReapeatPassword.addEventListener('click', function() {
    const type = reapeatpassword.getAttribute('type') === 'password' ? 'text' : 'password';
    reapeatpassword.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
  })
}
//Countdown
var time = 60;
const timer = document.querySelector('#timer');
const alertCountdown = document.querySelector('#alert-countdown');
var timerId = setInterval(countdown, 1000);
function countdown(){
  if(time==-1){
    clearTimeout(timerId);
    alertCountdown.classList.toggle('fade');
    
  }
  else{
    if(timer){
      timer.innerHTML = time+ 's';
      time--;
    }
  }
}
//Responsive 
$(window).resize(function(){
  var width = $(window).width();
  if(width <= 600){
      $('#list-chat').addClass('d-none')
      $('.btn-600').addClass('d-none')
      $('.btn-under600').removeClass('d-none')
  }else{
      $('#list-chat').removeClass('d-none')
      $('.btn-600').removeClass('d-none')
      $('.btn-under600').addClass('d-none')
  }
  if(width<= 386){
    $('.logo').addClass('d-none')
    $('.noshow368').addClass('d-none')
  }else{
    $('.logo').removeClass('d-none')
    $('.noshow368').removeClass('d-none')
  }
})
//
$('#submit-work').click(function(){
  let input_work = $('#input-work').val()
  if(input_work != ''){
    $('#ul-work').append(`
        <li class="badge bg-success fs-6 fw-normal mb-1">
          ${input_work}
          <i class="fa-solid fa-xmark w-close"></i>
        </li>
    `)
    btnClose =  document.querySelectorAll('.w-close')
    $('#input-work').val('')
    $('#err-work').html('')
  }else{
    $('#err-work').html('Work not empty')
  }
})
document.getElementById("ul-work").addEventListener("click",e=> {
  if(e.target.classList.contains("w-close")){
    e.target.parentElement.remove()
  }
})
// 
$('#submit-education').click(function(){
  let input_education = $('#input-education').val()
  if(input_education != ''){
    $('#ul-education').append(`
        <li class="badge bg-success fs-6 fw-normal mb-1">
          ${input_education}
          <i class="fa-solid fa-xmark e-close"></i>
        </li>
    `)
    btnCloseE =  document.querySelectorAll('.e-close')
    $('#input-education').val('')
    $('#err-education').html('')
  }else{
    $('#err-education').html('Education not empty')
  }
})
document.getElementById("ul-education").addEventListener("click",e=> {
  if(e.target.classList.contains("e-close")){
    e.target.parentElement.remove()
  }
})
