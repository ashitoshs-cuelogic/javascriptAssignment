
var registration = ( function() {

    function openLogin() {
        location.href = "../../Registration Project/html/index.html";
    }

    function registerUser() {
        var user = {};

        if( false == validateData() ) {
            return false;
        }

        user.userName    = document.getElementById('username').value;
        user.password    = document.getElementById('password').value;
        user.fName       = document.getElementById('fName').value;
        user.lName       = document.getElementById('lName').value;
        user.address     = document.getElementById('address').value;
        user.gender      = document.querySelector('input[name="gender"]:checked').value;
        
        var preview = document.querySelector('img');  
        if(preview.src != "" ) {
            user.profilePic = preview.src;
        } else {
            user.profilePic = "";
        }


        if ( localStorage.getItem( user.userName ) === null ) {
            localStorage.setItem( user.userName, JSON.stringify( user ) );
            var msg = 'Registration completed Successfully';
            resetAll( msg );
        } else {
            alert( 'User already exist' );
        }
    }

    function previewProfilePic(){  
        var preview    = document.querySelector('img');   
        var file       = document.querySelector('input[type=file]').files[0];   
        var reader     = new FileReader();  

        reader.onloadend = function () {  
            preview.src = reader.result;  
        }  

        if(file) {  
            document.getElementById("profilePic").classList.add("show");
            reader.readAsDataURL(file);   
        }  
    }  

    var resetAll = ( msg ) => {
        if( typeof(msg) == 'string' ) {
            document.getElementById( 'success_msg' ).innerHTML = msg;
        }

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('fName').value    = '';
        document.getElementById('lName').value    = '';
        document.getElementById('address').value  = '';
        document.getElementById('fileToUpload').value = '';
        document.getElementById("profilePic").classList.remove("show");
    }

    function updateUserDetails() {
        var currentLocation    = new URL( window.location.href );
        var editUsername       = currentLocation.searchParams.get("username"); 
        var editUserDetails    = JSON.parse( localStorage.getItem( editUsername ) );

        editUserDetails.fName    = document.getElementById('fName').value;
        editUserDetails.lName    = document.getElementById('lName').value;
        editUserDetails.address  = document.getElementById('address').value;
        editUserDetails.gender   = document.querySelector('input[name="gender"]:checked').value;
        // editUserDetails.image    = document.getElementById('image').value;
        
        var preview = document.querySelector('img');  
        if( preview.src != "" ) {
            editUserDetails.profilePic = preview.src;
        } else {
            editUserDetails.profilePic = "";
        }
        localStorage.setItem( editUserDetails.userName, JSON.stringify( editUserDetails ) );
        window.open( 'userProfile.html?username='+editUserDetails.userName,'_self',false );
    }


    function redirectUserProfile() {
        var currentLocation = new URL( window.location.href );
        var username        = currentLocation.searchParams.get("username");
        window.open( 'userProfile.html?username=' + username,'_self', false );
    }

    function validateData() {
        var boolValid   = true;

        var userName    = document.getElementById('username').value; 
        var password    = document.getElementById('password').value; 
        var fName       = document.getElementById('fName').value; 
        var lName       = document.getElementById('lName').value; 
        var address     = document.getElementById('address').value; 
        var gender      = document.querySelector('input[name="gender"]:checked').value;
        var profilePic  = document.querySelector('img');

        if( userName == "" ) {
            document.getElementById("userNameErr").innerHTML = "Username is required";
            document.getElementById("userNameErr").style.display = "block";
            boolValid = boolValid && false;
        } else {
            document.getElementById("userNameErr").innerHTML = "";
            document.getElementById("userNameErr").style.display = "none";
        }

        if( password == "" ) { 
            document.getElementById("passwordErr").innerHTML = "Password is required";
            document.getElementById("passwordErr").style.display = "block";
            boolValid = boolValid && false;
        } else {
            document.getElementById("passwordErr").innerHTML = "";
            document.getElementById("passwordErr").style.display = "none";
        }

        if( fName == "" ) {
            document.getElementById("fNameErr").innerHTML = "First name is required";
            document.getElementById("fNameErr").style.display = "block";
            boolValid = boolValid && false;
        } else {
            document.getElementById("fNameErr").innerHTML = "";
            document.getElementById("fNameErr").style.display = "none";
        }

        if( lName == "" ) {
            document.getElementById("lNameErr").innerHTML = "Last name is required";
            document.getElementById("lNameErr").style.display = "block";
            boolValid = boolValid && false;
        } else {
            document.getElementById("lNameErr").innerHTML = "";
            document.getElementById("lNameErr").style.display = "none";
        }

        if( address == "" ) {
            document.getElementById("addressErr").innerHTML = "Address is required";
            document.getElementById("addressErr").style.display = "block";
            boolValid = boolValid && false;
        } else {
            document.getElementById("addressErr").innerHTML = "";
            document.getElementById("addressErr").style.display = "none";
        }

        if( gender === null ) { 
            document.getElementById("genderErr").innerHTML = "Please select gender";
            document.getElementById("genderErr").style.display = "block";
            boolValid = boolValid && false;
        } else {
            document.getElementById("genderErr").innerHTML = "";
            document.getElementById("genderErr").style.display = "none";
        } 

        if( profilePic.src == "" ) {
            document.getElementById("profilePicErr").innerHTML = "Profile pic is required";
            document.getElementById("profilePicErr").style.display = "block";
            boolValid = boolValid && false;
        } else {
            document.getElementById("profilePicErr").innerHTML = "";
            document.getElementById("profilePicErr").style.display = "none";
        }

        return boolValid;    
    }

    return {
        openLogin : openLogin,
        registerUser : registerUser,
        previewProfilePic : previewProfilePic,
        updateUserDetails : updateUserDetails,
        redirectUserProfile : redirectUserProfile
    }
} )();