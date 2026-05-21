import { Button } from '@/components/ui/button'
import React from 'react'
import { backend } from '@/lib/backend-api'
import { logger } from '@/lib/logger'
import { useNavigate } from 'react-router';

export default function DevView() {

    const navigate = useNavigate();

    const testRedirect = async () => {
        logger.info("Test Direct Clicked")
        const data = await backend.get('/public/test/redirect')

        logger.debug("data", data)
        if (data.redirectUrl) {
            // Manually navigate without reloading the whole page
            navigate(data.redirectUrl, { relative: 'path' });
        }
    }

    return (
        <div>
            <p>Test Redirect</p>
            <Button onClick={testRedirect}>Click</Button>
        </div>
    )
}
