import { mallData } from "@/data/mallData";

const { cinema, bowling, kids_zone, vr_zone } = mallData.entertainment;

export default function EntertainmentSection() {
  return (
    <section id="entertainment" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-mall-dark mb-3">
            Развлечения
          </h2>
          <p className="text-gray-500">Отдых и впечатления для всей семьи</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cinema */}
          <div className="gradient-primary rounded-3xl p-8 text-white">
            <div className="text-4xl mb-3">🎬</div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-black">{cinema.name}</h3>
              <span className="bg-accent text-mall-dark text-xs font-bold px-2 py-0.5 rounded-full">
                IMAX
              </span>
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                4DX
              </span>
            </div>
            <p className="text-white/70 text-sm mb-4">{cinema.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-2xl font-black">{cinema.halls}</div>
                <div className="text-white/50 text-xs">кинозалов</div>
              </div>
              <div>
                <div className="text-2xl font-black">{cinema.total_seats}</div>
                <div className="text-white/50 text-xs">посадочных мест</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {cinema.formats.map((f) => (
                <span
                  key={f}
                  className="bg-white/20 text-white text-xs px-2 py-1 rounded-lg"
                >
                  {f}
                </span>
              ))}
            </div>
            <p className="text-white/60 text-xs">🕐 {cinema.hours}</p>
          </div>

          {/* Kids Zone */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 border border-purple-100">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-black text-mall-dark mb-2">
              {kids_zone.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{kids_zone.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-2xl font-black text-primary">
                  {kids_zone.area_sqm}
                </div>
                <div className="text-gray-400 text-xs">кв.м. площадь</div>
              </div>
              <div>
                <div className="text-2xl font-black text-primary">1–12</div>
                <div className="text-gray-400 text-xs">лет</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 font-medium mb-1">
              💰 {kids_zone.price}
            </p>
            <p className="text-xs text-gray-500">
              {kids_zone.adult_admission}
            </p>
            <p className="text-gray-400 text-xs mt-2">🕐 {kids_zone.hours}</p>
          </div>

          {/* Bowling */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-indigo-100">
            <div className="text-4xl mb-3">🎳</div>
            <h3 className="text-xl font-black text-mall-dark mb-2">
              {bowling.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{bowling.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-2xl font-black text-indigo-600">
                  {bowling.lanes}
                </div>
                <div className="text-gray-400 text-xs">дорожек</div>
              </div>
              <div>
                <div className="text-lg font-black text-indigo-600">
                  {bowling.price_per_game}
                </div>
                <div className="text-gray-400 text-xs">стоимость</div>
              </div>
            </div>
            <p className="text-gray-400 text-xs">🕐 {bowling.hours}</p>
          </div>

          {/* VR Zone */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 border border-teal-100">
            <div className="text-4xl mb-3">🥽</div>
            <h3 className="text-xl font-black text-mall-dark mb-2">
              {vr_zone.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{vr_zone.description}</p>
            <p className="text-sm text-gray-700 font-medium mb-1">
              💰 {vr_zone.price}
            </p>
            <p className="text-gray-400 text-xs mt-2">🕐 {vr_zone.hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
