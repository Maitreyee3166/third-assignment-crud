import React, { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import DynamicInput from "./DynamicInput";
import {
  studentSchema,
  type StudentPayloadType,
} from "../services/validation/student.validation";
import type {
  StudentPayload,
  Students,
} from "../types/interface/student.interface";
import { studentInput } from "../services/json/student.input";

type StudentDailogProps = {
  openDialog: boolean;
  closeDialog: () => void;
  onSubmit: (data: StudentPayloadType) => Promise<void>;
  imagePreview: string | null;
  setImagePreview: (imgUrl: string | null) => void;
  loading: boolean;
  isEdit: Students | null;
};
const StudentDialog: React.FC<StudentDailogProps> = ({
  openDialog,
  closeDialog,
  onSubmit,
  imagePreview,
  setImagePreview,
  loading,
  isEdit,
}) => {
  // console.log("isEdit data in dialog...", isEdit);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentPayloadType>({
    resolver: yupResolver(studentSchema),
  });

  useEffect(() => {
    if (isEdit) {
      console.log("Edit is calling in dialog");
      reset({
        name: isEdit.name,
        email: isEdit.email,
        phone: isEdit.phone,
        department: isEdit.department,
        image: undefined,
      });
      if (isEdit?.image) {
        setImagePreview(isEdit?.image);
      }
    } else {
     
      reset({
        name: "",
        email: "",
        phone: "",
        department: "",
      });
      setImagePreview(null);
    }
  }, [isEdit, openDialog, reset, setImagePreview]);

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        closeDialog();
        reset({
          name: "",
        });
        setImagePreview(null);
      }}
      maxWidth="md"
    >
      <DialogTitle>{isEdit ? "Edit" : "Add"} Student</DialogTitle>
      <Box component="form" 
      // onSubmit={handleSubmit(onSubmit)}
      onSubmit={handleSubmit(
      (data) => {
      console.log("Form validation successful", data);
      onSubmit(data);
    },
    (errors) => {
      console.log("Form validation failed", errors);
    })}
      >
        <DialogContent>
          {studentInput.map((input) => (
            <DynamicInput
              key={input.name}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              {...register(input.name as keyof StudentPayload)}
              error={!!errors[input.name as keyof StudentPayload]}
              helperText={errors[input.name as keyof StudentPayload]?.message}
            />
          ))}
          <Box
            sx={{
              border: "1px dotted #2d2b2b ",
              width: "250px",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => document.getElementById("upload")?.click()}
              variant="outlined"
            >
              upload Image
              <input
                id="upload"
                type="file"
                hidden
                onChange={(event) => {
                  const file = event?.target?.files?.[0] as File;
                  const imgUrl = URL.createObjectURL(file);
                  setValue("image", file);
                  setImagePreview(imgUrl);
                }}
              />
            </Button>
            {imagePreview && (
              <img
                src={imagePreview}
                style={{ width: "100px", height: "100px" }}
              />
            )}
            {errors.image && (
              <FormHelperText>{errors.image?.message}</FormHelperText>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              closeDialog();
              reset({
                name: "",
              });
              setImagePreview(null);
            }}
          >
            Cancel
          </Button>

          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? <CircularProgress /> : isEdit ? "Update" : "Create"}
          </Button>
          {/* <Button variant="contained" type="submit">
            Submit
          </Button> */}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default StudentDialog;
