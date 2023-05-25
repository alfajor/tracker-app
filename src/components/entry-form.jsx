import { useState } from 'react';
import { getAllEntries, createEntry } from '../utils/query-handler';
import EntryListing from './entry-listing';
import Button from './atoms/button';
import styled from 'styled-components';

const EntryForm = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');

    const [entryState, setEntryState] = useState([]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(title.length > 0 && company.length > 0 && status.length > 0) {
            createEntry(title, company, status)
        }
        // reset fields
        setTitle('')
        setCompany('')
        setStatus('')
    }

    const allEntryHandler = async () => {
        const entries = await getAllEntries();
        return entries;
    }
    const allEntries = allEntryHandler();
   
    allEntries.then((entry) => {
       setEntryState(entry)
    });
    
    return (
        <>
            <h1>Job Tracker</h1>
            <StyledForm>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                <input type="text" placeholder="company" value={company} onChange={(e) => setCompany(e.currentTarget.value)} />
                <input type="text" placeholder="status" value={status} onChange={(e) => setStatus(e.currentTarget.value)} />

                <Button type={'submit'} buttonText={'Submit'} backgroundColor={'#ecd150'} onClick={formSubmitHandler} />
            </StyledForm>

            <EntryListing allEntries={entryState} />
        </>
    )
}

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    padding: 1em;

    input {
        padding: .9em;
        margin-left: 1em;
        border: 1px solid #eee;
        border-radius: 2px;
    }
`;

export default EntryForm;