const JSON_HEADERS = {
    'Content-Type': 'application/json'
}

// TODO: real API endpoints
export const getAllEntries = async () => {
    const res = await fetch('http://localhost:4000/entries/all');
    const data = await res.json();
    
    return data;
};

export const createEntry = async (title, company, status) => {
    await fetch('http://localhost:4000/entries/create', {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({
            title: title,
            company: company,
            status: status
        }) 
    })
}

export const updateEntry = async (id, status) => {
    await fetch(`http://localhost:4000/entries/update/${id}`, {
        method: 'PUT',
        headers: JSON_HEADERS,
        body: JSON.stringify({
            status: status
        })
    });
}

export const deleteEntry = async (id) => {
    await fetch(`http://localhost:4000/entries/delete/${id}`, {
        method: 'DELETE',
        headers: JSON_HEADERS
    });
}