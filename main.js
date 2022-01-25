const button = document.querySelector('#btn-emoji');

const picker = new EmojiButton();
picker.on('emoji', emoji => {
    document.querySelector('#textarea').value += emoji;
  });
button.addEventListener('click', () => {
  picker.togglePicker(button);
});