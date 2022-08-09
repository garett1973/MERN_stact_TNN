import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: dispatchWorkouts } = useWorkoutsContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // update the auth context: dispatch the logout action
        dispatch({ type: 'LOGOUT' });
        dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null });
    }
    return { logout };
}