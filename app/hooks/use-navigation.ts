import { useNavigate, useParams } from "react-router";

export function useAppNavigation() {
    const navigate = useNavigate();
    const { userId, reqUserId, eventId } = useParams()


    const toDashboard = (epccId: string) => navigate(`/${epccId}`);
    const toAuth = () => navigate("/auth");
    const toHome = () => navigate("/");
    const toUsers = () => navigate(`/${userId}/admin/users`);
    const toUser = (reqUserId: string) => navigate(`/${userId}/admin/users/${reqUserId}`);
    const toEvents = () => navigate(`/${userId}/admin/events`);
    const toEvent = (eventId: string) => navigate(`/${userId}/admin/events/${eventId}`);
    const toVerify = (token: string) => navigate(`/auth/verify?token=${encodeURIComponent(token)}`);
    const toPrevious = () => navigate(-1);

    return {
        toDashboard,
        toAuth,
        toHome,
        toVerify,
        toUser,
        toUsers,
        toEvents,
        toEvent,
        toPrevious,
        userId,
        reqUserId,
        eventId
    };
}
