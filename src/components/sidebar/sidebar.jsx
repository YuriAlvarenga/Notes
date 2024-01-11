import React, {useState} from "react"
import { Box, List, Divider,} from "@mui/material"
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export default function Sidebar(props) { //handleItemClick  vindo do arquivo home comop props

    const [activeItem, setActiveItem] = useState(1)

    const itemsMenu = [
      {
        name: "Menu",
        children: [
          { id: 1, name: "My Notes" },
          { id: 2, name: "Shared Notes" },
          { id: 3, name: "Settings" },
        ],
      },
    ]
  
    return (
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {itemsMenu.map(({ name, children }) => (
            <React.Fragment key={name}>
              <ListItem disablePadding>
                <ListItemText sx={{ m: 1 }}>{name}</ListItemText>
              </ListItem>
              {children.map(({ id, name: childName }) => (
                <ListItem disablePadding key={id}>
                  <ListItemButton selected={activeItem === id }onClick={() => {props.handleItemClick( id); setActiveItem(id)}}>
                    <ListItemText>{childName}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
        <Divider />
      </Box>
    )
  }