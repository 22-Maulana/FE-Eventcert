import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import { getEvents } from "../utils/services/EventService";

const Event = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    // Pisahkan Upcoming vs Past berdasarkan tanggal
    const today = new Date();

    const upcomingEvents = events.filter(
        (e) => new Date(e.tanggal) >= today
    );

    const pastEvents = events.filter(
        (e) => new Date(e.tanggal) < today
    );

    // Search filter
    const filteredUpcoming = upcomingEvents.filter((event) =>
        event.nama_event.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPast = pastEvents.filter((event) =>
        event.nama_event.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const visiblePastEvents = showAll ? filteredPast : filteredPast.slice(0, 9);

    return (
        <div className="text-white bg-gray-950">
            <Hero
                title="Explore Exciting Webinars"
                subtitle="Discover open webinars you can join instantly."
                height="70vh"
                showButton={false}
            />

            {/* SEARCH */}
            <div className="relative z-20 flex justify-center -mt-40 mb-30">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-6 py-3 text-white placeholder-gray-400 rounded-full shadow-lg w-110 bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>

            {/* UPCOMING */}
            <section className="max-w-6xl px-6 py-20 mx-auto">
                <h2 className="pl-4 mb-8 text-3xl font-bold border-l-4 border-blue-500">
                    Upcoming Events
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {filteredUpcoming.length > 0 ? (
                        filteredUpcoming.map((event) => (
                            // Pastikan container grid item memiliki tinggi penuh
                            <div key={event.id} className="h-full">
                                <EventCard event={event} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No upcoming events found.</p>
                    )}
                </div>
            </section>

            {/* PAST EVENTS */}
            <section className="max-w-6xl px-6 py-20 mx-auto">
                <h2 className="pl-4 mb-8 text-3xl font-bold border-l-4 border-gray-400">
                    Past Events
                </h2>

                {/* PERBAIKAN: Pastikan container memiliki tinggi yang diwariskan */}
                <div className="grid gap-8 p-10 bg-gray-900 md:grid-cols-3 rounded-3xl">
                    {visiblePastEvents.length > 0 ? (
                        visiblePastEvents.map((event) => (
                            // Tambahkan h-full di sini
                            <div key={event.id} className="h-full">
                                <EventCard event={event} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No past events found.</p>
                    )}
                </div>

                {/* Show More / Less */}
                {filteredPast.length > 9 && (
                    <div className="mt-10 text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
                        >
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Event;