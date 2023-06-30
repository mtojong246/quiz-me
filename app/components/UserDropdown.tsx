import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FaceIcon from '@mui/icons-material/Face';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';

export default function UserDropdown({ letter }: { letter: string | undefined }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
      <button onClick={handleClick} className='rounded-full bg-pink-400 text-white w-[35px] h-[35px] text-center mr-1'>{letter}</button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href='/user'><MenuItem onClick={handleClose} className='text-sm text-slate-600 text-bold'><FaceIcon className='mr-3'/>Profile</MenuItem></Link>
        <Link href='/settings'><MenuItem onClick={handleClose} className='text-sm text-slate-600 text-bold'><SettingsIcon className='mr-3'/>Settings</MenuItem></Link>
      </Menu>
    </div>
    </>
  );
}