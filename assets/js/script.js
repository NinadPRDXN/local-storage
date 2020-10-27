/* Author: 
    Ninad Parkar
*/
var
item_name = document.querySelector('.item_name'), //Item Name
item_quantity = document.querySelector('.item_quantity'), //Item Quantity
save = document.querySelector('.save'), //Save Button
clear = document.querySelector('.clear'), //Clear Button 
list = document.querySelector('.list'), //List of Items
listBody = document.querySelector('.list-body'); //List Body

//Assigning types of each input field 
item_name.type = 'text';
item_quantity.type = 'text';
save.type = 'submit';
clear.type = 'submit';

//Display data of Local Storage
if(localStorage.hasOwnProperty('users') == false){
    var 
    users = [];
    add(users);
}
else {
    display();
}

//Add New Data
save.onclick = (e) => {
    e.preventDefault();
    iname = item_name.value;
    iquantity = item_quantity.value;
    storage = JSON.parse(localStorage['users']);
    storage.push('{"itemName": "' + iname + '","itemQuantity": "' + iquantity + '"}');
    add(storage);
    display();
}

//Edit the Data
function edit(value) {
    storage = JSON.parse(localStorage['users']);
    console.log(JSON.parse(storage[value]));
}

//Delete the Data
function del(value) {
    console.log(value);
}

//Add Data in Storage
function add(data) {
    var JSONReadyUsers = JSON.stringify(data);
    localStorage.setItem('users', JSONReadyUsers);
}

//Display List
function display() {
    var
    txt = ' ',
    storage = JSON.parse(localStorage['users']);
    storage.forEach(listFunction);

    function listFunction(data, index) {
        data = JSON.parse(storage[index]);
        txt += '<ul><li>' + data.itemName + '</li><li>' + data.itemQuantity + '</li><li><button onclick="edit(' + index + ')">edit</button></li><li><button onclick="del(' + index + ')">delete</button></li></ul>';
    }

    listBody.innerHTML = txt;
}





















