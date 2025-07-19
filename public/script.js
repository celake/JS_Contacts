// set styling for 'groups' checkboxes that have been checked. 

const tags = document.querySelectorAll('.tag');

tags.forEach(tag => {
    const checkbox = tag.querySelector('input[type="checkbox"]');

    if (checkbox.checked) {
        tag.classList.add('checked');
    }

    checkbox.addEventListener("change", () => {  
        tag.classList.toggle('checked', checkbox.checked);
    })
})


// open dropdown menu on main page

const toggleOn = document.querySelector('.toggleOn');
const selected = document.querySelector('.dropdown-selected');
const options = document.querySelector('.dropdown-options')

toggleOn.addEventListener('click', () => {
    selected.classList.add('hidden');
    options.classList.remove('hidden');
})

options.addEventListener('click', (evt) => {
    const selectedGroup = evt.target;
    const groupName = selectedGroup.textContent;
    const groupId = selectedGroup.dataset.value;
    const selectedText = selected.querySelector('span')
    selectedText.innerText = groupName;
    selected.dataset.value = groupId;
    selected.classList.remove('hidden');
    options.classList.add('hidden');
    
    // filter list
    const contacts = document.querySelectorAll('.contact-item');
    contacts.forEach(contact => {
        const contactGroups = contact.dataset.groups.split(',');
        console.log(contact, contactGroups.includes(groupId));
        if (groupId === "all" || contactGroups.includes(groupId)) {
            contact.classList.remove('hidden');
        } else {
            contact.classList.add('hidden');
        }
    })
})


