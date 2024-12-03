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
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

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
  twitterVerified?: boolean;
  telegramVerified?: boolean;
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

// Verification Badges Component
const VerificationBadges = ({
  twitterVerified,
  telegramVerified,
}: {
  twitterVerified?: boolean;
  telegramVerified?: boolean;
}) => {
  if (!twitterVerified && !telegramVerified) return null;

  return (
    <div className="flex gap-1.5">
      {twitterVerified && (
        <div className="flex items-center gap-0.5 bg-blue-500/10 px-2 py-0.5 rounded-full">
          <BadgeCheck size={12} className="text-blue-500" />
          <span className="text-xs font-medium text-blue-500">Twitter</span>
        </div>
      )}
      {telegramVerified && (
        <div className="flex items-center gap-0.5 bg-sky-500/10 px-2 py-0.5 rounded-full">
          <BadgeCheck size={12} className="text-sky-500" />
          <span className="text-xs font-medium text-sky-500">Telegram</span>
        </div>
      )}
    </div>
  );
};

// SwipeCard Component
const SwipeCard = forwardRef<SwipeCardHandle, SwipeCardProps>((props, ref) => {
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
      onComplete: () => props.onSwipe(direction),
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
        <Image
          src={props.image}
          alt={props.name}
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
      </div>

      {/* Profile Content */}
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-primary">
              {props.name}, {props.age}
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              {props.profession}
            </p>
          </div>
          <VerificationBadges
            twitterVerified={props.twitterVerified}
            telegramVerified={props.telegramVerified}
          />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {props.bio}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {props.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="rounded-full">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

SwipeCard.displayName = "SwipeCard";

export default SwipeCard;
// "use client";

// import {
//   useRef,
//   useState,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { gsap } from "gsap";
// import { Draggable } from "gsap/Draggable";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";

// // Initialize GSAP plugins
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(Draggable);
// }

// // Types
// interface SwipeCardProps {
//   name: string;
//   age: number;
//   image: string;
//   bio: string;
//   profession: string;
//   skills: string[];
//   onSwipe: (direction: "left" | "right") => void;
// }

// export interface SwipeCardHandle {
//   handleSwipe: (direction: "left" | "right") => void;
// }

// // Animation constants
// const SWIPE_ANIMATION = {
//   duration: 0.5,
//   leftX: -1000,
//   rightX: 1000,
//   leftRotation: -30,
//   rightRotation: 30,
// };

// const DRAG_THRESHOLD = 100;
// const ROTATION_FACTOR = 20;

// // SwipeCard Component
// const SwipeCard = forwardRef<SwipeCardHandle, SwipeCardProps>((props, ref) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);

//   // Animation handlers
//   const handleSwipe = (direction: "left" | "right") => {
//     if (!cardRef.current) return;

//     const xMove =
//       direction === "left" ? SWIPE_ANIMATION.leftX : SWIPE_ANIMATION.rightX;
//     const rotation =
//       direction === "left"
//         ? SWIPE_ANIMATION.leftRotation
//         : SWIPE_ANIMATION.rightRotation;

//     gsap.to(cardRef.current, {
//       x: xMove,
//       rotation,
//       opacity: 0,
//       duration: SWIPE_ANIMATION.duration,
//       onComplete: () => props.onSwipe(direction),
//     });
//   };

//   // Expose handleSwipe to parent
//   useImperativeHandle(ref, () => ({ handleSwipe }));

//   // Initialize draggable functionality
//   const initDraggable = () => {
//     if (!cardRef.current) return;

//     Draggable.create(cardRef.current, {
//       type: "x,y",
//       inertia: true,
//       onDragStart: () => setIsDragging(true),
//       onDragEnd: function () {
//         setIsDragging(false);
//         if (Math.abs(this.endX) < DRAG_THRESHOLD) {
//           // Return to center if not dragged far enough
//           gsap.to(cardRef.current, {
//             x: 0,
//             y: 0,
//             rotation: 0,
//             duration: 0.3,
//           });
//         } else {
//           // Swipe away
//           handleSwipe(this.endX < 0 ? "left" : "right");
//         }
//       },
//       onDrag: function () {
//         // Rotate card while dragging
//         const rotation = (this.x / window.innerWidth) * ROTATION_FACTOR;
//         gsap.set(cardRef.current, { rotation });
//       },
//     });
//   };

//   useEffect(() => {
//     initDraggable();
//   },[]);

//   return (
//     <Card
//       ref={cardRef}
//       className="w-[320px] h-[500px] cursor-grab active:cursor-grabbing overflow-hidden dark"
//       style={{ touchAction: "none" }}
//     >
//       {/* Profile Image with Gradient Overlay */}
//       <div className="relative h-[250px]">
//         <Image
//           src={props.image}
//           alt={props.name}
//           width={1000}
//           height={1000}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
//       </div>

//       {/* Profile Content */}
//       <CardContent className="p-4 space-y-2">
//         <h2 className="text-xl font-semibold text-primary">
//           {props.name}, {props.age}
//         </h2>
//         <p className="text-sm font-medium text-muted-foreground">
//           {props.profession}
//         </p>
//         <p className="text-sm text-muted-foreground line-clamp-2">
//           {props.bio}
//         </p>

//         {/* Skills Tags */}
//         <div className="flex flex-wrap gap-1.5 mt-2">
//           {props.skills.map((skill, index) => (
//             <Badge key={index} variant="secondary" className="rounded-full">
//               {skill}
//             </Badge>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// SwipeCard.displayName = "SwipeCard";

// export default SwipeCard;
