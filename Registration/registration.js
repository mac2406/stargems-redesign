let currentStep = 1;
let maxReachedStep = 1;

function nextStep(targetStep) {
    if (targetStep === currentStep) return;

    // Validate if moving forward
    if (targetStep > currentStep) {
        const currentForm = document.getElementById(`form-step-${currentStep}`);

        // Custom Validation for Step 1
        if (currentStep === 1) {
            const pwd = document.getElementById('password');
            const confirmPwd = document.getElementById('confirmPassword');
            const captcha = document.getElementById('captchaInput');

            // 1. Password Match
            if (pwd.value !== confirmPwd.value) {
                confirmPwd.setCustomValidity("Passwords do not match!");
            } else {
                confirmPwd.setCustomValidity("");
            }

            // 2. Captcha
            if (captcha.value !== "68B910") {
                captcha.setCustomValidity("Incorrect security code. Please match the case.");
            } else {
                captcha.setCustomValidity("");
            }
        }

        // Custom Validation for Step 2
        if (currentStep === 2) {
            const fName = document.getElementById('firstName');
            const lName = document.getElementById('lastName');

            if (fName.value.trim().toLowerCase() === lName.value.trim().toLowerCase() && fName.value.trim() !== "") {
                lName.setCustomValidity("Last Name cannot be the same as First Name.");
            } else {
                lName.setCustomValidity("");
            }
        }

        // If there is a form for the current step, validate it
        if (currentForm) {
            if (!currentForm.checkValidity()) {
                currentForm.reportValidity(); // Show browser validation messages
                return; // Stop navigation
            }
        }

        // Update maxReachedStep if we are progressing
        if (targetStep > maxReachedStep) {

            if (targetStep > maxReachedStep + 1) {
                targetStep = maxReachedStep + 1;
            }
            maxReachedStep = Math.max(maxReachedStep, targetStep);
        }
    }

    // Hide all steps
    document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');

    // Show target step
    document.getElementById(`step-${targetStep}`).style.display = 'block';

    // Update Sidebar
    updateSidebar(targetStep);

    // Update Feather Icons
    feather.replace();

    currentStep = targetStep;
}

function updateSidebar(activeStep) {
    const steps = document.querySelectorAll('.step-item');

    steps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active');

        if (stepNum === activeStep) {
            step.classList.add('active');
        }

        // Logic for "completed" look
        if (stepNum < activeStep) {
            step.classList.add('completed');
            step.querySelector('.step-icon').innerHTML = '<i data-feather="check-circle"></i>';
        } else {
            step.classList.remove('completed');
            // Restore original icons based on index
            const icons = ['lock', 'book', 'layout', 'users', 'home'];
            step.querySelector('.step-icon').innerHTML = `<i data-feather="${icons[index]}"></i>`;
        }
    });


    // Lock sidebar if submitted
    if (activeStep === 5) {
        steps.forEach(step => step.classList.add('submitted-locked'));
    }

    feather.replace();
}

document.addEventListener('DOMContentLoaded', () => {
    feather.replace();

    // Answer FAQ Toggles
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    // Add click listeners to sidebar steps
    const steps = document.querySelectorAll('.step-item');
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Prevent navigation if registration is submitted (Step 5)
            if (currentStep === 5) return;

            const stepNum = index + 1;


            if (stepNum < currentStep) {
                nextStep(stepNum);
            } else if (stepNum > currentStep) {
                if (stepNum <= maxReachedStep + 1) {
                    nextStep(stepNum);
                }
            }
        });
    });
    // Multiple Stores Toggle
    const storeSwitch = document.getElementById('multipleStoresSwitch');
    const storeDetails = document.getElementById('multipleStoresDetails');
    const storeInput = document.getElementById('storeDetails');

    if (storeSwitch) {
        storeSwitch.addEventListener('change', function () {
            if (this.checked) {
                storeDetails.style.display = 'block';
                storeInput.setAttribute('required', 'true');
            } else {
                storeDetails.style.display = 'none';
                storeInput.removeAttribute('required');
                storeInput.value = ''; // Clean up
            }
        });
    }
});
