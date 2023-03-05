import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuItem from "./MenuItem";
import "./MenuItem.css";

// Datova struktura mela byt diktovana DB/API (zadani nebylo v dane dobe jasne)
// Nemelo byt mozne delat postupne requesty pro nacteni
// nizsich urovni menu

const struktura = [
  {
    nazev: "1",
    podrizene: [
      {
        nazev: "1.1",
        podrizene: [
          {
            nazev: "1.1.1",
            podrizene: [
              { nazev: "1.1.1.1", podrizene: [] },
              { nazev: "1.1.1.2", podrizene: [] },
            ],
          },
          {
            nazev: "1.1.2",
            podrizene: [
              { nazev: "1.1.1.1", podrizene: [] },
              { nazev: "1.1.1.2", podrizene: [] },
            ],
          },
        ],
      },
      { nazev: "1.2", podrizene: [] },
      { nazev: "1.3", podrizene: [] },
    ],
  },
  {
    nazev: "2",
    podrizene: [
      {
        nazev: "1.1",
        podrizene: [
          {
            nazev: "1.1.1",
            podrizene: [
              { nazev: "1.1.1.1", podrizene: [] },
              { nazev: "1.1.1.2", podrizene: [] },
            ],
          },
          {
            nazev: "1.1.2",
            podrizene: [
              { nazev: "1.1.1.1", podrizene: [] },
              { nazev: "1.1.1.2", podrizene: [] },
            ],
          },
        ],
      },
      { nazev: "1.2", podrizene: [] },
      { nazev: "1.3", podrizene: [] },
    ],
  },
  {
    nazev: "3",
    podrizene: [],
  },
  {
    nazev: "4.1.1",
    podrizene: [],
  },
];

// V reseni se predpokladal omezeny pocet urovni
// Komponenta MenuItem obsahuje jako child props svou dalsi iteraci
// Pokud by se vytvorila komponenta MenuItem primo s podminenym vypsanim children props
// melo by byt mozne pouzit pro X urovni
const items1 = struktura.map((i: any) => (
  <div>
    <MenuItem
      title={i.nazev}
      disabled={i.podrizene.length <= 0 && true}
      className="scrollDown"
    >
      {i.podrizene.length > 0 &&
        i.podrizene.map((j: any) => (
          <MenuItem
            title={j.nazev}
            disabled={j.podrizene.length <= 0 && true}
            className="scrollDown"
          >
            {/* Level 3 */}
            {j.podrizene.length > 0 &&
              j.podrizene.map((k: any) => (
                <MenuItem
                  title={k.nazev}
                  disabled={k.podrizene.length <= 0 && true}
                  className="scrollDown"
                >
                  {/* Level 4 */}
                  {k.podrizene.length > 0 &&
                    k.podrizene.map((l: any) => (
                      <MenuItem
                        title={l.nazev}
                        disabled={l.podrizene.length <= 0 && true}
                        className="scrollDown"
                      ></MenuItem>
                    ))}
                </MenuItem>
              ))}
          </MenuItem>
        ))}
    </MenuItem>
  </div>
));

function SideMenu() {
  return <div style={{ padding: "20px" }}>{items1}</div>;
}

export default SideMenu;
