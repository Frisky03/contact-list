import React, { useState } from "react";
import './style.css';

const ContactForm = ({ addContact }) => {
  const [contact, setContact] = useState({
    name: "",
    phoneNumber: "",
    houseNumber: "",
    street: "",
    barangay: "",
    city: "",
    zipCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field should be numeric only
    if (["phoneNumber", "houseNumber", "zipCode"].includes(name)) {
      // Allow only numbers: Check if value is a number before setting state
      if (isNaN(value)) {
        return; // If not a number, exit the function early
      }
    }

    // If the value is valid (either numeric or general), update the state
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.name && contact.phoneNumber) {
      addContact(contact);
      alert("Contact added successfully!"); // Success prompt when contact is added
      setContact({ name: "", phoneNumber: "", houseNumber: "", street: "", barangay: "", city: "", zipCode: "" });
    } else {
      alert("Please fill in required fields");
    }
  };

  return (
    <div className="container">
      <h1>Contact List</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={contact.name} onChange={handleChange} required />
        <input name="phoneNumber" placeholder="Phone Number (11 digits, e.g., 09XXXXXXXXX)" value={contact.phoneNumber} pattern="09\d{9}" onChange={handleChange} required />
        <input name="houseNumber" placeholder="House Number" value={contact.houseNumber} onChange={handleChange} />
        <input name="street" placeholder="Street" value={contact.street} onChange={handleChange} />
        <input name="barangay" placeholder="Barangay" value={contact.barangay} onChange={handleChange} />
        <input name="city" placeholder="City" value={contact.city} onChange={handleChange} />
        <input name="zipCode" placeholder="Zip Code (4 digits)" value={contact.zipCode} pattern="\d{4}" onChange={handleChange} />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (index) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter((_, i) => i !== index));
    }
  };

  const promptForValidInput = (field, currentValue, pattern, errorMessage) => {
    let input = "";
    do {
      input = prompt(`Enter new ${field}:`, currentValue);
      if (!input) {
        alert(`${field} is required.`);
      } else if (!new RegExp(pattern).test(input)) {
        alert(errorMessage);
        input = ""; // Set to empty string to repeat the prompt
      }
    } while (!input);
    return input;
  };

  const updateContact = (index) => {
    const currentContact = contacts[index];

    const updatedName = promptForValidInput("name", currentContact.name, ".+", "Name is required.");
    const updatedPhone = promptForValidInput(
      "phone number",
      currentContact.phoneNumber,
      "^09\\d{9}$",
      "Invalid phone number format. It should be 11 digits starting with '09'."
    );
    const updatedHouseNumber = prompt("Enter new house number:", currentContact.houseNumber) || currentContact.houseNumber;
    const updatedStreet = prompt("Enter new street:", currentContact.street) || currentContact.street;
    const updatedBarangay = prompt("Enter new barangay:", currentContact.barangay) || currentContact.barangay;
    const updatedCity = prompt("Enter new city:", currentContact.city) || currentContact.city;
    const updatedZipCode = promptForValidInput(
      "zip code",
      currentContact.zipCode,
      "^\\d{4}$",
      "Invalid zip code format. It should be exactly 4 digits."
    );

    const updatedContact = {
      name: updatedName,
      phoneNumber: updatedPhone,
      houseNumber: updatedHouseNumber,
      street: updatedStreet,
      barangay: updatedBarangay,
      city: updatedCity,
      zipCode: updatedZipCode,
    };

    setContacts(contacts.map((contact, i) => (i === index ? updatedContact : contact)));
    alert("Contact updated successfully!"); // Success prompt when contact is updated
  };

  return (
    <div className="container">
      <ContactForm addContact={addContact} />
      <div className="contact-list">
        {contacts.map((contact, index) => (
          <div className="contact-item" key={index}>
            <h3>{contact.name}</h3>
            <p>{contact.phoneNumber}</p>
            <p>{`${contact.houseNumber}, ${contact.street}, ${contact.barangay}, ${contact.city}, ${contact.zipCode}`}</p>
            <button className="delete" onClick={() => deleteContact(index)}>Delete</button>
            <button className="update" onClick={() => updateContact(index)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
