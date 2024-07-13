import React, { useState } from 'react';
import axios from 'axios';

const InsertDataPage = () => {
    const [items, setItems] = useState([{ id: '', imageUrl: '', title: '', description: '', price: '' }]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...items];
        newItems[index][name] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { id: '', imageUrl: '', title: '', description: '', price: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/insert', { items });
            alert(response.data.message);
        } catch (error) {
            alert('Error inserting data');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Insert Data</h1>
            <form onSubmit={handleSubmit}>
                {items.map((item, index) => (
                    <div key={index}>
                        <label>ID:</label>
                        <input
                            type="text"
                            name="id"
                            value={item.id}
                            onChange={(event) => handleChange(index, event)}
                            required
                        />
                        <br />
                        <label>Image URL:</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={item.imageUrl}
                            onChange={(event) => handleChange(index, event)}
                            required
                        />
                        <br />
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={item.title}
                            onChange={(event) => handleChange(index, event)}
                            required
                        />
                        <br />
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={item.description}
                            onChange={(event) => handleChange(index, event)}
                        />
                        <br />
                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            value={item.price}
                            onChange={(event) => handleChange(index, event)}
                            required
                        />
                        <br />
                        <hr />
                    </div>
                ))}
                <button type="button" onClick={addItem}>Add More Items</button>
                <br />
                <button type="submit">Insert Data</button>
            </form>
        </div>
    );
};

export default InsertDataPage;
