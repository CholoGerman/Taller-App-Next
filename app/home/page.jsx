"use client";

import ListadoPrincipal from "../../components/ListadoPrincipal";
import Header from "../../components/Header";
import ListadoPlatos from "../../components/ListadoPlatos";
import Footer from "../../components/Footer";
import "../../styles/header.css";
import Pattern from "../../components/Pattern";


export default function HomePage() {
  return (
       <Pattern>
      <Header />
      <ListadoPrincipal />
      <ListadoPlatos />
      <Footer />
       </Pattern>
  );
}