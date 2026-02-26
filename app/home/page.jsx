"use client";

import ListadoPrincipal from "../../components/ListadoPrincipal";
import Header from "../../components/Header";
import ListadoPlatos from "../../components/ListadoPlatos";

export default function HomePage() {
  return (
    <>
      <Header />
      <ListadoPrincipal />
      <ListadoPlatos />
    </>
  );
}