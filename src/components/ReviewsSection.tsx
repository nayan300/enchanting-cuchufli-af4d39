import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, ThumbsUp, Plus } from 'lucide-react';
import { CUSTOMER_REVIEWS, RESTAURANT_INFO, Review } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(CUSTOMER_REVIEWS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newDish, setNewDish] = useState('Special Chicken Biryani');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const added: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      location: 'Sadiya / Chapakhowa',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      dishRecommended: newDish,
    };

    setReviews([added, ...reviews]);
    setNewAuthor('');
    setNewComment('');
    setShowAddReview(false);
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Google Listing Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            Loved Across Sadiya & Chapakhowa
          </h2>
        </div>

        {/* Action: Write a review */}
        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="px-4 py-2 rounded-2xl bg-stone-100 hover:bg-amber-50 hover:text-amber-800 text-stone-700 text-xs font-bold flex items-center gap-2 transition-colors self-start sm:self-auto border border-stone-200 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Aggregate Score Bar */}
      <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-stone-950 font-black text-2xl flex items-center justify-center font-display shadow-xs">
            {RESTAURANT_INFO.rating}
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-500 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="font-bold text-xs text-stone-900">
              Rated 4.8 out of 5 from {RESTAURANT_INFO.totalReviews} verified Google reviews
            </p>
            <p className="text-[11px] text-stone-500">
              Top rated for: Less Oil Biryani, Quick Takeaway & Fresh Momos
            </p>
          </div>
        </div>

        <div className="text-xs text-stone-600 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs">
          📍 <span className="font-semibold text-stone-900">Verified Location:</span> Opposite Sadiya Police Station
        </div>
      </div>

      {/* Add Review Drawer */}
      {showAddReview && (
        <form
          onSubmit={handleAddReview}
          className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 animate-in fade-in"
        >
          <h4 className="font-bold text-sm text-stone-900">Share your experience at Shekhar's Food Club</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Dish You Tried</label>
              <select
                value={newDish}
                onChange={(e) => setNewDish(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
              >
                <option>Special Chicken Biryani</option>
                <option>French Fries + Blue Lagoon Combo</option>
                <option>Chicken Momo (Steamed/Fried)</option>
                <option>Chicken Fried Rice</option>
                <option>Chilly Chicken (7 pcs)</option>
                <option>Chicken 65</option>
                <option>Egg/Veg Fried Rice</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setNewRating(s)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 ${
                      s <= newRating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Review</label>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What did you think of the food, portion, and less-oil flavour?"
              className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddReview(false)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-xs"
            >
              Publish Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      {rev.author}
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    </h4>
                    <span className="text-[10px] text-stone-400">{rev.location} · {rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rev.rating
                          ? 'fill-amber-500 text-amber-500'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
              <span className="font-semibold text-amber-800">
                Recommended: {rev.dishRecommended}
              </span>
              <span className="flex items-center gap-1 text-stone-400">
                <ThumbsUp className="w-3 h-3" /> Helpful
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
