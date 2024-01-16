import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutGraphics = ({ labels, datasets }) => {
  const options = {
    plugins: {
      legend: {
        position: "top", // Puedes ajustar la posición de la leyenda según tus necesidades
        align: "center", // Centra la leyenda
      },
    },
  };

  return (
    labels &&
    datasets && (
      <Pie
        options={options}
        data={{
          labels: labels,
          datasets,
        }}
      />
    )
  );
};

export default DoughnutGraphics;
