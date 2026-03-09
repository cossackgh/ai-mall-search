import { mallData } from "@/data/mallData";

// Usage: placed in page.tsx after <EntertainmentSection /> and before <EventsSection />

type MovieSession = {
  day: number;
  format: string;
  times: string[];
};

type Movie = {
  id: string;
  title: string;
  genre: string;
  age_rating: string;
  duration_min: number;
  description: string;
  poster_from: string;
  poster_to: string;
  poster_emoji?: string;
  poster_url?: string;
  sessions: MovieSession[];
};

function FormatBadge({ format }: { format: string }) {
  const styles: Record<string, string> = {
    IMAX: "bg-amber-400 text-amber-900",
    "4DX": "bg-red-500 text-white",
    "3D": "bg-blue-500 text-white",
    "2D": "bg-white/20 text-white",
  };
  return (
    <span
      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${styles[format] ?? "bg-gray-500 text-white"}`}
    >
      {format}
    </span>
  );
}

function FormatBadgeInfo({ format }: { format: string }) {
  const styles: Record<string, string> = {
    IMAX: "bg-amber-100 text-amber-800",
    "4DX": "bg-red-100 text-red-700",
    "3D": "bg-blue-100 text-blue-700",
    "2D": "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${styles[format] ?? "bg-gray-100 text-gray-600"}`}
    >
      {format}
    </span>
  );
}

function ageRatingStyle(rating: string): string {
  const map: Record<string, string> = {
    "0+": "bg-green-100 text-green-700",
    "6+": "bg-blue-100 text-blue-700",
    "12+": "bg-yellow-100 text-yellow-700",
    "16+": "bg-orange-100 text-orange-700",
    "18+": "bg-red-100 text-red-700",
  };
  return map[rating] ?? "bg-gray-100 text-gray-600";
}

function MovieCard({ movie }: { movie: Movie }) {
  const todaySessions = movie.sessions.filter((s) => s.day === 0);
  const todayFormats = Array.from(new Set(todaySessions.map((s) => s.format)));

  return (
    <article className="w-full rounded-2xl overflow-hidden shadow-lg shadow-black/30 bg-white flex flex-row lg:flex-col h-full">
      {/* Poster */}
      <div
        className={`relative w-32 flex-shrink-0 lg:w-auto lg:aspect-[2/3] bg-gradient-to-br ${movie.poster_from} ${movie.poster_to} overflow-hidden`}
        aria-label={`Постер фильма ${movie.title}`}
      >
        {movie.poster_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={movie.poster_url}
            alt={`Постер фильма ${movie.title}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-60" role="img" aria-hidden="true">
              {movie.poster_emoji}
            </span>
          </div>
        )}

        {/* Format badges top-right */}
        <div
          className="absolute top-2 right-2 flex flex-col gap-1 items-end"
          aria-label="Доступные форматы сегодня"
        >
          {todayFormats.map((f) => (
            <FormatBadge key={f} format={f} />
          ))}
        </div>

        {/* Title overlay — desktop only */}
        <div className="hidden lg:block absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <p className="text-white font-bold text-sm leading-tight">{movie.title}</p>
          <p className="text-white/60 text-xs">
            {movie.age_rating} · {movie.duration_min} мин
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        {/* Title — mobile only */}
        <p className="lg:hidden font-bold text-sm text-gray-900 leading-tight mb-0.5">{movie.title}</p>
        <p className="text-xs text-gray-500 mb-2">{movie.genre}</p>

        {/* Age + duration row */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ageRatingStyle(movie.age_rating)}`}
            aria-label={`Возрастной рейтинг ${movie.age_rating}`}
          >
            {movie.age_rating}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {movie.duration_min} мин
          </span>
        </div>

        {/* Today's sessions */}
        {todaySessions.length > 0 ? (
          <div className="mt-2">
            <p className="text-xs text-gray-400 mb-1">Сегодня</p>
            {todaySessions.map((session) => (
              <div
                key={session.format}
                className="flex flex-wrap items-center gap-1 mb-1"
              >
                <FormatBadgeInfo format={session.format} />
                {session.times.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 mt-2">Нет сеансов сегодня</p>
        )}

        {/* CTA */}
        <button
          type="button"
          className="mt-auto pt-3 text-xs font-semibold text-violet-600 hover:underline focus:outline-none focus:underline"
          aria-label={`Купить билет на фильм ${movie.title}`}
        >
          Купить билет →
        </button>
      </div>
    </article>
  );
}

export default function CinemaSection() {
  const cinema = mallData.entertainment.cinema;
  const schedule = cinema.cinema_schedule as Movie[];

  return (
    <section
      id="cinema"
      className="py-16 px-4 bg-gradient-to-b from-gray-950 to-slate-900"
      aria-labelledby="cinema-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl" role="img" aria-label="Кино">🎬</span>
            <h2
              id="cinema-heading"
              className="text-2xl sm:text-3xl font-bold text-white"
            >
              {cinema.name}
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base ml-12">
            Расписание сеансов
          </p>
        </div>

        {/* Format legend */}
        <div
          className="flex flex-wrap items-center gap-2 mb-8"
          aria-label="Легенда форматов"
        >
          <span className="text-xs text-gray-500 mr-1">Форматы:</span>
          {[
            { label: "2D", cls: "bg-gray-600 text-white" },
            { label: "3D", cls: "bg-blue-500 text-white" },
            { label: "IMAX", cls: "bg-amber-400 text-amber-900" },
            { label: "4DX", cls: "bg-red-500 text-white" },
          ].map(({ label, cls }) => (
            <span
              key={label}
              className={`text-xs font-bold px-2.5 py-1 rounded ${cls}`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Movie grid — mobile: horizontal scroll, desktop: 4-col grid */}
        <div
          className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-5"
          role="list"
          aria-label="Фильмы в прокате"
        >
          {schedule.map((movie) => (
            <div key={movie.id} role="listitem" className="flex">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-gray-500 text-center">
          Расписание на сегодня · Билеты на karo.ru или в кассе ТРЦ · Этаж {cinema.floors[0]}
        </p>
      </div>
    </section>
  );
}
