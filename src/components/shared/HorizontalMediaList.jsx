
export default function HorizontalMediaList({ items, CardComponent, title }) {
  if (!items || items.length === 0) {
    return null; // Or a placeholder message
  }

  return (
    <section 
      className="py-6 md:py-8"
      aria-labelledby={title ? title.toLowerCase().replace(/\s+/g, '-') + "-title" : undefined}
    >
      {title && (
        <h2 
          id={title.toLowerCase().replace(/\s+/g, '-') + "-title"} 
          className="text-xl sm:text-2xl md:text-3xl font-headline font-bold text-foreground mb-4 md:mb-6"
        >
          {title}
        </h2>
      )}
      <div className="relative">
        <div 
          className="flex space-x-3 sm:space-x-4 md:space-x-6 overflow-x-auto pb-4 md:pb-6 scrollbar-none"
        >
          {items.map((item, index) => (
            <div 
              key={item.id || index} 
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
            >
              <CardComponent {...(item.seasons ? { show: item } : { movie: item })} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
