import { useNavigate } from "react-router";

export function useAppNavigation() {
    const navigate = useNavigate();

    const toDashboard = (epccId: string) => navigate(`/${epccId}`);
    const toAuth = () => navigate("/auth");
    const toHome = () => navigate("/");
    const toVerify = (token: string) => navigate(`/auth/verify?token=${encodeURIComponent(token)}`);

    return { toDashboard, toAuth, toHome, toVerify };
}
