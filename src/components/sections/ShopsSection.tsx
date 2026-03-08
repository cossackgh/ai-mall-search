"use client";

import { useState } from "react";
import { mallData } from "@/data/mallData";

const categories = [
  "Все",
  "Мода",
  "Обувь",
  "Электроника",
  "Спорт",
  "Детские товары",
  "Товары для дома",
  "Косметика",
  "Книги",
  "Ювелирные украшения",
];

export default function ShopsSection() {
  const [active, setActive] = useState("Все");

  const filtered =
    active === "Все"
      ? mallData.shops
      : mallData.shops.filter((s) => s.category === active);

  return (
    <section id="shops" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-mall-dark mb-3">
            Магазины
          </h2>
          <p className="text-gray-500">
            {mallData.shops.length} магазинов на {mallData.floor_count} этажах
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface text-gray-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((shop) => (
            <div
              key={shop.name}
              className="bg-surface rounded-2xl p-5 border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-mall-dark group-hover:text-primary transition-colors">
                  {shop.name}
                </h3>
                <span className="flex-shrink-0 ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {shop.floor} эт.
                </span>
              </div>
              <p className="text-xs text-primary/70 font-medium mb-1">
                {shop.category}
              </p>
              <p className="text-sm text-gray-500">{shop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
