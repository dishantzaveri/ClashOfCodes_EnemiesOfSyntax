import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MdOutlineLanguage } from "react-icons/md"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  console.log(location.pathname)
  const user = localStorage.getItem("token");
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  var color = localStorage.getItem("color")
  const numbers = [
    { val: 'en', text: "English" }, { val: 'hi', text: "हिन्दी" },
    { val: 'en', text: "অসমীয়া" }, { val: 'bn', text: "বাংলা" },
    { val: 'gu', text: "ગુજરાતી" }, { val: 'kn', text: "ಕನ್ನಡ" },
    { val: 'ml', text: "മലയാളം" }, { val: 'mr', text: "मराठी" },
    { val: 'en', text: "Odia" }, { val: 'ta', text: "தமிழ்" },
    { val: 'pa', text: "Punjabi" }, { val: 'nl', text: "Deutsch" },
    { val: 'de', text: "German" }, { val: 'fr', text: "Française" },
  ]
  const [lang, setLang] = useState('en');
  const handlechange = (e) => {
    setLang(e.target.value);
    localStorage.setItem("language", e.target.value);
    navigate("/?lng=" + e.target.value)
    const href = "http://localhost:3000/?lng=" + e.target.value
    window.location.href = href;
  }
  console.log(localStorage.getItem("language"))

  const { t } = useTranslation();
  return (
    <div className="w-full flex px-24 py-4 justify-between items-center">
      <div className="flex items-center gap-2">
        <img className="w-8" src={logo} alt="" />
        <h1
          className={`text-2xl font-bold underline ${
            color === "emerald"
              ? "decoration-emerald-500"
              : color === "amber"
              ? "decoration-amber-500"
              : color === "sky"
              ? "decoration-sky-500"
              : color === "red"
              ? "decoration-red-500"
              : color === "violet"
              ? "decoration-violet-500"
              : "decoration-purple-500"
          }`}
        >
        tripright
        </h1>
      </div>
      <div className="flex gap-10 items-center capitalize">
        <Link to="/" className="flex flex-col items-center">
          <h1
            className={`capitalize font-semibold`}
          >
            {t("home")}
          </h1>
          {location.pathname === "/" && (
            <div className={`bg-${color}-500 w-4 capitalize h-1 rounded`}></div>
          )}
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <h1
            className={`font-semibold capitalize text-lg text-gray-${
              location.pathname === "/profile" ? "900" : "700"
            }`}
          >
            {t("profile")}
          </h1>
          {location.pathname === "/profile" && (
            <div className={`bg-${color}-500 w-4 h-1 rounded`}></div>
          )}
        </Link>
        <Link to="/home" className="flex flex-col items-center">
          <h1
            className={`font-semibold capitalize text-lg text-gray-${
              location.pathname === "/home" ? "900" : "700"
            }`}
          >
            {t("chat")}
          </h1>
          {location.pathname === "/home" && (
            <div className="bg-emerald-500 w-4 h-1 rounded"></div>
          )}
        </Link>
        <Link to="/itinerary" className="flex flex-col items-center">
          <h1
            className={`font-semibold capitalize text-lg text-gray-${
              location.pathname === "/itinerary" ? "900" : "700"
            }`}
          >
            {t("Itinerary")}
          </h1>
          {location.pathname === "/itinerary" && (
            <div className="bg-emerald-500 w-4 h-1 rounded"></div>
          )}
        </Link>
        <Link to="/events" className="flex flex-col items-center">
          <h1
            className={`font-semibold text-lg text-gray-${
              location.pathname === "/events" ? "900" : "700"
            }`}
          >
            {t("Events")}
          </h1>
          {location.pathname === "/events" && (
            <div className="bg-emerald-500 w-4 h-1 rounded"></div>
          )}
        </Link>
        <Link to="/forum" className="flex flex-col items-center">
          <h1
            className={`font-semibold text-lg text-gray-${
              location.pathname === "/forum" ? "900" : "700"
            }`}
          >
            {t("Forum")}
          </h1>
          {location.pathname === "/forum" && (
            <div className="bg-emerald-500 w-4 h-1 rounded"></div>
          )}
        </Link>
        <Link to="/vendors" className="flex flex-col items-center">
          <h1
            className={`font-semibold text-lg text-gray-${
              location.pathname === "/forum" ? "900" : "700"
            }`}
          >
            {t('Vendors')}
          </h1>
          {location.pathname === "/vendors" && (
            <div className="bg-emerald-500 w-4 h-1 rounded"></div>
          )}
        </Link>
      </div>
      {user ? (
        <div className="flex gap-4 items-center">
          <button
            onClick={() => logout()}
            className={`text-gray-100 text-sm px-8 py-4 bg-${color}-500 rounded-full`}
          >
            {t("logout")}
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                className={`text-gray-100 text-sm px-8 py-4 bg-${color}-500 rounded-full`}
              >
                lang <MdOutlineLanguage className="inline" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {numbers.map((i) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handlechange}
                            value={i.val}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-lg"
                            )}
                          >
                            {i.text}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <div className="flex gap-12 items-center">
          <Link to="/login">
            <button className="font-semibold">Login</button>
          </Link>
          <Link to="/register">
            <button
              className={`text-gray-100 px-8 py-3 bg-${color}-500 rounded-full`}
            >
              {t("Register")}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
