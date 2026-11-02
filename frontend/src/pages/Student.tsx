import { useEffect, useState } from "react";
import type { Students } from "../types/interface/student.interface";
import {
  createStudentFns,
  deleteStudentFns,
  getStudentFns,
  updateStudentFns,
} from "../api/api-function/student.function";
import StudentTable from "../components/StudentTable";
import StudentDialog from "../components/StudentDialog";
import { toast } from "sonner";
import type { StudentPayloadType } from "../services/validation/student.validation";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { UserPlus } from "lucide-react";

const Student = () => {
  const [students, setStudents] = useState<Students[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddloading, setisAddloading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setpagination] = useState({
    limit: 5,
    page: 1,
    totalItems: 0,
    totalPages: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditStudentsData, setisEditStudentsData] = useState<Students | null>(
    null,
  );

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getStudentFns({ page, limit });
        console.log("response in Student", response);
        if (response.success) {
          setStudents(response.data);
          setpagination(response.pagination);
          console.log("response.message", response.message);
          toast.success(response.message);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
        
      }
    };
    fetchStudent();
  }, [page, limit]);

  console.log("students", students);
  console.log("error", error);

  const handleEditMode = (item: Students) => {
    console.log("item edit data", item);
    setisEditStudentsData(item);
    setOpenDialog(true);
  };

  const onSubmit = async (data: StudentPayloadType) => {
    console.log("data", data);
    setisAddloading(true);
    if (isEditStudentsData) {
      console.log("update working....");
      const response = await updateStudentFns(isEditStudentsData._id, data);

      if (response.success) {
        toast.success(response.message);

        setStudents((prev) =>
          prev.map((student) =>
            student._id === isEditStudentsData._id ? response.data : student,
          ),
        );

        setisAddloading(false);
        setOpenDialog(false);
        setisEditStudentsData(null);
        setImagePreview(null);
      } else {
        toast.error(response.message);
        setisAddloading(false);
      }
    } else {
      const response = await createStudentFns(data);
      console.log("Student add ", response); //success, message, data : //create new product object
      if (response.success) {
        toast.success(response.message);
        // manage state
        setStudents((prevStudents) => {
          return [response.data, ...prevStudents].slice(0, limit);
        });
        setisAddloading(false);
        setImagePreview(null);
        // reset();
        setOpenDialog(false);
      } else {
        toast.error(response.message);
        setisAddloading(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const response = await deleteStudentFns(id);
    console.log("response in delete", response);

    if (response.success) {
      toast.success(response.message);

      const responseStudent = await getStudentFns({
        page,
        limit,
      });
      setStudents(responseStudent.data);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-400 via-slate-400 to-slate-300 h-screen">
      <h1 className="mb-2 pt-6 flex items-center justify-center font-serif text-4xl font-bold text-green-900">
        Student Details
      </h1>
      <div className="flex justify-end">
        <button
          className="mr-[60px] flex items-center gap-2 rounded-md border-none bg-green-800 px-5 py-2.5 text-white transition-colors hover:bg-green-900"
          onClick={() => {
            setOpenDialog(true);
            setisEditStudentsData(null);
          }}
        >
          Add Student <UserPlus size={18} />
        </button>
      </div>

      {loading && <CircularProgress />}

      <StudentTable
        data={students}
        handleDelete={handleDelete}
        handleEditMode={handleEditMode}
        page={page}
        limit={limit}
      />

      {/* Pagination */}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          p: 6,
          pt: 2,
          borderRadius: 2,
        }}
      >
        {/* Limit Select */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            Rows per page:
          </Typography>

          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Pagination */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Prev
          </Button>

          <Typography
            sx={{
              fontWeight: 700,
              color: "#166534",
              backgroundColor: "#dcfce7",
              px: 2,
              py: 1,
              borderRadius: 2,
            }}
          >
            {page}
          </Typography>

          <Button
            variant="contained"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#166534",
              "&:hover": {
                backgroundColor: "#14532d",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>

      {/* dialog */}

      <StudentDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
        onSubmit={onSubmit}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        loading={isAddloading}
        isEdit={isEditStudentsData}
      />
    </div>
  );
};

export default Student;
