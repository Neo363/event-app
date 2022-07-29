const DUMMY_EVENTS = [
    {
        id: 'e1',
        title: 'Programming for everyone',
        description: 'Everyone can learn to code! Yes, everyone! In this event, we are going to teach you how to code.',
        location: 'Somestreet 25, 1234 San Somewhereo',
        date: '2021-05-12',
        image: 'images/coding-event.jpg',
        isFeatured: false
    },
    {
        id: 'e2',
        title: 'Cooking for everyone',
        description: 'Everyone can learn to cook! Yes, everyone! In this event, we are going to teach you how to cook.',
        location: 'Somestreet 25, 1234 San Somewhereo',
        date: '2021-05-12',
        image: 'images/cooking-event.jpg',
        isFeatured: true
    },
    {
        id: 'e1',
        title: 'FIFA Worldcup starts from November',
        description: 'Yay!!! FIFA Worldcup starts from November! Yes, everyone! In this event, we are gonna have so much fun.',
        location: 'Somestreet 25, 1234 San Somewhereo',
        date: '2021-05-12',
        image: 'images/wc-event.jpg',
        isFeatured: true
    },
]

export function getFeaturedEvents () {
    return DUMMY_EVENTS.filter(event => event.isFeatured);
}

export function getAllEvents () {
    return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    let filteredEvents = DUMMY_EVENTS.filter(event => {
        const eventDate = new Date(event.date);

        return eventDate.getFullYear() === year && eventDate.getMonth() === month-1;
    });

    return filteredEvents;
}

export function getEventById(id) {
    return DUMMY_EVENTS.find(event => event.id === id);
}