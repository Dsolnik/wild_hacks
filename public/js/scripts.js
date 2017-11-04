window.onload = function(){
  if(document.title == "Groups"){
    var newGroup = document.getElementById('newGroup');
    var create_newGroup = document.getElementById('create_newGroup');

    create_newGroup.addEventListener('click', function(){
      if(newGroup.style.display == "block"){
        newGroup.style.display = "none";
      }else{
        newGroup.style.display = "block";
      }
    });
  }else{
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
  }

};
