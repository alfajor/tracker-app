import { useState, useEffect } from 'react';
import { updateEntry, deleteEntry } from '../utils/query-handler';
import Button from './atoms/button';
import styled from 'styled-components';

const EntryListing = ({allEntries}) => {
    const [updatedField, setUpdatedField] = useState('');
    const [selected, setSelected] = useState(new Set());
    const [dropdownSelected, setDropdownSelected] = useState('');
    const [reveal, setReveal] = useState(false);

    const [sortedEntries, setSortedEntries] = useState([]);
    const [entryCount, setEntryCount] = useState(0);
    const [updatedEntryStatus, setUpdatedEntryStatus] = useState('');

    // crud
    const removeEntryHandler = (id) => {
        deleteEntry(id);
        setEntryCount(sortedEntries.length - 1);

        const filterSort = sortedEntries.filter((item) => item.id !== id);
        setSortedEntries(filterSort);
    }

    const updateEntryHandler = (id) => {
        updateEntry(id, updatedField); 
        setUpdatedField(updatedField);

        setUpdatedEntryStatus(updatedField);
    }

    // update field toggle
    const fieldVisibilityHandler = (id) => {
        const newSelected = new Set(selected);
        !newSelected.has(id) ? newSelected.add(id) : newSelected.delete(id);

        setSelected(newSelected);
    }

    // sorting
    const alphabeticalSort = () => {
        const sorted = [...allEntries].sort((a, b) => a.company.localeCompare(b.company));
        setSortedEntries(sorted);
    }

    const statusSort = (target, statusText) => {
        const statusSorted = [...allEntries].filter((el) => el.status === statusText);
        setSortedEntries(statusSorted);
        setDropdownSelected(target);
    }

    const recentSort = () => {
        const dateSort = [...allEntries].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setSortedEntries(dateSort);
    }

    // maintain current updated status
    const setCurrentStatus = (entry) => {
        if(selected.has(entry.id) && updatedField != '') {
            entry.status = updatedEntryStatus;
        }
        return entry.status;
    }

    useEffect(() => {
        setSortedEntries(allEntries);
        setEntryCount(allEntries.length);
    }, [allEntries]);

    return (
        <>
            <ResultsContainer>
                <EntryCounter>
                    <p>{entryCount} {entryCount === 0 || entryCount >= 2 ? 'jobs' : 'job'} tracked</p>
                </EntryCounter>
                
                <SortingWrapper>
                    <Button type={'button'} buttonText={'Sort (A-Z)'} backgroundColor={'green'} textColor={'#fff'} onClick={alphabeticalSort} />
                    <Button type={'button'} buttonText={'Sort (Status)'} backgroundColor={'orange'} textColor={'#fff'} onClick={() => setReveal(!reveal)} />
                    <StyledDropdown type="dropdown" value={dropdownSelected} isVisible={reveal} onChange={(e) => statusSort(e.currentTarget.value, e.currentTarget.value)}>
                        <option value="rejected">rejected</option>
                        <option value="no reply">no reply</option>
                        <option value="ghosted">ghosted</option>
                    </StyledDropdown>
                    <Button type={'button'} buttonText={'Sort (Most Recent)'} backgroundColor={'purple'} textColor={'#fff'} onClick={recentSort} />
                </SortingWrapper>
                <LabelsWrapper>
                    <p><strong>Role:</strong></p>
                    <p><strong>Company:</strong></p>
                    <p><strong>Date:</strong></p>
                    <p><strong>Status:</strong></p>
                </LabelsWrapper>
                
                {sortedEntries.map((entry, idx) => {
                    const currentStatus = setCurrentStatus(entry);

                    return (
                        <div key={idx}>
                            <EntriesWrapper>
                                <p>{entry.title}</p>
                                <p>{entry.company}</p>
                                <p>{entry.created_at ? entry.created_at.slice(0, 11) : null}</p>
                                <p>{currentStatus}</p>     
                            </EntriesWrapper>               

                            <OperationsWrapper>
                                <sub onClick={() => fieldVisibilityHandler(entry.id)}>Update status?</sub> 
                                    <UpdateWrapper isVisible={selected.has(entry.id)}>        
                                        <input type="text" placeholder="new status" onChange={(e) => setUpdatedField(e.currentTarget.value)} />
                                        <Button type={'button'} buttonText={'Update'} backgroundColor={'#ecd150'} onClick={() => updateEntryHandler(entry.id)} />
                                    </UpdateWrapper>  
                                <Button type={'button'} buttonText={'Remove'} backgroundColor={'#ff4500'} textColor={'#fff'} onClick={() => removeEntryHandler(entry.id)} />
                            </OperationsWrapper>                                   
                        </div>
                    );
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

const EntryCounter = styled.div`
    margin-left: .8em;
    font-weight: 600;
`;

const LabelsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
`;

const EntriesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid #eeee;
    text-align: center;
`;

const OperationsWrapper = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: end;
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

const SortingWrapper = styled.div`
    display: flex;
    flex-flow: row;
`;

const StyledDropdown = styled.select`
    display: ${(props) => props.isVisible ? 'block' : 'none'};
    background: transparent;
    border: 1px solid #eee;
    padding: 1em;
`;

export default EntryListing;