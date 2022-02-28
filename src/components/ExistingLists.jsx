
import React, {useContext, useEffect} from 'react';
import { getLists } from '../api';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { Action } from '../reducers/ListReducer';
import { BabiesAppContext } from '../BabiesAppContext';

const ExistingLists = () => {

  const {
    dispatch,
    lists
  } = useContext(BabiesAppContext);

  useEffect(() => {
      
      const fetchData = async () => {
          try {
            const {data} = await getLists();

            dispatch({ action: Action.SET_LIST, payload: data });
          } catch (e) {
              console.log(e);
          }
      }

      fetchData();
  }, [dispatch]);

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '0 auto' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Existing Lists
            </ListSubheader>
            }
        >
          {lists.map((item) => {
              return (
                  <ListItem disablePadding key={item.identification}>
                      <ListItemButton component="a" href={`/${item.identification}`}>
                          <ListItemText primary={item.identification} />
                      </ListItemButton>
                  </ListItem>
              )
          })}
      </List>
    )
}
 
export default ExistingLists;
