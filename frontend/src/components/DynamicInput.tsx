
import { TextField, Typography } from "@mui/material";
import type { DynamicInputProps } from "../types/interface/student.interface";

const DynamicInput = ({
  label,
  type,
  placeholder,
  error,
  helperText,
  ...registerProps
}: DynamicInputProps) => {

  console.log(helperText);
  
  return (
    <>
      <Typography
        variant="body2"
        sx={{ mb: 0.5, paddingBottom: "3px", }}
      >
        {label}
      </Typography>

      <TextField
        type={type}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        fullWidth
        sx={{borderRadius: "30px", marginBottom: "16px" }}
        {...registerProps}
      />
    </>
  );
};

export default DynamicInput;

