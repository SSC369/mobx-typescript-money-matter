import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { IoMdMail } from "react-icons/io";
import { RiLock2Line } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
  API_GET_USER_ID,
  HOME_ROUTE,
  LOCALSTORAGE_KEY,
  LOGIN_HEADERS,
} from "../constants";
import {
  addDataIntoLocalStorage,
  getDataFromLocalStorage,
} from "../utils/localStorageUtils";
import { LoginFormDataType, ReactElementFunctionType } from "../types";
import UserStore from "../store/UserStore";

const Login: React.FC<{ admin: boolean }> = ({ admin }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const userId = getDataFromLocalStorage(LOCALSTORAGE_KEY)?.userId;

  useEffect(() => {
    if (userId) {
      navigate(HOME_ROUTE);
    }
  }, [userId, navigate]); // Add navigate as a dependency

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation: () => boolean = () => {
    const { password, email } = formData;
    if (!email.trim()) {
      toast.error("Please enter email!", { duration: 1000 });
      return false;
    }
    if (!password.trim()) {
      toast.error("Please enter password!", { duration: 1000 });
      return false;
    }
    return true;
  };

  const handleLoginSuccess = (data: { id: number }) => {
    UserStore.setUserData({
      admin,
      userId: data.id,
    });
    setFormData({ password: "", email: "" });
    addDataIntoLocalStorage(LOCALSTORAGE_KEY, { admin, userId: data.id });
    toast.success("Login successful", { duration: 1000 });
    setTimeout(() => {
      navigate(HOME_ROUTE);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (handleValidation()) {
        const response = await axios.post(API_GET_USER_ID, formData, {
          headers: LOGIN_HEADERS,
        });
        if (response.status === 200) {
          handleLoginSuccess(response.data.get_user_id[0]);
        } else {
          toast.error(`Error: ${response.status}`);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { duration: 1000 });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordIcon = () =>
    showPassword ? (
      <AiOutlineEyeInvisible
        onClick={() => setShowPassword(!showPassword)}
        className="mr-2 cursor-pointer"
        size={20}
      />
    ) : (
      <AiOutlineEye
        onClick={() => setShowPassword(!showPassword)}
        className="mr-2 cursor-pointer"
        size={20}
      />
    );

  if (userId) return null;

  return (
    <div className="flex flex-col items-center justify-center bg-white min-w-[300px] min-h-dvh">
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl flex flex-col gap-3 bg-white dark:bg-slate-800 p-8 w-4/5 max-w-md min-w-[300px] rounded-2xl text-sm"
      >
        <h1
          style={{ color: "rgba(248, 154, 35, 1)" }}
          className="font-bold text-xl text-center"
        >
          Money <span style={{ color: "rgba(2, 150, 156, 1)" }}>Matters</span>
        </h1>
        <h1
          style={{ color: "rgba(80, 88, 135, 1)" }}
          className="font-medium text-xl mb-3 text-center"
        >
          {admin && "Admin "}Login
        </h1>
        <label
          style={{ color: "rgba(80, 88, 135, 1)" }}
          className="font-medium"
        >
          Email
        </label>
        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <IoMdMail className="mr-2" size={20} />
          <input
            required
            onChange={handleChange}
            name="email"
            value={formData.email}
            type="email"
            className="ml-2 border-none h-full focus:outline-none w-[80%]"
            placeholder="Enter your Email"
          />
        </div>
        <label
          style={{ color: "rgba(80, 88, 135, 1)" }}
          className="font-medium"
        >
          Password
        </label>
        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <RiLock2Line className="mr-2" size={20} />
          <input
            required
            onChange={handleChange}
            name="password"
            value={formData.password}
            type={showPassword ? "text" : "password"}
            className="ml-2 border-none w-full h-full focus:outline-none"
            placeholder="Enter your Password"
          />
          {renderPasswordIcon()}
        </div>
        <button
          type="submit"
          className="flex justify-center items-center mt-5 mb-2 bg-blue-500 text-white font-medium text-sm rounded-lg h-12 w-full"
        >
          {loading ? (
            <TailSpin visible={true} height="30" width="30" color="white" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
