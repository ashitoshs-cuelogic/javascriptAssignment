function showToDoList() {

    var markedAsDone = markedAsPending = false;

    var currentLocation = new URL( window.location.href );
    var username        = currentLocation.searchParams.get("username");
    var userDetails     = JSON.parse( localStorage.getItem( username ) );  
    
    if( document.getElementById("markasdone").checked == true ) {
        markedAsDone    = true;
    }

    if( document.getElementById("pending").checked == true ) {
        markedAsPending = true;
    }


   var filterStartDate  = document.getElementById( "filterStartDate" ).value ? document.getElementById( "filterStartDate" ).value:null;
   var filterEndDate    = document.getElementById( "filterEndDate" ).value ? document.getElementById( "filterEndDate" ).value:null;

    var body    = document.getElementsByTagName("body")[0];
    var tbl     = document.createElement("table");
    tbl.setAttribute("class", "table");
    tbl.setAttribute("id", "todoTable");  
    var tblBody = document.createElement("tbody");
    var trhead  = document.createElement('tr');
    var th      = document.createElement('th');
    var th1     = document.createElement('th');
    var th2     = document.createElement('th');
    var th3     = document.createElement('th');
    var th4     = document.createElement('th');

    th.appendChild( document.createTextNode("Title") );
    th1.appendChild( document.createTextNode("Date") );
    th2.appendChild( document.createTextNode("Status") );
    th3.appendChild( document.createTextNode("Is Public") );
    th4.appendChild( document.createTextNode("Action") );
    trhead.appendChild( th );
    trhead.appendChild( th1 );
    trhead.appendChild( th2 );
    trhead.appendChild( th3 );
    trhead.appendChild( th4 );
    tblBody.appendChild( trhead );

    for( let i = 0; i < userDetails.todos.length; i++ ) {
        var boolChecked = false;
        let todoDetails = JSON.parse( JSON.stringify( userDetails.todos[i] ) );

        if( filterStartDate !== null && filterEndDate !== null ) {
            if( false == dateCheck( filterStartDate, filterEndDate, todoDetails.todoDate ) ) {
                continue;
            }
        }

        if( markedAsDone == true && todoDetails.categories.indexOf( 'Done' ) >= 0 ) {
            boolChecked = true;
        }

        if( boolChecked == false && markedAsPending == true && todoDetails.categories.indexOf( 'Pending' ) >= 0 ) {
            boolChecked = true;
        }

        if( boolChecked == false && ( true == markedAsPending || true == markedAsDone ) ) {
            continue;
        }
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        
        // Edit button 
        var btn = document.createElement('input');
        btn.type = "button";
        btn.className = "btn margin-right";
        btn.value = "Edit";   
        btn.id="b"+i;      
        btn.style="margin:5px;";           
        btn.onclick =function() { updateToDo(username,i)};
        
        // Delete button 
        var delbtn = document.createElement('input');
        delbtn.type = "button";
        delbtn.className = "btn";
        delbtn.value = "Delete";   
        delbtn.id="d"+i;                 
        delbtn.onclick =function() { 
            deleteToDo(username,i) 
        };

        td.appendChild( document.createTextNode( todoDetails.title ) );
        td1.appendChild( document.createTextNode(todoDetails.todoDate ) );
        td2.appendChild( document.createTextNode( todoDetails.categories.join() ) );
        td3.appendChild( document.createTextNode( todoDetails.isPublic ) );
        td4.appendChild( btn );
        td4.appendChild( delbtn );

        tr.appendChild( td );
        tr.appendChild(td1 );
        tr.appendChild(td2 );
        tr.appendChild(td3 );
        tr.appendChild(td4 );
        tblBody.appendChild( tr );
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}

function updateToDo( username, todoId ) {
    window.open( 'createToDo.html?username=' + username + '&todoId= ' + todoId,'_self', false );

}

function deleteToDo( username, todoId ) {
    var userDetails     = JSON.parse( localStorage.getItem( username ) );  

    userDetails.todos.splice( parseInt( todoId ), 1 );
    localStorage.setItem(userDetails.username,JSON.stringify(userDetails));
    window.open ('todoList.html?username='+userDetails.username,'_self',false);
}

function createToDo() {
    var currentLocation = new URL( window.location.href );
    var username        = currentLocation.searchParams.get("username");
    window.open( 'createToDo.html?username=' + username,'_self', false );
}

function logout() {
    window.open( 'index.html','_self', false );
}

function dateCheck(from,to,check) {

    var fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}


function applyFilter() {
    var element = document.getElementById('todoTable');
    element.parentNode.removeChild(element);
    showToDoList();   
}