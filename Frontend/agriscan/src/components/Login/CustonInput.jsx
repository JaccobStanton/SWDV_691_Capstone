import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { colors } from "../../theme";

const CustomInput = ({
  isIconActive,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography color="white" pb={1}>
          {label}
        </Typography>
        <Paper
          sx={{
            background: colors.input[500],
            width: "100%",
          }}
        >
          <InputBase
            placeholder={placeholder}
            fullWidth
            sx={{
              bgcolor: colors.input[500],
              p: 1,
              borderRadius: "5px",
            }}
            type={
              isIconActive && type === "password" && showPassword
                ? "text"
                : type
            }
            value={value}
            onChange={onChange}
            endAdornment={
              isIconActive &&
              type === "password" && (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  <IconButton edge="end" onClick={handleToggleVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomInput;
