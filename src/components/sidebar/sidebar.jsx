import React, { useState } from "react"
import { Box, List, ListItem, ListItemButton, ListItemText, Drawer, AppBar, IconButton, Toolbar, Divider, Typography, useMediaQuery, useTheme, Menu, MenuItem } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'

export default function Sidebar(props) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [activeItem, setActiveItem] = useState(1)
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null)
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

    const handleItemClick = (id) => {
        props.handleItemClick(id)
        setActiveItem(id)
        if (isMobile) {
            setMobileMenuAnchorEl(null); // Fechar o menu no clique de um item em dispositivos móveis
        }
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMenuAnchorEl(null)
    }

    const renderDesktopMenu = () => (
        <Drawer variant="permanent" sx={{ width: 0, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240} }}>
            <Toolbar />
            <List>
                {itemsMenu.map(({ name, children }) => (
                    <React.Fragment key={name}>
                        <ListItem disablePadding>
                            <ListItemText sx={{ m: 1 }}>{name}</ListItemText>
                        </ListItem>
                        {children.map(({ id, name: childName }) => (
                            <ListItem disablePadding key={id}>
                                <ListItemButton selected={activeItem === id} onClick={() => handleItemClick(id)}>
                                    <ListItemText>{childName}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </React.Fragment>
                ))}
            </List>
            <Divider />
        </Drawer>
    )

    const renderMobileMenu = () => (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleMobileMenuOpen}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={mobileMenuAnchorEl}
                open={Boolean(mobileMenuAnchorEl)}
                onClose={handleMobileMenuClose}
            >
                {itemsMenu.map(({ name, children }) => (
                    <React.Fragment key={name}>
                        <MenuItem disabled>{name}</MenuItem>
                        {children.map(({ id, name: childName }) => (
                            <MenuItem key={id} selected={activeItem === id} onClick={() => handleItemClick(id)}>
                                {childName}
                            </MenuItem>
                        ))}
                    </React.Fragment>
                ))}
            </Menu>
        </React.Fragment>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            {isMobile ? renderMobileMenu() : renderDesktopMenu()}
        </Box>
    )
}
