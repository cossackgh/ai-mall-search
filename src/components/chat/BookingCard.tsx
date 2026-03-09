"use client";

import { useState } from "react";

interface Props {
  restaurant: string;
  slots: string[];
}

type BookingResult = {
  bookingId: string;
  restaurant: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
};

const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);

const fmtLabel = (d: Date) => {
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Сегодня";
  if (d.toDateString() === addDays(today, 1).toDateString()) return "Завтра";
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
};

const fmtISO = (d: Date) => d.toISOString().split("T")[0];

const fmtRu = (d: Date) =>
  d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BookingCard({ restaurant, slots }: Props) {
  const today = new Date();
  const dateOptions = [today, addDays(today, 1), addDays(today, 2)];

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<BookingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async () => {
    if (!selectedTime || !name.trim() || !phone.trim()) {
      setErrorMsg("Пожалуйста, заполните все поля и выберите время.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurant,
          date: fmtISO(selectedDate),
          time: selectedTime,
          guests,
          name: name.trim(),
          phone: phone.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Ошибка сервера");
      }

      const data: BookingResult = await res.json();
      setResult(data);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Неизвестная ошибка");
      setStatus("error");
    }
  };

  if (status === "success" && result) {
    return (
      <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 mt-2 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">✅</span>
          <span className="font-semibold text-gray-800">Бронирование подтверждено!</span>
        </div>
        <div className="bg-white rounded-lg p-2.5 border border-violet-100 space-y-1 text-gray-700">
          <div className="text-center">
            <span className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>
              {result.bookingId}
            </span>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 mt-1">
            <span className="text-gray-500">Ресторан:</span>
            <span className="font-medium">{result.restaurant}</span>
            <span className="text-gray-500">Дата:</span>
            <span className="font-medium">{fmtRu(new Date(result.date + "T12:00:00"))}</span>
            <span className="text-gray-500">Время:</span>
            <span className="font-medium">{result.time}</span>
            <span className="text-gray-500">Гостей:</span>
            <span className="font-medium">{result.guests}</span>
            <span className="text-gray-500">Имя:</span>
            <span className="font-medium">{result.name}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Сохраните номер брони — он понадобится при входе в ресторан.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 mt-2 text-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🍽️</span>
        <div>
          <div className="font-semibold text-gray-800">Забронировать столик</div>
          <div className="text-xs font-medium" style={{ color: "var(--color-primary)" }}>
            {restaurant}
          </div>
        </div>
      </div>

      {/* Date picker */}
      <div className="mb-3">
        <div className="text-xs font-medium text-gray-500 mb-1.5">Дата</div>
        <div className="flex gap-1.5">
          {dateOptions.map((d) => {
            const isActive = d.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={d.toDateString()}
                onClick={() => setSelectedDate(d)}
                className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-medium border transition-colors ${
                  isActive
                    ? "text-white border-transparent"
                    : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"
                }`}
                style={isActive ? { background: "var(--color-primary)", borderColor: "var(--color-primary)" } : undefined}
              >
                {fmtLabel(d)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div className="mb-3">
        <div className="text-xs font-medium text-gray-500 mb-1.5">Время</div>
        <div className="grid grid-cols-3 gap-1.5">
          {slots.map((slot) => {
            const isActive = slot === selectedTime;
            return (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isActive
                    ? "text-white border-transparent"
                    : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"
                }`}
                style={isActive ? { background: "var(--color-primary)", borderColor: "var(--color-primary)" } : undefined}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Guests stepper */}
      <div className="mb-3">
        <div className="text-xs font-medium text-gray-500 mb-1.5">Количество гостей</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 font-bold hover:border-violet-300 transition-colors flex items-center justify-center"
            aria-label="Уменьшить количество гостей"
          >
            −
          </button>
          <span className="w-6 text-center font-semibold text-gray-800">{guests}</span>
          <button
            onClick={() => setGuests((g) => Math.min(8, g + 1))}
            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 font-bold hover:border-violet-300 transition-colors flex items-center justify-center"
            aria-label="Увеличить количество гостей"
          >
            +
          </button>
        </div>
      </div>

      {/* Name input */}
      <div className="mb-3">
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Ваше имя</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Иван Иванов"
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors"
        />
      </div>

      {/* Phone input */}
      <div className="mb-3">
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Телефон</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 (___) ___-__-__"
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400 transition-colors"
        />
      </div>

      {/* Error message */}
      {(status === "error" || errorMsg) && (
        <div className="mb-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {errorMsg || "Произошла ошибка. Попробуйте ещё раз."}
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="w-full py-2.5 rounded-xl text-white text-xs font-semibold gradient-primary transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <svg
              className="animate-spin w-3.5 h-3.5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Бронирование…
          </>
        ) : (
          "Забронировать"
        )}
      </button>
    </div>
  );
}
