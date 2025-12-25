import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/primitives/card";
import { Centered } from '@/components/layout';
import { Skeleton } from '@/components/primitives/skeleton'
import { Image } from "lucide-react";

export function SkeletonCard() {
    return (
        <Card className="flex flex-col overflow-hidden pt-0 h-[50vh]">
            <CardHeader className='h-1/2 bg-white/10 block'>
                <Centered className='size-full'>
                    <Image className='text-white/50' size={50} />
                </Centered>
            </CardHeader>
            <CardContent className="space-y-5">
                <CardTitle className='space-y-2'>
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/6" />
                </CardTitle>
                <div className='space-y-2'>
                    <Skeleton className="h-3 w-[100px]" />
                    <Skeleton className="h-3 w-[150px]" />
                    <Skeleton className="h-3 w-[85px]" />
                </div>
            </CardContent>

            <CardFooter className="mt-auto flex gap-3">
                <Skeleton className='w-18 h-8 rounded-lg' />
            </CardFooter>
        </Card>
    )
}


