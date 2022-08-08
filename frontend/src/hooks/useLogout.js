import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // update the auth context: dispatch the logout action
        dispatch({ type: 'LOGOUT' });
    }
    return { logout };
}