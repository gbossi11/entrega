import { useEffect, useState } from "react";
import axios from "axios";
import { Collapse, Input, Select } from "antd";
import Card from "../../components/Card";
import "../pages.css";
import CarouselAuto from "../../../CarouselAuto";
import useCartStore from "../../store/useCartStore";
import useAuthStore from "../../store/useAuthStore";

const { Option } = Select;

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" O "desc"

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/productos")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProductos(response.data);
          setFilteredProductos(response.data);
        } else {
          console.error("Productos no es un arreglo:", response.data);
          setProductos([]);
          setFilteredProductos([]);
        }
      })
      .catch((error) => console.error("Error fetching productos:", error));
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [nameFilter, minPriceFilter, maxPriceFilter, sortOrder, productos]);

  const filterAndSortProducts = () => {
    let result = [...productos];

    if (nameFilter) {
      result = result.filter((producto) =>
        producto.nombre.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (minPriceFilter) {
      result = result.filter(
        (producto) => producto.precio >= parseFloat(minPriceFilter)
      );
    }

    if (maxPriceFilter) {
      result = result.filter(
        (producto) => producto.precio <= parseFloat(maxPriceFilter)
      );
    }

    if (sortOrder) {
      result.sort((a, b) =>
        sortOrder === "asc" ? a.precio - b.precio : b.precio - a.precio
      );
    }

    setFilteredProductos(result);
  };

  const collapseItems = [
    {
      key: "1",
      label: "Filtros",
      header: "Filtros",
      children: (
        <div className="filters">
          <Input
            placeholder="Filtrar por nombre"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input
            type="number"
            placeholder="Precio mínimo"
            value={minPriceFilter}
            onChange={(e) => setMinPriceFilter(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input
            type="number"
            placeholder="Precio máximo"
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Select
            placeholder="Ordenar por precio"
            onChange={(value) => setSortOrder(value)}
            style={{ width: "100%", marginBottom: 0 }}
          >
            <Option value="asc">Ascendente</Option>
            <Option value="desc">Descendente</Option>
          </Select>
        </div>
      ),
    },
  ];

  return (
    <div>
      <CarouselAuto />

      <h1>PRODUCTOS</h1>

      <Collapse items={collapseItems} />

      <div>
        <ul className="products-container">
          {filteredProductos.map((producto) => (
            <li key={producto.id}>
              <Card
                id={producto.id}
                nombre={producto.nombre}
                imagen={producto.imagen}
                precio={producto.precio}
                descripcion={producto.descripcion}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
