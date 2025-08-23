# Event Calendar TODO

## Vision
Create a vibrant, easy-to-use community **Event Calendar** where anyone can share upcoming happenings and discover what's next. It should be intuitive, beautiful, and fun to interact with.

## Core Features
- [ ] **Simple event submission**: friendly form with title, date, time, location, description and optional link.
- [ ] **Visually appealing calendar**: month/week view with color-coded event categories and hover popovers.
- [ ] **Event list & filters**: toggle between calendar grid and chronological list, filter by type or location.
- [ ] **Responsive design**: mobile-first layout that adapts to screens big and small.
- [ ] **Leaflet map integration**: display event locations on the existing interactive map.
- [ ] **Data storage**: start with a local `events.json` file; consider upgrading to a lightweight database later.
- [ ] **Moderation workflow**: optional admin review before events go live.

## Nice-to-Have Enhancements
- [ ] ICS export and calendar subscriptions.
- [ ] Recurring events support.
- [ ] Email reminders or push notifications.
- [ ] Dark/light theme toggle with smooth transitions.

## Implementation Notes
1. Research React calendar libraries (`react-calendar`, `FullCalendar`, etc.) and pick the coolest fit.
2. Build reusable **EventCard** and **EventForm** components following the design system.
3. Store events in `public/events.json` for easy contributions via pull request.
4. Style with Sass and add subtle animations for hover and transitions.
5. Write tests for event rendering and submission logic.

Let's make scheduling community life super cool!
