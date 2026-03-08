import { mallData } from "@/data/mallData";

const cards = [
  {
    icon: "🕐",
    title: "Часы работы",
    lines: [
      `Пн–Пт: ${mallData.hours.monday_friday}`,
      `Сб–Вс: ${mallData.hours.saturday_sunday}`,
      `Кинотеатр: ${mallData.hours.cinema}`,
    ],
  },
  {
    icon: "📍",
    title: "Как добраться",
    lines: [
      mallData.address,
      `м. ${mallData.metro.join(" / ")}`,
      mallData.how_to_get.bus,
    ],
  },
  {
    icon: "🅿️",
    title: "Парковка",
    lines: [
      `${mallData.parking.total_spaces} мест`,
      `1-й час: ${mallData.parking.first_hour}`,
      `Далее: ${mallData.parking.rate_after}`,
    ],
  },
  {
    icon: "📞",
    title: "Контакты",
    lines: [
      mallData.contacts.phone,
      mallData.contacts.email,
      `Пн–Пт: ${mallData.hours.monday_friday}`,
    ],
  },
];

export default function InfoSection() {
  return (
    <section className="bg-surface py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-bold text-mall-dark text-lg mb-3">
              {card.title}
            </h3>
            {card.lines.map((line, i) => (
              <p key={i} className="text-gray-600 text-sm mb-1">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
