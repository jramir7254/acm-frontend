import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import AuthForm from "../../components/forms/auth-form";

const ALLOWED = new Set(["login", "register", "reset", "forgot"]);

export default function AuthIndexPage() {
    const [sp] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const type = sp.get("type");
        if (!type || !ALLOWED.has(type)) {
            const next = new URLSearchParams(sp);
            next.set("type", "login");           // default mode
            navigate(`/auth?${next.toString()}`, { replace: true });
        }
    }, [sp, navigate]);

    return <AuthForm />;
}
