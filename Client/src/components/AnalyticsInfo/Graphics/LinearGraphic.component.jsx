import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LinearGraphic = ({ labels, datasets, label }) => {
  return (
    <Line
      datasetIdKey="id"
      data={{
        labels: labels,
        datasets: datasets,
      }}
    />
  );
};

export default LinearGraphic;
