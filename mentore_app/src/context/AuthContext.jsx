import { createContext } from "react";
import { useReducer } from "react";

// 1. context create
export const AuthContext = createContext();

// 2. initialState
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // ye iska kaam karega "Agar localStorage mein user hai toh wahi uthao, warna null"
  loading: false,
};

// 3. Reducer(brain of auth sysytem)

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
      };

    case "LOGIN_SUCCESS":
      // basically data save karata hai Phir reducer ke andar jab LOGIN_SUCCESS ho, toh data save bhi karo:
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to storage karta hai
      return {
        user: action.payload,
        loading: false,
      };

    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        user: null,
        loading: false,
      };

    case "LOGIN_FAIL":
      return {
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

// 4. provider (app ko wrap karega )

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const userRole = state.user ? state.user.role : null;

  return (
    <AuthContext.Provider value={{ state, dispatch, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
