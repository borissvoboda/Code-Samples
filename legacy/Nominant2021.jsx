/* 

Legacy code sample from the early 2021

*/

import React, { Fragment } from "react";
import { useState, useEffect, useCallback } from "react";
import { Grid, TextField, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Modal from "@material-ui/core/Modal";
import InputFS from "./InputFS.js";

// ! Put styles into module.css file
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    margin: "auto",
    maxWidth: 700,
    backgroundColor: "#fff",
    textAlign: "left",
    border: "1px solid #f0f0f0",
    boxShadow: "0 1px 6px 0 #dfe5ee",
    color: "#7a7a7a",
  },
  gridItem: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  textField: {
    marginTop: "30px",
  },
  input: {
    borderRadius: 0,
    border: "solid 0.075px #D9DEE0 !important",
    padding: "0px",
    height: 40,
  },
  focused: {
    border: "solid 0.075px #66afe9 !important",
    boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 10px #a0a0a0",
  },
  notchedOutline: {
    border: "solid 0px #909090 !important",
  },
  input1: {
    borderRadius: 0,
    border: "solid 0.075px #D9DEE0 !important",
    padding: "0px",
    height: 40,
  },
  focused1: {
    border: "solid 0.075px #66afe9 !important",
    boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 10px #a0a0a0",
  },
  notchedOutline1: {
    border: "solid 0px #909090 !important",
  },
  inputLabel1: {
    color: "#505050 !important",
    marginTop: "-10px",
    marginLeft: "-14px",
    fontSize: "120%",
  },
  focusedLabel1: {
    fontWeight: "400",
    color: "#505050 !important",
  },
  inputNone: {
    display: "none",
  },
  inputImage: {
    marginRight: theme.spacing(1),
    marginTop: "5px",
    width: "500px",
  },
  imagePreview: {
    marginRight: theme.spacing(1),
    marginTop: "5px",
    width: "250px",
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: "5px",
  },
  buttonDelete: {
    marginRight: theme.spacing(1),
    marginTop: "5px",
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #808080",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 4),
  },
  inputLabelMock: {
    color: "#505050 !important",
  },
}));

