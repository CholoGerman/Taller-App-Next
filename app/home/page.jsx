"use client";

import ListadoPrincipal from "../../components/ListadoPrincipal";
import Header from "../../components/Header";
import ListadoPlatos from "../../components/ListadoPlatos";
import Footer from "../../components/Footer";
import "../../styles/header.css";


export default function HomePage() {
  return (
    <>
      <Header />
      <ListadoPrincipal />
      <ListadoPlatos />
      <Footer />
    </>
  );
}