function showUserDetails() {

    var body = document.getElementsByTagName("body")[0];
    
    var tbl = document.createElement("table");
    tbl.setAttribute("class", "table");
    var tblBody = document.createElement("tbody");
    var trhead = document.createElement('tr');
    var th = document.createElement('th');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    th.appendChild(document.createTextNode("First Name"));
    th1.appendChild(document.createTextNode("Last Name"));
    th2.appendChild(document.createTextNode("Address"));
    th3.appendChild(document.createTextNode("Operation"));
    trhead.appendChild(th);
    trhead.appendChild(th1);
    trhead.appendChild(th2);
    trhead.appendChild(th3);
    tblBody.appendChild(trhead);
    
    for( var i = 0; i < localStorage.length; i++ ) {
        let user =JSON.parse((localStorage.getItem(localStorage.key(i))));
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var btn = document.createElement('input');
        btn.type = "button";
        btn.className = "btn";
        btn.value = "Edit";                    
        btn.onclick = function() {
             updateProfile(user.userName)
        };
            
        td.appendChild(document.createTextNode(user.fName));
        td1.appendChild(document.createTextNode(user.lName));
        td2.appendChild(document.createTextNode(user.address));
        td3.appendChild(btn);

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tblBody.appendChild(tr);
        }
    
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}


var updateProfile = (username) => {
    window.open ('editUserProfile.html?username='+username,'_self',false);
}

function redirectToCreateToDo() {
    var currentLocation    = new URL( window.location.href );
    var editUsername       = currentLocation.searchParams.get("username"); 
    window.open ('createToDo.html?username='+editUsername,'_self',false);
}

function logout() {
    window.open ('index.html','_self',false);
}

function redirectToDo() {
    var currentLocation    = new URL( window.location.href );
    var editUsername       = currentLocation.searchParams.get("username"); 
    window.open ('todoList.html?username='+editUsername,'_self',false);
}

