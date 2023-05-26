import { useState } from 'react';
import { updateEntry, deleteEntry } from '../utils/query-handler';
import Button from './atoms/button';
import styled from 'styled-components';

const EntryListing = ({allEntries}) => {
    const [updatedField, setUpdatedField] = useState('');
    const [selected, setSelected] = useState(new Set())

    const removeEntryHandler = (id) => {
        deleteEntry(id);
    }

    const updateEntryHandler = (id) => {
        updateEntry(id, updatedField);
    }

    const fieldVisibilityHandler = (id) => {
        const newSelected = new Set(selected);
        !newSelected.has(id) ? newSelected.add(id) : newSelected.delete(id);

        setSelected(newSelected);
    }

    return (
        <>
            <ResultsContainer>
                <p>{allEntries.length} {allEntries.length === 0 || allEntries.length >= 2 ? 'jobs' : 'job'} tracked</p>
                <LabelsWrapper>
                    <p><strong>Role:</strong></p>
                    <p><strong>Company:</strong></p>
                    <p><strong>Status:</strong></p>
                </LabelsWrapper>
                {allEntries.map((entry, idx) => {
                    return (
                        <div key={idx}>
                            <EntriesWrapper>
                                <p>{entry.title}</p>
                                <p>{entry.company}</p>
                                <p>{entry.status}</p>     
                            </EntriesWrapper>                   

                            <OperationsWrapper>
                                <sub onClick={() => fieldVisibilityHandler(entry.id)}>Update status?</sub> 
                                    <UpdateWrapper isVisible={selected.has(entry.id)}>        
                                        <input type="text" placeholder="new status" onChange={(e) => setUpdatedField(e.currentTarget.value)} />
                                        <Button type={'button'} buttonText={'Update'} backgroundColor={'#ecd150'} onClick={() => updateEntryHandler(entry.id)} />
                                    </UpdateWrapper>  
                                <Button type={'button'} buttonText={'Remove'} backgroundColor={'#ff4500'} onClick={() => removeEntryHandler(entry.id)} />
                            </OperationsWrapper>                                   
                        </div>
                    )
                })}
            </ResultsContainer>
        </>
    )
}

const ResultsContainer = styled.div`
    display: flex;
    flex-flow: column;
    margin-left: 5%;
    margin-right: 5%;
`;

const LabelsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
`;

const EntriesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #eeee;
    text-align: center;
`;

const OperationsWrapper = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    margin-bottom: 1em;

    sub {
        cursor: pointer;
        color: #444;
    }
`;

const UpdateWrapper = styled.div`
    display: ${(props) => props.isVisible ? 'block' : 'none'};

    input {
        padding: .9em;
        margin-left: 1em;
        border: 1px solid #eee;
        border-radius: 2px;
    }
`;

export default EntryListing;