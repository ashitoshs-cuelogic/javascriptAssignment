var login =(function(){
   
   function validateLogin() {
      var username = ( document.getElementById('username').value ).toLowerCase();
      var password = document.getElementById('password').value;
  
     if( localStorage.getItem( username ) != null ) {
       var userDetails = JSON.parse( localStorage.getItem( username ) );
        if( userDetails.userName == username && userDetails.password == password ) {
              userDetails.isauthinticate = 1;
              localStorage.setItem( userDetails.userName,JSON.stringify( userDetails ) );
              window.open( 'userProfile.html?username='+userDetails.userName,'_self',false );
        } else {
           alert( "Invalid username/password" );
        }
     } else {
       alert( "user not found" );
     } 
  }

  function openRegistration() {
   location.href = "../../Registration Project/html/registration.html";
}
  
return {
     validate : validateLogin,
     redirectToRegistration : openRegistration
   }
})();