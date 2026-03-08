import { mallData } from "@/data/mallData";

const typeColors: Record<string, string> = {
  "Фуд-корт": "bg-orange-100 text-orange-700",
  Фастфуд: "bg-yellow-100 text-yellow-700",
  Бургерная: "bg-red-100 text-red-700",
  Ресторан: "bg-purple-100 text-purple-700",
  Кофейня: "bg-amber-100 text-amber-700",
  Пекарня: "bg-amber-100 text-amber-700",
};

export default function FoodSection() {
  return (
    <section id="food" className="py-16 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-mall-dark mb-3">
            Рестораны и кафе
          </h2>
          <p className="text-gray-500">
            {mallData.food.length} заведений на любой вкус
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {mallData.food.map((place) => (
            <div
              key={place.name}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    typeColors[place.type] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {place.type}
                </span>
                <span className="text-xs text-gray-400">{place.floor} эт.</span>
              </div>
              <h3 className="font-bold text-mall-dark text-base mb-1">
                {place.name}
              </h3>
              <p className="text-sm text-gray-500 flex-1 mb-3">
                {place.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-400">
                  🕐 {place.hours}
                </span>
                {place.reservation && (
                  <span className="text-xs text-green-600 font-medium">
                    Бронирование
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
