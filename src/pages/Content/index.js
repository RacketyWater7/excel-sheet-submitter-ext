import submitFormData from './modules/submitFormData';

console.log('Content script works!');

/**
 * Submits the form data from the localStorage
 */
function initiateFormSubmissions() {
  // Retrieve data from localStorage
  const storedFormData = localStorage.getItem('formData');
  if (storedFormData) {
    const formData = JSON.parse(storedFormData);
    console.info('here is data:', formData);
    submitFormData(formData);
  }
}

// catch messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'submitData') {
    const formData = message.data;

    // Store the data in localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Call the function to initiate form submissions
    sendResponse({ success: true });
    setTimeout(() => {
      initiateFormSubmissions();
    }, 1000);
  }
});

// Call the function on page reload
window.addEventListener('load', initiateFormSubmissions);
