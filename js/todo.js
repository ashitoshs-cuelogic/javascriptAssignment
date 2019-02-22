function fillToDoData() {
    var currentLocation = new URL( window.location.href );
    var username        = currentLocation.searchParams.get("username");
    var todoId          = currentLocation.searchParams.get("todoId");
    var userDetails     = JSON.parse( localStorage.getItem( username ) );  
    
    if( todoId !== null ) {
        var todoDetails     = userDetails.todos[parseInt( todoId)];

        document.getElementById( "title" ).value        = todoDetails.title;
        document.getElementById( "tododate" ).value     = todoDetails.todoDate;;
        document.getElementById("reminderDate").value   = todoDetails.reminderDate;

        if( todoDetails.categories.indexOf('Done') >=0 ) {
            document.getElementById("done").checked = true;
        }
    
        if(todoDetails.categories.indexOf("Pending")>=0) {
            document.getElementById("pending").checked=true;
        }

        if(todoDetails.categories.indexOf("IsReminder")>=0) {
            document.getElementById( "reminderDate" ).disabled = false;    
            document.getElementById("isReminder").checked=true;
        }

        if( todoDetails.isPublic == "yes" ) {
            document.getElementById("ispublicYes").checked = true;
        } else if( todoDetails.isPublic == "no" ) {
            document.getElementById("ispublicNo").checked = true;
        }

        var preview = document.querySelector('img');
        preview.src = todoDetails.attachment;
    }
}

function createToDo() {
    var todo    = {};
    var userDetails = getUserDetails(); 
    
    var currentLocation = new URL( window.location.href );
    var todoId          = currentLocation.searchParams.get("todoId");

    if( userDetails.userName != "" ) {
        var category = [];

        if( false == validateToDoData() ) {
            return false;
        }

        todo.title          = document.getElementById( "title" ).value;
        todo.todoDate       = document.getElementById( "tododate" ).value;
        todo.reminderDate   = document.getElementById( "reminderDate" ).value;
        todo.isPublic       = document.querySelector('input[name="ispublic"]:checked').value;
    
        if( document.getElementById("done").checked == true ) {
            category.push( "Done" );
        }
    
        if( document.getElementById("pending").checked == true ) {
            category.push( "Pending" );
        }
    
        if( document.getElementById("isReminder").checked == true ) {
            category.push( "IsReminder" );
        }

        var preview = document.querySelector('img');  
        if( preview.src != "" ) {
            todo.attachment = preview.src;
        } else {
            todo.attachment = "";
        }

        todo.categories     = category;

        if( todoId == null ) {
            if( typeof( userDetails.todos ) == 'undefined' ) {
                userDetails.todos = [];
            }
            userDetails.todos.push( todo );

        } else {
            userDetails.todos[parseInt(todoId)]=todo;
         }

        
        localStorage.setItem( userDetails.userName, JSON.stringify( userDetails ) );

        // Redirect to the To-Do list page
        window.open( 'todoList.html?username=' + userDetails.userName, '_self', false);
    } else {
        alert( 'Invalid User' );
    }
}

function isReminderDate() {
  if( document.getElementById( "isReminder" ).checked ) {
      document.getElementById( "reminderDate" ).disabled = false;    
  } else {
    document.getElementById( "reminderDate" ).disabled = true;  
  }
}

function backToUserProfile() {
    var currentLocation    = new URL( window.location.href );
    var editUsername       = currentLocation.searchParams.get("username"); 
    window.open ('userProfile.html?username='+editUsername,'_self',false);
}


function previewFile(){  
    var userDetails = getUserDetails();
    var preview     = document.querySelector('img');   
    var file        = document.querySelector('input[type=file]').files[0];   
    var reader      = new FileReader();  

    reader.onloadend = function () {  
        preview.src = reader.result;  
        userDetails.image=reader.result;   
    }  

    if( file ) {  
        reader.readAsDataURL(file);   
    } 
    // else {  
    //     preview.src = "";  
    // }  
}

function getUserDetails() {
    var currentLocation = new URL( window.location.href );
    var username        = currentLocation.searchParams.get("username");
    return JSON.parse( localStorage.getItem( username ) );  
}

function validateToDoData() {

    var boolValid       = true;
    var title           = document.getElementById( "title" ).value;
    var todoDate        = document.getElementById( "tododate" ).value;
    var reminderDate    = document.getElementById( "reminderDate" ).value;
    var profilePic      = document.querySelector('img');

    if( title == "" ) {
        document.getElementById("titleErr").innerHTML = "Title is required";
        document.getElementById("titleErr").style.display = "block";
        boolValid = boolValid && false;
    } else {
        document.getElementById("titleErr").innerHTML = "";
        document.getElementById("titleErr").style.display = "none";
    }

    if( todoDate == "" ) {
        document.getElementById("tododateErr").innerHTML = "To-Do date is required";
        document.getElementById("tododateErr").style.display = "block";
        boolValid = boolValid && false;
    } else {
        document.getElementById("tododateErr").innerHTML = "";
        document.getElementById("tododateErr").style.display = "none";
    }

    if( document.getElementById("isReminder").checked == true && reminderDate == "" ) {
        document.getElementById("reminderDateErr").innerHTML = "Reminder date is required";
        document.getElementById("reminderDateErr").style.display = "block";
        boolValid = boolValid && false;
    } else {
        document.getElementById("reminderDateErr").innerHTML = "";
        document.getElementById("reminderDateErr").style.display = "none";
    }

    if( profilePic.src == "" ) {
        document.getElementById("profilePicErr").innerHTML = "To-Do pic is required";
        document.getElementById("profilePicErr").style.display = "block";
        boolValid = boolValid && false;
    } else {
        document.getElementById("profilePicErr").innerHTML = "";
        document.getElementById("profilePicErr").style.display = "none";
    }

    if( document.getElementById("done").checked == false && 
        document.getElementById("pending").checked == false && 
        document.getElementById("isReminder").checked == false ) {
        document.getElementById("categoriesErr").innerHTML = "Please select at least 1 category";
        document.getElementById("categoriesErr").style.display = "block";
        boolValid = boolValid && false;
    } else {
        document.getElementById("categoriesErr").innerHTML = "";
        document.getElementById("categoriesErr").style.display = "none";
    }

    return boolValid;
}