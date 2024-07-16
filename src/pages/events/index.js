import EventList from "@/components/events/event-list"
import { getAllEvents } from "../../../dummy-data"
import { useRouter } from "next/router"
import EventSearch from "@/components/events/events-search"

export default function AllEventsPage(){
    const events = getAllEvents()
    const router = useRouter();
    function findEventHandler(year,month){
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }
    return (
        <div>
            <EventSearch onSearch={findEventHandler}/>
            <EventList items={events}/>
        </div>
    )
}