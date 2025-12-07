import { useNavigate, useParams } from "react-router";
import type { Purpose } from "@/features/auth/types";

export function useAppNavigation() {
    const navigate = useNavigate();
    const { userId, reqUserId, eventId } = useParams()


    const toDashboard = (epccId: string) => navigate(`/${epccId}`);
    const toAuth = (type: string) => navigate(`/auth?type=${type}`)
    const toHome = () => navigate("/");
    const toUsers = () => navigate(`/${userId}/admin/users`);
    const toUser = (reqUserId: string) => navigate(`/${userId}/admin/users/${reqUserId}`);
    const toEvents = () => navigate(`/${userId}/admin/events`);
    const toEvent = (eventId: string) => navigate(`/${userId}/admin/events/${eventId}`);
    const toVerify = (token: string, purpose: Purpose) => navigate(`/auth/verify?token=${encodeURIComponent(token)}&purpose=${purpose}`);
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
