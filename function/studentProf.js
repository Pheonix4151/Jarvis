document.addEventListener('DOMContentLoaded', () => {
  const editButton = document.querySelector('.edit-button');
  const submitButton = document.querySelector('.submit-button');
  const profileContainer = document.querySelector('.profile-container');
  const fileInput = document.getElementById('fileInput');
  const imageCard = document.getElementById('imageCard');
  const imageTag = imageCard.querySelector('img'); // Select the img tag inside imageCard
  
  let isEditing = false;

  // Set initial state
  profileContainer.classList.add('readonly-mode');
  submitButton.classList.add('hidden');
  fileInput.setAttribute('disabled', 'true');

  editButton.addEventListener('click', () => {
    isEditing = !isEditing;

    if (isEditing) {
      profileContainer.classList.add('edit-mode');
      profileContainer.classList.remove('readonly-mode');
      editButton.textContent = 'Cancel';
      submitButton.classList.remove('hidden');
      fileInput.removeAttribute('disabled'); // Enable file input
    } else {
      profileContainer.classList.add('readonly-mode');
      profileContainer.classList.remove('edit-mode');
      editButton.textContent = 'Edit';
      submitButton.classList.add('hidden');
      fileInput.setAttribute('disabled', 'true'); // Disable file input
    }

    // Toggle readonly attribute on inputs
    const inputs = profileContainer.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type === 'email') {
        input.readOnly = true; // Keep email field readonly
        input.classList.add('readonly');
      } else {
        input.readOnly = !isEditing;
        if (isEditing) {
          input.removeAttribute('disabled');
        } else {
          input.setAttribute('disabled', 'true');
        }
      }
    });
  });

  fileInput.addEventListener('change', function() {
    const file = this.files[0];

    if (file && isEditing) { // Check if editing mode is active
      const reader = new FileReader();
      
      reader.onload = function(e) {
        imageCard.style.backgroundImage = `url("${e.target.result}")`;
        imageTag.src = e.target.result; // Update the img tag source
      }

      reader.readAsDataURL(file);
    }
  });
});
