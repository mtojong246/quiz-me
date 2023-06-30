'use client';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import DeleteCard from './DeleteCard';
import AddToFolder from './AddToFolder';
import { DeckType } from '@/app/context/DeckContext';


export default function CardDropdown({ deck }: { deck: DeckType }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [ isDelete, setIsDelete ] = useState(false);
  const [ isAdd, setIsAdd ] = useState(false);

  const toggleDelete = () => setIsDelete(!isDelete);
  const toggleAdd = () => setIsAdd(!isAdd);

  return (
    <>
      <div>
        <button onClick={handleClick} className='rounded-lg bg-white border border-slate-300 p-2'><MoreHorizIcon style={{fontSize: '24px', color: '#666666'}}/></button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => {handleClose(); toggleAdd()}} className='text-sm text-slate-600 text-bold'><AddCircleOutlineIcon className='mr-3'/>Add to folder</MenuItem>
          <MenuItem onClick={() => {handleClose(); toggleDelete()}} className='text-sm text-slate-600 text-bold'><DeleteOutlineIcon className='mr-3'/>Delete</MenuItem>
        </Menu>
      </div>
      <AddToFolder isAdd={isAdd} toggleAdd={toggleAdd} deck={deck}/>
      <DeleteCard isDelete={isDelete} toggleDelete={toggleDelete} deck={deck}/>
    </>
  );
}