import { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const LanguageSelector = ({ currentLang, handleLang }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    handleLang(language.code);
    handleClose();
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        style={{
          display: 'flex',
          marginTop:'0px',
          marginRight: '12px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          backgroundColor: 'white',
          color: 'black',
          fontSize: "0.9rem"
        }}
      >
        {currentLang.toUpperCase()}
        {/* <ArrowDropDownIcon /> */}
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
          >
            {`${language.label} (${language.code.toUpperCase()})`}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;