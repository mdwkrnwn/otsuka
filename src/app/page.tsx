"use client";

import { SOP } from "@/data/SOP";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { HiMenu, HiX } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type SopType = {
  id: number;
  name: string;
  tujuan: string;
  image: string;
  ruangLingkup: string;
    prosedur: {
    judul: string;       
    isi: string;       
  }[];
};


const logos = [
  { src: "/images/otsuka.png", alt: "Otsuka" },
  { src: "/images/oronamin.png", alt: "Oronamin C" },
  { src: "/images/pocari.png", alt: "Pocari Sweat" },
  { src: "/images/soyjoy.png", alt: "Soyjoy" },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openh, setOpenh] = useState(false);
  
  const [selected, setSelected] = useState<SopType | null>(null);

  const handleSelect = (item: SopType) => {
    setSelected(item);
    setOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // PAGINATION LOGIC
  const totalPages = Math.ceil(SOP.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = SOP.slice(startIndex, startIndex + itemsPerPage);

  const [active, setActive] = useState("#home");

    useEffect(() => {
      const handleScroll = () => {
        const sections = ["#home", "#sop", "#about", "#contact"];
        let current = "#home";

        sections.forEach((id) => {
          const section = document.querySelector(id);
          if (section) {
            const top = section.getBoundingClientRect().top;
            if (top <= 80) current = id; // 80 = navbar height offset
          }
        });

        setActive(current);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // cek awal
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden">

        {/* Background */}
        {/* <div
          className="absolute inset-0 bg-top bg-no-repeat bg-contain pointer-events-none"
          style={{ backgroundImage: "url('/images/bg.png')" }}
        ></div> */}


        {/* Navbar */}
          <nav
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl py-3 w-[92%]       
            max-w-7xl md:w-full flex items-center h-20 justify-between px-4 md:px-8 z-50"
          >
            {/* Logo kiri */}
            <div className="flex items-center gap-2 text-blue-700 font-medium text-lg">
              <img src="/images/otsuka.png" alt="Logo" className="w-20 h-auto" />
            </div>

            {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6 text-[16px]">
              {["#home", "#sop", "#about", "#contact"].map((link) => (
                <a
                  key={link}
                  href={link}
                  className={`font-medium hover:text-blue-700 ${
                    active === link ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {link === "#home" ? "Home" : link === "#sop" ? "SOP" : link === "#about" ? "About us" : "Contact us"}
                </a>
              ))}
          </div>

            {/* Hamburger Mobile */}
            <button
              className="md:hidden text-blue-700"
              onClick={() => setOpenh(!openh)}
            >
              {openh ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>

            {/* Dropdown Menu Mobile */}
            {openh && (
              <div
                className="absolute top-22 left-0 w-full bg-white backdrop-blur-md shadow-lg rounded-xl p-6
                flex flex-col gap-4 text-[16px] md:hidden
          "
              >
                <a href="#home" onClick={() => setOpen(false)} className="text-blue-600 font-medium">
                  Home
                </a>
                <a href="#sop" onClick={() => setOpen(false)} className="hover:text-blue-600">
                  SOP
                </a>
                <a href="#about" onClick={() => setOpen(false)} className="hover:text-blue-600">
                  About us
                </a>
                <a href="#contact" onClick={() => setOpen(false)} className="hover:text-blue-600">
                  Contact us
                </a>
              </div>
            )}
          </nav>

        {/* Hero Section */}
       <section
          className="relative z-20 max-w-7xl mx-auto pt-50 flex flex-col md:flex-row 
          items-center justify-between px-4 md:px-10 gap-10"
          id="home"
        >
          {/* Right Image */}
          <motion.div
            className="relative flex justify-center order-1 md:order-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-[350px] md:w-[500px] h-[240px] md:h-[380px] 
              rounded-2xl overflow-hidden shadow-xl border-2 border-white/30 
              backdrop-blur-md bg-white/40"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src="/images/otsuka.jpg"
                alt="Otsuka"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

            {/* Left Content */}
            <motion.div
              className="flex flex-col text-center md:text-left max-w-xl order-2 md:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-blue-700 font-bold text-3xl md:text-5xl leading-snug">
                INOVASI KESEHATAN.
                <br />
                UNTUK SEMUA ORANG.
              </h1>

              <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">
                Menyediakan standar operasional prosedur dengan informasi yang tepat, cepat,
                dan mudah diakses untuk mendukung peningkatan kualitas kesehatan masyarakat.
              </p>

              <motion.div
                className="mt-6 flex justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <a
                  href="#sop"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full
                  text-base font-medium shadow-md transition-all duration-300"
                >
                  Jelajahi SOP
                </a>
              </motion.div>
            </motion.div>
        </section>

          {/* LOGO SECTION */}
          <div className="max-w-7xl mx-auto mt-22 mb-22 px-4 md:px-10">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center cursor-pointer"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {logos.map((logo, index) => (
                <motion.img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="w-24 md:w-28 mx-auto opacity-70 hover:opacity-100 hover:grayscale-0 grayscale transition"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                />
              ))}
            </motion.div>
          </div>


        {/* SECTION SOP */}
      

        <section
          className="max-w-7xl z-20 mx-auto scroll-mt-30 px-4 mt-46 pb-20"
          id="sop"
        >
          {/* HEADER */}
          <motion.div
            className="flex items-center justify-between mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-blue-700 text-center">
              STANDARD OPERATING PROCEDURE
            </h3>
            <span className="text-sm text-gray-500">{SOP.length} SOP</span>
          </motion.div>

          {/* GRID ANIMATION WRAPPER */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col cursor-pointer"
                onClick={() => handleSelect(item)}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0. }}
              >
                <div className="relative group">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-[200px] bg-gray-50 transition-all duration-300 group-hover:brightness-75"
                  />

                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaEye className="text-white text-3xl" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col mt-3">
                  <h4 className="font-semibold text-gray-900 mt-1 line-clamp-2 whitespace-pre-line">
                    {item.name}
                  </h4>

                  <button
                    onClick={() => handleSelect(item)}
                    className="mt-3 text-center cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Detail
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* PAGINATION */}
          {/* (pagination tidak perlu animasi karena statis) */}
<Pagination className="mt-6 items-end justify-end">
   <PaginationContent>
     <PaginationItem> 
      <PaginationPrevious href="#sop" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} />
         </PaginationItem> {[...Array(totalPages)].map((_, index) => (
           <PaginationItem key={index}>
             <PaginationLink href="#sop" isActive={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)} > 
              {index + 1}
               </PaginationLink>
                </PaginationItem> ))}
                 {totalPages > 5 && <PaginationEllipsis />}
                 <PaginationItem> 
                  <PaginationNext href="#sop" onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} /> </PaginationItem> </PaginationContent> </Pagination>
          {/* MODAL DETAIL */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
              <DialogHeader>
                <DialogTitle>{selected?.name}</DialogTitle>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mt-2 w-full h-[250px] relative">
                  <Image
                    src={selected?.image || "/images/default.jpg"}
                    alt={selected?.name || "SOP Image"}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="mt-4 text-sm max-h-[350px] overflow-y-auto pr-2">
                  <p><strong>Tujuan:</strong> {selected?.tujuan}</p>
                  <p className="mt-2"><strong>Ruang Lingkup:</strong> {selected?.ruangLingkup}</p>

                  <div className="mt-2">
                    <p className="font-bold">Prosedur:</p>

                    <div className="mt-2 space-y-4">
                      {selected?.prosedur?.map((item, idx) => (
                        <div key={idx}>
                          {item.judul && <p className="font-bold">{item.judul}</p>}
                          <p className="text-justify mt-1">{item.isi}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
       </section>




        {/* SECTION ABOUT */}
         <section className="relative w-full py-28 bg-white" id="about">
            <div className="max-w-7xl mx-auto px-4 md:px-10">

              {/* CONTENT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* LEFT — TEXT */}
                <motion.div
                  className="space-y-4 mb-30"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-blue-600">Tentang Perusahaan</h2>

                  <p className="text-gray-600 leading-relaxed">
                    Otsuka berkomitmen untuk menghadirkan inovasi di bidang kesehatan
                    dan memberikan solusi terbaik bagi masyarakat. Kami terus
                    mengembangkan produk berkualitas tinggi melalui standar operasi
                    yang ketat dan tenaga profesional yang berpengalaman.
                  </p>
                </motion.div>

                {/* RIGHT — IMAGE */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="/images/about.jpg"
                    alt="About Image"
                    className="w-full max-w-md rounded-xl shadow-lg"
                  />
                </motion.div>

              </div>
            </div>
          </section>


        {/* SECTION CONTACT */}
        <section className="relative py-24" id="contact">

          {/* Background hanya setengah tinggi */}
          <div className="absolute inset-0 h-1/2 "></div>

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-blue-600 relative z-10 tracking-wider"
          >
            LET’S KEEP IN TOUCH
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 max-w-2xl mx-auto mt-3 mb-12 text-sm md:text-base relative z-10"
          >
            Have questions, project ideas, or partnership inquiries?
            We’d love to hear from you. Leave a message and our team will reach out
            as soon as possible.
          </motion.p>

          {/* CONTACT CONTAINER */}
          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">

            {/* LEFT SIDE - CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-blue-500 text-white p-10 rounded-xl shadow-lg"
            >
              <Card className="bg-transparent border-none shadow-none text-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Our Contacts</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 text-white text-sm">
                  <div className="flex gap-3 items-start">
                    <MapPin className="w-5" />
                    <p>8R2W+332 Malang, Jl. Raya Pasuruan No.KM11, Tromo Barat...</p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Phone className="w-5" />
                    <p>
                      (0343) 414200 <br />
                      (0341) 426244
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Mail className="w-5" />
                    <p>info@ho.otsuka.co.id</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* RIGHT SIDE - FORM */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="p-10 bg-white rounded-xl shadow-lg"
            >
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Send us a message</CardTitle>
                </CardHeader>

                <CardContent>
                  <form className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="Your name" />
                      <Input placeholder="Skype / WhatsApp" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="Email address" />
                      <Input placeholder="Subject / Topic" />
                    </div>

                    <Textarea
                      placeholder="Write your message"
                      className="h-32 resize-none"
                    />

                    <div className="flex justify-end">
                      <Button className="bg-blue-500 text-white hover:bg-blue-600 px-8">
                        SEND
                      </Button>
                    </div>

                  </form>
                </CardContent>
              </Card>
            </motion.div>

          </div>

        </section>


        <footer className="bg-blue-600 text-gray-300 py-10 md:py-14 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

            {/* ABOUT */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">About us</h3>
              <p className="text-sm leading-relaxed">
                We are committed to providing innovative products and professional support
                for improving health and quality of life.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#sop" className="hover:text-white transition">
                    SOP
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>


            {/* CONTACT INFO */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <Phone className="w-4" />
                  +62-21 7654466
                </li>
                <li className="flex gap-2">
                  <Mail className="w-4" />
                  info@ho.otsuka.co.id
                </li>
                <li className="flex gap-2">
                  <MapPin className="w-4" />
                  Pondok Indah Office Tower 1 Lantai 8, Jl. Sultan Iskandar Muda Kav. V - TA, Jakarta Selatan 12310 (Kantor Utama)
                </li>
              </ul>
            </div>
          </div>

          {/* SOCIAL + COPYRIGHT */}
          <div className="border-t border-white mt-10 pt-6 flex flex-col justify-center items-center gap-4 px-6 text-center">

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 justify-center">
              <Facebook className="w-5 hover:text-white cursor-pointer transition" />
              <Instagram className="w-5 hover:text-white cursor-pointer transition" />
              <Linkedin className="w-5 hover:text-white cursor-pointer transition" />
              <Twitter className="w-5 hover:text-white cursor-pointer transition" />
            </div>

            <p className="text-xs text-white">
              © 2025 Oli Samping Studio. All rights reserved.
            </p>
          </div>

        </footer>
      </div>
    </>
  );
}
