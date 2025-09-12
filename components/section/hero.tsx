import { BookOpen, Heart } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section id="home" className="relative py-20 md:py-32 z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/herobg.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="container z-20 relative px-4 md:px-6">
        <div className=" ">
          <Badge variant="secondary" className="mb-4 ">
            Personal Collection
          </Badge>
          <h1 className="text-4xl md:text-6xl text-white lg:text-7xl font-bold text-balance mb-6">
            <span className="text-primary block ">FavLines</span>
            Lines Worth Keepping
          </h1>
          <p className="text-lg md:text-xl text-muted text-pretty mb-8">
            A curated collection of song lyrics and poetry that speak to the
            heart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 ">
            <Button size="lg" className="text-lg px-8">
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 text-white bg-transparent"
            >
              <Heart className="mr-2 h-5 w-5" />
              View Favorites
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
