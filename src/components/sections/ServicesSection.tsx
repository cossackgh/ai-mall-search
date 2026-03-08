import { mallData } from "@/data/mallData";

const serviceIcons: Record<string, string> = {
  "Банкоматы": "🏧",
  "Информационная стойка": "ℹ️",
  "Камеры хранения": "🔒",
  "Прокат колясок": "🛸",
  "Комнаты матери и ребёнка": "👶",
  "Медпункт": "🏥",
  "Доступная среда": "♿",
  "Wi-Fi": "📶",
  "Пункт выдачи": "📦",
  "Обменный пункт": "💱",
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-mall-dark mb-3">
            Услуги
          </h2>
          <p className="text-gray-500">
            Всё для вашего комфорта
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {mallData.services.map((service) => (
            <div
              key={service.name}
              className="bg-surface rounded-2xl p-5 text-center hover:shadow-md hover:border-primary/20 border border-transparent transition-all group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform inline-block">
                {serviceIcons[service.name] ?? "⚙️"}
              </div>
              <h4 className="font-semibold text-mall-dark text-sm mb-1">
                {service.name}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {service.locations}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
