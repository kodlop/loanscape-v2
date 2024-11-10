"use client";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Testimonials() {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <Card className="bg-white bg-opacity-25 backdrop-blur-lg ring-none border-none">
            <CardHeader>
              <CardTitle className="text-primary-foreground">
                Easy to setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam nihil unde labore et sed. Quo modi minima cupiditate
                nam similique tempore rem odio esse. Nisi.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <CardDescription className="text-white">
                Nayan Bari
              </CardDescription>
            </CardFooter>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="bg-white bg-opacity-25 backdrop-blur-lg ring-none border-none">
            <CardHeader>
              <CardTitle className="text-primary-foreground">
                Easy to setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam nihil unde labore et sed. Quo modi minima cupiditate
                nam similique tempore rem odio esse. Nisi.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <CardDescription className="text-white">
                Nayan Bari
              </CardDescription>
            </CardFooter>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="bg-white bg-opacity-25 backdrop-blur-lg ring-none border-none">
            <CardHeader>
              <CardTitle className="text-primary-foreground">
                Easy to setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam nihil unde labore et sed. Quo modi minima cupiditate
                nam similique tempore rem odio esse. Nisi.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <CardDescription className="text-white">
                Nayan Bari
              </CardDescription>
            </CardFooter>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
