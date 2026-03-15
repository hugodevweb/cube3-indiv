'use client';

import { useState } from 'react';

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  photo_url: string;
}

const CATEGORIES = ['Baskets', 'Vintage', 'Trading Cards', 'Comics', 'Watches', 'Art', 'Other'];

export default function SellModal({ isOpen, onClose, onSuccess }: SellModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    photo_url: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        photo_url: formData.photo_url,
      };

      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create item');
      }

      setFeedback({ type: 'success', message: 'Article mis en vente avec succès!' });
      setFormData({ title: '', description: '', price: '', category: '', photo_url: '' });

      setTimeout(() => {
        onSuccess();
        onClose();
        setFeedback(null);
      }, 1500);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/45 backdrop-blur-[3px] z-[200] flex items-end sm:items-center justify-center
                 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Vendre un article"
    >
      <div
        className="bg-surface rounded-t-lg sm:rounded-lg w-full max-w-[580px] max-h-[92vh] sm:max-h-[90vh]
                   overflow-y-auto p-8 shadow-lg
                   animate-in slide-in-from-bottom-14 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-280"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold text-text">Mettre en vente</span>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-background border-none rounded-full flex items-center justify-center
                      cursor-pointer text-text-secondary transition-all duration-150 hover:bg-border"
            aria-label="Fermer"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div
            className={`p-2.5 px-3.5 rounded-sm text-sm font-medium mb-3 ${
              feedback.type === 'success'
                ? 'bg-[#f0fdf4] border border-[#86efac] text-success'
                : 'bg-[#fef2f2] border border-[#fca5a5] text-error'
            }`}
            role="alert"
          >
            {feedback.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="f-title" className="block text-sm font-semibold text-text-secondary mb-1.5">
              Titre *
            </label>
            <input
              type="text"
              id="f-title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="ex. Air Jordan 1 Chicago – taille 42"
              required
              className="w-full font-sans text-[0.9rem] text-text bg-background border-[1.5px] border-border
                        rounded-sm px-3.5 py-2.5 outline-none transition-all duration-150
                        focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_rgba(9,177,186,0.12)]"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="f-description" className="block text-sm font-semibold text-text-secondary mb-1.5">
              Description *
            </label>
            <textarea
              id="f-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="État, taille, historique de l'article…"
              required
              className="w-full font-sans text-[0.9rem] text-text bg-background border-[1.5px] border-border
                        rounded-sm px-3.5 py-2.5 outline-none resize-y min-h-[90px] transition-all duration-150
                        focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_rgba(9,177,186,0.12)]"
            />
          </div>

          {/* Price and Category row */}
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            {/* Price */}
            <div>
              <label htmlFor="f-price" className="block text-sm font-semibold text-text-secondary mb-1.5">
                Prix (€) *
              </label>
              <input
                type="number"
                id="f-price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0,00"
                required
                className="w-full font-sans text-[0.9rem] text-text bg-background border-[1.5px] border-border
                          rounded-sm px-3.5 py-2.5 outline-none transition-all duration-150
                          focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_rgba(9,177,186,0.12)]"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="f-category" className="block text-sm font-semibold text-text-secondary mb-1.5">
                Catégorie *
              </label>
              <select
                id="f-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full font-sans text-[0.9rem] text-text bg-background border-[1.5px] border-border
                          rounded-sm px-3.5 py-2.5 outline-none transition-all duration-150
                          focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_rgba(9,177,186,0.12)]"
              >
                <option value="" disabled>
                  Choisir…
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label htmlFor="f-photo" className="block text-sm font-semibold text-text-secondary mb-1.5">
              URL de la photo *
            </label>
            <input
              type="url"
              id="f-photo"
              name="photo_url"
              value={formData.photo_url}
              onChange={handleInputChange}
              placeholder="https://…"
              required
              className="w-full font-sans text-[0.9rem] text-text bg-background border-[1.5px] border-border
                        rounded-sm px-3.5 py-2.5 outline-none transition-all duration-150
                        focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_rgba(9,177,186,0.12)]"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-accent text-white font-sans text-base font-semibold
                      border-none rounded-pill cursor-pointer mt-2 shadow-[0_2px_8px_rgba(9,177,186,0.3)]
                      transition-all duration-150
                      hover:bg-accent-dark hover:shadow-[0_4px_14px_rgba(9,177,186,0.4)]
                      active:scale-[0.98]
                      disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Envoi en cours…' : 'Mettre en vente'}
          </button>
        </form>
      </div>
    </div>
  );
}
