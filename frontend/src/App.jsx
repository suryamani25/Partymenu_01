import React, { useState } from "react";

const initialSections = {
  sweets: [
    "Gulab Jamun",
    "Rasgulla",
    "Jalebi",
    "Ras Malai",
    "Kaju Katli",
    "Rasbhari",
    "Besan Laddu",
    "Budi Laddu",
    "Balusahi",
    "Barfi",
    "Peda",
    "Rajbhog",
  ],
  pizza: [
    "Margherita",
    "Pepperoni",
    "Veg Supreme",
    "Onion Pizza",
    "Corn Pizza",
    "Paneer Pizza",
  ],
  drinks_1: ["Coke", "Sprite", "Fanta", "Maaza", "Dew", "ThumsUp"],
  snacks: ["Samosa", "Pakora", "Spring Roll", "Momos", "Burger"],
  drinks_2: ["Lassi", "Mix Juice", "Banana Shake", "Papaya Shake"],
  ice_cream: ["ButterScotch", "Strawberry", "Vanilla", "Chocolate"],
};

const PartyMenuForm = () => {
  const [sections, setSections] = useState(initialSections);
  const [formData, setFormData] = useState(
    Object.keys(initialSections).reduce(
      (acc, key) => ({ ...acc, [key]: { item: "", quantity: 1 } }),
      {}
    )
  );

  const handleChange = (e, section, type) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [type]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/submit-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      alert(result.message);
    } catch (error) {
      console.error("Error submitting menu:", error);
      alert("Error submitting menu");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header (Fixed) */}
      <header className="w-full bg-blue-600 text-white text-center p-4 text-xl font-bold shadow-md">
        Party Menu Planner
      </header>

      {/* Main Content (Scrollable) */}
      <div className="flex-grow overflow-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto"
        >
          {Object.entries(sections).map(([key, options]) => (
            <div key={key} className="w-full">
              <label className="block font-medium capitalize" htmlFor={key}>
                {key} Section:
              </label>
              <select
                id={key}
                name={key}
                value={formData[key].item}
                onChange={(e) => handleChange(e, key, "item")}
                className="w-full p-2 border rounded shadow-md hover:shadow-lg transition-all duration-300"
              >
                <option value="">Select an option</option>
                {options.map((option) => (
                  <option
                    key={option}
                    value={option.toLowerCase().replace(/ /g, "_")}
                  >
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={formData[key].quantity}
                onChange={(e) => handleChange(e, key, "quantity")}
                className="w-full p-2 border rounded mt-2 shadow-md hover:shadow-lg transition-all duration-300"
                placeholder="Quantity"
              />
            </div>
          ))}
          <div className="flex justify-center col-span-1 md:col-span-3">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full md:w-1/3 max-w-xs flex justify-center items-center hover:bg-blue-700 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Footer (Fixed) */}
      <footer className="w-full bg-blue-600 text-white text-center p-2 shadow-md">
        &copy; 2025 Party Menu Planner. All Rights Reserved.
      </footer>
    </div>
  );
};

export default PartyMenuForm;
