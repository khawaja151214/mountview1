import { reviews } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-primary/5">
      <div className="container">
        <div className="mb-12">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase">Guest Reviews</span>
          <h2 className="font-serif text-4xl font-bold text-primary mt-2">What Our Guests Say</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">Discover why travelers from around the world choose Mount View Hotel for their Skardu experience.</p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-96"
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{review.author}</h3>
                        {review.role && (
                          <p className="text-sm text-muted-foreground">{review.role}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                      </div>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                        {review.type}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm line-clamp-4">
                      {review.text}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Scroll Controls */}
          <div className="flex gap-2 justify-end mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full"
              data-testid="button-scroll-left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full"
              data-testid="button-scroll-right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
