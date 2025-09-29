import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card'
import { Badge } from '@/components/primitives/badge'

export function NumberCard() {
    return (
        <Card >
            <CardHeader>
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    $1,250.00
                </CardTitle>
                <CardAction>
                    <Badge variant="outline">
                        {/* <IconTrendingUp /> */}
                        +12.5%
                    </Badge>
                </CardAction>
            </CardHeader>

        </Card>
    )
}
