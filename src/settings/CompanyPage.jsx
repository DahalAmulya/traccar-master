import React, { useState } from "react";
import axios from "axios";

const CompanyPage = ({ showForm, setShowForm }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      address,
      phone,
      pan,
      country,
      state,
      city,
    };

    try {
      const response = await axios.post(
        "http://108.181.195.185:3000/company",
        formData
      );

      console.log("Success:", response.data);
      setName("");
      setAddress("");
      setPhone("");
      setPan("");
      setCountry(""), setState(""), setCity("");
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.container}>
            <button style={styles.closeButton} onClick={handleClose}>
              &times;
            </button>
            <h2>Add Company</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="companyName">Company Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="pan">PAN:</label>
                <input
                  id="pan"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="country">COUNTRY:</label>
                <input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="state">STATE:</label>
                <input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="state">CITY:</label>
                <input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" style={styles.button}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    width: "80%",
    maxWidth: "500px",
    height: "auto",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    marginBottom: "5px",
  },
  textarea: {
    minHeight: "100px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
};

export default CompanyPage;
