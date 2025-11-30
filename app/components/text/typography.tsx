import { cn } from "@/lib/utils";


type TextProps = React.HTMLAttributes<HTMLElement>;

export function Heading({ className, ...props }: TextProps) {
    return <h3
        className={cn(`          font-nunit md:font-bold
          text-sm md:text-md 2xl:text-lg

          leading-5 md:leading-6
          h-[calc(theme(lineHeight.5)*2)] md:h-[calc(theme(lineHeight.6)*2)]
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

export function Bold({ className, ...props }: TextProps) {
    return <span
        className={cn('font-nunit font-bold', className)}
        {...props}
    />
}

export function Italic({ className, ...props }: TextProps) {
    return <span
        className={cn('font-nunit italic', className)}
        {...props}
    />
}


