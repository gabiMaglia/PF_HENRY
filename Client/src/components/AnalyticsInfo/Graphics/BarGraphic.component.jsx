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
    labels &&
    datasets && (
      <Bar
        data={{
          labels: labels,
          datasets,
        }}
      />
    )
  );
};

export default BarGraphic;
