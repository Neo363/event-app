import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../dummy-data";

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <Fragment>
        <ErrorAlert>
          <p>Invalid filter, please adjust your values</p>
        </ErrorAlert>

        <div className="center">
          <Button href='/events'>Show All Events</Button>
        </div>
      </Fragment>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear, 
    month: numMonth
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <Fragment>
      <ErrorAlert>
        <p>No Events Found!</p>
      </ErrorAlert>
      <div className="center">
        <Button href='/events'>Show All Events</Button>
      </div>
    </Fragment>
  }

  const date = new Date(numYear, numMonth - 1);

  return <Fragment>
    <ResultsTitle date={date}/>
    <EventList items={filteredEvents}/>
  </Fragment>;
}

export default FilteredEventsPage;
