import { Separator } from '@/components/primitives/separator';
import { Points, Attendance, RsvpTable } from '../../components/data';
import Gradient from '@/components/layout/gradient';
import { Centered, UnderConstructionCard, Container as Grid } from '@/components/layout';
import { Button } from '@/components/primitives/button';
import GridItem from '../../components/layout/grid-item';

export default function Main() {

    const grid = {
        mobile: 'size-full p-2 grid gap-5 grid-cols-1',
        default: 'size-full p-10 grid gap-5 grid-cols-6 grid-rows-5'
    }

    return (
        <Grid className={grid.default} classNameMac={grid.default} classNameMobile={grid.mobile}>
            <Gradient className='flex p-6 col-span-1 md:col-span-6 row-span-1 border-2 border-accent'>
                <Centered className='w-[50%] md:w-[15%]'>
                    <h3>Points</h3>
                    <Points />
                </Centered>

                <Separator orientation='vertical' />

                <Centered className='w-[50%] md:w-[15%]'>
                    <h3>Events Attended</h3>
                    <Attendance />
                </Centered>
            </Gradient>

            <GridItem hideInMobile className='col-span-2 row-span-4 bg-accent rounded-[12px] border-8'>
                <UnderConstructionCard className="size-full" />
            </GridItem>


            <GridItem className='col-span-1 md:col-span-4 row-span-4  rounded-[12px] border-2 border-accent'>
                <Gradient from='rgba(125,125,200,0.2)' via='rgba(155,155,255,0.15)' to='rgba(100,100,155,0.17)' className='size-full p-5'>
                    <h2 className='font-monts text-lg'>My RSVP'd events</h2>
                    <div className='mt-5'>
                        <RsvpTable />
                    </div>
                </Gradient>
            </GridItem>
        </Grid>
    )
}


