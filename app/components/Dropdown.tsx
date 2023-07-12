'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FilterIcon from '@mui/icons-material/Filter';
import Link from 'next/link';
import { CreateFolder } from './CreateFolder';
import { useContext } from 'react';
import { FolderContext } from '../context/FolderContext';

export default function Dropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { checked, toggleFolder } = useContext(FolderContext);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
    <div>
      <button onClick={handleClick}><AddCircleIcon style={{fontSize: '40px'}} className="text-[#4255FF] text-[40px] cursor-pointer"/></button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href='/create-set'><MenuItem onClick={handleClose} className='text-sm text-slate-600 text-bold'><FilterIcon className='mr-3'/>Study Set</MenuItem></Link>
        <MenuItem onClick={() => {handleClose(); toggleFolder()}} className='text-sm text-slate-600 text-bold'><FolderOpenIcon className='mr-3'/>Folder</MenuItem>
      </Menu>
    </div>
    <CreateFolder checked={checked} toggleFolder={toggleFolder}/>
    </>
  );
}