
import React, {useContext, useEffect} from 'react';
import { useParams }  from "react-router-dom";

import { getBabies, getListsByIdentification } from '../api';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { Action } from '../reducers/BabiesReducer';
import { BabiesAppContext } from '../BabiesAppContext';

const BabiesNames = () => {

  const {
    dispatchBabies,
    babies
  } = useContext(BabiesAppContext);

  const { listId } = useParams();

  useEffect(() => {
      
      if (listId) {
        const fetchData = async () => {
            try {           
              const {data: listInfo} = await getListsByIdentification(listId);
              if (listInfo[0]) {
                const {data} = await getBabies(listInfo[0].id);
              
                dispatchBabies({ action: Action.SET_LIST, payload: data });
              }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
      }
  }, [dispatchBabies, listId]);

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '0 auto' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              listId && <ListSubheader component="div" id="nested-list-subheader">
                Babies Names for list <b>{listId}</b>
            </ListSubheader>
            }
        >
          {babies.map((item) => {
              return (
                  <ListItem disablePadding key={item.id}>
                      <ListItemButton>
                          <ListItemText primary={item.name} />
                      </ListItemButton>
                  </ListItem>
              )
          })}
      </List>
    )
}
 
export default BabiesNames;
