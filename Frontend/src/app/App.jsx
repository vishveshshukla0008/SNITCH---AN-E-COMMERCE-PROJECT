import React, { useState, useRef } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const formRef = useRef(null);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // for not refresing the page !
    console.log(formData);
    setFormData();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="phone"
          placeholder="Enter your phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
