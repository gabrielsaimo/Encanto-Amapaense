import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App() {
  /* <Carousel showArrows={true}>
        <div>
          <img
            style={{ width: 100, height: 100 }}
            src={require("./assets/regional.jpeg")}
            alt="c-encanto-regional"
          />
        <;objectFit:"cover"/div>
        <div>
          <img
            style={{ width: 100, height: 100 }}
            src={require("./assets/regional.jpeg")}
            alt="c-encanto-regional"
          />
        <;objectFit:"cover"/div>
        <div>
          <img
            style={{ width: 100, height: 100 }}
            src={require("./assets/regional.jpeg")}
            alt="c-encanto-regional"
          />
        <;objectFit:"cover"/div>
      </Carousel>
      */
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${require("./assets/fundo_site.jpg")})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 400 }}>
        <h1 style={{ color: "white" }}>Cardápio</h1>
        <img
          src={require("./assets/logo_pricipal.jpeg")}
          alt="logo-principal"
          style={{ width: "50%", borderRadius: "100%" }}
        />
        <div style={{ marginBottom: 145 }}>
          <h1 style={{ color: "white" }}>Pratos a la carte</h1>

          <div>
            <div
              style={{
                display: "flex",
                width: 380,
                height: 600,
                backgroundColor: "#d4d4d4",
                opacity: 0.1,
                borderRadius: 10,
                zIndex: 1,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></div>
            <div style={{ marginTop: "-590px", zIndex: 2 }}>
              <img
                src={require("./assets/regional.jpeg")}
                alt="c-encanto-regional"
                style={{
                  height: 350,
                  borderRadius: 10,
                  objectFit: "cover",
                }}
              />
              <p style={{ color: "white", fontWeight: "bold" }}>
                Encanto Regional
              </p>

              <p style={{ color: "white", fontWeight: "bold" }}>R$ 90,00</p>

              <p style={{ color: "white", fontWeight: "bold" }}>
                camarão com camarão
              </p>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 145 }}>
          <div
            style={{
              display: "flex",
              width: 380,
              height: 600,
              justifyContent: "space-between",
              backgroundColor: "#d4d4d4",
              opacity: 0.1,
              borderRadius: 10,
              zIndex: 1,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>
          <div style={{ marginTop: "-590px", marginLeft: "00px", zIndex: 2 }}>
            <img
              src={require("./assets/p_crosta_castanha.jpg")}
              alt="p_crosta_castanha"
              style={{
                width: 350,
                height: 350,
                borderRadius: 10,
                objectFit: "cover",
              }}
            />
            <p style={{ color: "white", fontWeight: "bold" }}>
              Peixe na Crosta da Castanha
            </p>

            <p style={{ color: "white", fontWeight: "bold" }}>R$ 110,00</p>

            <p style={{ color: "white", fontWeight: "bold" }}>
              Camarão com Peixe
            </p>
          </div>
        </div>
        <div style={{ marginBottom: 145 }}>
          <div
            style={{
              display: "flex",
              width: 380,
              height: 600,
              justifyContent: "space-between",
              backgroundColor: "#d4d4d4",
              opacity: 0.1,
              borderRadius: 10,
              zIndex: 1,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>
          <div style={{ marginTop: "-590px", zIndex: 2 }}>
            <img
              src={require("./assets/sabor_norte.jpg")}
              alt="c-encanto-regional"
              style={{
                width: 350,
                height: 350,
                borderRadius: 10,
                objectFit: "cover",
              }}
            />
            <p style={{ color: "white", fontWeight: "bold" }}>Sabor do Norte</p>

            <p style={{ color: "white", fontWeight: "bold" }}>R$ 20,00</p>

            <p
              style={{
                color: "white",
                width: 380,
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: "bold",
              }}
            >
              Posta de filhote grelhado em azeite e especiarias, com patas de
              caranguejo e camarão rosa na crosta de castanha do Brasil,
              acompanhados de arroz com brócolis e queijo regional, farofa e
              molho de tucupi com pimenta.
            </p>
          </div>
        </div>
        <div style={{ marginBottom: 145 }}>
          <div
            style={{
              display: "flex",
              width: 380,
              height: 600,
              backgroundColor: "#d4d4d4",
              opacity: 0.1,
              borderRadius: 10,
              zIndex: 1,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>
          <div style={{ marginTop: "-590px", zIndex: 2 }}>
            <img
              src={require("./assets/tucuju.jpg")}
              alt="c-encanto-regional"
              style={{
                width: 350,
                height: 350,
                borderRadius: 10,
                objectFit: "cover",
              }}
            />
            <p style={{ color: "white", fontWeight: "bold" }}>Mistura Tucuju</p>

            <p style={{ color: "white", fontWeight: "bold" }}>R$ 80,00</p>

            <p style={{ color: "white", fontWeight: "bold" }}>
              camarão com aroz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
