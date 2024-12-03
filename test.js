/* General container for the add visitor page */
.visitor-add-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    box-sizing: border-box;
    overflow: auto;
    background-color: var(--background-color);
  }
  
  /* Form container for adding visitors */
  .form-container {
    background-color: var(--card-bg);
    padding: 20px 30px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: auto;  /* Ensure that the width adjusts based on content */
    max-width: 100%;  /* Make sure the form container doesn't overflow on small screens */
    max-height: 80vh;
    overflow-y: auto;
    box-sizing: border-box;
  }
  
  /* Ensure that the form label is correctly styled */
  .form-label-head {
    font-weight: var(--font-weight-bold);
    font-size: 14px !important;
    color: var(--text-color);
    margin-bottom: 6px !important;
  }
  
  /* Styling for form inputs */
  input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: var(--font-size-base);
    background-color: var(--background-color);
    transition: border-color 0.3s, background-color 0.3s;
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: var(--primary-color);
    outline: none;
    background-color: #fff;
  }
  
  /* Make the submit button and cancel button responsive */
  .submit-button,
  .cancel-button {
    background-color: var(--primary-color);
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    font-size: var(--font-size-base);
    cursor: pointer;
    width: 100%;
    text-align: center;
    transition: background-color 0.3s ease;
  }
  
  /* Styling for breadcrumb navigation */
  .breadcrumb {
    font-size: 14px;
    color: #555;
  }
  
  .breadcrumb a {
    text-decoration: none;
    color: var(--primary-color);
    transition: color 0.3s;
  }
  
  .breadcrumb a:hover {
    text-decoration: underline;
    color: var(--primary-color);
  }
  
  /* Responsive Styling for smaller screens */
  @media (max-width: 600px) {
    .form-container {
      width: 100%;  /* Ensure the form takes up 100% width on smaller screens */
      padding: 15px;
    }
  
    .submit-button,
    .cancel-button {
      padding: 12px;
    }
  
    .form-label-head {
      font-size: 1.25rem;
    }
  }
  