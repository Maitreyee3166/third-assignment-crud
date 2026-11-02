import React from "react";
import type { Students } from "../types/interface/student.interface";
import { SquarePen, Trash } from "lucide-react";

type StudentTableProps = {
  student: Students;
  index: number;
  handleDelete: (id: string) => Promise<void>;
  handleEditMode: (item: Students) => void;
};

const StudentRow: React.FC<StudentTableProps> = ({
  student,
  index,
  handleDelete,
  handleEditMode,
}) => {
  return (
    <>
      {/* {student} */}
      <td className="border border-gray-300 p-3">{index + 1}</td>

      <td className="border border-gray-300 p-3 text-center">
        <img
          src={student.image}
          alt={student.name}
          className="mx-auto h-[40px] w-[40px] object-cover"
        />
      </td>
      <td className="border border-gray-300 p-3">{student.name}</td>

      <td className="border border-gray-300 p-3">{student.email}</td>

      <td className="border border-gray-300 p-3">{student.phone}</td>

      <td className="border border-gray-300 p-3">{student.department}</td>

      <td className="border border-gray-300 p-3 text-center">
        <button
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => handleEditMode(student)}
        >
          <SquarePen size={20} />
        </button>
      </td>

      <td className="border border-gray-300 p-3 text-center">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDelete(student._id)}
        >
          <Trash size={20} />
        </button>
      </td>
    </>
  );
};

export default StudentRow;
