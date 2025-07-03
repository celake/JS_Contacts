//select the group-tags
// add event listen for click
    // find label that was clicked
    // add class 'checked' to that label

const group = document.querySelector('.group-tags');

group.addEventListener("click", (e) => {
    const label = e.target.closest('label');
    if (label && group.contains(label)) {
        e.preventDefault();
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            label.classList.toggle('checked', checkbox.checked);
        }
    }
    console.log(label);
})