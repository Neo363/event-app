import { useRouter } from "next/router"
import { Fragment } from "react";
import { getEventById } from "../../dummy-data";

function EventDetailPage() {
    const router = useRouter();

    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if (!event) {
        return <p>No event found!</p>
    }
    
    return (
        <Fragment>
            <EventSummary />
        </Fragment>
    )
}

export default EventDetailPage