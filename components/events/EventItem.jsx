import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import classes from "./EventItem.module.css";
import Image from 'next/image'

function EventItem({ event }) {
  const { id, title, date, location, image } = event;

  // converting date to readable form
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Adding line break after comma in address
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={340} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <LocationIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
