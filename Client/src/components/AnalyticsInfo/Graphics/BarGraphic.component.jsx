import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BarGraphic = ({ labels, datasets }) => {
  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            id: 1,
            label: "Marcas añadidas al carrito",
            data: datasets,
          },
        ],
      }}
    />
  );
};

export default BarGraphic;
