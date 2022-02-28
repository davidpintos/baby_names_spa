
import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBabyName, createNewList } from '../api';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import BabiesNames from './BabiesNames';
import ExistingLists from './ExistingLists';
import { isValidName, randomString } from '../utils';

import { Action } from '../reducers/BabiesReducer';
import { Action as ListAction } from '../reducers/ListReducer';
import { BabiesAppContext } from '../BabiesAppContext';

const Home = () => {
  const {
    babies, lists, dispatchBabies, dispatch
  } = useContext(BabiesAppContext);

  const navigate = useNavigate();
  let newListId = '';
  const [babyName, setBabyName] = useState('');

  const { listId } = useParams();

  const handleFormSubmit = (e) => {
    const finalBabyName = babyName.trim();
    const isValid = isValidName(finalBabyName);

    if (isValid) {
      if (listId) {
        const result = babies.filter(item => item.name.toLowerCase() === finalBabyName.toLowerCase());

        if (result.length) {
          alert('Error: Name already exists in this list!');
          return;
        }

        const createBabyNameToList = async () => {
          try {
            const result = lists.filter(item => item.identification === listId);

            if (result.length) {
              newListId = result[0].id;
            }

            const {data} = await createBabyName({ name: finalBabyName, listID: newListId });
            
            dispatchBabies({ action: Action.ADD_BABY, payload: data });
            
          } catch (e) {
            console.log(e);
          }
        }

        createBabyNameToList();
      } else {
        newListId = randomString();

        const createBabyNameAndList = async () => {
          try {
            const { data } = await createNewList(newListId);

            const {data: babiesData} = await createBabyName({ name: finalBabyName, listID: data.id });

            dispatch({ action: ListAction.ADD_LIST, payload: data });
            dispatchBabies({ action: Action.ADD_BABY, payload: babiesData });

            navigate(`/${newListId}`);
          } catch (e) {
            console.log(e);
          }
        }

        createBabyNameAndList();
      }

    } else {
      alert('Error: Invalid Name, only letters are admitted.');
    }

    setBabyName('');
    e.preventDefault();
  }

  return (
    <Container>
      <header>
        <h1>Welcome to Babies Names App!</h1>
      </header>

      <TextField label="Type Baby Name..." variant="standard"
        id="babyName"
        name="babyName"
        value={babyName}
        onChange={e => setBabyName(e.target.value)}
      />
      <Button sx={{ marginLeft: '10px', height: 48 }} variant="outlined" onClick={handleFormSubmit}>Submit</Button>

      <BabiesNames />
      <ExistingLists />
    </Container>
  )
}

export default Home;