const Nominant = () => {
  const classes = useStyles();

  // Consider merging some states into one larger state/object
  const [update, setUpdate] = useState("");
  const [celeJmeno, setCeleJmeno] = useState("");
  const [oscis, setOscis] = useState("");
  const [medailonek, setMedailonek] = useState("");
  const [uspech, setUspech] = useState("");
  const [motto, setMotto] = useState("");
  const [soubor, setSoubor] = useState();
  const [souborNazev, setSouborNazev] = useState();
  const [souhlasDBvalue, setSouhlasDBvalue] = useState(false);
  const [souhlasZpracovani, setSouhlasZpracovani] = useState(false);
  const [fotoVema, setFotoVema] = useState(false);
  const [fileImage, setFileImage] = useState({
    file: null,
  });
  const [fotoVlastni, setFotoVlastni] = useState(false);
  const [fotoVlastniNazev, setFotoVlastniNazev] = useState("");
  const [fotoVlastniDBvalue, setFotoVlastniDBvalue] = useState(false);
  const [uzamceno, setUzamceno] = useState(false);

  // GET
  useEffect(() => {
    // fetch('<API URL>')
    console.log("GET !!!!");
    fetch("api/nominant")
      .then((response) => response.json())
      .then((data) => {
        setCeleJmeno(data.celeJmeno);
        setOscis(data.osCis);
        setMedailonek(data.medailonek);
        setUspech(data.uspech);
        setMotto(data.motto);
        if (data.fotoVema != null) {
          setFotoVema(data.fotoVema);
        }
        if (data.souhlas != null) {
          setSouhlasZpracovani(data.souhlas);
        }
        if (data.fotoVlastni != null) {
          setFotoVlastni(data.fotoVlastni);
        }

        setFotoVlastniNazev("<API URL>" + data.fotoVlastniNazev);
        setFotoVlastniDBvalue(data.fotoVlastni);
        setSouhlasDBvalue(data.souhlas);
        setUzamceno(data.souhlas);
        // console.log("Uzamčeno: " + uzamceno);
      });
    // console.log("After Effect: " + fotoVlastniDBvalue);

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [update, uzamceno]);

  // PUT
  function putData() {
    const formData = new FormData();
    formData.append("formFile", soubor);
    formData.append("formName", souborNazev);

    // PUT request using fetch inside useEffect React hook
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Credentials: "include",
      },
      body: JSON.stringify({
        oscis: oscis,
        Medailonek: medailonek,
        // Foto: fileImage.file,
        Motto: motto,
        Uspech: uspech,
        // Foto: fileImage.file
        FormFile: soubor,
        FotoVlastni: fotoVlastni,
        FotoVema: fotoVema,
        // DatumSouhlasu: Date.now(),
        Souhlas: souhlasZpracovani,
      }),
    };
    fetch(`api/nominant/${oscis}`, requestOptions)
      .then((response) => response.json())
      // .then(data => console.log("Data: " + data))
      .then((data) => {
        console.log(data);
        var b = JSON.parse(data);
        console.log("Foto vlastní " + fotoVlastni);
        setFotoVlastniDBvalue(b.fotoVlastni);
      });
    setUpdate(Date.now);
    setUzamceno(true);
    console.log("Foto vlastní " + fotoVlastni);
  }

  // PUT - edit
  function putRozeditovat() {
    // PUT request using fetch inside useEffect React hook
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Credentials: "include",
      },
      body: JSON.stringify({
        oscis: oscis,
        Souhlas: false,
        // Foto: fileImage.file,
        // Motto: motto,
        // Uspech: uspech,
        // Foto: fileImage.file
        // FormFile: soubor,
        // FotoVlastni: fotoVlastni,
        // FotoVema: fotoVema,
        // DatumSouhlasu: Date.now(),
      }),
    };
    fetch(`api/nominantedit/${oscis}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    // .then(data => { console.log(data); var b = JSON.parse(data); setFotoVlastniNazev("<API URL>"+ b.FotoVlastniNazev) })
    setUpdate(Date.now);
    setUzamceno(false);
  }

  function handleNoveAktualniFoto() {
    //fotoVlastniNazev()
  }

  const jmenoNenalezeno = () => {
    return <p color="red">Osoba nebyla nalezena.</p>;
  };

  // function handleUploadClick(event) {
  //     if (event.target.files[0]) {
  //     setFileImage({
  //         file: URL.createObjectURL(event.target.files[0])
  //       });
  //     console.log(fileImage.file);
  //     }
  // }

  // Nahrani­ souboru

  // const [soubor, setSoubor] = useState();
  // const [souborNazev, setSouborNazev] = useState();

  //   function handleUploadClick(event) {
  //     if (event.target.files[0]) {
  //       var reader = new FileReader();
  //       setFileImage({ file: URL.createObjectURL(event.target.files[0])});
  //       reader.readAsDataURL(event.target.files[0]);
  //       reader.onload = () => {
  //         var base64 = reader.result;
  //         setSoubor(base64);
  //       };
  //       reader.onerror = (e) => {
  //         console.log("error: ", e);
  //       }
  //       console.log(soubor);
  //     console.log(event.target.files[0]);
  //     }
  // }

  function handleUploadClick(event) {
    if (event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        var base64 = reader.result;
        console.log("base64");
        console.log(base64);
        setSoubor(base64);
      };
      reader.onerror = (e) => {
        console.log("error: ", e);
      };
      // setFileImage({
      //   file: URL.createObjectURL(event.target.files[0])
      // });
      console.log("vypsaný soubor");
      console.log(soubor);
    }
  }

  // function UploadImage() {
  //   if (fotoVema == "true" || fotoVlastni == true) {
  //     return
  //     <form>
  // <input
  //         accept="image/*"
  //         className={classes.inputNone}
  //         id="contained-button-file"
  //         multiple
  //         type="file"
  //         onChange={e => handleUploadClick(e)}
  //       />
  //       <label htmlFor="contained-button-file">
  //         <Button className={classes.button} variant="contained" backgroundColor="blue" component="span" onChange={e => handleUploadClick(e)}>
  //           Nahrat obrazek
  //         </Button>
  //       </label>

  //             </form>;
  //   } else {
  //   return <></>;
  // }
  // }

  const [souhlasVema, setSouhlasVema] = useState(false);
  function PutDataButton() {
    // if (fileImage.file != null || souhlasVema == true) {
    if (true) {
      return (
        <Button
          href="#"
          className={classes.button}
          onClick={(e) => {
            console.log("Odesílam...");
            putData();
            setModalOpen(false);
            setModalAlertOpen(true);
          }}
          variant="contained"
        >
          Odeslat moje ĹŻdaje
        </Button>
      );
    } else return <></>;
  }

  function VyjadrenySouhlasFoto() {
    if (fotoVema == true) {
      return <div>Souhlasím s použitím mé fotografie z IS Vema.</div>;
    } else if (fotoVlastni == true) {
      return <div>Souhlasím s použitím mé vlastní fotografie.</div>;
    } else return <></>;
  }

  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  function ModalPut() {
    return (
      <Fragment>
        {" "}
        <Modal
          className={classes.modal}
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Paper className={classes.paperModal}>
            <h3>Údaje k odeslání:</h3>

            <table>
              <tr>
                <td>
                  <b>Jméno:</b>{" "}
                </td>
                <td>{celeJmeno}</td>
              </tr>
              <tr>
                <td>
                  <b>Osobní číslo:</b>{" "}
                </td>
                <td>{oscis}</td>
              </tr>
              <tr>
                <td>
                  <b>Medailonek:</b>{" "}
                </td>
                <td>{medailonek}</td>
              </tr>
              <tr>
                <td>
                  <b>Úspěch:</b>{" "}
                </td>
                <td>{uspech}</td>
              </tr>
              <tr>
                <td>
                  <b>Motto:</b>{" "}
                </td>
                <td>{motto}</td>
              </tr>
              <tr>
                <td>
                  <b>Foto:</b>{" "}
                </td>
                <td>
                  <VyjadrenySouhlasFoto></VyjadrenySouhlasFoto>
                </td>
              </tr>
            </table>

            <PutDataButton />
            <Button
              className={classes.button}
              backgroundColor="#505050"
              variant="contained"
              onClick={(e) => setModalOpen(false)}
            >
              Neodesílat
            </Button>
          </Paper>
        </Modal>
      </Fragment>
    );
  }

  function Odeslat() {
    if (
      medailonek != "" &&
      uspech != "" &&
      motto != "" &&
      (fotoVema == true || (fotoVlastni == true && soubor != null)) &&
      souhlasZpracovani == true
    ) {
      return (
        <Button
          disabled={uzamceno}
          className={classes.button}
          variant="contained"
          onClick={(e) => setModalOpen(true)}
        >
          Odeslat
        </Button>
      );
    } else
      return (
        <Button
          className={classes.button}
          variant="contained"
          disabled
          onClick={(e) => {}}
        >
          Odeslat
        </Button>
      );
  }

  function VlastniFoto() {
    if (fotoVlastni == true && uzamceno == false) {
      return (
        <div>
          <Grid item xs={12} className={classes.gridItem}>
            <form>
              <input
                accept="image/*"
                className={classes.inputNone}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => handleUploadClick(e)}
              />
              <label htmlFor="contained-button-file">
                <Button
                  className={classes.button}
                  variant="contained"
                  backgroundColor="blue"
                  component="span"
                  onChange={(e) => handleUploadClick(e)}
                >
                  Nahrát vlastní foto
                </Button>
              </label>
            </form>
          </Grid>

          <Grid item xs={3} className={classes.gridItem}>
            Foto náhled:
          </Grid>
          <Grid item xs={9} className={classes.gridItem}>
            <img className={classes.imagePreview} src={soubor} />
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            {function DownloadImage() {
              if (fileImage.file != null) {
                return (
                  <Button
                    href={fileImage.file}
                    className={classes.button}
                    target="_blank"
                    variant="contained"
                  >
                    Otevřít foto v novém okně›
                  </Button>
                );
              } else return <></>;
            }}
            {function DeleteImage() {
              if (fileImage.file != null) {
                return (
                  <Button
                    href="#"
                    className={classes.button}
                    onClick={(e) => setFileImage({ file: null })}
                    variant="contained"
                  >
                    Smazat foto
                  </Button>
                );
              } else return <></>;
            }}
          </Grid>
        </div>
      );
    } else return <></>;
  }

  const [modalAlertOpen, setModalAlertOpen] = useState(false);
  const handleCloseAlertModal = () => {
    setModalAlertOpen(false);
  };
  function ModalAlert() {
    return (
      <Fragment>
        {" "}
        <Modal
          className={classes.modal}
          open={modalAlertOpen}
          onClose={handleCloseAlertModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Paper className={classes.paperModal}>Údaje byly odeslány</Paper>
        </Modal>
      </Fragment>
    );

    // !
    setSouhlasDBvalue(true);
  }
  /* /ModalAlert */

  const handleMedailonek = (newValue) => {
    setMedailonek(newValue);
  };

  const handleMotto = (newMotto) => {
    setMotto(newMotto);
  };

  const handleUspech = (newUspech) => {
    setUspech(newUspech);
  };

  const handleFotoVema = (e) => {
    if (e.target.checked == true) {
      setFotoVlastni(false);
      setSoubor(null);
    }
  };

  const handleFotoVlastni = (e) => {
    if (e.target.checked == true) {
      setFotoVema(false);
    }
  };

  function AktualniFoto() {
    if (fotoVlastniDBvalue) {
      return (
        <div>
          {" "}
          <span className={classes.inputLabelMock}></span>Aktuální foto:
          <br></br>
          <img className={classes.imagePreview} src={fotoVlastniNazev} />
        </div>
      );
    } else {
      return <></>;
    }
  }

  function RozeditovatData() {
    if (uzamceno) {
      return (
        <Button
          className={classes.button}
          variant="contained"
          onClick={(e) => putRozeditovat()}
        >
          Chci změnit údaje
        </Button>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} className={classes.gridItem}>
            <h1>Nominant</h1>
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <InputFS
              label="Vaše jméno"
              value={celeJmeno}
              disabled="true"
            ></InputFS>
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <InputFS
              label="Osobní číslo"
              value={oscis}
              disabled="true"
            ></InputFS>
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <InputFS
              disabled={uzamceno}
              label="Medailonek"
              value={medailonek}
              onChange={handleMedailonek}
              muiltiline="multiline"
              rows="rows={4}"
            ></InputFS>
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <InputFS
              disabled={uzamceno}
              label="Úspěch"
              value={uspech}
              onChange={handleUspech}
              muiltiline="multiline"
              rows="rows={4}"
            ></InputFS>
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <InputFS
              disabled={uzamceno}
              label="Motto"
              value={motto}
              onChange={handleMotto}
              muiltiline="multiline"
              rows="rows={4}"
            ></InputFS>
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <AktualniFoto></AktualniFoto>
          </Grid>

          <Grid item xs={12} className={classes.gridItem} paddingTop="5px">
            <FormControlLabel
              control={
                <Checkbox
                  // souhlasVemaChecked
                  checked={fotoVema}
                  onClick={(e) => {
                    setFotoVema(e.target.checked);
                    handleFotoVema(e);
                  }}
                  name="souhlasVema"
                  disabled={uzamceno}
                />
              }
              label="Souhlasím s použitím fotografie z personálního systému..."
            />
          </Grid>

          <Grid item xs={12} className={classes.gridItem} paddingTop="0px">
            <FormControlLabel
              control={
                <Checkbox
                  // souhlasVemaChecked
                  checked={fotoVlastni}
                  onClick={(e) => {
                    setFotoVlastni(e.target.checked);
                    handleFotoVlastni(e);
                  }}
                  name="souhlasVema"
                  disabled={uzamceno}
                />
              }
              label="Použít vlastní foto"
            />
          </Grid>
          <VlastniFoto></VlastniFoto>
          <Grid item xs={12} className={classes.gridItem} paddingTop="0px">
            <FormControlLabel
              control={
                <Checkbox
                  // souhlasVemaChecked
                  checked={souhlasZpracovani}
                  onClick={(e) => {
                    setSouhlasZpracovani(e.target.checked);
                  }}
                  name="souhlasZpracovani"
                  disabled={uzamceno}
                />
              }
              label="Souhlas se zpracováním..."
            />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Odeslat disabled={uzamceno}></Odeslat>{" "}
            <RozeditovatData></RozeditovatData>
          </Grid>
          <ModalPut></ModalPut>
        </Grid>
      </Paper>
    </div>
  );
};

export default Nominant;
