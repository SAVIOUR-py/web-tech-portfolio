/**
 * ICT251 Web Technologies — Activity 3
 * Student Portfolio Core Interactive Features
 * Handled Features: Form Validation, Dark/Light Theme Switch, 
 * Expandable Project Blocks, and Mobile Menu Toggle.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all modular interface tracks
    initThemeSwitch();
    initMobileNavigation();
    initExpandableContent();
    initFormValidation();
});

/**
 * FEATURE 1 (Compulsory): Contact Form Validation & Local Preview
 * Intercepts form post actions, checks constraints, and outputs a 
 * sanitised preview summary using textContent without triggering a page reload.
 */
function initFormValidation() {
    const form = document.getElementById("portfolio-form");
    const previewContainer = document.getElementById("preview-container");

    if (!form || !previewContainer) return;

    form.addEventListener("submit", (event) => {
        // Stop the browser from attempting to reload or submit data to a server
        event.preventDefault();

        // Target field data elements
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        // Clear previous error message strings
        document.getElementById("name-error").textContent = "";
        document.getElementById("email-error").textContent = "";
        document.getElementById("message-error").textContent = "";

        let isValid = true;

        // Constraint 1: Validate Name (Reject whitespace-only fields)
        if (!nameInput.value.trim()) {
            document.getElementById("name-error").textContent = "Please provide your name.";
            isValid = false;
        }

        // Constraint 2: Validate Email Format using standard RFC structure regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            document.getElementById("email-error").textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // Constraint 3: Validate Message Content (Reject whitespace-only strings)
        if (!messageInput.value.trim()) {
            document.getElementById("message-error").textContent = "Please write a message.";
            isValid = false;
        }

        // If constraints fail, cancel out execution blocks
        if (!isValid) {
            previewContainer.classList.add("hidden");
            return;
        }

        // Output sanitised local layout data using textContent safely
        previewContainer.innerHTML = ""; // Clear out stale container records
        previewContainer.classList.remove("hidden");

        const statusHeading = document.createElement("h3");
        statusHeading.textContent = "Form Submission Summary (Local Demonstration)";
        
        const verificationNote = document.createElement("p");
        verificationNote.innerHTML = "<strong>Status:</strong> Input successfully validated locally. No external system tracking records were saved.";

        const summaryList = document.createElement("ul");

        const itemName = document.createElement("li");
        itemName.innerHTML = "<strong>Name:</strong> ";
        const nameVal = document.createElement("span");
        nameVal.textContent = nameInput.value;
        itemName.appendChild(nameVal);

        const itemEmail = document.createElement("li");
        itemEmail.innerHTML = "<strong>Email:</strong> ";
        const emailVal = document.createElement("span");
        emailVal.textContent = emailInput.value;
        itemEmail.appendChild(emailVal);

        const itemMsg = document.createElement("li");
        itemMsg.innerHTML = "<strong>Message:</strong> ";
        const msgVal = document.createElement("span");
        msgVal.textContent = messageInput.value;
        itemMsg.appendChild(msgVal);

        summaryList.appendChild(itemName);
        summaryList.appendChild(itemEmail);
        summaryList.appendChild(itemMsg);

        previewContainer.appendChild(statusHeading);
        previewContainer.appendChild(verificationNote);
        previewContainer.appendChild(summaryList);

        // Reset target inputs cleanly
        form.reset();
    });
}

/**
 * FEATURE 2: Dark / Light Theme Toggle Switch
 * Appends a body class signature to shift CSS global root color definitions.
 */
function initThemeSwitch() {
    const toggleButton = document.getElementById("theme-toggle");
    if (!toggleButton) return;

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        
        // Update contextual button interface description labels dynamically
        if (document.body.classList.contains("dark-theme")) {
            toggleButton.textContent = "Light Theme Mode";
        } else {
            toggleButton.textContent = "Dark Theme Mode";
        }
    });
}

/**
 * FEATURE 3: Expandable Project Details Content Panels
 * Toggles structural layout block displays using target class tokens.
 */
function initExpandableContent() {
    const expandButtons = document.querySelectorAll(".expand-btn");

    expandButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const detailBlock = button.nextElementSibling;
            if (!detailBlock) return;

            detailBlock.classList.toggle("hidden");

            // Update interactive element configuration tracking flags
            if (detailBlock.classList.contains("hidden")) {
                button.textContent = "Show Details";
            } else {
                button.textContent = "Hide Details";
            }
        });
    });
}

/**
 * FEATURE 4: Responsive Mobile Layout Navigation Management Menu
 * Controls interactive view parameters across target compact display views.
 */
function initMobileNavigation() {
    const navToggle = document.getElementById("nav-toggle");
    const mainNav = document.getElementById("main-nav");

    if (!navToggle || !mainNav) return;

    navToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        
        // Update clear open/closed text status markers visually
        if (mainNav.classList.contains("open")) {
            navToggle.textContent = "✕ Close";
        } else {
            navToggle.textContent = "☰ Menu";
        }
    });

    // Close layout tracking sheet smoothly when any inner link tracking endpoint fires
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            navToggle.textContent = "☰ Menu";
        });
    });
}