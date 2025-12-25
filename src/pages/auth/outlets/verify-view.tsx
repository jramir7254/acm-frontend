// features/auth/pages/verify-page.tsx

import { VerifyForm } from "@/features/auth/components/forms/verify-form";
import { Container } from "@/components/layout";

export default function VerifyPage() {
    return (
        <Container classNameMobile="px-15 ">
            <VerifyForm />
        </Container>
    )
}
