$(document).ready(function() {
  
  const updateCharacterCounter = (characters, counter, key) => {
    if (characters > 140 && characters <= 141) {
      counter.innerText = -1;
      $(counter).addClass('counter-red');
    } else if (characters > 141) {
      if (key === 'keypress') {
        counter.innerText -= 1;
      } else {
        counter.innerText -= -1;
      }
    } else if (characters >= 0) {
      $(counter).removeClass('counter-red');
      counter.innerText = characters;
    } else if (characters < 0) {
      $(counter).removeClass('counter-red');
      counter.innerText = 0;
    }
  };
  
  $('textarea').on('keypress', function(event) {
    const $characters = $(this).val().length + 1;
    const $counter = $(this.closest('form')).find('output.counter')[0];
    const key = event.type;

    updateCharacterCounter($characters, $counter, key);
  });

  $('textarea').on('keydown', function(event) {
    const $characters = $(this).val().length - 1;
    const $counter = $(this.closest('form')).find('output.counter')[0];
    const key = event.key;

    if (key === 'Backspace') {
      updateCharacterCounter($characters, $counter, key);
    }
  });
});