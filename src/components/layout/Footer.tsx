import { mallData } from "@/data/mallData";

export default function Footer() {
  return (
    <footer className="bg-mall-dark text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full gradient-card flex items-center justify-center">
                <span className="text-white text-sm font-bold">Г</span>
              </div>
              <span className="text-white font-bold">ТРЦ «Галактика»</span>
            </div>
            <p className="text-sm text-white/50">{mallData.slogan}</p>
            <div className="flex gap-3 mt-4">
              <a
                href={`https://${mallData.contacts.social.vk}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors text-sm"
              >
                VK
              </a>
              <a
                href={`https://${mallData.contacts.social.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors text-sm"
              >
                Telegram
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Навигация
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#shops", label: "Магазины" },
                { href: "#food", label: "Рестораны" },
                { href: "#entertainment", label: "Развлечения" },
                { href: "#events", label: "Акции" },
                { href: "#services", label: "Услуги" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Часы работы
            </h4>
            <ul className="space-y-1 text-sm">
              <li>Пн–Пт: {mallData.hours.monday_friday}</li>
              <li>Сб–Вс: {mallData.hours.saturday_sunday}</li>
              <li className="text-white/40 text-xs mt-2">
                Кинотеатр: {mallData.hours.cinema}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Контакты
            </h4>
            <ul className="space-y-2 text-sm">
              <li>{mallData.address}</li>
              <li>м. {mallData.metro.join(" / ")}</li>
              <li>
                <a
                  href={`tel:${mallData.contacts.phone.replace(/\D/g, "")}`}
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  {mallData.contacts.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${mallData.contacts.email}`}
                  className="hover:text-white transition-colors"
                >
                  {mallData.contacts.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} ТРЦ «Галактика». Все права защищены.
        </div>
      </div>
    </footer>
  );
}
