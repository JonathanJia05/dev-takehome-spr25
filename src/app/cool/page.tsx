"use client";
import { useState } from "react";

export default function Kewl() {
  const [activeTab, setActiveTab] = useState("Landscape");

  return (
    <div className="min-h-screen flex flex-col items-center bg-primary text-white gap-5">
      {/* 
      Write something unique about you here! 
      It could be a club you're part of, a weird skill you have, or something special that happened to you.
      Feel free to put links, images, whatever! 
      Don't worry about styling- we aren't grading you on this- it's just to get to know you better! :) 
      */}
      <div className="mx-56 mt-8">
        Hi, I'm Jonathan Jia! Some unique things about me are that I play a
        rhythm game called Osu! and I love film photography. I'm currently rank
        #77,000 in the world in Osu! and am aiming to be rank #25,000 by the end
        of this year. I got into photography during my senior year of high
        school and have been taking pictures everywhere I go ever since. I
        mainly do landscape, street, and automotive photography but I want to
        learn to take better pictures of people too.
      </div>
      <a
        href="https://osu.ppy.sh/users/13565929"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex flex-row items-center gap-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/images/osuLogo.png" className="w-5 h-5"></img>
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
              <img
                className="w-full object-cover rounded-lg"
                src="/images/landscape1.jpg"
                alt="landscape"
              />
              <img
                className="w-full object-cover rounded-lg"
                src="/images/landscape2.jpg"
                alt="landscape"
              />
              <img
                className="w-full object-cover rounded-lg"
                src="/images/landscape3.jpg"
                alt="landscape"
              />
              <img
                className="w-full object-cover rounded-lg"
                src="/images/landscape4.jpg"
                alt="landscape"
              />
            </div>
          )}

          {activeTab === "Street" && (
            <div
              id="Street"
              role="tabpanel"
              className="columns-2 md:columns-3 gap-4 mb-4"
            >
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/street1.JPG"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/street2.JPG"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/street3.JPG"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/street4.jpg"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/street6.JPG"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/street7.JPG"
                alt="street"
              />
            </div>
          )}

          {activeTab === "Automotive" && (
            <div
              id="Automotive"
              role="tabpanel"
              className="columns-2 md:columns-3 gap-4 mb-4"
            >
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/auto1.jpeg"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/auto2.JPG"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/auto4.jpg"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/auto5.jpg"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/auto6.jpg"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/auto7.jpg"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/auto8.jpg"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/auto9.jpg"
                alt="street"
              />
              <img
                className="w-full object-cover mb-4 rounded-lg"
                src="/images/auto10.jpg"
                alt="street"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
