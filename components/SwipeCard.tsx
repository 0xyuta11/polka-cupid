"use client";

import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Initialize GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

// Types
interface SwipeCardProps {
  name: string;
  age: number;
  image: string;
  bio: string;
  profession: string;
  skills: string[];
  onSwipe: (direction: "left" | "right") => void;
}

export interface SwipeCardHandle {
  handleSwipe: (direction: "left" | "right") => void;
}

// Animation constants
const SWIPE_ANIMATION = {
  duration: 0.5,
  leftX: -1000,
  rightX: 1000,
  leftRotation: -30,
  rightRotation: 30,
};

const DRAG_THRESHOLD = 100;
const ROTATION_FACTOR = 20;

// SwipeCard Component
const SwipeCard = forwardRef<SwipeCardHandle, SwipeCardProps>(
  ({ name, age, image, bio, profession, skills, onSwipe }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Animation handlers
    const handleSwipe = (direction: "left" | "right") => {
      if (!cardRef.current) return;

      const xMove =
        direction === "left" ? SWIPE_ANIMATION.leftX : SWIPE_ANIMATION.rightX;
      const rotation =
        direction === "left"
          ? SWIPE_ANIMATION.leftRotation
          : SWIPE_ANIMATION.rightRotation;

      gsap.to(cardRef.current, {
        x: xMove,
        rotation,
        opacity: 0,
        duration: SWIPE_ANIMATION.duration,
        onComplete: () => onSwipe(direction),
      });
    };

    // Expose handleSwipe to parent
    useImperativeHandle(ref, () => ({ handleSwipe }));

    // Initialize draggable functionality
    const initDraggable = () => {
      if (!cardRef.current) return;

      Draggable.create(cardRef.current, {
        type: "x,y",
        inertia: true,
        onDragStart: () => setIsDragging(true),
        onDragEnd: function () {
          setIsDragging(false);
          if (Math.abs(this.endX) < DRAG_THRESHOLD) {
            // Return to center if not dragged far enough
            gsap.to(cardRef.current, {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 0.3,
            });
          } else {
            // Swipe away
            handleSwipe(this.endX < 0 ? "left" : "right");
          }
        },
        onDrag: function () {
          // Rotate card while dragging
          const rotation = (this.x / window.innerWidth) * ROTATION_FACTOR;
          gsap.set(cardRef.current, { rotation });
        },
      });
    };

    useEffect(() => {
      initDraggable();
    }, []);

    return (
      <Card
        ref={cardRef}
        className="w-[320px] h-[500px] cursor-grab active:cursor-grabbing overflow-hidden dark"
        style={{ touchAction: "none" }}
      >
        {/* Profile Image with Gradient Overlay */}
        <div className="relative h-[250px]">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
        </div>

        {/* Profile Content */}
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-semibold text-primary">
            {name}, {age}
          </h2>
          <p className="text-sm font-medium text-muted-foreground">
            {profession}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">{bio}</p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="rounded-full">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

export default SwipeCard;
