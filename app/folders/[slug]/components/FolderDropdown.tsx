'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FolderWithId } from '../page';
import { Dispatch, SetStateAction, useState } from 'react';
import { EditFolder } from './EditFolder';
import DeleteFolder from './DeleteFolder';

export default function FolderDropdown({ folder, setFolder }: { folder: FolderWithId, setFolder: Dispatch<SetStateAction<FolderWithId>> }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isDelete, setIsDelete ] = useState(false);

  const toggleEdit = () => setIsEdit(!isEdit);
  const toggleDelete = () => setIsDelete(!isDelete);

  return (
    <>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <button className='rounded-full bg-white border border-slate-300 p-2'><MoreHorizIcon style={{fontSize: '24px', color: '#666666'}}/></button>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => {handleClose(); toggleEdit()}} className='text-sm text-slate-600 text-bold'><ModeEditIcon className='mr-3'/>Edit</MenuItem>
          <MenuItem onClick={() => {handleClose(); toggleDelete()}} className='text-sm text-slate-600 text-bold'><DeleteOutlineIcon className='mr-3'/>Delete</MenuItem>
        </Menu>
      </div>
      <EditFolder isEdit={isEdit} toggleEdit={toggleEdit} folder={folder} setFolder={setFolder}/>
      <DeleteFolder isDelete={isDelete} toggleDelete={toggleDelete}/>
    </>
  );
}