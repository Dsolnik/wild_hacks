window.onload = function(){

  var signIn = document.getElementById('signIn');
  var signUp = document.getElementById('signUp');
  var toggle_signUp = document.getElementById('toggle_signUp');
  var toggle_signIn = document.getElementById('toggle_signIn');

  toggle_signIn.addEventListener('click', function(){
    signUp.style.display = "none";
    signIn.style.display = "block";
  });

  toggle_signUp.addEventListener('click', function(){
    signUp.style.display = "block";
    signIn.style.display = "none";
  });

};