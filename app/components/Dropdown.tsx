import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FilterIcon from '@mui/icons-material/Filter';

export default function Dropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AddCircleIcon style={{fontSize: '40px'}} className="text-[#4255FF] text-[40px] cursor-pointer"/>
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
        <MenuItem onClick={handleClose} className='text-sm text-slate-600 text-bold'><FilterIcon className='mr-3'/>Study Set</MenuItem>
        <MenuItem onClick={handleClose} className='text-sm text-slate-600 text-bold'><FolderOpenIcon className='mr-3'/>Folder</MenuItem>
      </Menu>
    </div>
  );
}