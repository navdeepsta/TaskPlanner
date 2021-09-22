let formSection = document.getElementById('form-section');
let cardSection = document.getElementById('card-section');
let windowSize = document.getElementById('window-size');

function hideForm() {
    formSection.style.display = 'none';
}

function displayForm() {
    formSection.style.display = 'block';
}

window.onresize = reportWindowSize;

function reportWindowSize() {
    windowSize.textContent = window.innerWidth;
    if( window.innerWidth < 770) {
        hideForm();
    } else {
        displayForm();
    }
}

