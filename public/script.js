
// set styling for 'groups' checkboxes that have been checked. 

const tags = document.querySelectorAll('.tag');

tags.forEach(tag => {
    const checkbox = tag.querySelector('input[type="checkbox"]');
    console.log(checkbox.value)
    console.log(checkbox.checked);
    
    if (checkbox.checked) {
        tag.classList.add('checked');
    }

    checkbox.addEventListener("change", () => {  
        tag.classList.toggle('checked', checkbox.checked);
    })
})
