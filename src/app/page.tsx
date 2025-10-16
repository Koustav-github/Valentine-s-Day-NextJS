"use client";
import "@/app/globals.css";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

type Heart = {
  id: number;
  x: number;
  y: number;
};

type ButtonPosition = {
  left: string;
  top: string;
};

type AppState = "initial" | "persuading" | "celebrating" | "ultimatum";

export default function Home() {
  const [mainImageSrc, setMainImageSrc] = useState<string>("/image/val1.gif");
  const [innerText, setInnerText] = useState<string>(
    "WILL YOU BE MY VALENTINE ??"
  );
  const [count, setCount] = useState<number>(1);
  const [appState, setAppState] = useState<AppState>("initial");
  const [isTextWiggling, setIsTextWiggling] = useState<boolean>(false);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [complimentCount, setComplimentCount] = useState<number>(0);
  const [noButtonPosition, setNoButtonPosition] = useState<ButtonPosition>({
    left: "0",
    top: "0",
  });
  const [showUltimatum, setShowUltimatum] = useState<boolean>(false);
  const [yesClicked, setYesClicked] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);

  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset audio when component unmounts or state changes
  useEffect(() => {
    return () => {
      if (audioRef2.current) {
        audioRef2.current.pause();
        audioRef2.current.currentTime = 0;
      }
    };
  }, []);

  // Easter Egg Keyboard Shortcuts
  // Easter Egg Keyboard Shortcuts
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Only allow Y key in initial or persuading states
    if (appState === "celebrating" || appState === "ultimatum") return;

    if (e.key === "h" || e.key === "H") {
      setInnerText("HEHEHEHEHEHEHEHEHEHEHEHE");
      setTimeout(() => setInnerText("WILL YOU BE MY VALENTINE ??"), 2000);
    }
    if (e.key === "l" || e.key === "L") {
      setInnerText("I LOVE YOU SO MUCH CUTIE PIE! 💖");
      setTimeout(() => setInnerText("WILL YOU BE MY VALENTINE ??"), 3000);
    }
    if (e.key === "y" || e.key === "Y") {
      handleYesClick();
    }
  };

  window.addEventListener("keydown", handleKeyPress);
  return () => window.removeEventListener("keydown", handleKeyPress);
}, [appState, setAppState]);

  // Playful Text Animations
  useEffect(() => {
    if (appState === "celebrating" || appState === "ultimatum") return;

    const wiggleInterval = setInterval(() => {
      setIsTextWiggling(true);
      setTimeout(() => setIsTextWiggling(false), 500);
    }, 5000);

    return () => clearInterval(wiggleInterval);
  }, [appState]);

  // Mouse Follower Hearts
  useEffect(() => {
    if (appState === "ultimatum") return;

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.98) {
        const newHeart: Heart = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };
        setHearts((prev) => [...prev.slice(-10), newHeart]); // Limit to 10 hearts
        setTimeout(() => {
          setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
        }, 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [appState]);

  // Secret Click Spots on Images
  const handleSecretImageClick = useCallback(
    (index: number) => {
      if (appState === "celebrating" || appState === "ultimatum") return;

      const messages = [
        "PSST... CLICK YES ALREADY!",
        "I AM WATCHING YOU 👀",
        "DO NOT BE SHY!",
        "YOU KNOW YOU WANT TO!",
        "HEHE NICE TRY!",
        "FOUND A SECRET! NOW SAY YES!",
        "BOOP! 👆",
      ];
      setInnerText(messages[Math.floor(Math.random() * messages.length)]);
      setTimeout(() => setInnerText("WILL YOU BE MY VALENTINE ??"), 2000);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {}); // Silence error
      }
    },
    [appState]
  );

  const noButtonTexts = [
    "NO"
  ];

  // FIXED: No button movement on hover
  const handleNoHover = useCallback(() => {
    if (!isMounted) return;

    // Move button when count > 3 OR in ultimatum state
    if ((count > 3 && appState === "persuading") || appState === "ultimatum") {
      const newPosition = {
        left: `${Math.random() * 80}vw`,
        top: `${Math.random() * 80}vh`,
      };
      setNoButtonPosition(newPosition);
      if (audioRef.current && appState !== "ultimatum") {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }
  }, [count, appState, isMounted]);

  // FIXED: No button click logic with proper count updates
  const handleNoClick = useCallback(() => {
    if (!isMounted) return;

    // If user already said yes and clicks no, show ultimatum
    if (yesClicked && appState === "celebrating") {
      setAppState("ultimatum");
      setShowUltimatum(true);
      setInnerText("YOU ALREADY SAID YES! NO TAKESIES-BACKSIES! 😠");
      setMainImageSrc("/image/val1.gif");

      // Stop celebration music
      if (audioRef2.current) {
        audioRef2.current.pause();
        audioRef2.current.currentTime = 0;
      }

      // Play ultimatum sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return;
    }

    // If in ultimatum state, make button extra hard to click
    if (appState === "ultimatum") {
      const newPosition = {
        left: `${Math.random() * 85}vw`,
        top: `${Math.random() * 85}vh`,
      };
      setNoButtonPosition(newPosition);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return;
    }

    // FIXED: Proper count progression for normal no clicks
    if (count < 3) {
      const newCount = count + 1;
      setCount(newCount);
      setMainImageSrc(`/image/val${newCount}.gif`);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      // Update text based on new count
      if (newCount === 2) {
        setInnerText("MANA MAT KARO YAAR -_-_-_-_-");
      } else if (newCount === 3) {
        setInnerText("PLEASE PLEASE PLEASE :(.....");
      }

      // Update app state if this is the first click
      if (appState === "initial") {
        setAppState("persuading");
      }
    } else if (count === 3) {
      // FIXED: This was missing - handle the transition to count 4
      setCount(4);
      const newPosition = {
        left: `${Math.random() * 80}vw`,
        top: `${Math.random() * 80}vh`,
      };
      setNoButtonPosition(newPosition);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      setInnerText("LAST CHANCE HAIN CUTIE");
    } else if (count > 3) {
      // FIXED: FINAL RANDOM POSITIONING - This is the restored feature!
      const newPosition = {
        left: `${Math.random() * 85}vw`,
        top: `${Math.random() * 85}vh`,
      };
      setNoButtonPosition(newPosition);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }
  }, [count, appState, yesClicked, isMounted]);

  const handleYesClick = useCallback(() => {
    if (appState === "ultimatum") {
      // If in ultimatum, yes click should restore celebration
      setAppState("celebrating");
      setShowUltimatum(false);
      setInnerText("THANK YOU FOR COMING BACK! I LOVE YOU! 💖");
      setMainImageSrc("/image/fimal.gif");
      if (audioRef2.current) {
        audioRef2.current.play().catch(() => {});
      }
      return;
    }

    setYesClicked(true);
    setMainImageSrc("/image/fimal.gif");
    setAppState("celebrating");

    if (audioRef2.current) {
      audioRef2.current.currentTime = 0;
      audioRef2.current.play().catch(() => {});
    }

  }, [count, appState, yesClicked, isMounted]);

  const surroundingImages = [
    {
      src: "/image/12.jpg",
      className: "lg:translate-x-[30vw] lg:translate-y-[28vh]",
    },
    {
      src: "/image/23.jpg",
      className: "lg:translate-x-[25vw] lg:translate-y-[3vh]",
    },
    {
      src: "/image/34.jpg",
      className: "lg:-translate-x-[25vw] lg:translate-y-[3vh]",
    },
    {
      src: "/image/45.jpg",
      className: "lg:-translate-x-[30vw] lg:translate-y-[25vh]",
    },
    {
      src: "/image/56.jpg",
      className: "lg:-translate-x-[30vw] lg:-translate-y-[16vh]",
    },
    {
      src: "/image/67.jpg",
      className: "lg:-translate-x-[23vw] lg:-translate-y-[35vh]",
    },
    {
      src: "/image/78.jpg",
      className: "lg:translate-x-[27vw] lg:-translate-y-[25vh]",
    },
  ];

  // FIXED: Get current button text based on state and count
  const getNoButtonText = () => {
    if (appState === "ultimatum") return "I AM SORRY!";
    if (appState === "celebrating") return "CHANGED MIND?";

    // FIXED: Use count to get the correct text from array
    const textIndex = Math.min(count - 1, noButtonTexts.length - 1);
    return noButtonTexts[textIndex];
  };

  // FIXED: Check if No button should be absolutely positioned
  const shouldNoButtonBeAbsolute = () => {
    return (count > 3 && appState === "persuading") || appState === "ultimatum";
  };

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="min-h-screen w-full bg-amber-200 flex justify-center items-center p-4">
        <div className="bg-pink-300 w-full max-w-2xl lg:h-[35rem] lg:w-[35rem] rounded-2xl flex justify-center items-center shadow-xl p-4 lg:p-0">
          <div className="text-center space-y-4 w-full">
            <div className="relative h-64 w-full lg:h-[25rem] lg:w-[25rem] mx-auto bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8">
              <div className="h-12 w-full lg:w-48 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-10 w-full lg:w-48 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-amber-200 flex justify-center items-center relative overflow-hidden p-4">
      <audio ref={audioRef} src="/audios/meow2.mp3" preload="auto" />
      <audio ref={audioRef2} src="/audios/done.mp3" preload="auto" loop />

      {/* Secret Click Images - Hidden on mobile, visible on desktop */}
      {surroundingImages.map((image, index) => (
        <div
          key={index}
          className={`hidden lg:block absolute h-24 w-24 lg:h-32 lg:w-32 rounded-xl cursor-pointer transition-transform duration-200 hover:scale-110 ${image.className}`}
          onClick={() => handleSecretImageClick(index)}
        >
          <Image
            src={image.src}
            alt={`Decoration image ${index + 1}`}
            fill
            className="rounded-xl object-cover"
            sizes="(max-width: 1024px) 96px, 128px"
          />
        </div>
      ))}

      {/* Mouse Follower Hearts - Hidden in ultimatum */}
      {appState !== "ultimatum" &&
        hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl pointer-events-none animate-ping z-50"
            style={{ left: heart.x - 12, top: heart.y - 12 }}
          >
            💖
          </div>
        ))}

      {/* Main Content Card - PROPERLY CENTERED */}
      <div className="bg-pink-300 w-full max-w-2xl lg:h-[35rem] lg:w-[35rem] rounded-2xl flex justify-center items-center shadow-xl p-4 lg:p-8">
        <div className="text-center space-y-4 lg:space-y-6 w-full flex flex-col items-center">
          {/* Main Image - PROPERLY CENTERED */}
          <div className="relative h-56 w-56 lg:h-[25rem] lg:w-[25rem] mx-auto flex justify-center">
            <Image
              src={mainImageSrc}
              alt="Valentine proposal animation"
              width={400}
              height={400}
              className="rounded-2xl object-contain w-full h-full"
              priority
            />
          </div>

          {/* Text Display */}
          <h3
            className={`text-lg lg:text-3xl font-semibold text-cyan-800 transition-all duration-300 px-2 lg:px-4 text-center ${
              isTextWiggling ? "animate-bounce" : ""
            } ${appState === "ultimatum" ? "text-red-600 font-bold" : ""}`}
          >
            {innerText}
          </h3>

          {/* Buttons Container - SMALLER ON MOBILE */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-8 w-full max-w-md">
            {/* Yes Button with Gradient Border - SMALLER ON MOBILE */}
            <div className="rotating-gradient h-10 lg:h-12 w-full lg:w-48 flex justify-center items-center rounded-lg cursor-pointer hover:scale-110 hover:duration-100 active:scale-105 transition-transform">
              <button
                className="bg-rose-500 rounded-lg h-8 lg:h-10 w-full lg:w-44 text-lg lg:text-2xl text-white font-bold hover:bg-rose-600 transition-colors"
                onClick={handleYesClick}
              >
                {appState === "ultimatum" ? "FORGIVE ME" : "YES"}
              </button>
            </div>

            {/* No Button - SMALLER ON MOBILE */}
            <button
              className={`bg-rose-500 rounded-lg h-8 lg:h-10 w-full lg:w-48 text-xs lg:text-sm font-bold text-white hover:scale-90 transition-all hover:duration-75 active:scale-75 hover:bg-rose-600 ${
                shouldNoButtonBeAbsolute() ? "absolute" : "static"
              }`}
              onMouseEnter={handleNoHover}
              onClick={handleNoClick}
              style={shouldNoButtonBeAbsolute() ? noButtonPosition : {}}
            >
              {getNoButtonText()}
            </button>
          </div>

          {/* Ultimatum Warning */}
          {appState === "ultimatum" && (
            <div className="mt-2 lg:mt-4 p-2 lg:p-3 bg-red-100 border border-red-300 rounded-lg max-w-md text-xs lg:text-sm">
              <p className="text-red-700 font-semibold">
                ⚠️ You already said YES! Do not break my heart! 💔
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}