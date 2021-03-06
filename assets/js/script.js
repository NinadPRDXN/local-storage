/* Author: 
    Ninad Parkar
*/
var
modal = document.querySelector('.modal'), //Whole Modal
modal_content = document.querySelector('.modal_content'), //Modal Content
close_btn = document.querySelector('.close_btn'), //Close Modal
modal_message = document.querySelector('.modal_message'), //Modal Message
form = document.querySelector('form'), //Form
item_name = document.querySelector('.item_name'), //Item Name
item_quantity = document.querySelector('.item_quantity'), //Item Quantity
save = document.querySelector('.save'), //Save Button
save_container = document.querySelector('.save_container'), //Save Conatiner
clear = document.querySelector('.clear'), //Clear Button 
list = document.querySelector('.list'), //List of Items
listBody = document.querySelector('.list_body'), //List Body
letters = /^[A-Za-z0-9]+$/, //Letters
num = /^[0-9]+$/; //Numbers

//Blocking form functionality 
form.onclick = (e) => {
    e.preventDefault();
}

//Display data of Local Storage
document.onload = checking();

//Checking whether local storage is empty or not
function checking() {
    if(localStorage.hasOwnProperty('users') == false){
        var 
        users = [];
        add(users);
        list.style.display = 'none';
    }
    else {
        display();
    }
}

//Add New Data
save.onclick = saveData;

function saveData() {
    checking();
    var iname = item_name.value,iquantity = item_quantity.value;
    if (!letters.test(iname)) {
        modal.style.transform = 'translateY(0%)';
        modal_message.innerHTML = 'Item Name Should Not Be Blank';
    }
    else if (!num.test(iquantity)) {
        modal.style.transform = 'translateY(0%)';
        modal_message.innerHTML = 'Item Quantity Should Not Be Blank and Must be a Number';
    }
    else {
        storage = JSON.parse(localStorage['users']);
        storage.push('{"itemName": "' + iname + '","itemQuantity": "' + iquantity + '"}');
        add(storage);
        form.reset();
        display();
    } 
}

//Edit the Data
function edit(pivot) {
    var
    storage = JSON.parse(localStorage['users']),
    modification = JSON.parse(storage[pivot]),
    txt = ' ';

    item_name.value = modification.itemName;
    save_container.innerHTML = '<input type="submit" onclick="modify(' + pivot + ')" value="update">';
    item_quantity.value = modification.itemQuantity;
    storage.forEach(listFunction);

    function listFunction(data, index) {
        if (index == pivot) {}
        else {
            data = JSON.parse(storage[index]);
            txt += '<ul><li>' + data.itemName + '</li><li>' + data.itemQuantity + '</li><li><button onclick="edit(' + index + ')">edit</button></li><li><button onclick="del(' + index + ')">delete</button></li></ul>';
        }
    }
    listBody.innerHTML = txt;
}

//Update the Data in local storage
function modify(index) {
    var iname = item_name.value, iquantity = item_quantity.value, storage = JSON.parse(localStorage['users']);
    if (!letters.test(iname)) {
        modal.style.transform = 'translateY(0%)';
        modal_message.innerHTML = 'Item Name Should Not Be Blank';
    }
    else if (!num.test(iquantity)) {
        modal.style.transform = 'translateY(0%)';
        modal_message.innerHTML = 'Item Quantity Should Not Be Blank and Must be a Number';
    }
    else {
    storage.splice(index, 1, '{"itemName": "' + iname + '","itemQuantity": "' + iquantity + '"}');
    add(storage);
    form.reset();
    save_container.innerHTML = '<input type="submit" onclick="saveData()" value="save">';
    display();
    }
}

//Delete the Data
function del(index) {
    var storage = JSON.parse(localStorage['users']);
    storage.splice(index, 1);
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
    var txt = ' ', storage = JSON.parse(localStorage['users']);
    storage.forEach(listFunction),
    list.style.display = 'block';
    function listFunction(data, index) {
        data = JSON.parse(storage[index]);
        txt += '<ul><li>' + data.itemName + '</li><li>' + data.itemQuantity + '</li><li><button onclick="edit(' + index + ')">edit</button></li><li><button onclick="del(' + index + ')">delete</button></li></ul>';
    }

    listBody.innerHTML = txt;
}

//Clear the local Storage
clear.onclick = () => {
    localStorage.removeItem('users');
    form.reset();
    list.style.display = 'none';
}

//Close Modal
close_btn.onclick = () => {
    modal.style.transform = 'translateY(-100%)';
}



















