import { EndPoint } from "../../services/helper/endpoint";

import api from "../api";
import type { StudentParams } from "../../types/interface/student.interface";
import type { StudentPayloadType } from "../../services/validation/student.validation";

export const getStudentFns = async (params: StudentParams) => {
  try {
    const response = await api.get(
      `${EndPoint.student.list}?page=${params.page}&limit=${params.limit}}`,
    );
    return response?.data;
  } catch (error: any) {
    console.log("error", error.response);
    return error?.response?.data;
  }
};

export const createStudentFns = async (payload: StudentPayloadType) => {
  const formdata = new FormData();
  formdata.append("name", payload.name);
  formdata.append("email", payload.email);
  formdata.append("phone", String(payload.phone));
  formdata.append("department", payload.department);
  if (payload.image) {
    formdata.append("image", payload.image);
  }
  try {
    const response = await api.post(`${EndPoint.student.create}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response?.data;
  } catch (error: any) {
    console.log("error", error.response);
    return error?.response?.data;
  }
};

export const deleteStudentFns = async (id: string) => {
  try {
    const response = await api.delete(`${EndPoint.student.delete}/${id}`);
    return response?.data;
  } catch (error: any) {
    console.log("error", error.response);
    return error?.response?.data;
  }
};

export const updateStudentFns = async (
  id: string,
  data: StudentPayloadType,
) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("department", data.department);

  if (data.image) {
    formData.append("image", data.image);
  }

  try {
    const response = await api.put(
      `${EndPoint.student.update}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response?.data;
  } catch (error: any) {
    console.log("error", error.response);
    return error?.response?.data;
  }
};
