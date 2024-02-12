import { createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  imagePath: string;
  studentId: string;
  studentNumber: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  imagePath: string;
  password: string;
  nationalIdentity: string;
  birthDate: string;
  phoneNumber: string;
}

interface RegisterResponse {
  user: User;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData: LoginData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:6280/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message);
      }

      const responseData: LoginResponse = await response.json();
      return responseData;
    } catch (error) {
      return thunkAPI.rejectWithValue("Bir hata oluştu");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_) => {
  // Burada yapılacak işlem yok, sadece çıkış işlemini tetiklemek için kullanılan bir async thunk
  return true; // Başarılı olduğunu belirtmek için true döndürülüyor
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData: RegisterData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:6280/api/Users/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message);
      }

      const responseData: RegisterResponse = await response.json();
      return responseData;
    } catch (error) {
      return thunkAPI.rejectWithValue("Bir hata oluştu");
    }
  }
);
