import { useRouter } from "next/router"
import { getFilteredEvents } from "../../../../dummy-data";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import ErrorAlert from "@/components/ui/error-alert";
import GamepadButton from "@/components/ui/button";

export default function FileteredEventsPage(){
    const router = useRouter();

    const filterData = router.query.slug;

    if(!filterData){
        return <p className="center">Loading...</p>;
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    if(isNaN(numYear) || 
        isNaN(numMonth) || 
        numYear>2030 || 
        numYear<2021 || 
        numMonth<1 || 
        numMonth>12){
            return  <>
            <ErrorAlert>
                <p>Invalid filter.Please adjust your values!</p>
            </ErrorAlert>
            <div className='center'>
            <GamepadButton link='/events'>Show all events</GamepadButton>
            </div>
            </>
           
    }
    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,

    });
    if(!filteredEvents || filteredEvents.length===0){
        return <>
        <ErrorAlert>
         <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
        <GamepadButton link='/events'>Show all events</GamepadButton>
        </div>
       
        </>
       
    }
    const date = new Date(numYear,numMonth-1);
    return (
        <>
         <ResultsTitle date={date} />
        <EventList items={filteredEvents}/>
        </>
    )
}