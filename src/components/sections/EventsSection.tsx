import { mallData } from "@/data/mallData";

const borderColors = [
  "border-l-primary",
  "border-l-accent",
  "border-l-pink-400",
  "border-l-green-400",
  "border-l-blue-400",
];

export default function EventsSection() {
  return (
    <section id="events" className="py-16 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-mall-dark mb-3">
            Акции и события
          </h2>
          <p className="text-gray-500">Актуальные мероприятия и специальные предложения</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mallData.events.map((event, i) => (
            <div
              key={event.title}
              className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${
                borderColors[i % borderColors.length]
              } hover:shadow-md transition-shadow`}
            >
              <div className="text-xs font-semibold text-primary/70 mb-2 uppercase tracking-wider">
                {event.dates}
              </div>
              <h3 className="font-bold text-mall-dark text-base mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
