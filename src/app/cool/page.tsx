"use client";
import { useState } from "react";
import Image from "next/image";

export default function Kewl() {
  const [activeTab, setActiveTab] = useState("Landscape");

  return (
    <div className="min-h-screen flex flex-col items-center bg-primary text-white gap-5">
      <div className="mx-56 mt-8">
        Hi, I&#39;m Jonathan Jia! Some unique things about me are that I play a
        rhythm game called Osu! and I love film photography. I&#39;m currently
        rank #77,000 in the world in Osu! and am aiming to be rank #25,000 by
        the end of this year. I got into photography during my senior year of
        high school and have been taking pictures everywhere I go ever since. I
        mainly do landscape, street, and automotive photography but I want to
        learn to take better pictures of people too.
      </div>
      <a
        href="https://osu.ppy.sh/users/13565929"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex flex-row items-center gap-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/osuLogo.png"
          width={20}
          height={20}
          alt="Osu logo"
        />
        My Osu! profile
      </a>

      <div className="w-full max-w-5xl px-4">
        <ul
          className="flex flex-wrap justify-center gap-4 mb-6 bg-gray-800 p-2 rounded-lg"
          role="tablist"
        >
          <li>
            <button
              onClick={() => setActiveTab("Landscape")}
              className={`px-4 py-2 rounded-md transition ${
                activeTab === "Landscape"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              role="tab"
              aria-controls="Landscape"
              aria-selected={activeTab === "Landscape"}
            >
              Landscape
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("Street")}
              className={`px-4 py-2 rounded-md transition ${
                activeTab === "Street"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              role="tab"
              aria-controls="Street"
              aria-selected={activeTab === "Street"}
            >
              Street
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("Automotive")}
              className={`px-4 py-2 rounded-md transition ${
                activeTab === "Automotive"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              role="tab"
              aria-controls="Automotive"
              aria-selected={activeTab === "Automotive"}
            >
              Automotive
            </button>
          </li>
        </ul>

        <div className="relative">
          {activeTab === "Landscape" && (
            <div
              id="Landscape"
              role="tabpanel"
              className="flex flex-col gap-4 pb-4"
            >
              {[1, 2, 3, 4].map((num) => (
                <Image
                  key={num}
                  className="w-full object-cover rounded-lg"
                  src={`/images/landscape${num}.jpg`}
                  width={800}
                  height={600}
                  alt={`Landscape ${num}`}
                />
              ))}
            </div>
          )}

          {activeTab === "Street" && (
            <div
              id="Street"
              role="tabpanel"
              className="columns-2 md:columns-3 gap-4 mb-4"
            >
              {[1, 2, 3, 4, 6, 7].map((num) => (
                <Image
                  key={num}
                  className="w-full object-cover mb-4 rounded-lg"
                  src={`/images/street${num}.JPG`}
                  width={600}
                  height={400}
                  alt={`Street ${num}`}
                />
              ))}
            </div>
          )}

          {activeTab === "Automotive" && (
            <div
              id="Automotive"
              role="tabpanel"
              className="columns-2 md:columns-3 gap-4 mb-4"
            >
              {[1, 2, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <Image
                  key={num}
                  className="w-full object-cover mb-4 rounded-lg"
                  src={`/images/auto${num}.jpg`}
                  width={600}
                  height={400}
                  alt={`Automotive ${num}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
