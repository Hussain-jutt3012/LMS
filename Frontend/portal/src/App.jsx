import { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import {
    Login,
    Logout,
    SetAuthLoading,
} from "./store/authSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const restoreUser = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4000/api/v1/users/current-user",
                    {
                        withCredentials: true,
                    }
                );

                const user = response.data.data;

                dispatch(
                    Login({
                        user,
                        accessToken: null,
                        refreshToken: null,
                    })
                );
            } catch (error) {
                dispatch(Logout());
            } finally {
                dispatch(SetAuthLoading(false));
            }
        };

        restoreUser();
    }, [dispatch]);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;