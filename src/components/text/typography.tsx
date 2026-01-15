import { cn } from "@/lib/utils";
import { Skeleton } from "../primitives/skeleton";

type TextProps = React.HTMLAttributes<HTMLElement> & {
    isLoading?: boolean,
    fallBack?: string,
}

export function Heading({ className, ...props }: TextProps) {
    return <h3
        className={cn(`          
            font-nunit md:font-bold
            text-sm md:text-md 2xl:text-lg
            leading-5 md:leading-6
            overflow-hidden`, className)}
        {...props}
    />
}

export function Paragraph({ className, ...props }: TextProps) {
    return <p
        className={cn('font-nunit text-xs 2xl:text-sm', className)}
        {...props}
    />
}


export function Text({ isLoading, fallBack, muted, children, className, ...props }: TextProps & { muted?: boolean }) {

    if (isLoading) return <Skeleton className="h-4 w-10" />


    return <p
        className={cn('font-nunit text-xs 2xl:text-sm', muted && 'text-muted-foreground', className)}
        {...props}
    >
        {children || <Italic muted>{fallBack || 'Empty'}</Italic>}
    </p>
}

export function Bold({ className, ...props }: TextProps) {
    return <span
        className={cn('font-nunit font-bold', className)}
        {...props}
    />
}

export function Italic({ muted, className, ...props }: TextProps & { muted?: boolean }) {
    return <span
        className={cn('font-nunit italic', muted && 'text-muted-foreground', className)}
        {...props}
    />
}


export function Description({ className, ...props }: TextProps) {
    return <dl
        className={cn('font-nunit text-xs 2xl:text-sm', className)}
        {...props}
    />
}


export function Item({ className, ...props }: TextProps) {
    return <dt
        className={cn('font-nunit', className)}
        {...props}
    />
}

export function Definition({ className, ...props }: TextProps) {
    return <dd
        className={cn('font-nunit', className)}
        {...props}
    />
}


export function Blockquote({ className, ...props }: TextProps) {
    return <blockquote
        className={cn('font-nunit mt-6 border-l-2 pl-6 italic', className)}
        {...props}
    />
}


