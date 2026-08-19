"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[ReviewChef] Message de ${form.name}`);
    const body = encodeURIComponent(
      `Nom : ${form.name}\nEmail : ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:yann.cfw@gmail.com?subject=${subject}&body=${body}`;
  }

  const filled = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-red-50 flex flex-col">
      <PublicNav />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-brand-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contactez-nous</h1>
            <p className="text-gray-500">
              Une question, un problème ou une idée ? On vous répond sous 24h.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Votre nom"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Décrivez votre question ou votre demande..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>

              <Button type="submit" className="w-full" disabled={!filled}>
                <Send className="w-4 h-4" />
                Envoyer le message
              </Button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              Ce formulaire ouvrira votre client de messagerie.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
