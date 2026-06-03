const TestimonialCard = ({ testimonial, active = false }) => {
  return (
    <div
      className={`p-8 md:p-12 border transition-all duration-500 ${
        active
          ? 'border-[var(--color-accent)] bg-[var(--color-surface)]'
          : 'border-[var(--color-muted)] border-opacity-20 opacity-60'
      }`}
    >
      {/* Quote */}
      <div className="mb-8">
        <span className="font-display text-5xl text-[var(--color-accent)] opacity-40 leading-none">
          "
        </span>
      </div>

      <p className="font-display text-xl md:text-2xl font-light text-[var(--color-fg)] leading-relaxed mb-10 italic">
        {testimonial.text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div>
          <p className="font-body font-light text-[var(--color-fg)] text-sm">{testimonial.name}</p>
          <p className="label-text text-[var(--color-accent)] opacity-70">{testimonial.role}</p>
        </div>

        {/* Stars */}
        <div className="ml-auto flex gap-1">
          {Array(testimonial.rating).fill(0).map((_, i) => (
            <span key={i} className="text-[var(--color-accent)] text-xs">★</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
