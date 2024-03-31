import React, { useContext, useState } from "react";
import {
  useMediaQuery,
  Badge,
  Box,
  Button,
  IconButton,
  Popover,
  Slider,
} from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { SoundContext } from "../context/SoundContext";

const SoundControl = () => {
  const { volumeUp, volumeDown, toggleMute, volume, mute, updateVolume } =
    useContext(SoundContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "sound-control-popover" : undefined;

  const handleVolumeChange = (_event, newVolume) => {
    updateVolume(newVolume);
  };

  // Render nothing for mobile screens
  if (isMobile) return null;

  return (
    <Box i="sound-control-container" position="fixed" left="0" bottom="0">
      <IconButton
        aria-label="sound-control-mute"
        onClick={handleClick}
        color={mute ? "error" : "primary"}
        sx={{ p: 3 }}
      >
        <Badge badgeContent={`${Math.floor(volume * 100)}%`}>
          <VolumeUpIcon sx={{ fontSize: 35 }} />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box display="flex" alignItems="center" gap="3px" p={1}>
          <IconButton onClick={volumeDown} color="primary">
            <VolumeDownIcon />
          </IconButton>

          <Box
            id="slider-container"
            width={150}
            display="flex"
            alignItems="center"
          >
            <Slider
              aria-label="Volume"
              defaultValue={volume}
              min={0.0}
              max={1.0}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
            />
          </Box>

          <IconButton onClick={volumeUp} color="primary">
            <VolumeUpIcon />
          </IconButton>

          <Button
            endIcon={<VolumeOffIcon />}
            onClick={() => toggleMute(!mute)}
            color={mute ? "error" : "primary"}
          >
            {mute ? "Unmute" : "Mute"}
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default SoundControl;
