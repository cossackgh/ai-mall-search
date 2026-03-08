"use client";

export default function HeroSection() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  return (
    <section className="relative min-h-screen gradient-primary flex items-center justify-center overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-3/4 left-1/2 w-48 h-48 bg-primary-light/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">
            Москва, Варшавское шоссе, 87 · м. Варшавская
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-7xl font-black text-white mb-4 leading-tight">
          ТРЦ
          <br />
          <span className="text-gradient">«Галактика»</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/70 mb-4 font-light">
          Всё, что нужно — в одной галактике
        </p>
        <p className="text-white/50 mb-12 text-base">
          4 этажа · 100+ магазинов · Кинотеатр IMAX · Боулинг · Фуд-корт
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { value: "100+", label: "Магазинов" },
            { value: "8", label: "Кино-залов" },
            { value: "1800", label: "Парковочных мест" },
            { value: "до 50%", label: "Скидки в марте" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={openChat}
            className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-2xl
                       transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50
                       flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            Задать вопрос ассистенту
          </button>
          <a
            href="#shops"
            className="border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4
                       rounded-2xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
          >
            Каталог магазинов
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
