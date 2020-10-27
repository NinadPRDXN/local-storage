/* Author: 
    Ninad Parkar
*/
var
item_name = document.querySelector('.item_name'), //Item Name
item_quantity = document.querySelector('.item_quantity'), //Item Quantity
save = document.querySelector('.save'), //Save Button
clear = document.querySelector('.clear'), //Clear Button 
list = document.querySelector('.list'); //List of Items

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
    storage.push('{"itemName": ' + iname + ',"itemQuantity": ' + iquantity + '}');
    add(storage);
    display();
}

//Add Data in Storage
function add(data) {
    var JSONReadyUsers = JSON.stringify(data);
    localStorage.setItem('users', JSONReadyUsers);
}

//Display List
function display() {
    storage = JSON.parse(localStorage['users']);
}





















