import { Search } from "../../components";
import "./style.scss";

export const Home = () => {
  return (
    <div className="home-page">
      <h1 className="text-center fs-4 fw-normal text-white pb-3">
        Merhaba
        <p>Nereyi keşfetmek istersiniz?</p>
      </h1>
      <div className="search d-flex justify-content-center align-items-center">
        <Search />
      </div>
    </div>
  );
};
