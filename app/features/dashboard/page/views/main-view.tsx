import { Separator } from '@/components/primitives/separator';
import { Points, Attendance, RsvpTable } from '../../components/data';
import Gradient from '@/components/layout/gradient';
import { Centered, UnderConstructionCard, Container as Grid } from '@/components/layout';
import { Button } from '@/components/primitives/button';
import GridItem from '../../components/layout/grid-item';
import { InfoIcon } from 'lucide-react'
import { ScrollArea } from '@/components/primitives/scroll-area';
export default function Main() {

    const grid = {
        mobile: ' h-full p-2 grid grid-cols-1',
        default: 'size-full grid gap-5 grid-cols-6 grid-rows-5'
    }

    return (
        <Grid className='size-full' classNameLarge={grid.default} classNameMac={grid.default} classNameMobile={grid.mobile}>
            <Gradient className='flex rounded-t-md rounded-b-none md:rounded-md p-6 col-span-1 md:col-span-6 row-span-1 border-2 border-accent'>
                <Centered className='w-[30%] md:w-[15%]'>
                    <h3>Points</h3>
                    <Points />
                </Centered>

                <Separator orientation='vertical' />

                <Centered className='w-[40%] md:w-[15%]'>
                    <h3>Events Attended</h3>
                    <Attendance type='complete' />
                </Centered>

                <Centered className='w-[30%] md:w-[15%] text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                        <h3 className=''>Pending </h3>
                        <span title='Complete feedback forms to account for full attendance' className='mt-0.5 cursor-pointer'><InfoIcon size={15} /></span>
                    </div>
                    <Attendance type='pending' />
                </Centered>
            </Gradient>

            <GridItem hideInMobile className='col-span-2 row-span-4 bg-accent rounded-[12px] border-8'>
                <UnderConstructionCard className="size-full" />
            </GridItem>


            <GridItem className='rounded-b-md rounded-t-none md:rounded-md col-span-1 md:col-span-4 row-span-4  border-2 border-accent'>
                <Gradient from='rgba(125,125,200,0.2)' via='rgba(155,155,255,0.15)' to='rgba(100,100,155,0.17)' className='size-full p-5'>
                    <h2 className='font-monts text-lg'>My RSVP'd events</h2>
                    <ScrollArea className='mt-5 max-h-full' id='dashboard' >
                        <RsvpTable />
                    </ScrollArea>
                </Gradient>
            </GridItem>
        </Grid>
    )
}


