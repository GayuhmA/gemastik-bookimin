"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ArrowUp,
  ArrowRight,
  RotateCcw,
  MessageCircle,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  action?: {
    label: string;
    href: string;
  };
}

const QUICK_TOPICS = [
  {
    label: "Rekomendasi di Sleman (< 20 jt)",
    query: "Rekomendasi makam di Sleman budget di bawah 20 juta",
  },
  {
    label: "Layanan ambulans 24 jam",
    query: "Saya butuh layanan ambulans dan pendampingan duka segera",
  },
  {
    label: "Syarat & alur pemesanan",
    query: "Bagaimana alur dan syarat pemesanan liang makam?",
  },
  {
    label: "Estimasi biaya pemakaman",
    query: "Berapa estimasi biaya pemakaman lengkap di Yogyakarta?",
  },
];

export default function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Selamat datang di Bookimin. Kami siap membantu Anda mencari rekomendasi lahan makam resmi, estimasi biaya, atau panduan layanan duka cita 24 jam.",
      time: "Baru saja",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const generateBotReply = (userQuery: string): Message => {
    const q = userQuery.toLowerCase();
    const timeStr = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (
      q.includes("sleman") ||
      q.includes("20") ||
      q.includes("rekomendasi") ||
      q.includes("harga") ||
      q.includes("biaya")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Berikut rekomendasi lahan makam terverifikasi di wilayah Sleman dan sekitarnya:\n\n• Al-Azhar Memorial Garden — Mulai Rp 15.000.000 (Tersedia 45 liang, fasilitas musholla & jalan aspal).\n• Taman Kenangan Sentosa — Mulai Rp 18.500.000 (Universal & ramah kursi roda).\n\nAnda dapat meninjau peta denah dan ketersediaan liang makam secara transparan.",
        time: timeStr,
        action: {
          label: "Lihat Denah & Ketersediaan Makam",
          href: "/cari-makam?lokasi=Sleman,%20Yogyakarta",
        },
      };
    }

    if (
      q.includes("ambulans") ||
      q.includes("segera") ||
      q.includes("darurat") ||
      q.includes("hari ini")
    ) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Tim ambulans dan pemulasaran jenazah Bookimin siaga 24 jam dengan penanganan cepat. Anda dapat langsung menghubungi nomor darurat bebas pulsa atau terhubung melalui WhatsApp resmi.",
        time: timeStr,
        action: {
          label: "Hubungi WhatsApp Siaga (0812-9988-7766)",
          href: "https://wa.me/6281299887766",
        },
      };
    }

    if (q.includes("alur") || q.includes("syarat") || q.includes("cara")) {
      return {
        id: Date.now().toString(),
        sender: "bot",
        text: "Tahapan pemesanan resmi melalui Bookimin:\n1. Pilih TPU dan nomor petak liang yang tersedia.\n2. Pilih kebutuhan pendukung (Ambulans, pemulasaran, tenda).\n3. Lengkapi data keluarga penanggung jawab.\n4. Konfirmasi pemesanan, pendamping resmi kami akan langsung menyambut Anda di lokasi pemakaman.",
        time: timeStr,
        action: {
          label: "Pelajari Panduan Lengkap",
          href: "/tentang",
        },
      };
    }

    return {
      id: Date.now().toString(),
      sender: "bot",
      text: "Terima kasih telah berkonsultasi. Bookimin menyediakan direktori resmi pemakaman dan pendampingan duka menyeluruh. Silakan tanyakan informasi spesifik mengenai lokasi, paket layanan, atau estimasi biaya.",
      time: timeStr,
      action: {
        label: "Jelajahi Semua Lokasi Makam",
        href: "/cari-makam",
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = generateBotReply(text);
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "initial-reset",
        sender: "bot",
        text: "Percakapan telah diatur ulang. Ada informasi atau kebutuhan lain yang dapat kami bantu?",
        time: "Baru saja",
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Konsultasi Bookimin"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-95 h-130 max-h-[80vh] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)] border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Clean, Simple Header */}
          <div className="px-5 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 shrink-0">
                <Image
                  src="/logo/logo.svg"
                  alt="Bookimin"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-[13px] text-primary-dark tracking-tight leading-none">
                  Konsultasi Bookimin
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cta" />
                  <span>Pendamping & Rekomendasi 24 Jam</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={handleReset}
                title="Atur ulang percakapan"
                aria-label="Atur ulang percakapan"
                className="p-1.5 rounded-lg hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Tutup jendela konsultasi"
                aria-label="Tutup jendela konsultasi"
                className="p-1.5 rounded-lg hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FBFBFC] text-[13px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary-dark text-white rounded-tr-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-2xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Clean CTA Link inside Bot Message */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <Link
                        href={msg.action.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cta hover:text-accent-cta-dark transition-colors"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Subtle Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white border border-slate-200/80 px-3.5 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions (Clean, No Emojis) */}
          <div className="px-4 py-2.5 bg-white border-t border-slate-100">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Topik Populer
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 hide-scrollbar">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  disabled={isTyping}
                  onClick={() => handleSendMessage(topic.query)}
                  className="px-3 py-1 bg-slate-50 hover:bg-slate-100 hover:text-primary-dark border border-slate-200/90 rounded-full text-xs text-slate-600 font-medium whitespace-nowrap transition-colors shrink-0 disabled:opacity-40"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-full px-3.5 py-1.5 focus-within:bg-white focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-900/5 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tulis pesan atau pertanyaan Anda..."
                className="w-full bg-transparent text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 outline-none py-1"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Kirim pesan"
                className="w-7 h-7 rounded-full bg-primary-dark hover:bg-slate-800 text-white flex items-center justify-center shrink-0 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </form>

          {/* Minimal Disclaimer Footer */}
          <div className="bg-white px-4 pb-2 text-center">
            <span className="text-[10px] text-slate-400">
              Layanan otomatis Bookimin • Terhubung langsung ke pendamping siaga
            </span>
          </div>
        </div>
      )}

      {/* Floating Launcher Button (Simple, Elegant, Dignified) */}
      <aside aria-label="Bantuan Konsultasi Bookimin" className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Tutup Konsultasi" : "Buka Konsultasi"}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-primary-dark hover:bg-slate-900 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 border border-slate-800 group"
        >
          {isOpen ? (
            <>
              <X size={16} />
              <span className="text-xs font-semibold tracking-tight">Tutup</span>
            </>
          ) : (
            <>
              <div className="relative flex items-center justify-center">
                <MessageCircle size={17} className="text-accent-cta" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-accent-cta" />
              </div>
              <span className="text-xs font-semibold tracking-tight">Konsultasi Layanan</span>
            </>
          )}
        </button>
      </aside>
    </>
  );
}
