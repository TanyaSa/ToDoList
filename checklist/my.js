let checklist = document.querySelector('#checklist');
let add = document.querySelector('#add');
let newItem = document.querySelector('#newItem');
let list = document.querySelector('#list');


//adding new block for entering
const buttonClickHandler = function() {
    let addBlock = document.createElement('li');
    checklist.appendChild(addBlock);

    let newLine = document.createElement('input');
    let okButton = document.createElement('input');
    let removeButton = document.createElement('input');
    newLine.id = 'newLine';
    okButton.type = 'button';
    okButton.value = 'Save';
    okButton.id = 'submit';
    removeButton.type = 'button';
    removeButton.value = 'Remove';
    removeButton.id = 'remove';

    addBlock.appendChild(newLine);
    addBlock.appendChild(okButton);
    addBlock.appendChild(removeButton); //////////////new checkboxes are not visible in for cycle

    //listener for saving new item
    okButton.addEventListener('click', submitClickHandler);
};

//adding new li after clicking Save
const submitClickHandler = function(e) {
    let saveButton = e.target;
    //receive selector for Save

    var textField = saveButton.parentElement.querySelector("input:first-child");

    let newLi = document.createElement('li');
    let newInput = document.createElement('input');

    newInput.type = 'checkbox';
    newInput.className = 'checkbox form-check-input';
    newInput.id = 'flexCheckDefault';

    document.getElementById('submit').remove();
    document.getElementById('remove').remove();
    document.getElementById('newLine').remove();

    checklist.appendChild(newLi);
    newLi.appendChild(newInput);
    newLi.innerHTML += ' ' + textField.value;
};


//switching done and in process styles
const checkboxClickHandler = function(e) {
    let checkbox = e.target;
    let listItem = checkbox.parentElement;
    //alert('ku!');
    listItem.classList.toggle('done');
};


//listener for clicking on checkboxes
const allCheckboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
for (let i = 0; i < allCheckboxes.length; i++) {
    let checkbox = allCheckboxes[i];

    checkbox.addEventListener('click', checkboxClickHandler);
}

//listener for clicking on add new item
newItem.addEventListener('click', buttonClickHandler);


//example from internet
// add.addEventListener('blur', function() {
//     let li = document.createElement('li');
//     li.innerHTML = this.value;
//     this.value = '';

//     checklist.appendChild(li);

// });