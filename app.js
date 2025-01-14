// Event listeners for URL update
document.getElementById("createPaymentLink").addEventListener("click", createPaymentLink);
document.getElementById("createContract").addEventListener("click", createContract);
document.getElementById("copyUrlButton").addEventListener("click", copyUrl);
document.getElementById("clearUrlButton").addEventListener("click", clearUrl);

// Event listener for form submission to patch data
document.getElementById("patchForm").addEventListener("submit", patchData);

// Function to create the Payment Link
function createPaymentLink() {
    const urlInput = document.getElementById("urlInput").value;
    if (urlInput) {
        const updatedUrl = `${urlInput}/create-payment`;
        document.getElementById("updatedUrl").value = updatedUrl;
    } else {
        alert("Please enter a valid base URL.");
    }
}

// Function to create the Contract Link
function createContract() {
    const urlInput = document.getElementById("urlInput").value;
    if (urlInput) {
        const updatedUrl = `${urlInput}/create-contract`;
        document.getElementById("updatedUrl").value = updatedUrl;
    } else {
        alert("Please enter a valid base URL.");
    }
}

// Function to copy the updated URL
function copyUrl() {
    const updatedUrlInput = document.getElementById("updatedUrl");
    updatedUrlInput.select();
    document.execCommand("copy");
    alert("URL copied to clipboard!");
}

// Function to clear the updated URL field
function clearUrl() {
    document.getElementById("updatedUrl").value = ''; // Clears the field
    alert("Updated URL field cleared!");
}

// Function to patch the data
async function patchData(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the URL that the user entered
    const urlInput = document.getElementById("urlInput").value;

    // Ensure the URL is not empty
    if (!urlInput) {
        alert("Please create a valid URL to update.");
        return;
    }

    // Prepare the updated data from the form fields
    let updatedData = {
        compulsoryPolicyStartDate: document.getElementById("compulsoryPolicyStartDate").value,
        customerDOB: document.getElementById("customerDOB").value,
        customerFirstName: document.getElementById("customerFirstName").value,
        customerLastName: document.getElementById("customerLastName").value,
        policyHolderDOB: document.getElementById("policyHolderDOB").value,
        policyHolderFirstName: document.getElementById("policyHolderFirstName").value,
        policyHolderLastName: document.getElementById("policyHolderLastName").value,
        policyHolderNationalId: document.getElementById("policyHolderNationalId").value,
        policyStartDate: document.getElementById("policyStartDate").value,
    };

    try {
        // Send the PATCH request to the URL the user entered
        const response = await fetch(urlInput, {
            method: 'PATCH', // Use PATCH method to update data
            headers: {
                'Content-Type': 'application/json', // Specify JSON data format
            },
            body: JSON.stringify(updatedData), // Send the updated data as a JSON object
        });

        if (response.ok) {
            // If the request is successful, show the updated data in the UI
            const data = await response.json();
            document.getElementById("result").textContent = JSON.stringify(data, null, 2);
            alert("Data updated successfully!");
        } else {
            // If there was an error with the request, display an error message
            throw new Error('Failed to update data');
        }
    } catch (error) {
        console.error('Error patching data:', error);
        alert("Error updating data");
    }
}
