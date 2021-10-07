import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Alarm, DeleteForever, DriveFileMove, FileCopy, LocalOffer, OpenInFull, Person } from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';

const cardmenue = [
    {
        icon: <OpenInFull />,
        text: 'Karte öffnen'
    },
    {
        icon: <LocalOffer />,
        text: 'Labels bearbeiten'
    },
    {
        icon: <Person />,
        text: 'Mitglieder ändern'
    },
    {
        icon: <Alarm />,
        text: 'Daten bearbeiten'
    },
    {
        icon: <DriveFileMove />,
        text: 'Verschieben'
    },
    {
        icon: <FileCopy />,
        text: 'Kopieren'
    },
    {
        icon: <DeleteForever />,
        text: 'Löschen',
        enabled: true
    }
];

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


export default function VMenue() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="vmenu">
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {

                    },
                }}
            >
                {cardmenue.map((cardmenue) => (
                    <MenuItem key={cardmenue.text} onClick={handleClose} disableRipple disabled={!cardmenue.enabled ?? false}>
                        {cardmenue.icon}
                        {cardmenue.text}
                    </MenuItem>
                ))}
            </StyledMenu>
        </div>
    );
}