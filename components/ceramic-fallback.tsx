"use client"

import { useEffect, useState } from "react"

interface CeramicFallbackProps {
  size?: number
  autoRotate?: boolean
  className?: string
}

export default function CeramicFallback({ size = 240, autoRotate = true, className = "" }: CeramicFallbackProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 flex items-center justify-center`}
      style={{ width: size, height: size }}
    >
      <div
        className="relative"
        style={{
          width: size * 0.8,
          height: size * 0.8,
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`w-full h-full relative ${autoRotate ? "animate-ceramic-rotate" : ""}`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main Vase */}
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: size * 0.3,
              height: size * 0.5,
              background: "linear-gradient(145deg, #f5f5dc 0%, #e6ddd4 50%, #d4c4a8 100%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              boxShadow: `
                inset 0 0 20px rgba(0,0,0,0.1),
                0 10px 30px rgba(0,0,0,0.2),
                0 0 0 2px rgba(255,255,255,0.3)
              `,
              transform: "rotateX(10deg)",
            }}
          >
            {/* Vase neck */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{
                top: "-20%",
                width: "40%",
                height: "30%",
                background: "linear-gradient(145deg, #f5f5dc 0%, #e6ddd4 100%)",
                borderRadius: "50% 50% 50% 50% / 80% 80% 20% 20%",
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
              }}
            />

            {/* Ceramic texture lines */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 8px,
                  rgba(0,0,0,0.05) 8px,
                  rgba(0,0,0,0.05) 9px
                )`,
                borderRadius: "inherit",
              }}
            />
          </div>

          {/* Small Bowl */}
          <div
            className="absolute"
            style={{
              left: "15%",
              top: "60%",
              width: size * 0.2,
              height: size * 0.15,
              background: "linear-gradient(145deg, #e6ddd4 0%, #d4c4a8 100%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              boxShadow: `
                inset 0 0 15px rgba(0,0,0,0.1),
                0 5px 20px rgba(0,0,0,0.15)
              `,
              transform: "rotateX(15deg) rotateY(-20deg)",
            }}
          />

          {/* Small Cup */}
          <div
            className="absolute"
            style={{
              right: "20%",
              top: "65%",
              width: size * 0.15,
              height: size * 0.2,
              background: "linear-gradient(145deg, #d4c4a8 0%, #c4b49a 100%)",
              borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
              boxShadow: `
                inset 0 0 10px rgba(0,0,0,0.1),
                0 5px 15px rgba(0,0,0,0.15)
              `,
              transform: "rotateX(10deg) rotateY(30deg)",
            }}
          >
            {/* Cup handle */}
            <div
              className="absolute"
              style={{
                right: "-30%",
                top: "30%",
                width: "25%",
                height: "40%",
                border: "3px solid #d4c4a8",
                borderLeft: "none",
                borderRadius: "0 50% 50% 0",
                transform: "rotateY(20deg)",
              }}
            />
          </div>

          {/* Floating ceramic particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + i * 5}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: "3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ceramic-rotate {
          0% {
            transform: rotateY(0deg) rotateX(5deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(5deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
        }
        
        .animate-ceramic-rotate {
          animation: ceramic-rotate 15s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
