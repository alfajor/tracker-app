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
            <TitleWrapper>
                <h1>Job Tracker</h1>
            </TitleWrapper>
            <StyledForm>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                <input type="text" placeholder="company" value={company} onChange={(e) => setCompany(e.currentTarget.value)} />
                <input type="text" placeholder="status" value={status} onChange={(e) => setStatus(e.currentTarget.value)} />

                <Button type={'submit'} buttonText={'Add'} backgroundColor={'#ecd150'} onClick={formSubmitHandler} />
            </StyledForm>

            <EntryListing allEntries={entryState} />
        </>
    )
}

const TitleWrapper = styled.div`
    text-align: center;
`;

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    padding: 1em;
    border-bottom: 1px solid #eee;

    @media screen and (max-width: 768px) {
        flex-flow: column;
    }

    input {
        padding: .9em;
        margin-left: 1em;
        border: 1px solid #eee;
        border-radius: 2px;

        @media screen and (max-width: 768px) {
            margin-bottom: 1em;
        }
    }
`;

export default EntryForm;