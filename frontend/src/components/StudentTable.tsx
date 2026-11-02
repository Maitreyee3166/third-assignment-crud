import React from "react";
import type { Students } from "../types/interface/student.interface";
import StudentRow from "./StudentRow";

type StudentTableProps = {
  data: Students[];
  page: number;
  limit: number;
  handleDelete: (id: string) => Promise<void>;
  handleEditMode: (item: Students) => void;
};

const StudentTable: React.FC<StudentTableProps> = ({
  data,
  handleDelete,
  handleEditMode,
  page,
  limit
}) => {
  return (
    <div className="w-full rounded-2xl p-8 text-center ">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#001333] text-white">
            <th className="border border-gray-300 p-3">Sl</th>
            <th className="border border-gray-300 p-3">Image</th>
            <th className="border border-gray-300 p-3">Name</th>
            <th className="border border-gray-300 p-3">Email</th>
            <th className="border border-gray-300 p-3">Phone</th>
            <th className="border border-gray-300 p-3">Department</th>
            <th colSpan={2} className="border border-gray-300 p-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr className="bg-gray-100">
              <td
                colSpan={7}
                className="border border-gray-300 p-4 text-center text-gray-700"
              >
                ---- No Data Found ----
              </td>
            </tr>
          ) : (
            data.map((student, index) => (
              <tr
                key={student._id}
                className="bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <StudentRow
                  student={student}
                  index={(page - 1) * limit + index}
                  handleDelete={handleDelete}
                  handleEditMode={handleEditMode}
                />
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
