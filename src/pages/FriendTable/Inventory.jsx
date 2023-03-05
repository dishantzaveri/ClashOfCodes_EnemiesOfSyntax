import { useEffect, useState } from "react";
import { Box } from "@mui/system";
// import PersistentDrawerLeft from '../Account/sidebar'
import addNotification from "react-push-notification";
import { EnhancedTable } from "./Table";
import {
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Autocomplete,
  TextField,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TablePending } from "./TableOther";
import axios from "axios";
import { useParams } from "react-router-dom";

const TabLabel = ({ name, number, checked }) => {
  return (
    <Box
      classname="respInv"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        background: `${
          checked === name ? "white" : "rgba(223, 248, 223, 0.669)"
        }`,
        borderRadius: "10px 10px 0 0",
        padding: "10px 20px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: `${checked === name ? "black" : "#7c7f81"}`,
        }}
      >
        {name}
      </Typography>
      <Chip
        size="small"
        color={checked === name ? "success" : "default"}
        label={number}
      />
    </Box>
  );
};
const buttonClick = () => {
  addNotification({
    title: "Yipeeee",
    subtitle: "New Data added",
    theme: "light",
    duration: 4000,
    vibrate: Number[10],
    native: true, // when using native, your OS will handle theming.
  });
};

const array = ["Shipped", "Ordered", "Required"];

const typeA = ["Chemical", "Other", "Equipment"];

function createData(id, name, quantity, price) {
  return {
    id,
    name,
    quantity,
    type: typeA[Math.floor(Math.random() * typeA.length)],
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
    status: array[Math.floor(Math.random() * array.length)],
  };
}

const Tabs = ({ checked, setChecked, tabs }) => {
  let tabsList = Object.entries(tabs);
  return (
    <Box>
      <RadioGroup
        row
        value={checked}
        onChange={(event) => setChecked(event.target.value)}
      >
        {tabsList.map((tab, index) => (
          <FormControlLabel
            key={index}
            value={tab[0]}
            control={
              <Radio
                sx={{ visibility: "hidden", width: 0 }}
                // onClick={buttonClick}
              />
            }
            label={<TabLabel name={tab[0]} checked={checked} number={tab[1]} />}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

const Inventory = () => {
  const theme = useTheme();
  const [names, setNames] = useState([]);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState("All");
  const [rows, setRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tabs, setTabs] = useState({
    All: 0,
    Shipped: 0,
    Ordered: 0,
    Required: 0,
  });
  useEffect(() => {
    if (rows) {
      let x = {
        All: 0,
        Shipped: 0,
        Ordered: 0,
        Required: 0,
      };
      let array = [];
      rows.map((row) => {
        x[row.status]++;
        x["All"]++;
        array.push(row.name);
      });
      console.log(array);
      setNames(array);
      setTabs(x);
    }
  }, [rows]);

  useEffect(() => {
    let x = rows.filter((row) => {
      if (search === "") {
        return row;
      } else {
        return row.name.toLowerCase().includes(search.toLowerCase());
      }
    });
    setFilteredData(x);
  }, [search]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        console.log(res.data.products);
        const data = res.data.products;
        let array = [];
        let x = {
          All: 0,
          Shipped: 0,
          Ordered: 0,
          Required: 0,
        };
        data.forEach((item) => {
          let data = createData(item.id, item.title, item.stock, item.price);
          array.push(data);
          x[data.status]++;
          x["All"]++;
        });
        setTabs(x);
        setRows(array);
        setFilteredData(array);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const { id } = useParams();
  console.log(id);
  return (
    <Box sx={{ display: "flex" }}>
      {/* <PersistentDrawerLeft /> */}
      <Box sx={{ padding: 2, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0",
          }}
        >
          <Typography variant={theme.breakpoints.up("md") ? "h3" : "h5"}>
            Inventory
          </Typography>
          {names && (
            <Autocomplete
              inputValue={search}
              onInputChange={(event, newInputValue) => {
                setSearch(newInputValue);
              }}
              id="controllable-states-demo"
              options={names}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  color="success"
                  size={theme.breakpoints.up("md") ? "medium" : "small"}
                  {...params}
                  label="Search"
                />
              )}
            />
          )}
        </Box>
        {rows && (
          <div>
            <Tabs checked={checked} setChecked={setChecked} tabs={tabs} />
            {checked === "All" ? (
              <EnhancedTable
                type={id}
                checked={checked}
                rows={search ? filteredData : rows}
                setRows={setRows}
              />
            ) : (
              <TablePending
                type={id}
                checked={checked}
                rows={search ? filteredData : rows}
                setRows={setRows}
              />
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Inventory;

// style={{backgroundColor:"#233329"}}
